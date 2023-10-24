import mongoose, { Schema, Document } from 'mongoose';

// Define the User schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: String,
    unique: true, 
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  userID: string;
  username: string;
  password: string;
}

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
