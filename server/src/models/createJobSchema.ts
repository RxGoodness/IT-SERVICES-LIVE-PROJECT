import {model, Schema} from "mongoose";

const createJobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true,
        select: false
    },
    location: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true,
        enum: {
            values: ['Full-time', 'Part-time', 'Internship'],
            message: 'employmentType must be one of the following: Full-time, Part-time, Internship.'
        }
    },
    description: {
        type: String
    }
}, {timestamps: true});

const CreateJob = model('CreateJob', createJobSchema);
export default CreateJob;