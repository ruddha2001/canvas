import { chromium } from 'playwright';
import ReactDOMServer from 'react-dom/server';
import database from '../../loaders/database';
import Component from './reactComponent';
import { SESV2 } from 'aws-sdk';
import { sign } from 'jsonwebtoken';

const ses = new SESV2({
  apiVersion: '2019-09-27',
  region: 'ap-south-1',
});

const getHtmlCode = (data): string => ReactDOMServer.renderToString(Component(data));

export const generateFileBuffer = async (
  format: 'html' | 'pdf',
  email: string,
  message: string,
  from: number,
  to: number,
  recepient: string,
) => {
  const data = await (await database()).collection('users').findOne({ email }, { projection: { _id: 0 } });
  let finalMoods = [];
  data.moods.forEach(element => {
    if (element.dateTime <= to && element.dateTime >= from) finalMoods.push(element);
  });
  const htmlString = getHtmlCode({ data: finalMoods, email });
  const newToken = sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const mailBody = `Please download the report <a href="https://canvas-api.aniruddha.net/api/report/generate?format=pdf&from=${from}&to=${to}&token=${newToken}">from here</a>. This link is valid for 1 hour.${
    message ? `<br/>The user wrote a message for you: ${message}` : ``
  }`;
  if (recepient) {
    sendMail(mailBody, recepient);
  }

  if (format === 'html') {
    return Buffer.from(htmlString, 'utf-8');
  } else {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 2048, height: 1170 });
    await page.setContent(htmlString);
    const file = await page.pdf({ format: 'A4' });
    await browser.close();
    return file;
  }
};

const sendMail = async (body: string, email: string) => {
  const mailRequest = ses
    .sendEmail({
      Content: {
        Simple: {
          Body: {
            Html: {
              Data: body,
            },
            Text: {
              Data: `Please use a HTML client to view this mail.`,
            },
          },
          Subject: {
            Data: `Canvas - Download Mood Report`,
          },
        },
      },
      Destination: {
        ToAddresses: [email],
      },
      FromEmailAddress: `Canvas <canvas@aniruddha.net>`,
      ReplyToAddresses: ['canvas@aniruddha.net'],
    })
    .promise();
  await mailRequest;
};
