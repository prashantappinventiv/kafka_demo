// Example usage in a controller
import { Controller, Post } from '@nestjs/common';
import { ProducerService } from './module/kafka/producer/producer.service';

@Controller()
export class AppController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('send-message')
  async sendMessage() {
    await this.producerService.sendMessage('user.create', { data: 'Hello' });
    return 'Message sent';
  }
}
