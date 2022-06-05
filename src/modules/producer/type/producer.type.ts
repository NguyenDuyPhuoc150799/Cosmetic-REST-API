import { ApiProperty } from '@nestjs/swagger';
import { IProducer } from 'src/interface/producer.interface';

export class Producer implements IProducer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  description?: string;
}
