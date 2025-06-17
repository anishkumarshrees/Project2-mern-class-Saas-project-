import { NextFunction, request, Request, response, Response } from "express";
import sequelize from "../../database/connection";
import instituteRandomNumber from "../../services/randomNumber";
import { IExtendedRequest } from "../../middleware/type";
import User from "../../database/models/usermodel";


class InstituteController {
   static async createInstitute(req: IExtendedRequest, res: Response,next:NextFunction) {
        const { instituteName, instituteEmail, instituteNumber, instituteAddress } = req.body
       const instituteVatNo = req.body.instituteVatNo || null
       const institutePanNo = req.body.institutePanNo || null
       if(!instituteName || !instituteEmail || !instituteNumber ||!instituteAddress){
        res.status(400).json({
            message:"please provide all details"
        })
        return
       }
    //sabai details aayo vani - institute create garna paryo

       //random number generate gareko services maa xa
    const instituteUniqueNumber = instituteRandomNumber()

  await  sequelize.query(
        `CREATE TABLE IF NOT EXISTS institute_${instituteUniqueNumber} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        instituteName VARCHAR(255) NOT NULL ,
        instituteEmail VARCHAR(255) NOT NULL UNIQUE,
        instituteNumber VARCHAR(255) NOT NULL UNIQUE,
        instituteAddress VARCHAR(255) NOT NULL,
        instituteVatNo VARCHAR(255) ,
        institutePanNo VARCHAR(255) ,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`)
        await sequelize.query(`INSERT INTO institute_${instituteUniqueNumber}( instituteName, instituteEmail,instituteNumber,instituteAddress, instituteVatNo,institutePanNo )VALUES(?,?,?,?,?,?)`,{
            replacements : [instituteName,instituteEmail,instituteNumber,instituteAddress,institutePanNo,instituteVatNo]
        })
        
        await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          userId VARCHAR(255) REFERENCES users(id),
          instituteNumber INT UNIQUE
          
          )`)
          


          if(req.user){
          req.instituteNumber=instituteUniqueNumber
          await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,{
            replacements : [req.user.id,instituteUniqueNumber]
          })
          
        const result =  await User.update({
            currentInstituteNumber:instituteNumber,
            role:'institute'
          },{
            where:{
              id:req.user.id
            }
          })
          next()
         
        }
        req.instituteNumber=instituteNumber
       
        
       }


       //table for teacher
    static async createTeacherTable(req: IExtendedRequest, res: Response,next:NextFunction) {
         const instituteUniqueNumber = req.instituteNumber
    

      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS teacher_${instituteUniqueNumber} (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          teacherName VARCHAR(255) NOT NULL,
          teacherEmail VARCHAR(255) NOT NULL UNIQUE,
          teacherNumber VARCHAR(255) NOT NULL UNIQUE
        )
      `);

      next()
      res.status(201).json({ message: `Teacher table teacher_${instituteUniqueNumber} created successfully.` });
    } 



    //Student table
    static async createStudentTable(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteUniqueNumber = req.instituteNumber
      await sequelize.query(`
          CREATE TABLE IF NOT EXISTS student_${instituteUniqueNumber}(
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          studentName VARCHAR(255) NOT NULL,
          studentEmail VARCHAR(255) NOT NULL UNIQUE,
          studentNumber VARCHAR(255) NOT NULL UNIQUE
          )
        `)
        next()
    }

    //course table
    static async createCourseTable(req:IExtendedRequest,res:Response,next:NextFunction){
      const instituteUniqueNumber = req.instituteNumber
      await sequelize.query(`
          CREATE TABLE IF NOT EXISTS course_${instituteUniqueNumber}(
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          courseName VARCHAR(255) NOT NULL,
          coursePrice VARCHAR(255) NOT NULL
          )
        `)
        next()
    }

  }




 

export default InstituteController