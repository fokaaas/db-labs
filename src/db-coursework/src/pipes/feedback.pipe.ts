import { Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EntityException } from '../exceptions/entity.exception';

@Injectable()
export class FeedbackPipe implements PipeTransform {
  constructor(
    private prisma: PrismaService,
  ) {}

  async transform (id: number) {
    const feedback = await this.prisma.feedback.findUnique({ where: { id } });
    if (!feedback) throw new EntityException('Feedback');
    return id;
  }
}