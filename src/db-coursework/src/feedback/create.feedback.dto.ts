import { IsNotEmpty } from 'class-validator';
import {Transform} from "class-transformer";

export class CreateFeedbackDTO {
  @IsNotEmpty()
    body: string;

  @IsNotEmpty()
    rating: number;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
    userId: number;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
    mediaRequestId: number;
}