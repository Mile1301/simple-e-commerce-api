import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateImageDto } from './dtos/create-image.dto';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createImage(@Body() imageData, @UploadedFile() file: Express.Multer.File) {
    return this.imagesService.createImage(imageData, file);
  }

  @Delete('/:id')
  deleteImage(@Param('id') imageId: string) {
    return this.imagesService.deleteImage(Number(imageId));
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateImage(
    @Param('id') imageId: string,
    @Body() imageData,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imagesService.updateImage(Number(imageId), imageData, file);
  }

  @Get()
  findAllImages() {
    return this.imagesService.findAllImages();
  }

  @Get('/:id')
  findImageById(@Param('id') imageId: string) {
    return this.imagesService.findImageById(Number(imageId));
  }
}
