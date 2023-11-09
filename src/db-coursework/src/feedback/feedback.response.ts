import { ApiProperty } from '@nestjs/swagger';

export class FeedbackResponse {
  @ApiProperty({
    description: 'The id of the feedback',
  })
    id: number;

  @ApiProperty({
    description: 'Main text of the feedback',
  })
    body: string;

  @ApiProperty({
    description: 'Rating left by the user',
  })
    rating: number;

  @ApiProperty({
    description: 'The id of the user who provided the feedback',
  })
    userId: number;

  @ApiProperty({
    description: 'Id of the media request to which feedback was given',
  })
    mediaRequestId: number;

  @ApiProperty({
    description: 'Entity creation timestamp',
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Entity update timestamp',
  })
    updatedAt: Date;
}