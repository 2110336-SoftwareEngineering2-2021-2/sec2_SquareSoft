import { Body, Controller, Get, Post ,UseGuards,Query,Req, ConsoleLogger} from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { ProjectService } from './project.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"

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


