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

import { CreateUserDto, TrackUserDto } from './users/dto';

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

  @Post('track')
  async trackUser(@Body(new ValidationPipe()) userTrackingData: TrackUserDto) {
    try {
      const {
        actionSource,
        clientIpAddress,
        clientUserAgent,
        eventName,
        eventSourceUrl,
        userId,
      } = userTrackingData;

      const user = await this.userService.getUser({
        id: userId,
      });

      if (!user.data)
        return {
          data: `Something went wrong. User:${userId} not found.`,
        };

      const {
        data: { email, fbLoginId, firstName, dob, gender, lastName },
      } = user;

      const trackingResponse =
        await this.conversionApiService.sendTrackingInformation({
          eventName,
          eventTime: Math.floor(Date.now() / 1000),
          actionSource,
          eventSourceUrl,
          email,
          clientIpAddress,
          clientUserAgent,
          facebookLoginId: fbLoginId,
          firstName,
          dateOfBirth: dob,
          gender,
          lastName,
        });

      if (!trackingResponse)
        return {
          data: `Something went wrong. User:${userId} unsuccessfully tracked.`,
        };
      return { data: `User:${userId} successfully tracked` };
    } catch (e) {
      return { data: `Something went wrong. ${e.message}` };
    }
  }

  @Post('user')
  async createUser(@Body(new ValidationPipe()) userData: CreateUserDto) {
    const { data: currentUser } = await this.userService.getUser({
      email: userData.email,
    });

    if (currentUser) return { data: `User:${currentUser.id} already exists` };

    const { data: user } = await this.userService.createUser(userData);

    return { data: `User:${user} successfully created` };
  }
}
