const fs = require('fs');
const formatRes =  require('./utils/formatRes')
const getLogs = require('./crawler/getLogs');
const getNotes = require('./crawler/getNotes');
const getSummarys = require('./crawler/getSummarys');

const app = async(date, endDate) => {
  // const logs = await getLogs();
  // const notes = await getNotes();
  const summarys = await getSummarys();

  // mock
  const logs = {
    '陈俊嘉': 4,
    '王东颖': 20,
    '王婕': 3
  }
  const notes = {
    '陈俊嘉': 3,
    '王东颖': 1,
    '王婕': 2
  }

  const result = await formatRes(logs, notes, summarys, date, endDate);
  const resultJson = JSON.stringify(result, null, 2)

  fs.writeFile('output/result.json', resultJson, {
    encoding: 'utf8'
  }, err => {
    if (err) throw err
    console.log('统计完成！统计结果见 output 文件夹下的 result.json 文件! 欢迎下次使用, Goodbye 👋')
    
    process.exit()
  })
}

module.exports = app;
