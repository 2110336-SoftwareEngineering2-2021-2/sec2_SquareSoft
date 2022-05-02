import { Body, Controller, Get, Post ,UseGuards,Query,Req, Delete, Patch, Request, Param} from '@nestjs/common';
import { ProjectService } from './project.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { EditProjectDTO, UpdateProjectDTO ,FindProjectByOwnerDTO} from './project.dto';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiParam,
    ApiBody,
    ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiNotFoundResponse
  } from "@nestjs/swagger"

@ApiTags("project")
@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService ){}
    @Post('create')
    async createProject(@Body() newProject) {
      
        const results=this.projectService.createProject(newProject);
        
        return results;
    }

    @ApiQuery({ name: "projectOwnerID", type: String, required: true })
    @ApiOkResponse({ description: "Return list of published project with id of owner = query.projectOwnerID",type:FindProjectByOwnerDTO})
    @Get('find-by-owner-publish')
    async findByOwnerPublish(@Query() query) {
        const results=await this.projectService.findByProjectOwnerID(query,"published");
        return results;
    }
    
    @ApiOkResponse({ description: "Return list of project with id of owner = id of request owner",type:FindProjectByOwnerDTO})
    @UseGuards(RoleGuard.ProjectOwnerGuard)
    @Get('find-by-owner')
    async findByOwnerId(@Req() req: any) {
        const query= {projectOwnerID:req.user._id}
        const results=await this.projectService.findByProjectOwnerID(query,null);
        return results;
    }

    @UseGuards(RoleGuard.AdminGuard)
    @Get('find-publish-status-by-id')
    async findByIdPublishStatus(@Query () query) {
        const results=this.projectService.findByIdPublishStatus(query);
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

    // @UseGuards(RoleGuard.ProjectOwnerGuard) 
    @Delete('delete-by-id')
    async deleteProjectById(@Query () query) {
        const results=await this.projectService.deleteProjectById(query);
        return results;
    }

    @UseGuards(RoleGuard.AdminGuard)
    @Get('find-by-unpublish')
    async findByUnpublish() {
        const results=await this.projectService.findByStatus("unpublished");
        return results;
    }

    @Post('edit-status')
    async editStatus(@Query () query) {
        const results=await this.projectService.editStatus(query);
        return results;
    }

    @Get('find-recommended-project')
    async findRecommendedProject() { 
        const results=await this.projectService.findRecommendedProject();
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
