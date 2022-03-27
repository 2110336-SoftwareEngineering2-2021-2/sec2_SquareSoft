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

    async findByNameAndCat(dto: any){
        // Check for empty body
        if (Object.keys(dto).length === 0)
            throw new BadRequestException(
            "Please provide projectName and category."
            );

        const projectName = dto["projectName"];
        const fundingType = dto["fundingType"];
        const category = dto["category"];
        const projectPublishStatus = dto["projectPublishStatus"];

        // Check for empty projectName or category
        if (
            !projectName ||
            !category ||
            !fundingType ||
            !projectPublishStatus ||
            projectName.length === 0 ||
            category.length === 0 ||
            fundingType.length === 0 ||
            projectPublishStatus.length === 0
        )
            throw new BadRequestException(
            "Please provide projectName and category."
            );

        // Query database with regular expression
        const result = await this.projectModel.find({
            projectName: { $regex: projectName, $options: "i" },
            category: category,
            fundingType: { $in: fundingType },
            projectPublishStatus: { $in: projectPublishStatus },
        });

        if (result.length === 0) throw new NotFoundException();
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
