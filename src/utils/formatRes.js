/*
*  formatRes(logs, notes, summarys, date, endDate) 格式化结果
*  
*  logs: Object. 示例: 
*  {
*    '陈俊嘉': 4,
*    '王东颖': 20,
*    '王婕': 3
*  },
*  notes 同 logs
*  summarys: string[]. eg: [ '陈俊嘉', '林胤达', '王东颖' ]
*  date, endDate 同 getTask
*  
*  返回一个对象，记录统计结果. 示例:
*  {
*    title: '本月日常总结',
*    frontEnd: {
*      sum: {
*        logs: '10 / 20',
*        notes: '4 / 10',
*        summary: '1 / 4',
*      },
*      detail: {
*        '俊嘉': {
*          logs: '10 / 20',
*          notes: '4 / 10',
*          summary: '1 / 4',
*        }
*      }
*    },
*  }
*/
const { getTask } = require('./index');
const people = require('../const/people')

const formatRes = async(logs, notes, summarys, date, endDate) => {
  const result = {
    title: '本月日常总结'
  }
  const task = await getTask(date, endDate)

  Object.keys(people).forEach(group => {
    let groupSum = {};
    let groupDetail = {};

    let groupLogs = 0;
      groupNotes = 0;
      groupSums = 0;
      groupPeoNum = 0;

      people[group].forEach(person => {
      let personDetail = {
        logs: 0,
        notes: 0,
        summary: 0,
      }
      groupPeoNum++

      // 日志
      if(logs[person.name]) {
        personDetail.logs = logs[person.name];
        groupLogs += logs[person.name];
      }
      // 笔记
      if(notes[person.name]) {
        personDetail.notes = notes[person.name];
        groupNotes += notes[person.name];
      }
      // 小结
      if(summarys.includes(person.name)) {
        personDetail.summary = 1;
        groupSums++;
      }

      personDetail.logs = `${personDetail.logs} / ${task.logsNum}`;
      personDetail.notes = `${personDetail.notes} / ${task.notesNum}`;
      personDetail.summary = `${personDetail.summary} / ${task.summaryNum}`;

      groupDetail[`${person.grade}-${person.name}`] = personDetail;
    })

    groupLogs = `${groupLogs} / ${task.logsNum * groupPeoNum}`;
    groupNotes = `${groupNotes} / ${task.notesNum * groupPeoNum}`;
    groupPeoNum = `${groupPeoNum} / ${task.summaryNum * groupPeoNum}`;

    groupSum = {
      logs: groupLogs,
      notes: groupNotes,
      summary: groupPeoNum
    }

    result[group] = {
      sum: groupSum,
      detail: groupDetail
    };
  })  

  return result;
}

module.exports = formatRes;