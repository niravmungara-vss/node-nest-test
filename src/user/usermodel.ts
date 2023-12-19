/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class UserModel{
    id:number;
    
    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    phoneNumber:string;
}