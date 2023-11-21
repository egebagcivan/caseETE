import mongoose, { Document, Schema, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 6;

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profile: mongoose.Types.ObjectId;

  comparePassword: (tryPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, lowercase: true },
    password: String,
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.comparePassword = async function (
  tryPassword: string
): Promise<boolean> {
  return bcrypt.compare(tryPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
