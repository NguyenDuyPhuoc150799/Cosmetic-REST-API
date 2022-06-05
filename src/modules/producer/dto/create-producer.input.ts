import { Producer } from './../type/producer.type';
import { OmitType } from '@nestjs/swagger';
export class CreateProducerInput extends OmitType(Producer, ['id']) {}
