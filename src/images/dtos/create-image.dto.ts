import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsString()
  url: string;
  @IsNumber()
  priority: number;
}
