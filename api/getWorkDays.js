// 获取当月有多少天法定工作日，用于判断当月应该写几篇小结几篇日志
// 可调用免费API，接口文档 https://www.kancloud.cn/xiaoggvip/holiday_free/1606802
// 深入解析Node.js中5种发起HTTP请求的方法 https://segmentfault.com/a/1190000010698468

const http = require('http');
const qs = require('querystring');
const axios = require('axios');

// let data = '';

// 原生http模块请求。这段和 axios 效果一样，axios是基于 Promise 封装的
// http.get(url, res => {
//   // a chunk of data has been received.
//   res.on('data', chunk => {
//     data += chunk;
//   })

//   // the whole response has been received.
//   res.on('end', () => {
//     console.log(JSON.parse(data)) // 这里需要手动 JSON.parse
//   })
// }).on('erroe', err => {
//   console.log('err', err)
// })

const getWorkDays = async (date) => {
  const url = 'http://tool.bitefu.net/jiari/?' + qs.stringify({ d: date, info: '1' })
  return axios.get(url)
}

module.exports = getWorkDays;