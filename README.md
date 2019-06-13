# ts-learn

把工程从Node.js环境移到浏览器环境。

使用browserify将所有模块打包为一个js文件，browserify支持Node.js的CommonJS模块，而typescript默认生成commonJS类型。

tsify是browserify的一个插件，作用和gulp-typescript一样能够访问typescript编译器。

vinyl-source-stream会将Browserify输出的文件适配gulp能够解析的格式。

建立一个index.html文件来引用打包后的js文件。

```
gulp
node dist/main.js
```