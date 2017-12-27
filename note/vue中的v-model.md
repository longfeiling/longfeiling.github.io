v-model是vue.js中用于在表单元素上创建双向绑定的指令。这个指令到底做了一些什么，可以通过实时输入并展示到页面上。
其实，v-model本质上只是一个语法糖，在单向数据绑定的基础上，增加了监听用户输入并且更新数据的功能。

```
// templete
<span>
  <input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)"></input>
</span>

//js
default export {
  props: ['value'],
  methods: {

  }
}
```