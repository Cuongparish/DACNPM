import { Application_Status } from '@app/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  status: Application_Status;

  @Column('text')
  fullname: string;

  @CreateDateColumn()
  phone: string;

  @Column('text')
  email: string;

  @Column('text')
  coverLetter: string;

  @Column('text')
  createdAt: string;

  @Column('text')
  updateAt: string;

  @Column('text')
  jobId: number;

  @Column('text')
  userId: number;

  @Column('text')
  cvId: number;
}
