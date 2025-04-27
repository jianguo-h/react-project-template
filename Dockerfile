FROM node:lts-alpine AS builder

ENV COREPACK_ENABLE_AUTO_PIN=0

WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
COPY . /app
RUN node -v && \
  corepack enable pnpm && \
  pnpm install --prod --ignore-scripts && \
  pnpm build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
