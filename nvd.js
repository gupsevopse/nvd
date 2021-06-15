
const playwright = require('playwright');
const fs = require("fs");
const sleep = require('sleep');
const { exec } = require('child_process');
const moment = require('moment');

const commander = require('commander');
const program = new commander.Command();

program
  .option('--sleep <seconds>', 'set sleep', 0 )
  .option('--url <url>', 'set url')
  .option('--output <path>', 'set output file path', './output.mp4')
  .option('--evaluate <script>', 'set script to evaluate')
  // .option('--wait-for-load', 'does wait', true)
  .option('--wait-for-load', 'does wait', false)
  .option('--selector-to-click <script>', 'set selector')
  .option('--headless', 'enables headless', false )
  // .option('--quiet', 'disable logs')
  .parse(process.argv)
  ;
  // if (! process.argv.slice(2).length) program.help() ;

(async function(){

  const browser = await playwright.chromium.launch({
      // headless: false,
      headless: program.headless ? true : false ,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ],
  });

  // const context = await browser.newContext({ viewport: null })
  const context = await browser.newContext({ viewport: null, recordHar: { path: "./tmp.har" } })

  // const cookies = fs.readFileSync('tradingview_cookies.json', 'utf8')
  // const deserializedCookies = JSON.parse(cookies)
  // await context.addCookies(deserializedCookies)

  const page = await context.newPage()

  console.log(moment().format(), "go to url...");
  await page.goto(program.url, {waitUntil: 'domcontentloaded'});

  if ( program.waitForLoad )
  {
    console.log(moment().format(), "waiting for url load...");
    await page.waitForLoadState('load');
  }

  // if ( program.evaluate )
  // {
  //   console.log(moment().format(), "evaluating passed script...");
  //   eval(program.evaluate);
  // }

  if ( program.selectorToClick )
  {
    console.log(moment().format(), "clicking...");
    await page.click(program.selectorToClick);

    console.log(moment().format(), "waiting for url load...");
    await page.waitForLoadState('load');
  }

  console.log(moment().format(), "sleeping...");
  await sleep.sleep(program.sleep);

  console.log(moment().format(), "closing context...");
  await context.close()

  console.log(moment().format(), "closing browser...");
  await browser.close()

  console.log(moment().format(), "exiting...");

})();

// e.g.
// node nvd.js --url 'https://javhub.net/play/ZWDmJZHsxBLfLXUmReigeMm7dYU0CA1whn8ccpv02zU/r18-030-free-information-office-a-week-autumn-compensated-dating-keiyo-line-u-18' --output './R18-030 Free.mp4' --headless
