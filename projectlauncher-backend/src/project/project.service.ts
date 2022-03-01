import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { project } from './project.model';

@Injectable()
export class ProjectService {
    
    constructor(
        @InjectModel('project') private readonly projectModel: Model<project>
    ) { }
    
    async findByProjectOwnerID(query: any,projectPublishStatus:String) {
        try{
            let queryBlock={ projectOwnerID: query['projectOwnerID']}

            if(projectPublishStatus)
                queryBlock['projectPublishStatus']=projectPublishStatus
            
            const result=await this.projectModel.find(queryBlock,{projectName:1,description:1,projectPicture:1}).exec();
            return result;
        }
        catch(err){
            throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
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
