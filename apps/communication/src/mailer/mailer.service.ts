import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { MailerRepository } from './mailer.repository';


@Injectable()
export class MailerService {
  constructor( protected readonly mailerRepository: MailerRepository, private readonly mailService:MailerService ){}

  async plainTextEmail(sendMailDto:any) {
    const {to,from,subject,template,html,context,attachments} = sendMailDto;
    return await this.mailService.sendMail({
      to,
      from,
      subject,
      text: 'WElcome to nknJ',
      
    });
  }

  async hmtlEmail(sendMailDto:any) {
    const {to,from,subject,template,html,context,attachments} = sendMailDto;
    return await this.mailService.sendMail({
      to,
      from,
      subject,
      template,
      html,
      context:{
        [context.template]: context.data
      },
      
    });
  }

  async fileAttachment(sendMailDto:any) {
    const {to,from,subject,template,html,context,attachments} = sendMailDto;
    return await this.mailService.sendMail({
      to,
      from,
      subject,
      html,
      template,
      context:{
        [context.template]: context.data
      },
      attachments:{
        path,
        filename:'',
        contentDisposition: 'attachment'
      }
      
    });
  }

 
  async findMailer(query: any): Promise<mailer> {
    try {
      return await this.mailerRepository.find({
        where: query,
        // include: { profile: true, roles: true, refreshTokens: true },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async findAllMailers(query: any): Promise<mailer[]> {
    try {
      return await this.mailerRepository.findMany(query);
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async createMailer(createmailerData: CreatemailerDto): Promise<mailer> {
    const { firstName, lastName, mailername, email, password, confirmPassword } =
      createmailerData;

      const mailerData = {
      
      };
      // delete mailerData.confirmPassword;
try {
      const newmailer = this.mailerRepository.create({ data: mailerData });
      //  delete newmailer.password;
      this.eventEmitter.emit('mailer-created', newmailer);
      Logger.debug(newmailer);
      return newmailer;
    } catch (error) {
      Logger.log(error);
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async updatemailer(updatemailerData: UpdateDto) {
    Logger.debug(updatemailerData);
    try {
      return await this.mailerRepository.update({
        where: { id: updatemailerData?.id },
        data: updatemailerData?.data,
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async upsertmailer(updatemailerData: UpdateDto) {
    Logger.debug(updatemailerData);
    try {
      return await this.mailerRepository.upsert({
        where: { id: updatemailerData?.id },
        data: updatemailerData?.data,
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async removemailer(findmailerDto: FindOneDto): Promise<mailer> {
    try {
      return await this.mailerRepository.delete({
        where: { id: findmailerDto.id },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

}
