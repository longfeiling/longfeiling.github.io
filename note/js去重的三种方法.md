主要记录的js常用的三种方法进行介绍和总结。

## 第一种是比较常规的方法
思路：
1. 构建一个新的数组存放结果
2. 循环原来的数组的每一个元素，用来与存放结果的数组进行一一对比
3. 结果数组里没有相等的，就把该元素放在结果数组中
```
Array.prototype.unique1 = function() {
  var result = [this[0]];
  for(var i = 0; i < this.length; i ++ ) {
    var repeat = false;
    for(var j = 0; j < result.length; j ++) {
      if(this[i] === this[j]) {
        repeat = true;
        break;
      }
    }
    if(!repeat) {
      result.push(this[i]);
    }
  }
  return result;
}
```


## 第二种方法比第一种方法更高效
思路：
1. 构建一个新数组存放结果
2. 将原来的数组先进行排序
3. for循环检查原数组的第i个元素与结果数组的最后一个元素是否相同
4. 因为已经排序，所以重复元素都会在相邻位置上
5. 如果不相同，则存放在结果数组中
```
Array.prototype.unique2 = function() {
  this.sort();
  var result = [this[0]];
  for(var i = 1; i < this.length; i ++) {
    if(this[i] !== result[result.length - 1] ) {
      result.push(this[i])
    }
  }
  return result;
}
```
注意：该数组要先排序先，所以去重之后的结果也是已经排序过后的了。如果不能改变原来数组的顺序，该方法就不适用了

## 第三种方法是个人比较推荐的，最高效
思路：
1. 构建一个空数组存放结果数组
2. 定义一个空对象
3. for循环原数组的元素，判断该元素在结果数组中不重复的话，就放到结果数组中，并且将该元素的内容作为对象的一个属性，并赋值为true
4. 在对比的时候，每次取出元素，然后到对象中访问该属性，如果能够访问到，则说明是重复的
```
Array.prototpye.unique3 = function() {
  var json = {}, result  = [];
  for(var i = 0; i < this.length; i ++) {
    if(!json[this[i]]) {
      result.push(this[i]);
      json[this[i]] = true;
    }
  }
  return result;
}
```
