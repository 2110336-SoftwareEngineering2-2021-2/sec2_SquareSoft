import * as mongoose from 'mongoose';

export const UserDonatorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashpassword: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  bankAccountFirstname: { type: String, required: true },
  bankAccountLastname: { type: String, required: true },
  bankAccountNumber: { type: String, required: true, unique: true },
  bankAccountBank: { type: String, required: true },
});

export interface userDonator{
    username: string;
    hashpassword: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    email: string;
    bankAccountFirstname: string;
    bankAccountLastname: string;
    bankAccountNumber: string;
    bankAccountBank: string;
}