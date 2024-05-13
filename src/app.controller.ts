import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express'; // Import Request from express

import { ProducerService } from './module/kafka/producer/producer.service';

@Controller()
export class AppController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('send-message')
  async sendMessage(@Req() req: Request) {
    const payload = req.body.data;
    await this.producerService.sendMessage('user.create', payload);
    return 'Message sent';
  }
}
