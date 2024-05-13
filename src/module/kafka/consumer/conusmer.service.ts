import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
  @MessagePattern('user.create')
  handleMessage(@Payload('message') payload: any) {
    console.log(payload, 'Received message:');
  }
}
