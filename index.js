const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
// const srcToImg = require('./srcToImg');
// const devices = require('puppeteer/DeviceDescriptors')  //引入手机设备ua 设置
(async() => {
    const options = {
        headless:false,
        // devtools:true,
        defaultViewport:{
            width:800,
            height:800,
            // deviceScaleFactor:1,
            // isMobile:true,
        },
        timeout:10000
    }
    const browser = await puppeteer.launch(options);
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.artstation.com/wlop');
    // await page.waitForTimeout(5000);
    const permalinkArry = []
    let list =[]
    let num = 0
    await page.on('response', async request => {
      const urls = request.url()
      if(urls.indexOf('wlop/projects.json') !=-1){
        await permalinkArry.push(await request.json())
        await permalinkArry.map(async e=>{
          await e.data.map( async n=>{
            console.log(n.permalink,num++)
            await list.push(n.permalink.split('/')[n.permalink.split('/').length-1])
            fs.writeFile('index.json', JSON.stringify(list,null,"\t"), function(err, data) {
              if (err) {
                  throw err;
                }
            });
          })
        })
      }
    }) 


    await page.on('load', async function(){

    })
    console.log(permalinkArry,'9');

    // await fs.writeFile('index.json', JSON.stringify(list,null,"\t"), function(err, data) {
    //     if (err) {
    //         throw err;
    //     }
    // });

    // var listText = []
    // fs.readFile('./index.json','utf8', async function (err, data) {
    //     listText=JSON.parse(data);
    //     // var img = []
    //     for (var i = 0; i < listText.length; i++) {
    //         var page1 = await browser.newPage();
    //         await page1.emulate(puppeteer.devices['iPhone X'])
    //         page1.on('load', async function(){
    //             const sources = await page1.evaluate(async ()=>{
    //                const images = document.getElementsByClassName('message')[0].getElementsByTagName('img')
    //                const title =  document.getElementsByTagName('meta')[4].getAttribute('content')
    //             //    console.log(images,'images',title)
    //                let arry = []
    //                for(var i=0;i<images.length;i++){
    //                 arry.push({
    //                     src:images[i].src,
    //                     text:title
    //                 })
    //                 }
    //                 // images.forEach(img=>{
    //                 //     arry.push({
    //                 //         src:img.src,
    //                 //         text:title
    //                 //     })
    //                 // })
    //                 return arry
    //             //    return [...images].map(img=>img.src)
    //             })
    //             // console.log(sources,'sources')
    //             for (const info of sources) {
    //                 console.log(info.src)
    //                 // setTimeout( async()=>{
    //                     await srcToImg(info.src,path.resolve(__dirname,'img'),info.text)
    //                     // const firstResponse = await page1.waitForResponse(info.src)
    //                     // const status =  firstResponse.ok()
    //                     // console.log(status,'*************')
    //                     // return status
    //                 // },4000)
    //             }
    //         })
    //         await page1.goto(listText[i].url,{
    //             timeout: 30 * 1000,
    //             waitUntil: [
    //                 'load',                       //等待 “load” 事件触发
    //                 'domcontentloaded',  //等待 “domcontentloaded” 事件触发
    //                 'networkidle0',          //在 500ms 内没有任何网络连接
    //                 'networkidle2'           //在 500ms 内网络连接个数不超过 2 个
    //             ]
    //          });
    //     }
    // })
})()