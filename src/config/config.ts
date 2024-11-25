import { plainToInstance } from 'class-transformer';
import { IsString, validateSync, IsNotEmpty } from 'class-validator';

export default () => ({
  facebook: {
    accessToken: process.env.FB_ACCESS_TOKEN,
    pixelId: process.env.FB_PIXEL_ID,
    conversionApiBaseUrl: process.env.FB_CONVERSION_API_BASE_URL,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});

export interface EnvironmentVariablesInterface {
  facebook: {
    accessToken: string;
    pixelId: string;
    conversionApiBaseUrl: string;
  };
  database: {
    url: string;
  };
}

class EnvironmentVariablesSchema {
  @IsNotEmpty()
  @IsString()
  FB_ACCESS_TOKEN: string;

  @IsString()
  @IsNotEmpty()
  FB_PIXEL_ID: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  FB_CONVERSION_API_BASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariablesSchema, config, {
    enableImplicitConversion: true,
  });

  const validationErrors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.toString());
  }

  return validatedConfig;
}
