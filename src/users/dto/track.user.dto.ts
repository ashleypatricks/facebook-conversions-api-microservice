import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TrackUserDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  actionSource: string;

  @IsString()
  @IsNotEmpty()
  eventSourceUrl: string;

  @IsString()
  clientIpAddress: string;

  @IsString()
  @IsNotEmpty()
  clientUserAgent: string;
}
