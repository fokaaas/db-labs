import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CreateFeedbackDTO } from './create.feedback.dto';
import { FeedbackService } from './feedback.service';
import { FeedbackResponse } from './feedback.response';
import {UpdateFeedbackDTO} from './update.feedback.dto';
import {FeedbackPipe} from "../pipes/feedback.pipe";
import {FeedbackBodyPipe} from "../pipes/feedback.body.pipe";

@Controller('/feedbacks')
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService,
  ) {}

  @Post()
  async create (
    @Body(FeedbackBodyPipe) body: CreateFeedbackDTO,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.create(body);
  }

  @Patch('/:id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body(FeedbackBodyPipe) body: UpdateFeedbackDTO,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.update(id, body);
  }

  @Get('/:id')
  async get (
    @Param('id', ParseIntPipe, FeedbackPipe) id: number,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.get(id);
  }

  @Delete('/:id')
  async delete (
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FeedbackResponse> {
    return this.feedbackService.delete(id);
  }
}
