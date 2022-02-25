import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { project } from './project.model';

@Injectable()
export class ProjectService {
    
   
    
    constructor(
        @InjectModel('project') private readonly projectModel: Model<project>
    ) { }
    
    async findByOwnerUnpublish(body: any) {
        const result=await this.projectModel.find({ projectOwnerID: body['projectOwnerID'], projectPublishStatus:'unpublished'}).exec();
        return result;
    }
    async findByOwnerPublish(body: any) {
        const result=await this.projectModel.find({ projectOwnerID: body['projectOwnerID'], projectPublishStatus:'published'}).exec();
        return result;
    }
    async findByProjectOwnerID(body: any) {
        const result=await this.projectModel.find({ projectOwnerID: body['projectOwnerID']}).exec();
        return result;
    }

    async findByNamePublishStatus(body: any) {
        const result=await this.projectModel.findOne({ projectName: body['projectName']});
        return result['projectPublishStatus'];
    }

    async findByName(body: any) {
        const result=await this.projectModel.findOne({ projectName: body['projectName']});
        return result;
    }
    async createProject(newProject: object) {
        if (newProject["projectName"] === undefined) {
            throw new HttpException({
                "msg": "create failed: no project name field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (newProject["fundingGoal"] === undefined) {
            throw new HttpException({
                "msg": "create failed: no funding goal field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (newProject["deadline"] === undefined) {
            throw new HttpException({
                "msg": "create failed: no deadline field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
       
        try {
            const newProjectCreated = new this.projectModel(newProject);
            const result = await newProjectCreated.save();
            return {
                "status": "project creation successful",
                "projectName": result["projectName"],
                "objective": result["objective"],
                "fundingGoal": result["fundingGoal"],
            };
        }
        catch (err) {
            throw new HttpException({
                "msg": "project creation failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
