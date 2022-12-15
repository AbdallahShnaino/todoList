import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  locLongitude: number;

  @Prop({ required: false })
  locLatitude: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: true })
  startingAt: Date;

  @Prop({ required: true })
  finishedAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
