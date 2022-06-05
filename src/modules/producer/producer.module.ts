import { ProducerController } from './producer.controller';
import { ProducerEntity } from './../../entity/producer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
