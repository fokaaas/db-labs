import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFeedbackDTO {
  @ApiPropertyOptional({
    description: 'Main text of the feedback',
  })
  @IsOptional()
  body?: string;

  @ApiPropertyOptional({
    description: 'Rating left by the user',
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    description: 'The id of the user who provided the feedback',
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({
    description: 'Id of the media request to which feedback was given',
  })
  @IsOptional()
  mediaRequestId?: number;
}