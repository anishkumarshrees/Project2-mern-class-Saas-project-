import {Table,Column,Model,DataType, PrimaryKey, AllowNull} from "sequelize-typescript"


@Table({
    tableName: "users", //phpadmin maa dekhiney table ko name
    modelName:"user",  //project vitra mathi ko table lai access garney name
    timestamps : true
})

class User extends Model{
    @PrimaryKey
    @Column({
       
        type:DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id : string
    @Column({
            type :DataType.STRING
         
    })
    declare username : string

    @Column({
        type: DataType.STRING
    })
    declare password:string

    @Column({
        type: DataType.STRING,
       
            
    })
    declare email:string
    
    @Column({
        type:DataType.ENUM('super-admin','teacher','institute','student'),
        defaultValue:'student'
    })
    declare role:string

    @Column({
        type:DataType.STRING,
      
    })
    declare currentInstituteNumber:String

}
export default User