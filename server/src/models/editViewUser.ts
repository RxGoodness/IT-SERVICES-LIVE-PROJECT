import mongoose from 'mongoose';
const { Schema, model } = mongoose;


interface Profile extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    about?: string;
    imageUrl: string;
}


// USER SCHEMA

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, "First name is required"],
        minLength: 2
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
        minLength: 2
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "A valid email address is required"],
        unique: true
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minLength: 2
    },
    about: {
        type: String,
        minLength: 2
    },
    imageUrl: {
        required: [true, "Please Upload an Image"],
        type: String
    }
},
{
    timestamps: true
})

// USER MODEL

const User = model<Profile>('User', UserSchema);


export default User;