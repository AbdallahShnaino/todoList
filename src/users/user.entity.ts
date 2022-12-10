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
  HasMany,
} from 'sequelize-typescript';
import { Event } from '../events/event.entity';
@Table({ timestamps: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @ForeignKey(() => Event)
  @Column
  id: number;

  @Length({ max: 50, min: 5 })
  @Column({ allowNull: false })
  fullName: string;

  @Length({ max: 50, min: 5 })
  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @BeforeCreate
  static changeCreatedAtValue(instance: User) {
    instance.createdAt = new Date();
  }

  @BeforeUpdate
  static changeUpdatedAtValue(instance: User) {
    instance.updatedAt = new Date();
  }

  @HasMany(() => Event, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  events: Event[];
}
