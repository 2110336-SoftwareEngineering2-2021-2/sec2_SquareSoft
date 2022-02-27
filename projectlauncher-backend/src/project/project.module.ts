import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.model';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'project', schema: ProjectSchema}
    ])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
