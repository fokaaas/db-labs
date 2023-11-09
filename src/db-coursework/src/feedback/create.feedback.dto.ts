import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDTO {
  @ApiProperty({
    description: 'Main text of the feedback',
  })
  @IsNotEmpty()
    body: string;

  @ApiProperty({
    description: 'Rating left by the user',
  })
  @IsNotEmpty()
    rating: number;

  @ApiProperty({
    description: 'The id of the user who provided the feedback'
  })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
    userId: number;

  @ApiProperty({
    description: 'Id of the media request to which feedback was given'
  })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
    mediaRequestId: number;
}