import { ConfigService } from '@nestjs/config';
import { CLOUDINARY } from './constants';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService): object => {
    return cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_KEY'),
      api_secret: configService.get('CLOUDINARY_SECRET'),
    });
  },
  inject: [ConfigService],
};
