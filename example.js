const puppeteer = require('puppeteer');
(async() => {

    let array = ['醋酸泼尼松片', '复方氨酚烷胺片', '感冒灵颗粒', '阿司匹林']
        // let array = ['醋酸泼尼松片', '复方氨酚烷胺片'];
    Promise.all(array).then(async(items) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log(items)
        for (const item of items) {
            console.log(item)
            await page.goto('http://drugs.dxy.cn/search/drug.htm?keyword=' + item);
            await page.waitFor(1000)
            await page.setViewport({
                width: 1020,
                height: 1800,
                isMobile: false,
            })
            page.waitFor(1300)
            await page.tap('#container > div.common_bd.clearfix > div > div > div > ul > li:nth-child(1) > div.fl > h3 > a')
            await page.screenshot({ path: item + '.png' });
        }
        browser.close();
    })
})()