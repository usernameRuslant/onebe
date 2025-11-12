import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, unique: true, required: true },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};

const User = model('user', userSchema);
export default User;
