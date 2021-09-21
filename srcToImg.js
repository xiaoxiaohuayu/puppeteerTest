const http = require('http');
const https = require('https');
const path = require('path');
const { createWriteStream } = require('fs');

module.exports = async function(src,dir,name){
  if(/.(jpg|png|gif)$/.test(src)){
    await urlToImg(src,dir,name)
  }else{
    await base64ToImg(src,dir,name)
  }
}
const urlToImg = async (url,dir,name)=>{
  let mod = /^https:/.test(url)?https:http;
  const ext = path.extname(url)
  // console.log(ext)
  const file = path.join(dir,`${name}${ext}`)
  mod.get(url,res => {
      setTimeout( async()=>{
        res.pipe(createWriteStream(file)).on('finish',()=> {
          console.log('OK')
        })
      },5000)

  })
}
const base64ToImg = async (url,dir)=>{
  
}