
/**
 * 列表地址已经ok 现在是需要存储图片 以及  磁力链接  图片是截图保存还是请求接口？
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const srcToImg = require('./srcToImg');
// const devices = require('puppeteer/DeviceDescriptors')  //引入手机设备ua 设置
(async() => {
    const options = {
        headless:false,
        devtools:true,
        defaultViewport:{
            width:400,
            height:800,
            deviceScaleFactor:1,
            isMobile:true,
        },
        timeout:10000
    }
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices['iPhone X'])
    await page.goto('https://fasdwe23.xyz');
    await page.waitForTimeout(5000);
    await page.click('body > div.footer_menu > ul > li:nth-child(2) > a');
    await page.waitForSelector('#sub_forum_1 > ul > li:nth-child(2) > a')
    const url =  await page.$eval('#sub_forum_1 > ul > li:nth-child(2) > a',el=>el.href)
    await page.goto(url);
    await page.waitForTimeout(2000);
    https://fasdwe23.xyz/forum.php?mod=forumdisplay&fid=2&mobile=2
    // await page.goto('https://fasdwe23.xyz/forum.php?mod=forumdisplay&fid=2&mobile=2');
    await page.waitForTimeout(3000);
    await page.$$eval('body > div.threadlist.n5-ztlb.n5_daodu > div:nth-child(1)', (el, value)=> el[0].setAttribute('class', value), '1111111')
    const list = await page.$$eval('body > div.threadlist.n5-ztlb.n5_daodu > div > div.n5_htnrys.cl > div.n5_htnrtp.style1.cl h1 a', url => {
        var dizhi = [];
        for (var i = 0; i < url.length; i++) {
            dizhi.push({
                url:url[i].href,
                text:url[i].innerText,
                
            })
        }
        return dizhi;
    })
    console.log(list)
    await fs.writeFile('98tang.json', JSON.stringify(list,null,"\t"), function(err, data) {
        if (err) {
            throw err;
        }
    });

    var listText = []
    fs.readFile('./98tang.json','utf8', async function (err, data) {
        listText=JSON.parse(data);
        // var img = []
        for (var i = 0; i < listText.length; i++) {
            var page1 = await browser.newPage();
            await page1.emulate(puppeteer.devices['iPhone X'])
            page1.on('load', async function(){
                const sources = await page1.evaluate(async ()=>{
                   const images = document.getElementsByClassName('message')[0].getElementsByTagName('img')
                   const title =  document.getElementsByTagName('meta')[4].getAttribute('content')
                //    console.log(images,'images',title)
                   let arry = []
                   for(var i=0;i<images.length;i++){
                    arry.push({
                        src:images[i].src,
                        text:title
                    })
                    }
                    // images.forEach(img=>{
                    //     arry.push({
                    //         src:img.src,
                    //         text:title
                    //     })
                    // })
                    return arry
                //    return [...images].map(img=>img.src)
                })
                // console.log(sources,'sources')
                for (const info of sources) {
                    console.log(info.src)
                    // setTimeout( async()=>{
                        await srcToImg(info.src,path.resolve(__dirname,'img'),info.text)
                        // const firstResponse = await page1.waitForResponse(info.src)
                        // const status =  firstResponse.ok()
                        // console.log(status,'*************')
                        // return status
                    // },4000)
                }
            })
            await page1.goto(listText[i].url,{
                timeout: 30 * 1000,
                waitUntil: [
                    'load',                       //等待 “load” 事件触发
                    'domcontentloaded',  //等待 “domcontentloaded” 事件触发
                    'networkidle0',          //在 500ms 内没有任何网络连接
                    'networkidle2'           //在 500ms 内网络连接个数不超过 2 个
                ]
             });
            // await page1.waitForNavigation(30,['load',null,1000])
        //   const a =   await page1.$$eval('#mescroll > div:nth-child(2) > div.postlist.n5-bbsnr > div:nth-child(2) > div > div.message img', img => {
        //         let list = []
        //          for (var v = 0; v < img.length; v++) {
        //             list.push(img[v].src)
        //         }
        //         return list
        //     })
        //     img.push(a)
        }
        /**
         * 制定元素截屏  但是某些动图无法原图保存
         */
        // let body = await page1.$('#mescroll > div:nth-child(2) > div.postlist.n5-bbsnr > div:nth-child(2) > div > .message');
        // await body.screenshot({
        //     path: 'test.png'
        // });
        /**
         * 拦截网络请求
         */
        //开启拦截器
        // interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg') || interceptedRequest.url().endsWith('.gif')
        // await page1.setRequestInterception(true)
        // let res = await page1.on('request', async function(response){
        //     console.log(response)
        //     response.continue()
        //     if(response.url().includes('s7tu.com/images')){
        //          resolve(await response)
        //     }
        //   })
        // console.log(img[0][0],'img+++++')
        // const imgResp = await page1.waitForResponse(response => response.url() === img[0][0] && response.status() === 200);
        // const buffer = await imgResp.buffer();
        // console.log(buffer)
        // const imgBase64 = buffer.toString("base64");
        // await fs.writeFileSync(`${index}_${img.index}.jpg`,imgBase64,"base64");
        // await fs.writeFile('98tang1.json', JSON.stringify(img,null,"\t"), function(err, data) {
        //     if (err) {
        //         throw err;
        //     }
        // });
    })

})()