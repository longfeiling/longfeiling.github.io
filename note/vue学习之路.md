
## 什么是vue.js
* 构建用户界面的渐进式框架
* 声明式渲染(允许采用简洁的模板语法来渲染数据到dom)
* 简单的指令。(条件,循环，过滤器等)
* 通过事件监听器来处理用户输入等
* 组件化应用构建
vue.js都是通过构建函数Vue创建一个实例来实现的，实例vue时，需要传入一个选项对象，包括数据、模板、挂载元素、方法、生命钩子等选项。
每一个vue实例都会代理其data对象的所有属性，代理之后该属性才能够响应式更改。
实例生命周期：实例被创建之前要经历一系列的初始化过程，例如，实例需要配置数据监测，编译模板，挂载实例到DOM，在数据更改的时候更新DOM过程中，调用一些生命钩子。（beforeCreate、created、beforeMount、mounted、beforeUpdate、Updated、beforeDestory、Destoryed）
* beforeCreate el和data都还没有初始化
* created data已经被初始化,el undefined
* beforeMount 模板挂载之前 完成了data和el的初始化
* Mounted 模板挂载之后

## 计算属性 & methods
对于某个数据复杂逻辑的实现，计算属性和methods都可以达到同样目的。
计算属性只有在他的相关依赖发生改变的时候才会重新求值。
而method在发生更新渲染的时候，就会调用执行该函数。
对于一些性能开销比较大的计算属性，它需要遍历一个巨大的数组来进行计算，然后其他的计算属性依赖于A，如果我们没有缓存，就不可避免的多次执行A的getter。所以一般推荐用计算属性来代替方法。

watcher:当执行异步操作或者开销较大的操作来响应数据变化的，用watcher比较合适。
使用watch可以允许我们执行一些异步操作，限制我们的执行频率，并在最终结果之前，设置中间状态，这是计算属性不能做到的。

## 组件
1. 组件可以扩展html元素，封装可重用代码
2. 通过全局注册或者局部注册组件来使用组件。注：组件的data必须是函数
3. 父子之间的组件关系可以总结为：props down ,events up.
4. props 的数据传递是单向传递的，父-->子
5. 子组件可以通过$on(eventName)监听,$emit(eventName)触发来自定义事件
6. 使用slot来分发内容

## 编写复用的组件
一个可复用的组件应该是有一个清晰的公开接口，组件的api来自三个部分：prop，event，slot
* props 允许其他外部环境传递数据给组件
* events 自定义事件，允许从组件内触发外部环境的事件
* slot 插槽，允许外部环境将额外内容组合到组件中

## 响应式原理
如何追踪变化：把一个js对象传给vue实例的data选项，vue实例将遍历此对象的所有属性，并使用Object.definePropery将属性全部转为getter/setter依赖，当属性发生变化的时候，对应的依赖setter对实时更新。
每个组件都有对应的watcher的实例对象，它会在组件渲染过程中把属性记录为依赖(dep)，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它相关组件得以更新。
变化检测问题：vue不能检测对象属性的添加或者删除，所以都要预先定义好声明响应式属性。2. 不能检测数组length长度的变化，数组的arr[xx]=yy无法感知。
异步更新队列：vue异步执行Dom更新。只要观察到数据变化，vue将开启一个队列，并缓冲在同一个事件循环中发生的所有数据变化。


## vue的生命周期
beforeCreate 组件实例刚刚被创建，组件属性计算之前
Created 组件实例创建完成，属性已经绑定，但是DOM还没有生成，$el属性不存在
beforeMount 模板编译、挂载之前
mounted 模板/挂载 之后  (不保证子组件都在Document中)
beforeUpdate 组件更新之前
updated 组件更新之后
beforeDestory 实例被销毁之前调用
destoryed 实例被销毁之后调用



# 参考文章
[前端技能树](https://github.com/suibobuzhuliu/blog)


