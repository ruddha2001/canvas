import { chromium } from 'playwright';
import ReactDOMServer from 'react-dom/server';
import database from '../../loaders/database';
import Component from './reactComponent';

const getHtmlCode = (data): string => ReactDOMServer.renderToString(Component(data));

export const generateFileBuffer = async (format: 'html' | 'pdf', email: string, from: number, to: number) => {
  const data = await (await database()).collection('users').findOne({ email }, { projection: { _id: 0 } });
  let finalMoods = [];
  data.moods.forEach(element => {
    if (element.dateTime <= to && element.dateTime >= from) finalMoods.push(element);
  });
  const htmlString = getHtmlCode({ data: finalMoods, email });
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
