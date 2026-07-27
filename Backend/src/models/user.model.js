import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            lowercase: true,
            trim: true,
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User',UserSchema);
export default User;