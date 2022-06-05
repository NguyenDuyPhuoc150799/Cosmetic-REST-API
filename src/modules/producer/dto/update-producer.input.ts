import { ApiProperty } from '@nestjs/swagger';
import { CreateProducerInput } from './create-producer.input';
export class UpdateProducerInput extends CreateProducerInput {
  @ApiProperty()
  id: string;
}
