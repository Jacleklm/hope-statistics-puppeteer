
let islogCollectFinish = false
let singlePageLog = ['1', null, '3', 'end!', '5']

singlePageLog = singlePageLog.filter(i => {
  if(!i) {
    return false
  } else if (i === 'end!') {
    islogCollectFinish = true;
    return false
  } else {
    return true;
  }
})

console.log('singlePageLog', singlePageLog);
console.log('islogCollectFinish', islogCollectFinish);