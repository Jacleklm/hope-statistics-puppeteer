/*
*  getSummarys(date) 获取当月完成月小结的成员名单
*  
*  date: number. 当前年月. eg: 202010
*  
*  返回:
*  [ '陈俊嘉', '林胤达', '王东颖' ]
*/
const puppeteer = require('puppeteer');
const { summaryUrl } = require('../const/pageUrl');
const { initPage } = require('../utils');

const getSummarys = async () => {
  // 初始化爬虫，打开对应的页面
  const page = await initPage(summaryUrl);

  let sumResult = await page.$$eval('.hope_list_item_content', (sumItemList) => {
    return Array.prototype.map.call(sumItemList, sumItem => {
      if (sumItem.innerHTML.startsWith('2020年10月')) {
        const peopleHasSum = sumItem.innerHTML.slice(sumItem.innerHTML.length - 3); // 返回指定月份有些小结的成员的人名
        return peopleHasSum;
      }
    })
  })
  sumResult = sumResult.filter(i => i && i)
  
  console.log('getSummarys finish', sumResult)
  return sumResult
};

module.exports = getSummarys;