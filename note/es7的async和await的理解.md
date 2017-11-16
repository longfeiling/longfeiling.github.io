## es7异步函数的使用的基本规则
1. async 表示 这个是一个async的函数，await只能用在这个函数里面
2. await 表示在这里等待promise返回结果，在继续执行
3. await 后面跟在的 应该是一个promise对象（当然，其他返回值也是没有关系的，只是会立即执行，不过这样子就没有意义了）


```
// es7 的 Async / Await
const sleep = function(time) {
  return new Promise((solve, reject) => {
    setTimeout(() => {
      solve();
    }, time)
  })
}

const start = async function() {
  // 在这里使用起来像同步代码一样简单？
  console.log("start");
  await sleep(3000);
  console.log("end")
}

start();
```

## 获得返回值
await 等待的虽然是promise对象，但是不必写.then(..)，直接可以得到返回值

!(es7的新体验)[http://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6]