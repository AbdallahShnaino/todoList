import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  ownerId: String;

  @Prop({ required: true })
  title: String;

  @Prop({ required: false })
  locLongitude: Number;

  @Prop({ required: false })
  locLatitude: Number;

  @Prop({ required: true })
  description: String;

  @Prop({ required: false })
  type: String;

  @Prop({ required: true })
  startingAt: Date;

  @Prop({ required: true })
  finishedAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  users: User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
