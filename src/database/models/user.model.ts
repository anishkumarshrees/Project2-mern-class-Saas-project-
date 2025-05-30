import {Table,Column,Model,DataType, PrimaryKey} from "sequelize-typescript"


@Table({
    tableName: "users", //phpadmin maa dekhiney table ko name
    modelName:"user",  //project vitra mathi ko table lai access garney name
    timestamps : true
})

class user extends Model{
    @Column({
        primaryKey:true,
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
        // defaultvalue:'student'
    })
    declare role:string

}
export default user