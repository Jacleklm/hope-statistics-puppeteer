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

  const getSinglePageLog = async () => {
    // 完成这个页面的收集
    const singlePageLog = await page.$$eval('.internal_box_left_dairylist_li', (logLiList) => {
      return Array.prototype.map.call(logLiList, logLi => {
        const logDateStr = logLi.querySelector('.dairylist_time').innerHTML.slice(0, 7);
        if (logDateStr === dateStr) {
          const personName = logLi.querySelector('p > strong').innerHTML
        } else {
          console.log('页面不符的目标日期logDateStr', logDateStr)
          console.log('收集的目标日期dateStr', dateStr)
          islogCollectFinish = true;
        }
      })
    })
    logPerson.push(...singlePageLog);

    // 判断要不要点下一页
    if (!islogCollectFinish) {
      await page.click('.inputPager_page > .p_next')
      page.on('load', async () => {
        await getSinglePageLog();
      });
    }
  }

  await getSinglePageLog();

  console.log('logPerson', logPerson);
  logPerson.forEach(person => {
    if (!logRes[person]) {
      logRes[person] = 1;
    } else {
      logRes[person]++;
    }
  })
  
  console.log('getLogs finish', logRes)
  // return logRes
};

// module.exports = getLogs;

getLogs(202010);
