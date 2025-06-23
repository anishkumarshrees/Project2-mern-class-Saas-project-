import { NextFunction, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import instituteRandomNumber from "../../../services/randomNumber";

class TeacherController{
   static async createTeacher(req:IExtendedRequest,res:Response,next:NextFunction){
        const instituteNumber=req.user?.currentInstituteNumber
        const {teacherName,teacherEmail,teacherNumber,teacherExpertise,teacherQualification,joinedDate,teacherImage,salary}=req.body
        if(!teacherName||!teacherEmail||!teacherNumber||!teacherExpertise||!teacherQualification){
            return res.status(400).json({
                message:"please fill all the fields"
            })
        }

            const returnData=await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName,teacherEmail,teacherNumber,teacherExpertise,teacherQulaification,joinedDate,teacherImage,salary)VALUES(?,?,?,?,?,?,?,?)`,{
                replacements:[teacherName,teacherEmail,teacherNumber,teacherExpertise,teacherQualification,joinedDate,teacherImage,salary]

            })
            console.log(returnData)

            res.status(200).json({
                message:"teacher table created"
            })


    }

}


export default TeacherController