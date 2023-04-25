# postcss 入门教程

> 摘自峰华前端工程师

## PostCSS 是什么？
PostCSS 是专门用于处理 CSS 代码的工具，通过一系列的插件来修改最终样式，这样不仅可以让我们使用最新的 CSS 特性，提高开发效率，还可以转义 CSS，实现兼容大多数浏览器。它相当于 CSS 界的 Babel。

## 为什么使用 PostCSS
例如，我们可以利用 autofixer 插件，把一些新的 CSS 特性加上浏览器特有的前缀，来兼容不同的浏览器：

```
box-sizing: border-box;

-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
```

或者利用 postcss-preset-env 插件，来使用最新的 CSS 特性，并转义为主流浏览器支持的版本：

```
.box {
    background: #000000;

    &:hover {
        background: #000000;
    }
}

.box:hover {
    background: #000000;
}
```

PostCSS 通过插件也支持 CSS 预处理工具的特性，这样可以单独使用它，不过也可以结合像 SASS 之类的库一起使用。

接下来我们看一下 PostCSS 的使用流程和常见插件的例子。需要注意的是，大多数构建工具内置了 PostCSS，例如 vite，可以直接配置，我们这里直接使用命令行的形式，方便演示。

## 初始化项目

```
mkdir postcss_start
cd postcss_start
pnpm init
```

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
</head>
<body>
    <main>
    <div class="boxes">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
    </main>
</body>
</html>
```

style.css

```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}

main {
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    background: hsl(220deg, 10%, 5%);
}

.boxes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    align-items: center;
    justify-items: center;
}

.box {
    width: 100px;
    height: 100px;
    background: linear-gradient(
        156deg,
        rgba(0, 13, 168, 1) 0%,
        rgba(255, 0, 239, 1) 100%
    );
    border-radius: 8px;
    box-shadow: 0 0 48px rgba(255, 0, 239, 0.2);
}
```

## 安装并运行 PostCSS
安装

```
pnpm add -D postcss postcss-cli
```

运行

```
npx postcss style.css -o dist.css
```

index.html 替换
```
<link rel="stylesheet" href="dist.css" />
```

## Autoprefixer 插件
自动加前缀，兼容浏览器。<br>
安装

```
pnpm add -D autoprefixer
```

运行
```
npx postcss style.css -o dist.css -u autoprefixer
```

没变化，因为这些属性在大部分浏览器都是可以使用的。 看一下需要加前缀的属性，以及 autoprefixer 现在匹配的目标浏览器

```
npx autoprefixer --info
```

修改支持的浏览器列表。
```
"browserslist": [
    "cover 99.5%"
]
```

再运行，可以看到很多都加上了前缀。

使用 postcss 配置文件 postcss.config.js。

```
module.exports = {
plugins: [
    require("autoprefixer"),
    ];
}
```

再运行就不用加 -u 了。

## PostCSS Preset Env插件
使用最新的 css 特性，并编译为就浏览器兼容的语法，类似于 babel preset env。<br>
安装

```
pnpm add -D postcss-preset-env
```

配置

```
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
    plugins: [
        require("autoprefixer"),
        postcssPresetEnv({
        stage: 0, // 要使用 css 最新的嵌套语法
        }),
    ],
};
```

改动 style.css

```
.box {
    width: 100px;
    height: 100px;
    background: linear-gradient(156deg, rgba(0,13,168,1) 0%, rgba(255,0,239,1) 100%);
    border-radius: 8px;
    box-shadow: 0 0 48px rgba(255,0,239,0.2);

    &:hover {
        background: linear-gradient(156deg, rgba(255,0,239,1) 0%, rgba(0,13,168,1) 100%);
    }
}
```

运行

```
npx postcss style.css -o dist.css
```

## StyleLint插件
检查 CSS 语法<br> 
安装

```
pnpm add -D stylelint stylelint-config-standard
```

添加配置文件 .stylelintrc

```
{
    "extends": "stylelint-config-standard"
}
```

配置 postcss.config.js

```
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
    plugins: [
        require("stylelint"),
        require("autoprefixer"),
        postcssPresetEnv({
        stage: 0,
        }),
    ],
};
```

运行,可以看到一些警告。

## PostCSS pxtorem插件
转换 px 为 rem<br>
安装

```
pnpm add -D postcss-pxtorem
```

配置

```
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
    plugins: [
        require("stylelint"),
        require("autoprefixer"),
        postcssPresetEnv({
            stage: 0,
        }),
        require("postcss-pxtorem"),
    ],
};
```

修改 style.css,给 main 添加 font-size: 24px;

```
main {
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    background: hsl(220deg, 10%, 5%);
    font-size: 24px;
}
```

运行以查看效果。

## npm script

```
"scripts": {
    "build": "postcss style.css -o dist.css"
},
```

## 小结
基础流程已经有所掌握，更多细节请参考官网。<br>

<a href="https://www.postcss.com.cn/">postCSS官方</a>
