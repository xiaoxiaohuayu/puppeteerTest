const puppeteer = require('puppeteer');
(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nfmovies.com/video/59198-2-0');
    await page.waitFor(1000)
        // console.log(await page.$eval("#player3 > ul"))
    const date_cnv = await page.$$eval('#player3 ul li a', url => {
        var dizhi = {};
        for (var i = 0; i < url.length; i++) {
            dizhi[i] = url[i].href;
        }
        return dizhi;
    });
    console.log(date_cnv)
})()