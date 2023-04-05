import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: any = {
  transport: {
    host: 'smtp.poczta.onet.pl',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.PASSWORD,
    },
  },
  defaults: {
    from: '"Adminisjtracja serwisu" <kacper4312@op.pl>',
  },
  template: {
    dir: process.cwd() + '/template/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
