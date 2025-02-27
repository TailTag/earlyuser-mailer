import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { subject, htmlContent } from "./config";
import getEarlyUserEmails from "./fetchEarlyUsers";

// Load env vars
dotenv.config();
const { GMAIL_USER, GMAIL_PASS, SEND_AS_EMAIL } = process.env;

/**
 * Sends an email to the recipient with the given subject and HTML content.
 *
 * @param to - The email address of the recipient.
 * @param subject - The subject of the email.
 * @param html - The HTML content of the email.
 */
async function sendEmail(to: string, subject: string, html: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `TailTag <${SEND_AS_EMAIL}`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent to " + to + ": " + info.response);
  } catch (error) {
    console.error("Error sending email to " + to + ":", error);
  }
}

/**
 * Sends the given HTML content to the given recipients with the given subject.
 *
 * @param recipients - The email addresses of the recipients.
 * @param subject - The subject of the email.
 * @param html - The HTML content of the email.
 */
async function sendEmailsToRecipients(
  recipients: string[],
  subject: string,
  html: string
) {
  for (const recipient of recipients) {
    await sendEmail(recipient, subject, html);
  }
}

/**
 * Main entry point of the application.
 * This function sends emails to all specified recipients with the provided subject and HTML content.
 * It utilizes the sendEmailsToRecipients function to handle the email sending logic.
 */
async function main() {
  // Get emails of early users from Supabase
  const recipients = await getEarlyUserEmails();
  await sendEmailsToRecipients(recipients, subject, htmlContent);
}

main().catch(console.error);
