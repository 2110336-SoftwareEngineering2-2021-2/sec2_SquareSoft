import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true, unique: true },
  objective: { type: String, required: true },
  description: { type: String, required: true },
  fundingType: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Date, required: true },
  fundingGoal: { type: Number, required: true },
  fundingMoneyStatus: { type: Number, required: true },
  projectOwnerID: { type: String, required: true },
  projectPicture: { type: String, required: true },
  projectVideo: { type: String, required: true },
  projectPublishStatus: { type: String, required: true },
  progress: { type: Number, required: true, default: 0 },
  withdrawnAmount: { type: Number, required: true, default: 0 },
});

export interface project{
  projectName: string;
  objective: string;
  description: string;
  fundingType: string;
  category: string;
  deadline: string;
  fundingGoal: number;
  fundingMoneyStatus: number;
  projectOwnerID: string;
  projectPicture: string;
  projectPublishStatus: string;
  progress: number;
  withdrawnAmount: number;
}

