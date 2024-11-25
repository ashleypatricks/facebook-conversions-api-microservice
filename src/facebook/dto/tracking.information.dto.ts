import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TrackingInformationDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsNumber()
  @IsNotEmpty()
  eventTime: number;

  @IsString()
  @IsNotEmpty()
  actionSource: string;

  @IsString()
  @IsNotEmpty()
  eventSourceUrl: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  clientUserAgent: string;

  @IsString()
  clientIpAddress: string;

  @IsNumber()
  facebookLoginId: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: string;
}
