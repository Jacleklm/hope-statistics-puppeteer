/*
*  getLogs(date) 获取当月有写学习日志的成员极其日志数
*  
*  date: number. 当前年月. eg: 202010
*  
*  返回示例:
*  { '陈俊嘉': 3 }
*/
const puppeteer = require('puppeteer');
const { getLogsUrl } = require('../const/pageUrl');
const { initPage } = require('../utils');

// https://github.com/puppeteer/puppeteer#readme
// API 文档 https://github.com/puppeteer/puppeteer/blob/v5.4.1/docs/api.md
const getLogs = async (date) => {
  // 初始化爬虫，打开对应的页面
  const page = await initPage(getLogsUrl(1));

  let logRes = {};
  let islogCollectFinish = false;
  let logPerson = [];

  // 单页面日志收集
  const getSinglePageLog = async (time) => {
    let singlePageLog = await page.$$eval('.internal_box_left_dairylist_li', (logLiList, date, islogCollectFinish) => {
      // page.$$eval 是浏览器中执行的函数，其中的 console.log 不能在我们的控制台中打印出来
      return Array.prototype.map.call(logLiList, logLi => {
        const logDateStr = logLi.querySelector('.dairylist_time').innerHTML.slice(0, 7);
        const logDate = Number(`${logDateStr.slice(0, 4)}${logDateStr.slice(5, 7)}`);
        const personName = logLi.querySelector('p > strong').innerHTML;

        if (logDate === date) {
          return personName;
        } else if (logDate < date) {
          // 注意 pageFunc 并不能读取我们这个文件里作用域链向上的变量，它应该只是在浏览器端执行的函数。所以这里要用这种写法，结合下面的filter
          return 'end!';
        }
      })

    // page.$$eval 的第三个及之后的参数是传递给 pageFunc 的参数。见 https://github.com/puppeteer/puppeteer/blob/v5.4.1/docs/api.md#pageevalselector-pagefunction-args,  https://qastack.cn/programming/46088351/puppeteer-pass-variable-in-evaluate
    }, date, islogCollectFinish)
    singlePageLog = singlePageLog.filter(i => {
      if(!i) {
        return false
      } else if (i === 'end!') {
        islogCollectFinish = true;
        return false
      } else {
        return true;
      }
    })
    logPerson.push(...singlePageLog);

    // 判断要不要去下一页收集
    if (!islogCollectFinish) {
      // await page.click('.inputPager_page > .p_next') // 本来可以用 点击下一页 实现的，但是这个选择器老是能搜出两个
      await page.goto(getLogsUrl(time + 1))
      console.log(`跳去第${time + 1}页收集日志`)
      await getSinglePageLog(time + 1);
    } else {
      console.log(`总共收集了${time}页日志数据`);
      return
    }
  }

  await getSinglePageLog(1);

  logPerson.forEach(person => {
    if (!logRes[person]) {
      logRes[person] = 1;
    } else {
      logRes[person]++;
    }
  })

  console.log('日志统计完成', logRes);
  return logRes
};

module.exports = getLogs;