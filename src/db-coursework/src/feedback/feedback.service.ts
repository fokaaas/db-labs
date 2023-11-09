import { Injectable } from '@nestjs/common';
import { CreateFeedbackDTO } from './create.feedback.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateFeedbackDTO } from './update.feedback.dto';
import { FeedbackResponse } from './feedback.response';

@Injectable()
export class FeedbackService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create (data: CreateFeedbackDTO): Promise<FeedbackResponse> {
    return this.prisma.feedback.create({ data });
  }

  async update (id: number, data: UpdateFeedbackDTO): Promise<FeedbackResponse> {
    return this.prisma.feedback.update({
      where: { id },
      data,
    })
  }

  async get (id: number): Promise<FeedbackResponse> {
    return this.prisma.feedback.findUnique({
      where: { id },
    })
  }

  async delete (id: number): Promise<FeedbackResponse> {
    return this.prisma.feedback.delete({
      where: { id },
    })
  }
}
