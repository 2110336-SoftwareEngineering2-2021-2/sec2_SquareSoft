import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    projectID: { type: String, required: true },
    text: { type: String, required: true },
    star: { type: Number, required: true },
});

export interface review{
  userID: string;
  projectID: string;
  text: string;
  star: number;
}

