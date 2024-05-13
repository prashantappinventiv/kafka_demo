import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ConsumerService {
  @MessagePattern('user.create')
  async handleMessage(payload: any) {
    try {
      console.log('Received message:', payload);
      // Process the message here
      const response = { message: 'User created successfully' };
      return response; // Send the response back to the producer
    } catch (error) {
      console.error('Error in message pattern user.create', error);
    }
  }

  @MessagePattern('user.create.reply') // Subscribe to the reply topic
  async handleReply(payload: any) {
    try {
      console.log('Received reply:', payload);
      const response = { message: 'User created successfully' };
      return response;
    } catch (error) {
      console.error('Error in user.create.reply', error);
    }
  }
}
