import { Module } from '@nestjs/common';
import { KafkaModule } from './module/kafka/kafka.module';
import { AppController } from './app.controller';
import { ConsumerService } from './module/kafka/consumer/conusmer.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController,],
  providers: [],
})
export class AppModule {}
