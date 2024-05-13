import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ConsumerService {
  @MessagePattern('user.create')
  async handleMessage(payload: any) {
    try {
      console.log('Received message:', payload);
      const response = { message: 'User created successfully' };
      return response;
    } catch (error) {
      console.error('Error in message pattern user.create', error);
    }
  }
}
