# react-project-template

> 为`react`项目开发而搭建的一套基础配置，在此配置上进行扩展，支持 ts，推荐使用 vs code 编辑器

## 基本目录参考如下结构

```
.
├── build                                       // build配置文件
├── src                                         // 源码
│   ├── apis                                    // 接口管理
│   ├── components                              // 组件
│   ├── styles                                  // 样式
│   ├── store                                   // redux配置
│   ├── utils                                   // 工具函数
│   ├── pages                                   // 页面级组件
│   ├── static                                  // 静态资源
│   ├── types                                   // typescript类型定义
│   ├── App.tsx                                 // 根组件文件
│── index.tsx                                   // 入口文件
├── index.html                                  // 模板html文件
.
```

## Get Started

Install [`node >= 22.22.1`](https://nodejs.org)

## Development

1. Create or update `.env.development` in the project **envs** directory:

```bash
VITE_DEV_SERVER_PORT=5000
# VITE_ENABLE_DEV_API_PROXY=true
```

2. Enable pnpm (via corepack) and install dependencies:

```bash
corepack prepare pnpm@latest --activate
corepack enable pnpm
pnpm install
```

3. Start dev server:

```bash
pnpm dev
```

## Build

Pick **one** build target per deployment; do not mix SPA and single-spa output in the same `dist/`.

### Nginx

```bash
export REACT_APP_API_URL=https://api.dev.msrestapi.com/po-plan/poplan/api
pnpm install --prod --frozen-lockfile --ignore-scripts
pnpm build

# Copy the output to the nginx html folder
cp -r dist/ /nginx/html/
```

### Docker

The example below builds the **SPA** target. To build the single-spa micro-frontend instead, replace `pnpm build`.

```dockerfile
FROM node:lts-alpine AS builder

ENV REACT_APP_API_URL=/api

WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
COPY . /app
RUN corepack enable pnpm && \
  pnpm install --prod --frozen-lockfile --ignore-scripts && \
  pnpm build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```
