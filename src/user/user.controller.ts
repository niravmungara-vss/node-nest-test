/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put, Req } from "@nestjs/common";
import { NOTFOUND } from "dns";
import { Request } from "express";
import { UserModel } from "./usermodel";

@Controller('user')
export class UserController {
    userList: Array<UserModel>;

    constructor() {

    }

    @Get('getall')
    GetAll() {
        this.userList?.forEach(t => delete t.password)
        return this.userList;
    }

    @Get('getbyid/:id')
    GetById(@Req() req: Request) {
        console.log(req.body)
        const _user = this.userList.find(t => t.id == parseInt(req.params.id));

        if (!_user) {
            return NOTFOUND;
        }
        return _user;
    }

    @Post('add')
    Add(@Body() userModel: UserModel) {
        if (!this.userList) {
            this.userList = new Array<UserModel>();
        }

        userModel.id = this.userList.length + 1;
        this.userList.push(userModel);
        return userModel;
    }

    @Put('update')
    Update(@Body() userModel: UserModel) {
        const _user = this.userList.find(t => t.id === userModel.id);

        if (!_user) {
            return NOTFOUND;
        }
        Object.assign(this.userList.find(t => t.id === userModel.id), userModel);
        return _user;
    }


    @Delete('delete/:id')
    Delete(@Req() req: Request) {
        this.userList = this.userList?.filter(t => t.id != parseInt(req.params.id))
        return { Message: "Delete success" };
    }

}