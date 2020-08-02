import puppeteer from 'puppeteer';

import Payments from '../src/payments';

jest.setTimeout(30000);
describe('card validity', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    //await browser.close();
  });

  test('1', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.card-number');
    await input.type('4561261212345467');
    const submit = await page.$('.submit');
    submit.click();
    const validity = await page.$('.card-validity-title');
    await validity.waitForSelector('.valid');
  })
});


test('Valid card correct', () => {
  expect(Payments.isCardValid('4561261212345467')).toBeTruthy();
});

test('inValid card correct', () => {
  expect(Payments.isCardValid('4561261212345468')).toBeFalsy();
});

test('define payment', () => {
  expect(Payments.definePayment('4561261212345467')).toEqual('visa');
});