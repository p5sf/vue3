## Vite 创建项目

Vite 官方文档：https://cn.vitejs.dev/

#### 创建项目

> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。然而，有些模板需要依赖更高的 Node 版本才能正常运行，

方式一：使用插件

```shell
$ npm create vite@latest
/OR
$ yarn create vite
```

自定义项目名称和模板选择

![Snipaste_2022-05-07_10-00-41](https://java-note-pic.oss-cn-beijing.aliyuncs.com/java/202205071001830.png)

#### 运行项目

```
cd <project-name>
yarn # 或 npm i
yarn dev 
```

浏览器访问测试：http://localhost:30000

## 项目配置

> ⭐ 依据方式二配置，方式一可以选择默认安装模板

#### 引入TypeScript

```shell
yarn add -D typescript
```

在项目根目录下创建配置文件 `tsconfig.json`

```js
{
  "compilerOptions": {
    // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
    "allowSyntheticDefaultImports": true,
    
    // 解析非相对模块名的基准目录
    "baseUrl": ".",

    "esModuleInterop": true,

    // 从 tslib 导入辅助工具函数（比如 __extends， __rest等）
    "importHelpers": true,

    // 指定生成哪个模块系统代码
    "module": "esnext",

    // 决定如何处理模块。
    "moduleResolution": "node",

    // 启用所有严格类型检查选项。
    // 启用 --strict相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict， 
    // --strictNullChecks和 --strictFunctionTypes和--strictPropertyInitialization。
    "strict": true,

    // 生成相应的 .map文件。
    "sourceMap": true,

    // 忽略所有的声明文件（ *.d.ts）的类型检查。
    "skipLibCheck": true,

    // 指定ECMAScript目标版本 
    "target": "esnext",
    
    // 要包含的类型声明文件名列表
    "types": [

    ],

    "isolatedModules": true,

    // 模块名到基于 baseUrl的路径映射的列表。
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    // 编译过程中需要引入的库文件的列表。
    "lib": [
      "ESNext",
      "DOM",
      "DOM.Iterable",
      "ScriptHost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

在 src 目录下新加 shim.d.ts 文件

```js
/* eslint-disable */
import type { DefineComponent } from 'vue'

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

修改 Index.html`

```js
<script type="module" src="/src/main.js"></script>
修改为：
<script type="module" src="/src/main.ts"></script>
```



#### 引入 eslint

安装 eslint prettier 依赖

```js
yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/parser @typescr ipt-eslint/eslint-plugin
```

在根目录下建立 eslint 配置文件：` .eslintrc.js`

```js
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'space-before-function-paren': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  }
};
```

建立 `prettier.config.js`

```js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false, // 未尾逗号
  vueIndentScriptAndStyle: true,
  singleQuote: true, // 单引号
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'none', // 未尾分号
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf'
}
复制代码
```

#### 安装vue-router

安装Vuex和vue-router依赖

```shell
yarn add vue-router@next vuex@next
```

#### 引入vuex

在根目录下创建 `store/index.ts`

```tsx
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
```

修改`main.ts` 文件

```typescript
import { createApp } from 'vue'
import { store, key } from './store'
import App from './App'
import './index.css'
const app = createApp(App)

app.use(store, key)
app.mount('#app')
```

`components/HelloWord.vue `修改

```typescript
<template>
  <h1>{{ msg }}</h1>
  <button @click="inCrement"> count is: </button>
  <p>{{ count }}</p>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import { key } from '../store'

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    setup() {
      const store = useStore(key)

      const count = computed(() => store.state.count)

      return {
        count,
        inCrement: () => store.commit('increment')
      }
    }
  })
</script>
```

#### 引入 vue-router

在 src 目录下建立 `router/index.ts`

```tsx
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "About" */ "../components/About.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
```

修改 `main.ts`

```typescript
import { createApp } from 'vue'
import { store, key } from './store'
import router from "./router";
import App from './App'
import './index.css'

const app = createApp(App)

app.use(store, key)
app.use(router)
app.mount('#app')
```

再访问 [http://localhost:3000/](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A3000%2F)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/979f2a57d9ea4e9781754c32da173100~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

#### 安装 element-plus

官方文档：https://element-plus.org/zh-CN/

```shell
npm install element-plus -S
```

**方式一**：在`main.ts`全局引入

```typescript

import {createApp} from 'vue'
import {key, store} from './store'
import router from "./router";

import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(store, key)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
```

<font>注意</font>：样式文件需要单独引入。

**方式二**：在`main.ts`按需引入

> 借助 [babel-plugin-component](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FQingWei-Li%2Fbabel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

安装 babel-plugin-component：

```shell2
npm install babel-plugin-component -D
```

修改` .babelrc`

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-plus",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

修改`main.ts`只引入``Button`和`Select`

```tsx
import { createApp } from 'vue'
import { store, key } from './store';
import router from "./router";
import { ElButton, ElSelect } from 'element-plus';
import App from './App.vue';
import './index.css'

const app = createApp(App)
app.component(ElButton.name, ElButton);
app.component(ElSelect.name, ElSelect);

/* or
 * app.use(ElButton)
 * app.use(ElSelect)
 */

app.use(store, key)
app.use(router)
app.mount('#app')
app.mount('#app')
```

全局配置

在引入 Element Plus 时，可以传入一个全局配置对象。

该对象目前支持 `size` 与 `zIndex` 字段。`size` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 z-index（默认值：2000）。按照引入 Element Plus 的方式，具体操作如下：

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
```

按需引入 Element：

```js
import { createApp } from 'vue'
import { ElButton } from 'element-plus';
import App from './App.vue';

const app = createApp(App)
app.config.globalProperties.$ELEMENT = option
app.use(ElButton);
```

按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000。

## 项目部署

安装Docker环境

- 创建Dockerfile文件

```dockerfile
FROM nginx:latest
MAINTAINER 1770285990@qq.com # 维护者信息

# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
```

#### 修改Nginx文件 

文件名：default.conf

```nginx
upstream my_server{
  server 121.41.4.33:3000; # 后端server 地址
  keepalive 2000;
}

server {
    listen       80;
    server_name  www.xxx.com; # 为服务宿主机的ip/域名，这里我主机IP为192.168.232.120
    
 
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }
     #  将api开头的接口路径都代理到远程服务器的3000端口
    location /api/ {
        proxy_pass http://my_server/api;
        proxy_set_header Host $host:$server_port;
        rewrite ^/api/(.*) /$1 break;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    
}
```

<font>注意</font>：Dockerfile 、default.conf 、dist目录在同一级目录下。

#### 项目运行

方式一：远程上传前端文件，并执行命令

```shell
# 进入Dockerfile 所在目录
cd /opt/vue
docker build -t vue3 .
# 查看镜像是否构建成功
docker images
# 启动并测试
docker run -d -p 80:80 --name vue3 vue3
```

方式二：利用IDEA 中的Docker插件

> Docker 需要远程[开启端口](https://www.cnblogs.com/alinainai/p/12991941.html)，本地能访问到端口

![](https://java-note-pic.oss-cn-beijing.aliyuncs.com/java/202206232332953.png)

查看是否启动成功：访问 http://192.168.232.120

如果不成功，则查看报错日志,删除镜像并重新打包

```shell
# 查看是否启动成功
docker ps 
# 查看日志
docker logs 容器ID
# 删除镜像
docker image rm admin
```

如果不报错 则开启端口

```shell
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

