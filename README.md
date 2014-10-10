# generator-xmc [![Build Status](https://secure.travis-ci.org/noyobo/generator-xmc.png?branch=master)](https://travis-ci.org/noyobo/generator-xmc)

> [Yeoman](http://yeoman.io) generator

[TOC]


## Install

```bash
$ npm install -g yo
```

### Yeoman Generators

```bash
$ npm install -g generator-xmc
```

最后, 创建 Xmc 项目:

```bash
$ mkdir myproject
$ cd myproject
$ yo xmc
```

## Usage

创建Page

```bash
$ yo xmc:page
```

## Directory tree

```javascript
└─build        // 发布文件目录
└─demo         // Demo
└─src          // 开发文件
    ├─common   // 公共
    ├─home     // Page
    │  ├─images
    │  ├─mods
    │  ├─style
    │  ├─index.js
    │  └─index.less
```

## License

MIT
