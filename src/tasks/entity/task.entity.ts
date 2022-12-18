import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  status: boolean;
  @Column({ nullable: true })
  determinedAt: Date;
}

/* 

  title: string;
  description: string;
  status?: boolean;
  determinedAt?: Date;*/
