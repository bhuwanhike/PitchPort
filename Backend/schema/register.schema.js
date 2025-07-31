import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["investor", "startup"],
    default: "investor",
  },
});

// Define methods on the schema
RegisterSchema.methods = {
  async hashPassword() {
    const newpass = await bcrypt.hash(this.password, 10);
    this.password = newpass;
    return this.password;
  },
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  },
  async generateToken() {
    return await jwt.sign(
      {
        id: this._id.toString(),
        email: this.email,
        role: this.role,
        username: this.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  },
};

// Use pre-save middleware to hash password before saving
RegisterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await this.hashPassword();
  next();
});

const User = mongoose.model("User", RegisterSchema);

export default User;
