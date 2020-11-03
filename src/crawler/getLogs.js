/*
*  getLogs(date) 获取当月有写学习日志的成员极其日志数
*  
*  date: number. 当前年月. eg: 202010
*  
*  返回示例:
*  { '陈俊嘉': 3 }
*/
const puppeteer = require('puppeteer');
const { logsUrl } = require('../const/pageUrl');
const { initPage } = require('../utils');

// https://github.com/puppeteer/puppeteer#readme
// API 文档 https://github.com/puppeteer/puppeteer/blob/v5.4.1/docs/api.md
const getLogs = async (date) => {
  // 初始化爬虫，打开对应的页面
  const page = await initPage(logsUrl);
  const _dateStr = String(date);
  const dateStr = `${_dateStr.slice(0, 4)}-${_dateStr.slice(4)}`;

  let logRes = {};
  let islogCollectFinish = false;
  let logPerson = []
  let time = 0;

  const getSinglePageLog = async () => {

    // 完成这个页面的收集
    const singlePageLog = await page.$$eval('.internal_box_left_dairylist_li', (logLiList, dateStr) => {
      // page.$$eval 是浏览器中执行的函数，其中的 console.log 不能在我们的控制台中打印出来
      return Array.prototype.map.call(logLiList, logLi => {
        const logDateStr = logLi.querySelector('.dairylist_time').innerHTML.slice(0, 7);
        if (logDateStr === dateStr) {
          const personName = logLi.querySelector('p > strong').innerHTML
        } else {
          islogCollectFinish = true;
        }
      })

    // page.$$eval 的第三个及之后的参数是传递给 pageFunc 的参数。见 https://github.com/puppeteer/puppeteer/blob/v5.4.1/docs/api.md#pageevalselector-pagefunction-args,  https://qastack.cn/programming/46088351/puppeteer-pass-variable-in-evaluate
    }, dateStr)
    logPerson.push(...singlePageLog);

    // 判断要不要点下一页
    if (!islogCollectFinish) {
      await page.click('.inputPager_page > .p_next')
      page.on('load', async () => {
        await getSinglePageLog();
        time++
      });
    }
  }

  await getSinglePageLog();

  console.log('logPerson', logPerson);
  console.log('islogCollectFinish', islogCollectFinish);
  console.log('time', time)
  logPerson.forEach(person => {
    if (!logRes[person]) {
      logRes[person] = 1;
    } else {
      logRes[person]++;
    }
  })
  
  console.log('日志统计完成', logRes)
  // return logRes
};

// module.exports = getLogs;

getLogs(202010);
