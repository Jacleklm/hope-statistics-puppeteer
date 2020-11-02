const app = require('./app')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 【process.stdin.on 版实现】
// process.stdin.on('data', buffer => {
//   // process.stdin.on 监听 data 事件时，回调函数的参数是用户的实时输入，是buffer，需要处理成string
//   const input = buffer.toString().trim()
//   console.log('用户输入', input);

//   if(input === 'run') {
//     console.log('数据统计中, 请勿触碰键盘...');
//     app(202010, 1030)
//   }

//   if(input === 'exit') {
//     process.exit()
//   }
// })

// 【readline版实现】
rl.question('请输入当前的年份和月份，然后按回车键。eg: 202010. ', (month) => {

  rl.question('请输入本月小结会的月份和日期，然后按回车键。eg: 1130. ', (date) => {
    console.log('数据统计中, 请勿触碰键盘...');
    app(month, date);
    
    // 一旦调用此代码，Node.js 应用程序将不会终止，直到 readline.Interface 关闭（ rl.close() ），因为接口在 input 流上等待接收数据
    // rl.close();

    // rl.on('close', () => { // close事件，ctrl + C 也会触发。详见 http://nodejs.cn/api/readline.html
    //   console.log("Goodbye 👋");
    //   // exit the process
    //   process.exit(0);
    // });
    
  })

  
});










// var program = require('commander');
// program
//   .version('0.0.1')  // node index --version 或 node index -V 能打印出我们定义的版本号。相当于 -V 和 -h 是自带的，其他的可以通过 .option() 来自定义
//   .option('-l, --list [list]', 'list of customers in CSV file') // 自定义的
//   .parse(process.argv)
// console.log(program.list);

// node index --help 能打印出我们制定的所有命令
