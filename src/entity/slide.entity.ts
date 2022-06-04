import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ISlide } from './../interface/slide.interface';

@Entity('SlideMaster')
export class SlideEntity implements ISlide {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  isShow: boolean;
}
