import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';

class Mail {
  constructor(){
    const { host, port, secure, auth }= mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth : auth.user ? auth : null
    });
  }
  sendMail(message){
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();