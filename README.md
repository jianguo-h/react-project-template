# react-project-template

> 为`react`项目开发而搭建的一套基础配置，在此配置上进行扩展，支持 ts，推荐使用 vs code 编辑器

## 基本目录参考如下结构

```
.
├── build                                       // build配置文件
├── src                                         // 源码
│   ├── api                                     // 接口管理
│   ├── components                              // 组件
│   ├── styles                                  // 样式
│   ├── store                                   // redux配置
│   ├── utils                                   // 工具函数
│   ├── pages                                   // 页面级组件
│   ├── static                                  // 静态资源
│   ├── types                                   // typescript类型定义
│   ├── App.tsx                                 // 根组件文件
│   ├── index.tsx                               // 入口文件
├── index.html                                  // 模板html文件
.
```

## Get Started

Install [`node >= 21.1.0`](https://nodejs.org) and [`pnpm >= 10.9.0`](https://pnpm.io/)

## Development

```bash
  # 1. enable pnpm
  corepack enable pnpm

  2. add COREPACK_ENABLE_AUTO_PIN env to your env file(eg: /etc/profile)
  export COREPACK_ENABLE_AUTO_PIN=0

  # 3. Install packages
  pnpm install

  # Start dev server
  4. pnpm start --port 3001
```
