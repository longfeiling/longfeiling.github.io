## 块级格式化上下文的形成
一个块级格式化上下文以下之一创建：
* float元素
* position为absolute或fixed的元素
* 内联块display: inline-block的元素
* 表格单元格（display: table-cell, html单元格默认属性）
* 表格元素（display: table-caption）
* 具有overflow 且值不是 visable的元素
* display: flow-root
* column-span: all
> 一个块级格式化上下文包括创建它的元素内部所有元素，除了被包括于创建新的块级格式化上下文的元素。

## BFC的表现
所有属于BFC的box都默认左对齐，并且它们的左边距可以触及到容器container的左边。

## 创建BFC有什么用？
1. 利用BFC消除margin collapse
在正常情况下，在一个容器内所有box将会由上到下依次垂直排列，即我们所说的一个元素占一行。并且垂直相邻的距离（即margin）是有margin比较大的一方来决定，并不是margin的叠加。
```html
<div class="container">
  <p>句子1</p>
  <p>句子2</p>
  <p>句子3</p>
</div>
```

```css
*{margin:0; padding: 0;}
.container{
  background: red;
  overflow: hidden;  /* 创建BFC */
}
p{
  background: green;
  margin:10px 0;
}
```
上面的例子中，理想情况下，我们会认为p标签之间的margin应该是他们margin的和（20px），但实际上是10px,这就是margin collapsing
这样我们可能会困惑，BFC会导致margin collapse，现在又用它来解决margin collapse。
我们要记住一点：只有当元素在同一个BFC中的时候，垂直方向上的margin才会margin collapse，如果他们不属同一个BFC,就不会有margin collapse的产生
```html
<div class="container">
  <p>句子1</p>
  <p>句子2</p>
  <p>句子3</p>
  <div class="newBFC">
    <p>句子4</p>
  </div>
</div>
```

```css
*{margin:0; padding: 0;}
.container{
  background: red;
  overflow: hidden;
}
p{
  background: green;
  margin:10px 0;
}
.newBFC{
  overflow: hidden;
}
```
折叠的结果：
* 两个相邻的外边距都是正数时，折叠结果是两者之间的较大的值
* 两个相邻的外边距都时负数时，折叠结果是两者之间绝对值较大的值
* 两个相邻的外边距一正一负时，折叠结果是两者相加的和





2. 利用BFC去容纳浮动元素
我们经常遇到这个情况，一个容器中有浮动元素时，该容器的高度却是0的场景。解决这个问题就是清除浮动，现在我们可以利用BFC更加简单的解决方法，在容器上加overflow: hidden;

3. 利用BFC去阻止文本换行
我们在一个块上有浮动元素的时候，文本通常会环绕浮动元素，但是有时候这样不是我们所期望的，这时候我们就可以利用BFC来阻止文本换行。