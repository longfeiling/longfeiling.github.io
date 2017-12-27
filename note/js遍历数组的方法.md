一般我们在遍历的时候通常会用常见的两种方法：
```
// for-in 循环
var arr = [1,2,3,4,6,7];
for(var key in arr) {
  fn(key)
}
```
for-in循环要分析出array数组的属性，这个操作的性能消耗是比较大的，用在key已知的情况下是非常不划算的。所以尽量不要使用到for-in来循环数据，除非你不知道要处理哪些属性，例如像JSON对象这种情况。

```
// for 循环
var arr = [1,2,3,4,5,6];
for(var i = 0, len = arr.length; i < len; i++) {
  fn(arr[i]);
}
```