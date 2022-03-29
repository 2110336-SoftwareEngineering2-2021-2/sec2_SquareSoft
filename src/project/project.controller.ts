import { Body, Controller, Get, Post ,UseGuards,Query,Req, Put, Patch, Request, Param} from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { ProjectService } from './project.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { EditProjectDTO, UpdateProjectDTO } from './project.dto';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService ){}
    @Post('create')
    async createProject(@Body() newProject) {
      
        const results=this.projectService.createProject(newProject);
        
        return results;
    }

    @Get('find-by-owner-publish')
    async findByOwnerPublish(@Query() query) {
        const results=await this.projectService.findByProjectOwnerID(query,"published");
        return results;
    }

    @UseGuards(RoleGuard.ProjectOwnerGuard)
    @Get('find-by-owner')
    async findByOwnerId(@Req() req: any) {
        const query= {projectOwnerID:req.user._id}
        const results=await this.projectService.findByProjectOwnerID(query,null);
        return results;
    }

    @Get('find-publish-status-by-name')
    async findByNamePublishStatus(@Query () query) {
        const results=this.projectService.findByNamePublishStatus(query);
        return results;
    }

    @Get('find-by-id')
    async findByIdPublish(@Query () query) {
        const results=this.projectService.findByIdPublish(query);
        return results;
    }

    @Get('find-by-name')
    async findByName(@Query () query) {
        const results=this.projectService.findByName(query);
        return results;
    }

    @Patch('update-project')
    @UseGuards(RoleGuard.ProjectOwnerGuard)
    async updateProject(@Body() body: UpdateProjectDTO, @Request() req: Request){
        let user = {username: req["user"]["username"], role: req["user"]["role"], userID: req["user"]["_id"]};
        return await this.projectService.updateProject(user, body.projectID, body.progress);
    }

    @Get('project-progress/:id')
    async getProjectProgress(@Param('id') id){
        return await this.projectService.getProjectProgress(id);
    }
    
    @Patch('edit-project')
    @UseGuards(RoleGuard.ProjectOwnerGuard)
    async editProject(@Body() body: EditProjectDTO, @Request() req: Request){
        let user = {username: req["user"]["username"], role: req["user"]["role"], userID: req["user"]["_id"]};
        return await this.projectService.editProject(user, body.projectID, body.fields);
    }
    
    @Post('find-by-name-and-cat')
    async findByNameAndCat(@Body () dto){
        const results=this.projectService.findByNameAndCat(dto);
        return results;
    }

}


