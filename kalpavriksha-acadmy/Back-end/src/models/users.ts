import { Model, DataTypes } from "sequelize";
import dbConnection from "../dbConnection/dbconnection";

class UserModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: dbConnection.getSequelizeInstance(), 
    tableName: "user_table",
  }
);

export default UserModel;







    
    // @Table({
    //     timestamps:false,
    //     tableName:"user_table"
    // })


// export class User extends Model {
//     constructor(){
//         super();
//     }
//     @Column({
//         type:DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull : false,
//         primaryKey: true
//     })
//     id!:number;

//     @Column({
//         type:DataTypes.STRING,
//         allowNull : false,
//         // validate: {
//         //     isEmpty: true
//         // },
//         // defaultValue: 'abc'
//     })
//     name:string;

//     @Column({
//         type:DataTypes.STRING,
//         allowNull:false,
//         // validate: {
//         //     isEmpty: true
//         // },
//         // defaultValue: 'abc@xyz.com'
//     })
//     email:string;

//     @Column({
//         type:DataTypes.STRING,
//         allowNull:false,
//         // validate: {
//         //     isEmpty: true
//         // },
//         // defaultValue: '123456'
//     })
//     password:string;

//     @Column({
//         type:DataTypes.STRING,
//         allowNull:false,
//         // validate: {
//         //     isEmpty: true
//         // },
//         // defaultValue: 'abc'
//     })
//     role:string;
// }
