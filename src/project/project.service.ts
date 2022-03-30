import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditProjectField } from './project.dto';
import { project } from './project.model';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('project') private readonly projectModel: Model<project>
    ) { }

    async findRecommendedProject() {
        return this.projectModel.aggregate([{ $match: {"projectPublishStatus":"published"}},{ $sample: { size: 5 } }])
    }

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
        const result = await this.projectModel.find({projectPublishStatus: status}, "projectName description projectPicture");
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

    async findByIdPublishStatus(body: any) {
        const result=await this.projectModel.findOne({ _id: body['_id']});
        return result['projectPublishStatus'];
    }

    async findByName(body: any) {
        const result=await this.projectModel.findOne({ projectName: body['projectName']});
        return result;
    }

    async findByNameAndCat(body: any){
        // Check for empty body
        if (Object.keys(body).length === 0)
            throw new BadRequestException(
            "Please provide projectName and category."
            );

        const projectName = body["projectName"];
        const fundingType = body["fundingType"];
        const category = body["category"];
        const projectPublishStatus = body["projectPublishStatus"];

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
        const result = await this.projectModel.find(
            {
            projectName: { $regex: projectName, $options: "i" },
            category: category,
            fundingType: fundingType,
            projectPublishStatus: projectPublishStatus,
            },
            "projectName description projectPicture"
        );

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

    async updateProject(user: Object, projectID: string, progress: number){
        let project = await this.findProjectByID(projectID, user["userID"]);
        project.progress = progress;
        let result = await project.save();
        return {
            "status": "progress updated",
            "progress": result.progress
        };
    }

    async getProjectProgress(projectID: string){
        let project = await this.projectModel.findById(projectID);
        if(project["progress"] === undefined) throw new HttpException({ "msg": "invalid progress" }, HttpStatus.BAD_REQUEST);
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

    private editableFields = ['projectName', 'objective', 'description', 'fundingType', 'category', 'deadline', 'fundingGoal', 'projectOwnerID', 'projectPicture']

    async editProject(user: Object, projectID: string, fields: EditProjectField){
        let project = await this.findProjectByID(projectID, user["userID"]);
        for(let [field, value] of Object.entries(fields)){
            if(!this.editableFields.includes(field)){
                throw new HttpException({
                    "msg": `editing '${field}' is not allow`
                }, HttpStatus.FORBIDDEN);
            }
            project[field] = value;
        }
        let result = await project.save()
        return result;
    }
}
