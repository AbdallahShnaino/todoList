import { addListener } from 'process';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Length,
  AllowNull,
  AutoIncrement,
  BeforeUpdate,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
  Default,
  AfterUpdate,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({ timestamps: true })
export class Task extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Length({ max: 50, min: 5 })
  @Column({ allowNull: false })
  title: string;

  @Column({ type: 'text', allowNull: false })
  description: string;

  @Default(false)
  @Column
  status: boolean;

  @Column({ type: 'timestamp', allowNull: true })
  determinedAt: Date;

  @BeforeCreate
  static changeDeletedAtValue(instance: User) {
    instance.createdAt = new Date();
  }

  @BeforeUpdate
  static changeUpdatedAtValue(instance: User) {
    instance.updatedAt = new Date();
  }
}
/*
INSERT INTO Tasks (userId,title,description) VALUES (1,'Meet ahmed','quickly!');

*/
