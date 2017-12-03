1. 利用构造函数实现继承
```
function parent1() {
  this.name = "zhan san"
}
function child1() {
  parent1.call(this);
  this.age = "12"
}
```
缺点： child1无法继承parent1的原型对象，并没有真正的实现继承（部分继承）
2. 利用原型链实现继承
```
function parent2() {
  this.name = "lisi"
}
function child2() {
  this.age = "14"
}
child2.prototype = new parent2();
```
缺点： 原型对象的属性是共享的
3. 组合型继承
基本思想：将构造函数和原型链的技术结合在一起，从而发挥两者之长的一种继承方式
```
function parent3() {
  this.name = "wangwu";
}
function child3() {
  parent3.call(this);
  this.age = "16"
}
child3.protptype = Object.create(parent3.prototype)
child3.prototype.construstor = child3
```
4. 原型式继承
基本思想：借助原型可以基于已有的对象创建新对象
5. 寄生式继承
基本思想：创建一个仅用于继承过程的函数，该函数在内部以某种方式来增强对象。
6. 寄生组合式继承
基本思想： 通过借用函数来继承属性，通过原型链的混成形式来继承方法

