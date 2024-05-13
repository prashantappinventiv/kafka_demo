// producer/producer.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'kafka-group',
      },
    },
  })
  private readonly client: ClientKafka;

  async onModuleDestroy() {
    await this.client.close();
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Subscribing to user.create');
    this.client.subscribeToResponseOf('user.create');
    console.log('Subscribing to user.create.reply');
    this.client.subscribeToResponseOf('user.create.reply');
  }

  async sendMessage(topic: string, message: any) {
    try {
      await lastValueFrom(this.client.send(topic, message));
      console.log('Message sent successfully:', topic, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
