import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';
import { EmailController } from './email.controller';
import { RegistrationSystemModule} from 'src/registration-system/registration-system.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    RegistrationSystemModule,
    ProjectModule,
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'squaresoftse2@gmail.com',
          pass: 'password&1',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    //   template: {
    //     dir: join(__dirname, 'templates'),
    //     adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    //     options: {
    //       strict: true,
    //     },
    //   },
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService], // 👈 export for DI

})
export class EmailModule {}