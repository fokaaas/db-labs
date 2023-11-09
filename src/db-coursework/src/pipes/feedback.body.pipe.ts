import { Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EntityException } from '../exceptions/entity.exception';
import { UpdateFeedbackDTO } from '../feedback/update.feedback.dto';

@Injectable()
export class FeedbackBodyPipe implements PipeTransform {
  constructor(
    private prisma: PrismaService,
  ) {}

  async transform (body: UpdateFeedbackDTO) {
    if (body.userId) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: body.userId,
        }
      });
      if (!user) throw new EntityException('User');
    }

    if (body.mediaRequestId) {
      const mediaRequest = await this.prisma.mediaRequest.findUnique({
        where: {
          id: body.mediaRequestId,
        }
      });
      if (!mediaRequest) throw new EntityException('Media Request');
    }

    return body;
  }
}