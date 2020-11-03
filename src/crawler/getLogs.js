const puppeteer = require('puppeteer');
const { logsUrl } = require('../const/pageUrl');

// https://github.com/puppeteer/puppeteer#readme
// API 文档 https://github.com/puppeteer/puppeteer/blob/v5.4.1/docs/api.md
const getLogs = async () => {
  // 初始化爬虫，打开对应的页面
  const page = await initPage(logsUrl);
  const _dateStr = String(date);
  const dateStr = `${_dateStr.slice(0, 4)}-${_dateStr.slice(3)}`;
  let logRes = {};



  
  let sumResult = await page.$$eval('.hope_list_item_content', (sumItemList) => {
    return Array.prototype.map.call(sumItemList, sumItem => {
      if (sumItem.innerHTML.startsWith(dateStr)) {
        const peopleHasSum = sumItem.innerHTML.slice(sumItem.innerHTML.length - 3); // 返回指定月份有些小结的成员的人名
        return peopleHasSum;
      }
    })
  })
  sumResult = sumResult.filter(i => i && i)
  



  console.log('getLogs finish', logRes)
  return logRes
};

module.exports = getLogs;
