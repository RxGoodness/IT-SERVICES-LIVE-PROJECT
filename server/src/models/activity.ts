// import { required, string } from 'joi';
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
     {
        message: String,
        author:String,
        authorActivityTitleOrName: String,
        authorActivityID: String,
        username: String,
        name: String
                    // required: [true, "Enter valid activity"]              
    },
//     {
//     title:{
//         type:String,
//         required:true
//     },
//     name: {
//       type: String,
//       required: true   
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     userID:{
//         type:Schema.Types.ObjectId,
//         required:true,
//         ref:'Users',
//     },
//     jobID:{
//         type:Schema.Types.ObjectId,
//         required:true,
//         ref:'Jobs'
//     },
//     coverletter:{
//         type:String,
//         required:[false,'Cover letter may be required']
//     }, 
//     resume: { type: String, required:false}
// },{
    {
        timestamps: {
    createdAt: true, 
    // don't add createdAt attribute
    updatedAt: false}
    }
)

//export const ActivityModel = model<any>('Activity',schema)
const Activity = mongoose.model("Activity", schema);
export default Activity;
