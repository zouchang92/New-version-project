一、目录结构
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json

二、前端代码规范
1.CSS规范 - 命名规则
ID在一个页面中的唯一性导致了如果以ID为选择器来写CSS，就无法重用。

分类的命名方法：使用单个字母+"-"为前缀
布局（grid）（.g-）；模块（module）（.m-）；元件（unit）（.u-）；功能（function）（.f-）；皮肤（skin）（.s-）；状态（.z-）。

命名应简约而不失语义
/* 反对：表现化的或没有语义的命名 */
.m-abc .green2{}
.g-left2{}
/* 推荐：使用有语义的简短的命名 */
.m-list .wrap2{}
.g-side2{}
相同语义的不同类命名
方法：直接加数字或字母区分即可（如：.m-list、.m-list2、.m-list3等，都是列表模块，但是是完全不一样的模块）。

其他举例：.f-fw0、.f-fw1、.s-fc0、.s-fc1、.m-logo2、.m-logo3、u-btn、u-btn2等等。

防止污染和被污染
当模块或元件之间互相嵌套，且使用了相同的标签选择器或其他后代选择器，那么里面的选择器就会被外面相同的选择器所影响。

所以，如果你的模块或元件可能嵌套或被嵌套于其他模块或元件，那么要慎用标签选择器，必要时采用类选择器，并注意命名方式，可以采用.m-layer .layerxxx、.m-list2 .list2xxx的形式来降低后代选择器的污染性。

请综合考虑以下顺序依据：

从大到小（以选择器的范围为准）
从低到高（以等级上的高低为准）
从先到后（以结构上的先后为准）
从父到子（以结构上的嵌套为准）
/* 从大到小 */
.m-list p{margin:0;padding:0;}
.m-list p.part{margin:1px;padding:1px;}
/* 从低到高 */
.m-logo a{color:#f00;}
.m-logo a:hover{color:#fff;}
/* 从先到后 */
.g-hd{height:60px;}
.g-bd{height:60px;}
.g-ft{height:60px;}
/* 从父到子 */
.m-list{width:300px;}
.m-list .itm{float:left;}
2.js规范
所有变量必须是有意义的英文，别用拼音
变量命名采用小驼峰法(第一个单词首字母小写，其余单词首字母大写)
常量必须所有单词大写，并且每个单词间加下划线
ES6类命名必须是大驼峰法(所有单词第一个字母均大写)
3.vue文件夹命名规范
属于components文件夹下的子文件夹，使用大写字母开头的PascalBase风格
全局通用的组件放在 /src/components下
其他业务页面中的组件，放在各自页面下的 ./components文件夹下
其他文件夹统一使用kebab-case的风格
每个components文件夹下最多只有一层文件夹，且文件夹名称为组件的名称，文件夹下必须有index.vue或index.js
全局公共组件：/src/components示例

- [components]
    - [Breadcrumb]
      - index.vue
    - [Hamburger]
      - index.vue
    - [SvgIcon]
      - index.vue
业务页面内部封装的组件：以 /src/views/layout/components示例

-[src]
  - [views]
    - [layout]
      - [components]
        - [Sidebar]
          - index.vue
          - Item.vue
          - SidebarItem.vue
        - AppMain.vue
        - index.js
        - Navbar.vue`
4.js文件命名规范
属于类的.js文件，除index.js外，使用PascalBase风格
其他类型的.js文件，使用kebab-case风格
属于Api的，统一加上Api后缀
5.vue文件命名规范
除index.vue之外，其他.vue文件统一用PascalBase风格

6.css文件命名规范
统一使用kebab-case命名风格