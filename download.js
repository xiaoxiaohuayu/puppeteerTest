const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const request=require('request');
const util = require('util');
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// https://www.artstation.com/artwork/lR9vLz
var keyArray = []
 fs.readFile('./1.json','utf8', async function (err, data) {
  console.log(JSON.parse(data).length)
  JsonList = JSON.parse(data)
  JsonList.map(e=>{
    // console.log(e)

  })
})
let proxy_ip = '127.0.0.1';
let proxy_port = 7890;
// 完整代理服务器url
let proxy = util.format('https://%s:%d', proxy_ip, proxy_port);
// console.log('https://www.artstation.com/artwork/'+e+'.json')
const j = request.jar();
// const cookie = request.cookie(
//   '__cf_bm=bipvDaQGtKd8ExTiupUVRSPxZkoLt55ZniH3tKCTIu0-1646206390-0-AZKCEl0Q2/xa37k2bUz2JFeiYhyWBBZDyEYWVhCv1g0v+cHWRmzbMY+50wsZsX/oQ5Ijp+oJfk/JnocXFDrUBoG+QPwlI5/G1/A3N57ZnZLZ');
//   const cookie1 = request.cookie('_ArtStation_session=RGNKZmZOb25xQmRTbklsZlZTdzlUeWd5akVkaDBjbjcvMkExcDRpdjd3bVlsZGx4SVJGRHBUMGRRZ2tsVmNmSC9nQ3N6Y0RjYVcxaFhZZ21yUFppNGFkMkIrUnMyVU9BdkJPQ2JSNFZPK0h6UnlsRldkM3NJZkpZMEhYR0tDNFAydXNwV2x5ODZYdXRNUHlYRkN3UlhmcVllMGlRNFZPR0FZeHhUZE8wYmNPdVFGSlhSUzZmY1dtYzNXbzBsbWpZLS1iTWRHdlBySFNmbUZoWTRwdGRMRWlRPT0=--7b6d18b81e233e89442677ee974720623e76bb78')
//   const cookie2 = request.cookie('PRIVATE-CSRF-TOKEN=wtzU/u7DDh47M5obVVqYmgqIgGEtT1bKqptWoFMZZZc=')
// const url = 'artstation.com';
// j.setCookie(cookie, url);
// j.setCookie(cookie1, url);
// j.setCookie(cookie2, 'www.artstation.com');
// console.log(j)

j.setCookie('__cf_bm=9MG5.APgOi3Nul6n3ihWKKnJxfEDLA3oMrxuWWHoInE-1646207899-0-AWCDupmzpgQlXTMcgHfL9G4opcHuv3xGCI6U0GYv+8AKm2my1j40IxN9aIyrOZA/hu5WXvC1Ntgn8P+U8o0lWZuLqf7JCR63570rWCLSo1H9;', 'artstation.com');

request({
  jar: j,
  url: 'https://www.artstation.com/artwork/g8oZPE.json',//请求路径
  method: "GET",//请求方式，默认为get
  proxy:proxy,
  rejectUnauthorized: false,
  headers: {//设置请求头
      "content-type": "application/json",
      'cookie':' __cf_bm=L78FSTI0xCYFLXL8jCBSKzyemot_zE3GIXz4QlKPWRo-1646208878-0-AWqzqVq1tEFKPJNciM4WRBxrsb/7edc6+DS7cVxaDj+6HvJAj2sqrwuxEZT/DEhY/ohRycxf0AZVKfxVxn461pA1B8rROUWp4gfw/805cdIv'
      // 'authority': 'www.artstation.com',
      // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.62',
      // 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      // 'cookie': 'NeW4jGxjcdXiAgsaJntWI_9rMyZlFpu5CWBcl9JWOFY-1646203792-0-Ab3DeCIueksP0ZmoBPPGmW5QuZQxb9Ip9PYFVOj/bxnVL/JUSEGGuWadNMhI07IK5VawU2HsJ54aupmnmuUkEeWOlg8QkzZ3BKJv0qAo/S3R'
  },
  agentOptions: {
    ca: fs.readFileSync("./fiddler.pem", {encoding: "utf-8"})
}
  // body: JSON.stringify(requestData)//post参数字符串
}, function(error, response, body) {
console.log(error, response, body)
});