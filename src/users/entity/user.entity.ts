import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
