import { Request, Response} from "express";
// import bcrypt from "bcryptjs";
// import { changePasswordType, changePasswordValidator } from "../config/admin.validator";
// import Admin from "../models/admin.schema"



const changePassword = async (_req: Request, _res: Response) => {
    // const data: changePasswordType = req.body
    // //  validate password entry
    // await changePasswordValidator.validateAsync(data)
    // const isAdmin = await Admin.findOne({email: req.user.email});
    // // check if userlogged in isAdmin
    // if(req.user !== isAdmin) {
    //     throw new Error('you are not authorized')
    // } 
    // try {
    //     const {currentPassword, newPassword, confirmPassword } = data;
    //     const validateCurrentPassword = await bcrypt.compare(currentPassword, isAdmin.password);
   
    // if(validateCurrentPassword && (newPassword === confirmPassword)){
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    //     await Admin.findOneAndUpdate({req.user, { $set: { password: hashedNewPassword }}, {new: true})
    //     res.status(200).json("Password changed successfully")
    //  }  
    // } catch (error) {
    //     res.status(400).json("Error updating password")
    // }


}

export default changePassword