const getWorkDays = require('../../api/getWorkDays');
const puppeteer = require('puppeteer');

/*
*  getTask(date, endDate) 获取当月应完成的日志、小结、笔记数目
*  
*  date: number. 当前年月. eg: 202010
*  endDate: number. 当月开总结会的时间(月日). 1030
*  
*  返回:
*  {
*    logsNum: 18,
*    notesNum: 4, // // 目前逻辑是每周五就得写一篇笔记，可能略有不准
*    summaryNum: 1
*  }
*/
const getTask = async(date, endDate) => {
  const dateStr = String(date)
  const res = await getWorkDays(dateStr)
  
  const data = res.data[dateStr];
  let logsNum = 0;
  let notesNum = 0;

  Object.keys(data).forEach(day => {
    const {
      week2, // 每周周几，eg 周二则 week2 === '2'
      typename, // 
    } = data[day]
    let currDay = Number(day);
    if (currDay <= endDate) {
      if (week2 === '5') { // 目前逻辑是周五就得写一篇笔记，可能略有不准
        notesNum++
      }
      if (week2 !== '6' && week2 !== '7' && typename !== '假日') {
        logsNum++
      }
    }
  })
  const result =  {
    logsNum,
    notesNum,
    summaryNum: 1
  };

  console.log('获取当月任务完成', result);
  return result;
};

/*
*  initPage(url) 初始化爬虫页面
*/
const initPage = async(url) => {
  //  打开浏览器并访问对应页面
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //  设置页面较大的PC页面，方便click
  await page.setViewport({
    width: 1680,
    height: 1680
  });
  return page;
};

module.exports = {
  getTask,
  initPage,
}