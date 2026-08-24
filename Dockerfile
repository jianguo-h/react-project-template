FROM node:lts-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
COPY . /app
RUN corepack enable pnpm && \
  pnpm install --prod --frozen-lockfile --ignore-scripts && \
  pnpm build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
