import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariablesInterface } from 'src/config/config';
import { TrackingInformationDto } from './dto/tracking.information.dto';
import { createHash } from 'node:crypto';

interface ConversionApiTrackingPayloadInterface {
  event_name: string;
  event_time: number;
  action_source: string;
  event_source_url: string;
  user_data: {
    em: string;
    client_ip_address: string;
    client_user_agent: string;
    fb_login_id: number;
    fn: string[];
    ln: string[];
    db: string[];
    ge: string[];
  };
}

@Injectable()
export class ConversionApiService {
  constructor(
    private configService: ConfigService<EnvironmentVariablesInterface>,
  ) {}

  async sendTrackingInformation(trackingInformation: TrackingInformationDto) {
    const transformedTrackingInformation =
      this.transformTrackingInformation(trackingInformation);

    return await this.makeConversionApiRequest(transformedTrackingInformation);
  }

  transformTrackingInformation({
    email,
    eventName,
    eventTime,
    actionSource,
    eventSourceUrl,
    clientIpAddress,
    clientUserAgent,
    facebookLoginId,
    firstName,
    lastName,
    dateOfBirth,
    gender,
  }: TrackingInformationDto) {
    return {
      event_name: eventName,
      event_time: eventTime,
      action_source: actionSource,
      event_source_url: eventSourceUrl,
      user_data: {
        em: this.hashData(email),
        client_ip_address: clientIpAddress,
        client_user_agent: clientUserAgent,
        fb_login_id: facebookLoginId,
        fn: [this.hashData(firstName)],
        ln: [this.hashData(lastName)],
        db: [this.hashData(dateOfBirth)],
        ge: [this.hashData(gender)],
      },
    } as ConversionApiTrackingPayloadInterface;
  }

  hashData(content: string) {
    return createHash('sha3-256').update(content).digest('hex');
  }

  async makeConversionApiRequest(
    payload: ConversionApiTrackingPayloadInterface,
  ) {
    const { conversionApiBaseUrl, pixelId, accessToken } =
      this.configService.get('facebook', { infer: true });
    const form = new FormData();
    const requestData = '[\n' + JSON.stringify(payload) + '\n]';

    form.append('data', requestData);
    form.append('access_token', accessToken);

    const response = await fetch(`${conversionApiBaseUrl}/${pixelId}/events`, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      return false;
    }

    return await response.json();
  }
}
