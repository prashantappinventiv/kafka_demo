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
    console.log('Subscribing to user.create');
    this.client.subscribeToResponseOf('user.create');
    await this.client.connect();
  }

  async sendMessage(topic: string, message: any) {
    try {
      await lastValueFrom(this.client.send(topic, message))
        .then((data: any) => {
          console.info('data', data);
          return data;
        })
        .catch((err: any) => {
          console.error('err', err);
        });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
