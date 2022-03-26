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

    async updateProject(user: Object, projectID: string, progress: number){
        let project = await this.findProjectByID(projectID, user["userID"]);
        project.progress = progress;
        let result = await project.save();
        return {
            "status": "progress updated",
            "progress": result.progress
        };
    }

    async getProjectProgress(user: Object, projectID: string){
        let project = await this.findProjectByID(projectID, user["userID"]);
        return {
            "projectID": project._id,
            "progress": project.progress
        };
    }

    async findProjectByID(projectID: string, ownerID: string|undefined = undefined){
        let project = undefined
        try{
            project = await this.projectModel.findById(projectID);
        }
        catch(err){
            throw new HttpException({
                "msg": "invalid projectID"
            }, HttpStatus.BAD_REQUEST);
        }
        if ( project === null ){
            throw new HttpException({
                "msg": "project with this projectID is not found"
            }, HttpStatus.NOT_FOUND);
        }
        if ( ownerID )
        {
            if ( project.projectOwnerID !== ownerID ){
                throw new HttpException({
                    "msg": "this user has no permission on this project"
                }, HttpStatus.FORBIDDEN);
            }
        }
        return project;
    }
}