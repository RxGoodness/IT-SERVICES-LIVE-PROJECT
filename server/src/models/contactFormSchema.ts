import {model, Schema} from "mongoose";


const MessageSchema = new Schema(
    {
  name: {type: String,},
  email: { type: String},
  message: {type: String}
},
  
{timestamps: true}
);


const ContactMessages = model('ContactMessages', MessageSchema)

export default ContactMessages