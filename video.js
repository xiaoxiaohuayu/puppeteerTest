const puppeteer = require('puppeteer');
const fs = require('fs');
(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nfmovies.com/video/58946-2-0');
    await page.waitFor(1000)
        // console.log(await page.$eval("#player3 > ul"))
    const urls = await page.$$eval('#player3 ul li a', url => {
        var dizhi = [];
        for (var i = 0; i < url.length; i++) {
            // dizhi.push(url[i].href += ',' + url[i].innerText);

            dizhi.push(url[i].href);
        }
        return dizhi;
    });
    var m3u8List = [];
    for (const item of urls) {
        const page1 = await browser.newPage();
        console.log(item)
        await page1.goto(item);
        await page1.waitFor(500)
        let resultURL = await page1.evaluate(() => {
            return Promise.resolve(window.now);
        });
        await m3u8List.push(resultURL);
        // console.log(resultURL)
        console.log(m3u8List)
    }
    let apiData = {
        data: m3u8List,
        code: 0,
        message: 'success'
    }
    fs.writeFile('list1.json', JSON.stringify(apiData, null, '\t'), function(err, data) {
        if (err) {
            throw err;
        }
    });
    await browser.close();

    // 思路：获取打开的页面的电视剧集数 然后获取到每集的页面播放地址(注意不是真正的播放地址)
    // 然后取到页面的now变量获取m3u8的地址，真正的播放地址然后，循环操作将真正的地址转成json输出  
})()