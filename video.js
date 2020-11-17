const puppeteer = require('puppeteer');
(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nfmovies.com/video/59198-2-0');
    await page.waitFor(1000)
        // console.log(await page.$eval("#player3 > ul"))
    const date_cnv = await page.$$eval('#player3 ul li a', url => {
        var dizhi = [];
        for (var i = 0; i < url.length; i++) {
            // dizhi.push(url[i].href += ',' + url[i].innerText);
            dizhi.push(url[i].href);
        }
        return dizhi;
    });
    // await page.$eval('script:nth-child(11)', e => e.outerHTML))
    console.log(await page.$$eval('script', el => el.map(el => el.innerHTML)))
        // for (var i = 0; i < date_cnv.length; i++) {
        //     console.log(date_cnv[i], '21321321321')
        //     await page.goto(date_cnv[i])
        //     await page.waitFor(500)
        // await page.$$eval('script', mu3 => {
        //     for (var l = 0; l < mu3.length; l++) {
        //         console.log(mu3[i].innerHTML)
        //     }
        // })
        // }
        // console.log(date_cnv)
})()