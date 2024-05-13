import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
  @MessagePattern('user.create')
  handleMessage(@Payload() payload: any) {
    console.log('Received message:', payload);
  }
}
