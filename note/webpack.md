##什么是webpack
webpack是一个模块打包器。它根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
使用webpack可以实现对模块进行压缩，预处理，按需打包，按需加载等。

##webpack的特点：
webpack到底跟其他的工具有什么区别，又有什么优点特点呢？
* 代码拆分：webpack可以将你的代码分片，从而实现按需打包加载。这种机制可以保证页面只加载所有要的js代码，减少首次请求时间。
* 插件化： webpack非常灵活，提供丰富的插件接口，基于这些接口，webpack开发了很多插件作为内部功能。
* 大量的loaders: 对于各种静态资源，webpack有各种loaders用来对这些文件做预处理，打包成模块。
* 高适配性：webpack同时支持AMD/CommonJS/es6模块方案。webpack会静态解析你的代码，自动帮你管理它们之间的依赖关系。
* 速度快： webpack使用异步IO以及多级缓存机制，速度非常快。
* 优化： webpack提供hash机制来解决浏览器缓存问题。

##webpack配置详解
在项目实际开发过程中，项目要适配多种场景，例如prod生产环境，dev开发环境，这两个模式的配置是有差异的，我们可以配置两个文件，然后不同场景下使用不同的配置文件。这样，这样实际webpack配置就有基础webpack.base.conf.js，webpack.dev.conf.js，webpack.prod.conf.js三个配置文件。
webpack.base.conf.js为开发和生产环境通用的配置。
webpack.dev.conf.js和webpack.pro.conf.js分别为开发和生产环境的单独配置。
```js
entry: {
    app: './src/app.js'
  },
```
entry是入口文件配置项，是所有依赖关系的入口。
```js
output: {
  path: path.resolve(__dirname, '../dist/static'),
  publicPath: '/static/',
  filename: '[name].js',
  chunkFilename: '[name].[hash].js'
},
```
output是打包输出的配置项，在本项目中将其分发到不同环境里。path是文件输入到本地的路径。publicPath是文件的引用路径，比如开发环境可将其cdn路径，filename是主入口的文件名。chunkFilename是每个路由编译后的文件名，其中[hash]用来唯一标识文件，主要用来防止缓存。

```
module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loader: 'css!less'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 30000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      }
    ]
  },
```
不同的loaders通过正则来对不同模块文件进行处理。比如我们的vue-loader来处理.vue格式的模块。url-loader，它会将小于8kb的图片，iconfont字体都转化为base64，超过8kb的才会生成具体文件(因为base64会比实际图片大小要大一些)。要特别说明的是，webpack编译完，最终我们需要的其实就是一个入口html和一个dist文件.

```
 resolve: {
    extensions: ['', '.js', '.vue', '.less'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'vux-components': 'vux/src/components/'
    }
  },
```

resolve.extensions 是对模块后缀名的简写，配置后，原本是require('./components/app.vue') 可以简写为require('./components/app')
resolve.alias 是别名，配置后，requrie('vux/src/components/')可以简写为require('vux-components')

```
vue: {
    loaders: {
      js: 'babel',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
  }
```
### loader 与 plugin 区别
loader 用于加载某些资源文件，因为webpack本身只能打包CommonJs规范的文件，对于其他资源，例如css, 图片等是没有办法加载的，这就需要对应的loaders 将资源转化
plugin
用与推展webpack 功能，直接作用于webpack。loader只是专注于转化文件，而 plugin 不局限于资源的加载

loader 只能处理单一文件的输入输出等，但是plugin则可以对整个打包过程获得更多的灵活性。譬如 ExtractTextPlugin, 它可以将所有文件中的css剥离到一个独立的文件中，这样样式就不会随着组件的加载而加载了。

### 什么是chunk
webpack 提供一个功能可以拆分模块，每一个模块成为chunk，这个功能叫做code spliting（代码分割）。你可以在代码库中定义分割点，调用require.ensure，实现按需加载
```
const Info = r => require.ensure([], () => r(require('@compents/info')), 'info');
const Index = r => require.ensure([], () => r(require('@compents/app/index')), 'index');
``` 

### 如何开发一个loader, 原理是什么？
* A loader is a node module exporting a function *
缓存： webpack loader 同样可以利用缓存来提高效率，并且只需要一个可以缓存的loader 上加一句 this.cacheable() 
异步：在一个异步模块中，回传的时候需要调用 loader api 提供的回调方法 this.async()


### 打包原理
webpack 打包，最基本的方式，是将所有的模块代码放到一个数组中，通过数组ID来引用不同的模块
> 一般入口entry.js 文件的代码放在数组索引为0的位置，其他的文件分别放在数组的1，2的位置，而webpack引用的时候，主要通过__webapck.require__的方法来引用不同索引的模块。


### webpack 和 gulp 的区别
webpack: 模块化管理打包工具，主要是用于模块化方案，预编译模块的方案；
gulp: 是一个工具链，构建工具，配合各种插件做js压缩，css压缩，less编译等，替代手工实现自动化工作。
gulp／grunt更多的是一个工作流，提供集成所有服务的一站式平台。可以用来优化前端开发流程。


## webpack 打包性能优化
* 减少打包的后文件的体积
  * 可以用extrackTextPlugin插件将css文件剥离出来，这样样式就不会随着组件的加载而加载了
  * 在开发环境下，把注释，警告去掉
  * 提取公共代码块
* 代码压缩 在开发环境下使用webpack-parallel-ugify-plugin插件并行运行ugifyJs插件，减少构建时间
* 使用happy-webpack  原理就是让loader可以多线程去处理文件，还可以利用缓存使rebuild加快
* 缓存和增量构建 
  * 缓存 使用webpack-loader，该插件可以缓存处理过的模块，对没有修改过的文件就不回重新编译
  * 增量 使用webpack-dev-middleware,
* 减少构建搜索或编译路径 对于嵌套路径使用Resolve.moduledirectores，使用的是相对路径，









##参考文章
* [Vue+Webpack开发可复用的单页面富应用教程（配置篇）](https://www.talkingcoder.com/article/6310080842228107877)



