import { UpdateProducerInput } from './dto/update-producer.input';
import { CreateProducerInput } from './dto/create-producer.input';
import { ProducerEntity } from './../../entity/producer.entity';
import { Producer } from './type/producer.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly producerEntity: Repository<ProducerEntity>,
  ) {}

  async find(): Promise<Producer[]> {
    try {
      return await this.producerEntity.find();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async create(producerInput: CreateProducerInput): Promise<Producer> {
    try {
      return await this.producerEntity.save(producerInput);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(producerInput: UpdateProducerInput): Promise<Producer> {
    try {
      const producer = await this.producerEntity.findOne(producerInput.id);

      if (!producer) {
        throw new NotFoundException('Producer is not exist');
      }

      producer.logo = producerInput.logo;
      producer.description = producerInput.description;
      producer.name = producerInput.name;

      return await this.producerEntity.save(producerInput);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      if (!(await this.producerEntity.findOne(id))) {
        throw new NotFoundException();
      }

      await this.producerEntity.softDelete(id);

      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
