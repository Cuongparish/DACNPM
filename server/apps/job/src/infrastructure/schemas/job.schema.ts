import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { JobDetail } from './job-detail.schema';
import { Major } from './major.schema';
import { Currency } from './currency.schema';
import { Level } from './level.schema';
import { Field } from './field.schema';
import { Location } from './location.schema';
import { Experience } from './experience.schema';
import { Type } from './type.schema';

@Entity({ name: 'job' })
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleRecruitment: string;

  @Column()
  majorId: number;

  @ManyToOne(() => Major, { onUpdate: 'CASCADE' })
  @JoinColumn()
  major: Major;

  //field
  @ManyToMany(() => Field, { onUpdate: 'CASCADE' })
  @JoinTable()
  fields: Field[];

  @Column()
  campaignId: number;

  @Column()
  typeId: number;

  @ManyToOne(() => Type, { onUpdate: 'CASCADE' })
  @JoinColumn()
  type: Type;

  @Column()
  currencyId: number;
  //currencyId
  @ManyToOne(() => Currency, { onUpdate: 'CASCADE' })
  @JoinColumn()
  currency: Currency;

  @Column()
  salaryMin: number;

  @Column()
  salaryMax: number;

  @Column()
  expId: number;

  @ManyToOne(() => Experience, { onUpdate: 'CASCADE' })
  @JoinColumn()
  exp: Experience;

  // @Column('character varying', { array: true })
  // region: string[];
  //location
  @ManyToMany(() => Location, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  locations: Location[];

  @Column()
  expiredDate: Date;

  @Column({ default: new Date() })
  createAt: Date;

  @Column({ default: new Date() })
  updateAt: Date;

  @Column()
  levelId: number;

  //level
  @ManyToOne(() => Level, { onUpdate: 'CASCADE' })
  @JoinColumn()
  level: Level;

  // Demo , ve sau sua ai default là false
  @Column({ default: false })
  status: boolean;

  //companyId
  @Column()
  companyId: number;

  //jobDetailId
  @OneToOne(() => JobDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  jobDetail: JobDetail;
}
