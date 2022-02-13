import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hashpassword: { type: String, required: true },
   
  });
  
  export interface Admin{
      username: string;
      hashpassword: string;
    
  }