// kafka.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/conusmer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-group',
          },
        },
      },
    ]),
  ],
  providers: [ConsumerService, ProducerService],
  exports: [ConsumerService, ProducerService],
})
export class KafkaModule {}
