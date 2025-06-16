import { Request, Response } from "express";
import sequelize from "../../database/connection";
import instituteRandomNumber from "../../services/randomNumber";


class InstituteController {
   static async createInstitute(req: Request, res: Response) {
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

        res.status(200).json({
            message:"institute created successfully"
        })

       }
}

const createTeacherTable=async(req:Request,res:Response)=>{
  await  sequelize.query(`
        CREATE TABLE IF NOT EXSITS teacher_${instituteRandomNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        teacherName VARCHAR(255) NOT NULL ,
        teacherEmail VARCHAR(255) NOT NULL UNIQUE,
        teacherNumber VARCHAR(255) NOT NULL UNIQUE,
        ) 
        `)
}

export default InstituteController