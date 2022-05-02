import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RegistrationSystemService } from 'src/registration-system/registration-system.service';
import { Role } from '../enums/role.enum';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService,private userService: RegistrationSystemService) {}

  async sendRejectedVerificationNotification(_id) {
    const user = await this.userService.findByID(_id,Role.ProjectOwner)
    await this.mailerService.sendMail({
      // to: "mondcha1507@gmail.com",
      to: user["email"],
      from: '"Support Team" <projectlauncher@squaresoft.com>', // override default from
      subject: 'Project Launcher | การกรอกข้อมูลผิดพลาด',
        text: "สวัสดีคุณ " + user["firstname"] + "\nข้อมูลที่ท่านได้กรอกมาเพื่อยืนยันตัวตนเป็นเจ้าของโครงการนั้นไม่ผ่านการตรวจสอบกรุณากรอกใหม่ในระบบอีกครั้ง ", // plaintext body
    });

  }

  async sendDonateConfirmation(emailDetail) {

    await this.mailerService.sendMail({
      // to: "mondcha1507@gmail.com",
      to: emailDetail.email,
      from: '"Support Team" <projectlauncher@squaresoft.com>', 
      subject: 'Project Launcher | ยืนยันการบริจาค',
        text: "สวัสดีคุณ" + emailDetail["name"]+"\nท่านได้ทำการบริจาคเงินให้กับโครงการ "+emailDetail["projectName"]+" เป็นจำนวนเงิน "+emailDetail["amount"]+" บาท", // plaintext body
    });

  }
}