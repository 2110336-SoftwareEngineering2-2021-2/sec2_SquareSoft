import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  notificationType: { type: String, required: true},
  owner: { type: String, required: true },
  text: { type: String, required: true },
});

export interface notification{
  notificationType: string,
  owner: string,
  text: string
}

