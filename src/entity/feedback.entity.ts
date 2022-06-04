import { UserEntity } from './user.entity';
import { IFeedback } from './../interface/feedback.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FeedbackMaster')
export class FeedbackEntity implements IFeedback {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: string;
}
