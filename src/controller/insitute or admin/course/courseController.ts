import { NextFunction, Request, Response } from "express";
import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import instituteRandomNumber from "../../../services/randomNumber";


class CourseController{
 
static async createCourse(req:IExtendedRequest,res:Response,next:NextFunction){
   const instituteUniqueNumber= req.user?.currentInstituteNumber
    // const =req.user?.currentInstituteNumber
    const{courseName,coursePrice,courseDuration,courseLevel}=req.body
      if (!instituteUniqueNumber) {
    return res.status(403).json({ message: "No institute assigned to user." });
  }
    if(!courseName||!coursePrice||!courseDuration||!courseLevel){
        return res.status(400).json({
            message:"Please fill all the fields"
        })
    }


    const returnedData=await sequelize.query(`INSERT INTO course_${instituteUniqueNumber}(courseName,coursePrice,courseDuration,courseLevel)VALUES(?,?,?,?)`,{
        replacements:[courseName,coursePrice,courseDuration,courseLevel]
    })
    
   console.log(returnedData)
   res.status(200).json({
    message:"Course created successfully"
   })
  next()

}
static async deleteCourse(req:IExtendedRequest,res:Response,next:NextFunction){
    // const instituteNumber=req.instituteNumber
    const instituteNumber=req.user?.currentInstituteNumber
    const courseId=req.params.id

    const [courseData]=await sequelize.query(`SELECT * FROM couse_${instituteNumber} WHERE id=? `,{
        replacements:[courseId]
    })
    

    if(courseData.length==0){
return res.status(400).json({
    message:"no course with that name"
})
    }

}
static async getAllCourse(req:IExtendedRequest,res:Response,next:NextFunction){
    const instituteNumber=instituteRandomNumber()
    const course=await sequelize.query(`SELECT *FROM course_${instituteNumber}`)

    res.status(200).json({
        message:"course fetched",
        data:course
})
}
static async getSingleCourse(req:IExtendedRequest,res:Response,next:NextFunction){
    const instituteNumber=instituteRandomNumber()
    const cousreId=req.params.id
    const course=await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`,{
        replacements:[cousreId]
    })
    res.status(200).json({
        message:"single course fetched",
        data:course
    })
}



}



export default CourseController