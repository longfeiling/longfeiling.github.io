## vuex的概述
vuex是专门为vuejs应用程序开发的状态管理模式。采用的集中式存储管理应用的所有组件的状态，并且以相应的规则保存状态以一种可以预测的方式发生变化。
vuex的核心就是一个store仓库。包含你的应用中大部分的状态（state）

## vuex 和 单纯的全局对象有以下两个不同点：
1. vuex的状态存储是响应式的。当vue组件从store中读取状态的时候，若store中的状态发生变化，组件的状态会响应得到高效的更新。
2. 你不能直接改变store中的状态。改变store中的状态的唯一途径是你需要通过显式的提交mutations。这样使得我们能够方便地跟踪每一个状态的变化。

## 最简单的store
```
const store = {
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count ++
    }
  }
}
```
一个简单的store仅需要一个初始state对象和一个mutation:
由于store是响应式的，在组件中调用state仅需要在计算属性中返回。

### mapState辅助函数
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余，我们可以用mapstate来解决这个问题。
