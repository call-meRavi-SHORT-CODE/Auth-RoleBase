import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
    designation: { type: String, default: '' },
    department: { type: String, default: '' },
    contactNumber: { type: String, default: '' },
    joiningDate: { type: Date, default: Date.now },
    profilePhoto: { type: String, default: '' },
    googleId: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;