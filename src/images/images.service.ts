import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dtos/create-image.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateImageDto } from './dtos/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(private cloudinaryService: CloudinaryService) {}
  @InjectRepository(Image) private imagesRepo: Repository<Image>;

  async createImage(imageData: CreateImageDto, file: Express.Multer.File) {
    const { url, priority } = imageData;
    const imagePriority = priority ?? 1000;
    const image = await this.uploadImageToCloudinary(file);

    const newImage = this.imagesRepo.create({
      url: image.url,
      priority: Number(imagePriority),
    });
    await this.imagesRepo.save(newImage);
    return newImage;
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type');
    });
  }

  extractPublicIdFromImageUrl(url: string): string | null {
    const regex = /\/upload\/[^/]+\/(.+)\.[a-zA-Z]{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  async deleteImage(imageId: number) {
    const imageToDelete = await this.findImageById(imageId);

    const publicId = this.extractPublicIdFromImageUrl(imageToDelete.url);

    await this.imagesRepo.remove(imageToDelete);
    await this.cloudinaryService.deleteImage(publicId);
  }

  async updateImage(
    imageId: number,
    updateData: UpdateImageDto,
    file: Express.Multer.File,
  ) {
    const imageToUpdate = await this.findImageById(imageId);
    Object.assign(imageToUpdate, updateData);
    if (file) {
      const publicId = this.extractPublicIdFromImageUrl(imageToUpdate.url);

      await this.cloudinaryService.deleteImage(publicId);

      const updatedImage = await this.uploadImageToCloudinary(file);

      imageToUpdate.url = updatedImage.url;
    }
    await this.imagesRepo.save(imageToUpdate);
  }

  findAllImages() {
    return this.imagesRepo.find();
  }

  async findImageById(id: number) {
    const image = await this.imagesRepo.findOne({
      where: { id },
      relations: {
        product: true,
      },
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
  }
}
