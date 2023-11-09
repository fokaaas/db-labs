import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateFeedbackDTO } from './create.feedback.dto';
import { FeedbackService } from './feedback.service';
import { FeedbackResponse } from './feedback.response';
import { UpdateFeedbackDTO } from './update.feedback.dto';
import { FeedbackPipe } from '../pipes/feedback.pipe';
import { FeedbackBodyPipe } from '../pipes/feedback.body.pipe';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('/feedbacks')
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService,
  ) {}

  @ApiOkResponse({
    type: FeedbackResponse,
  })
  @ApiNotFoundResponse({
    description: `
      User was not found
      Media Request was not found`
  })
  @ApiOperation({
    summary: 'Create new feedback',
    description: 'Endpoint for creating a new feedback to a media request by the user'
  })
  @Post()
  async create (
    @Body(FeedbackBodyPipe) body: CreateFeedbackDTO,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.create(body);
  }

  @ApiOkResponse({
    type: FeedbackResponse,
  })
  @ApiNotFoundResponse({
    description: `
      Feedback was not found
      User was not found
      Media Request was not found`
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of existing feedback',
  })
  @ApiOperation({
    summary: 'Update an existing feedback',
    description: 'Endpoint for updating existing feedback'
  })
  @Patch('/:id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body(FeedbackBodyPipe) body: UpdateFeedbackDTO,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.update(id, body);
  }

  @ApiOkResponse({
    type: FeedbackResponse,
  })
  @ApiNotFoundResponse({
    description: `
      Feedback was not found`
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of existing feedback',
  })
  @ApiOperation({
    summary: 'Get an existing feedback',
    description: 'Endpoint for getting existing feedback'
  })
  @Get('/:id')
  async get (
    @Param('id', ParseIntPipe, FeedbackPipe) id: number,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.get(id);
  }

  @ApiOkResponse({
    type: FeedbackResponse,
  })
  @ApiNotFoundResponse({
    description: `
      Feedback was not found`
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of existing feedback',
  })
  @ApiOperation({
    summary: 'Delete an existing feedback',
    description: 'Endpoint for deleting existing feedback'
  })
  @Delete('/:id')
  async delete (
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.delete(id);
  }
}
