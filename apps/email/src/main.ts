import { mail } from '@sse/nodemailer';

mail().then((res) => console.log(res));
