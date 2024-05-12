FROM node:18-slim

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "tsconfig-paths/register", "dist/app.js"]
