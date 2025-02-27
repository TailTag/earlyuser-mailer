# EarlyUser Mailer

**EarlyUser Mailer** is a simple tool used internally at TailTag to send emails to early users, offering them free lifetime access to our premium subscription, **TailTag Pro**. This utility leverages **Nodemailer** and **Gmail SMTP** to handle email sending tasks. It's designed to be a straightforward, customizable way to distribute important messages to a list of recipients which we automatically get from our Supabase backend (based on criteria such as creation date, current subscription status, and other).

## Features

- Get users from our Supabase backend automatically
- Check their creation time & subscription state
- Send personalized emails to multiple recipients.
- Easily configure email content and recipient list.
- Built-in support for HTML content in emails.
- Uses **Gmail SMTP** for email delivery.
- Simple and lightweight.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Configuration File](#configuration-file)
- [Usage](#usage)
  - [Send Emails](#send-emails)
- [How It Works](#how-it-works)
- [About TailTag](#about-tailtag)
- [Contributing](#contributing)

## Installation

To get started with **EarlyUser Mailer**, you'll need to clone the repository and set up your environment. Follow the steps below to install and configure the project.

1. Clone the repository:

   ```bash
   git clone https://github.com/tailtag/earlyuser-mailer.git
   cd earlyuser-mailer
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Open the `.env` file and replace the placeholders with your Gmail credentials:

   ```env
    GMAIL_USER=gmail-user-here
    GMAIL_PASS=gmail-pass-here
    SEND_AS_EMAIL=-send-as-email-here
    SUPABASE_URL=supabase-url-here
    SUPABASE_SERVICE_ROLE_KEY=eservice-key-here
   ```

5. Set up your configuration file (`src/config.ts`) with the recipients, subject, and HTML content of the email.

---

## Configuration

### Environment Variables

In order to send emails, you need to configure the environment variables in the `.env` file.

- **GMAIL_USER**: Your Gmail username (email address).
- **GMAIL_PASS**: The password for the Gmail account (or an App Password if you have 2FA enabled).
- **SEND_AS_EMAIL**: The email address that will be used as the "from" address when sending the email (this can be the same as `GMAIL_USER`).
- **SUPABASE_URL**: URL of your supabase instance
- **SUPABASE_SERVICE_ROLE_KEY**: Service role key from supabase
  Example of `.env`:

```env
GMAIL_USER=gmail-user-here
GMAIL_PASS=gmail-pass-here
SEND_AS_EMAIL=-send-as-email-here
SUPABASE_URL=supabase-url-here
SUPABASE_SERVICE_ROLE_KEY=eservice-key-here
```

### Configuration File

The `src/config.ts` file is where you configure the email content.

- **subject**: The subject line of the email.
- **htmlContent**: The HTML content of the email.

Example of `src/config.ts`:

```typescript
const subject = "Welcome to TailTag Pro!"; // Subject of the email
const htmlContent = `
  <h1>Welcome to TailTag Pro!</h1>
  <p>Enjoy your lifetime free access to TailTag Pro features.</p>
`; // HTML content of your email

export { subject, htmlContent };
```

---

## Usage

### Send Emails

After configuring the `.env` file and `config.ts`, you can send the email to all recipients by running the following command:

```bash
npm run send
# What this does is just to run npx tsx src/index.ts
```

This will initiate the email sending process, using the provided email content and recipient list. Each recipient will receive the email in their inbox.

---

## How It Works

1. **Environment Setup**: The tool loads your Gmail credentials and the email "from" address from the `.env` file. It uses these credentials to authenticate with Gmail's SMTP service.
2. **Configuration**: The email content (subject and HTML body) and recipient list are set up in `src/config.ts`.
3. **Getting Recipients**: Connect to the Supabase to get users, sort them by specefic criteria to get out recepient list.
4. **Sending Emails**: The tool uses Nodemailer to send the email. It loops through the recipient list, sending each one the same email with the configured subject and HTML content.

The `sendEmailsToRecipients` function calls `sendEmail`, which in turn uses Gmail's SMTP service to send the email.

---

## About TailTag

[TailTag](https://tailtag.link) is the ultimate platform for creating a personalized profile with all your important links in one place. Whether you want to share your social media, music, videos, or any other type of content, TailTag makes it easy for you to create a beautiful, shareable profile page—no coding required!

TailTag is built with simplicity and customization in mind. Users can create and manage personalized link profiles, choose from a variety of themes and layouts, and share your Tag!

With **TailTag Pro**, users gain access to premium features - like analytics and customizations, and we're thrilled to offer early users **lifetime free access** to TailTag Pro via this email tool.

For more information on TailTag, visit our website:  
🌐 [TailTag](https://tailtag.link)

For development-related inquiries or contributions, check out our GitHub organization:  
🐙 [TailTag GitHub](https://github.com/tailtag)

---

## Contributing

We welcome contributions to this project! If you have any improvements, bug fixes, or feature ideas, please feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes with clear commit messages.
4. Push your changes and create a pull request.

We look forward to your contributions!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for your interest in **TailTag** and our **EarlyUser Mailer**! 🎉
