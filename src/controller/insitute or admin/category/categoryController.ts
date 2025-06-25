import { NextFunction, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";

import { QueryTypes } from "sequelize";
 

 class CategoryController{
   static async createCategory(req:IExtendedRequest,res:Response,next:NextFunction){
    const instituteNumber = req.user?.currentInstituteNumber
    const {categoryName,categoryDescription}=req.body
    if(!categoryName||!categoryDescription){
        return res.status(400).json({
            message:"please provide full details"
        })
    }
    await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`,{
        replacements:[categoryName,categoryDescription]
    })
    res.status(200).json({
        message:"category created successfully"
    })
   }

   static async getCategory(req:IExtendedRequest,res:Response,next:NextFunction){
    const instituteNumber=req.user?.currentInstituteNumber
    const categories=await sequelize.query(`SELECT * FROM category_${instituteNumber}`,{
        type:QueryTypes.SELECT
    })
    res.status(200).json({
        message:"category fetched",
        data:categories
    })
    next()
   }
   static async deletCategory(req:IExtendedRequest,res:Response,next:NextFunction){
    const instituteNumber=req.user?.currentInstituteNumber
    const id = req.params.id
    const categories=await sequelize.query(`DELETE FROM * category_${instituteNumber} WHERE id =?`,{
        replacements:[id]
    })
    res.status(200).json({
        message:"category deleted successfully",
        data:categories
    })
    
   }
 }
 export default CategoryController