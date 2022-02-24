import { Body, Controller, Post } from '@nestjs/common';
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

}
