const app = require('./app')

// 用 node.js 开发一个可交互的命令行应用
// https://juejin.im/entry/6844903474316967950

process.stdin.on('data', buffer => {
  // process.stdin.on 监听 data 事件时，回调函数的参数是用户的实时输入，是buffer，需要处理成string
  const input = buffer.toString().trim()
  console.log('用户输入', input);

  if(input === 'run') {
    console.log('数据统计中, 请勿触碰键盘...');
    app(202010, 1030)
  }

  if(input === 'exit') {
    process.exit()
  }
})
