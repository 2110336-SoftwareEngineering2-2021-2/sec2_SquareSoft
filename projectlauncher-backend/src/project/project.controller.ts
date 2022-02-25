import { Body, Controller, Get, Post } from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService ){}
    @Post('create')
    async createProject(@Body() newProject) {
      
        const results=this.projectService.createProject(newProject);
        
        return results;
    }

    @Get('find-by-owner')
    async findByProjectOwnerID(@Body () body) {
        const results=this.projectService.findByProjectOwnerID(body);
        return results;
    }

    @Get('find-by-owner-publish')
    async findByOwnerPublish(@Body () body) {
        const results=this.projectService.findByOwnerPublish(body);
        return results;
    }

    @Get('find-by-owner-unpublish')
    async findByOwnerUnpublish(@Body () body) {
        const results=this.projectService.findByOwnerUnpublish(body);
        return results;
    }

    @Get('find-publish-status-by-name')
    async findByNamePublishStatus(@Body () body) {
        const results=this.projectService.findByNamePublishStatus(body);
        return results;
    }

    @Get('find-by-name')
    async findByName(@Body () body) {
        const results=this.projectService.findByName(body);
        return results;
    }

    

    

    

}


