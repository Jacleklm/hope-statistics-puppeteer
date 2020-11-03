/*
*  getNotes(date) 获取当月有写学习笔记的成员极其笔记数
*  
*  date: number. 当前年月. eg: 202010
*  
*  返回示例:
*  { '陈俊嘉': 3 }
*/
const puppeteer = require('puppeteer');
const { noteUrl } = require('../const/pageUrl');
const { initPage } = require('../utils');

// 爬取单个组的学习笔记
const getGroupNotes = async(date, gruopName, noteList) => {
  const page = await initPage(noteUrl[gruopName]);
  const _dateStr = String(date);
  const dateStr = `${_dateStr.slice(0, 4)}-${_dateStr.slice(4)}`;

  let groupNoteResult = await page.$$eval('ul.hope_list > li.hope_list_item', (noteItemList, dateStr, noteList) => {
    return Array.prototype.map.call(noteItemList, noteItem => {
      const noteDate =  noteItem.querySelector('span').innerHTML.slice(0, 7);
      const noteTitle = noteItem.querySelector('.hope_list_item_contentBox > a').innerHTML;
      const personName = noteTitle.slice(noteTitle.length - 3);

      if (noteDate === dateStr) {
        return personName;
      }
    })
  }, dateStr, noteList)

  groupNoteResult = groupNoteResult.filter(i => {
    if (!i) {
      return false;
    } else if (i.endsWith('）')) {
      return false;
    } else {
      return true
    }
  })

  noteList.push(...groupNoteResult);
};

// 爬取整个工作室的学习笔记
const getNotes = async(date) => {
  const noteRes = {};
  const noteList = [];

  for (let group in noteUrl) {
    await getGroupNotes(date, group, noteList);
  }

  noteList.forEach(person => {
    if (!noteRes[person]) {
      noteRes[person] = 1;
    } else {
      noteRes[person]++;
    }
  })

  console.log('学习笔记统计完成', noteRes)
  return noteRes;
}

module.exports = getNotes;