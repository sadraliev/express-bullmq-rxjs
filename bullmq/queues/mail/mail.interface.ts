export interface Mail {
  from: string;
  to: string;
  subject: string;
  text: string;
}
export const MAIL_QUEUE = "mailerQueue";
export const MailjobType = { mailProcess: "mail-process" } as const;
export type MailTypeValues = (typeof MailjobType)[keyof typeof MailjobType];
