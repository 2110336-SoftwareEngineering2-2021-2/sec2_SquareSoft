import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RegistrationSystemService } from '../../src/registration-system/registration-system.service';
import { ProjectService } from '../../src/project/project.service';
import { Role } from '../enums/role.enum';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService,
            private userService: RegistrationSystemService,
            private projectService: ProjectService
            ) {}

  async sendRejectedVerificationNotification(_id) {
    const user = await this.userService.findByID(_id,Role.ProjectOwner)
    this.mailerService.sendMail({
      // to: "mondcha1507@gmail.com",
      to: user["email"],
      from: '"Support Team" <projectlauncher@squaresoft.com>', // override default from
      subject: 'Project Launcher | การกรอกข้อมูลผิดพลาด',
        text: "สวัสดีคุณ " + user["firstname"] + "\nข้อมูลที่ท่านได้กรอกมาเพื่อยืนยันตัวตนเป็นเจ้าของโครงการนั้นไม่ผ่านการตรวจสอบ\nกรุณากรอกใหม่ในระบบอีกครั้ง ", // plaintext body
    });

  }

  async sendDonateConfirmation(_id,donationDetail) {
    const user = await this.userService.findByID(_id,Role.Donator)
    
    this.mailerService.sendMail({
      // to: "mondcha1507@gmail.com",
      to: user.email,
      from: '"Support Team" <projectlauncher@squaresoft.com>', 
      subject: 'Project Launcher | ยืนยันการบริจาค',
        text: "สวัสดีคุณ " + user["firstname"]+"\nท่านได้ทำการบริจาคเงินให้กับโครงการ "+donationDetail["projectName"]+" เป็นจำนวนเงิน "+donationDetail["amount"]+" บาท", // plaintext body
    });

  }
}