import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './users/dto/create.user.dto';

import { UserService } from './users/user.service';
import { ConversionApiService } from './facebook/conversion.api.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly conversionApiService: ConversionApiService,
  ) {}

  @Get('user/:id')
  async getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.userService.getUser({ id });
  }

  @Post('user')
  async createUser(@Body(new ValidationPipe()) userData: CreateUserDto) {
    const {
      data: { email, fbLoginId, firstName, dob, gender, lastName, id },
    } = await this.userService.createUser(userData);

    const trackingResponse =
      await this.conversionApiService.sendTrackingInformation({
        eventName: 'PageView',
        eventTime: Math.floor(Date.now() / 1000),
        actionSource: 'website',
        eventSourceUrl: 'www.test-url.com',
        email,
        clientIpAddress: null,
        clientUserAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0',
        facebookLoginId: fbLoginId,
        firstName,
        dateOfBirth: dob,
        gender,
        lastName,
      });

    if (!trackingResponse)
      return {
        data: `Something went wrong. User:${id} unsuccessfully tracked.`,
      };
    return { data: `User:${id} unsuccessfully tracked` };
  }
}
