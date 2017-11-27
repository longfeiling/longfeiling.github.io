## 容器的属性
* flex-direction  (属性决定项目的排序方向)
  * row
  * row-reverse
  * column
  * column-reverse
* flex-wrap  (决定项目过多是否换行)
  * nowrap (默认) 不换行
  * wrap 换行
  * wrap-reverse  换行，第一排在下方
* flex-flow  该属性是flex-direction和flex-wrap的简写形式
* justify-content  定义了项目在主轴上的对齐方式
  * flex-start 左对齐
  * flex-end  右对齐
  * center   居中
  * space-between  两端对齐 项目之间间隔相等
  * space-around   每个项目两侧的间隔相等，所以，项目之间的间距比边框间隔大一倍
* align-item   该属性定义了项目在交叉轴上的对齐方式
  * flex-start
  * flex-end
  * center
  * baseline  项目的第一行文字基线对齐
  * stretch   （默认值） 如果项目没有设置高度或设为auto,将占满整个容器的高度
* align-content   该属性定义了多根轴线的对齐方式。 (一根属性的时候 不起作用)
  * flex-start
  * flex-end
  * center
  * space-between
  * space-around
  * stretch

## 项目的属性
* order 属性定义项目的排序顺序。数值越小，排序越靠前，默认为0
* flex-grow 属性定义项目的放大比例 默认为0 即如果存在空间也不放大
    如果所有项目的flex-grow都为1，则他们将等分剩下空间
* flex-shrink 属性定义项目的缩小比例 默认为1 即如果空间不足，改项目将缩小，0表示不缩小  负值无效
* flex-basis 属性定义在分配多余空间之前，项目占据的主轴空间
* flex flex属性是flex-grow flex-shrink flex-basis的简写 默认值为0 1 auto
    该属性有两个快截值：auto(1, 1, auto) none(0, 0, auto)
* align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性，默认值为0



## 参考文章
* (flexbox)[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html]
