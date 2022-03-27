import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    async findByNameAndCat(query: any){
        // Check for empty query string
        if (Object.keys(query).length === 0)
          throw new BadRequestException(
            "Please provide both projectName and category."
          );

        const projectName = query["projectName"];
        const category = query["category"];

        // Check for empty projectName and projectCategory
        if (
          !projectName ||
          !category ||
          projectName.length === 0 ||
          category.length === 0
        )
          throw new BadRequestException(
            "Please provide both projectName and category."
          );

        // let projectName = "";
        // let category = "fail";
        // category = query["category"];
        // try {
        //   projectName = query["projectName"];
        // } catch(e){
        //     console.log(e);
        // }

        // try {
        //   category = query["category"];
        // } catch(e){
        //     console.log(e);
        // }

        console.log(projectName);
        console.log("--------------------")
        console.log(category);
        console.log(query)
        // console.log("********************")
        // console.log(query["projectName"])
        // console.log("--------------------")
        // console.log(query["category"])

        const result = "success";
        // const result = await this.projectModel.find({projectName: query['projectName'], category: query['category']})
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
