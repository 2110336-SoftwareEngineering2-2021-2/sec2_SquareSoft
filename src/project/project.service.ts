import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { project } from './project.model';

@Injectable()
export class ProjectService {
    
    
    
    constructor(
        @InjectModel('project') private readonly projectModel: Model<project>
    ) { }
    async editStatus(query: any) {
        const result = await this.projectModel.findOne({ _id: query['_id'] });
        if(!result)
            throw new HttpException({"msg": "project not found"
            }, HttpStatus.FORBIDDEN);

        
        const update = { projectPublishStatus: query['status'] };
        const result2=await result.updateOne(update);
        if(!result2)
            throw new HttpException({"msg": "cannot update status"
            }, HttpStatus.FORBIDDEN);
        return result2;
        

      
    }
    async findByStatus(status: String) {
        const result=await this.projectModel.find({projectPublishStatus: status});
        return result;

    }
    async deleteProjectById(query: any) {

            console.log(query)
            
            const result=await this.projectModel.findOne({ _id: query['_id']});
    
            if(!result)
            throw new HttpException({"msg": "project not found"
            }, HttpStatus.FORBIDDEN);

            const result2=await result.remove()
            if(!result2)
            throw new HttpException({"msg": "cannot delete project"
            }, HttpStatus.FORBIDDEN);

            return result2;
    
           
        
         
    }  
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

    async findByIdPublish(query: any) {

        try{
        const result=await this.projectModel.findOne({ _id: query['_id']});

        if(result.projectPublishStatus!=="published")
        throw new HttpException({"msg": "you cannot see unpublished project"
        }, HttpStatus.FORBIDDEN);

        return result;

        }
        catch(e)
        {
            return {data:undefined}
        }
        
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
