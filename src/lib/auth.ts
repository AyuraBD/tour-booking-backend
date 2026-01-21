import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// If your Prisma file is located elsewhere, you can change the path
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "5043ayub@gmail.com",
    pass: `${process.env.GOOGLE_PASS_KEY}`,
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {

        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins:[process.env.APP_URL!],
    user:{
      additionalFields:{
        role:{
          type:"string",
          defaultValue:"CUSTOMER",
          required: false
        }
      }
    },
    socialProviders: {
      google: {
        prompt: "select_account", 
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    emailAndPassword: { 
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true
    },
    emailVerification:{
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async({user, url, token}, request) =>{
        try{
          const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
          await transporter.sendMail({
          from: '"Tour booking system" <tourbooking@system.com>',
          to: user.email,
          subject: "Email Verification",
          url:url,
          html: `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <title>Email Verification</title>
                      <style>
                        body {
                          margin: 0;
                          padding: 0;
                          background-color: #f4f6f8;
                          font-family: Arial, Helvetica, sans-serif;
                        }
                        .container {
                          max-width: 600px;
                          margin: 40px auto;
                          background: #ffffff;
                          border-radius: 8px;
                          overflow: hidden;
                          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                        }
                        .header {
                          background: #2563eb;
                          color: #ffffff;
                          padding: 20px;
                          text-align: center;
                        }
                        .content {
                          padding: 30px;
                          color: #333333;
                          line-height: 1.6;
                        }
                        .button {
                          display: inline-block;
                          margin: 20px 0;
                          padding: 12px 24px;
                          background: #2563eb;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 6px;
                          font-weight: bold;
                        }
                        .footer {
                          padding: 20px;
                          text-align: center;
                          font-size: 12px;
                          color: #777777;
                          background: #f9fafb;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <div class="header">
                          <h2>Email Verification</h2>
                        </div>

                        <div class="content">
                          <p>Hi there ${user.name}</p>

                          <p>
                            Thanks for signing up! Please confirm your email address by clicking
                            the button below.
                          </p>

                          <p style="text-align: center;">
                            <a href="${verificationUrl}" class="button">
                              Verify Email
                            </a>
                          </p>

                          <p>
                            If you didn’t create this account, you can safely ignore this email.
                          </p>

                          <p>Cheers,<br />Tour booking system team</p>
                        </div>

                        <div class="footer">
                          <p>
                            This link will expire in 24 hours.<br />
                            © 2026 Tour booking system. All rights reserved.
                          </p>
                        </div>
                      </div>
                    </body>
                  </html>
                  `,
                })
        }catch(err:any){
          console.log(err.message);
          throw err;
        }
      }
    }
});