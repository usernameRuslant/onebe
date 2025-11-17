import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
//создание индекса для сохр рецептов
userSchema.index({ savedRecipes: 1 });

//хук для подмены имени если оно не указано
userSchema.pre('save', function (next) {
  if (!this.name) {
    this.name = this.email;
  }
  next();
});
//скрываем пароль при возврате через API
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
