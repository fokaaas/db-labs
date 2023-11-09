import { IsOptional } from 'class-validator';
import {Transform} from "class-transformer";

export class UpdateFeedbackDTO {
  @IsOptional()
  body?: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  rating?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  userId?: number;

  @IsOptional()
  mediaRequestId?: number;
}