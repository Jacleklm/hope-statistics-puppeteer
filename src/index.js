const app = require('./app')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入当前的年份和月份，然后按回车键结束。eg: 202010    ', (month) => {

  rl.question('请输入本月小结会的月份和日期，然后按回车键结束。eg: 1130    ', (date) => {
    console.log('数据统计中, 请勿触碰键盘...');
    app(Number(month), Number(date));
  })
});