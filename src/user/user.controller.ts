/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { UserModel } from "./usermodel";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    userList: Array<UserModel>;

    constructor(private userService: UserService) {

    }

    @Get('getall')
    async GetAll() {
        this.userList = await this.userService.GetAll();
        this.userList?.forEach(t => delete t.password)
        return this.userList;
    }

    @Get('getbyid/:id')
   async GetById(@Req() req: Request) {
        const _user = await this.userService.GetById(parseInt(req.params.id));
        if (!_user) {
            return { error: 'User not found' };
        }
        return _user;
    }

    @Post('add')
    async Add(@Body() userModel: UserModel) {
        const user = await this.userService.Insert(userModel);
        return user;
    }

    @Put('update')
    async Update(@Body() userModel: UserModel) {
        const _user = await this.userService.Update(userModel);
        return _user;
    }


    @Delete('delete/:id')
   async Delete(@Req() req: Request) {
        await this.userService.Delete(parseInt(req.params.id))
        return { Message: "Delete success" };
    }

}