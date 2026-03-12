FROM node:20-alpine as base
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || npm install

COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=base /app/package.json ./
RUN npm pkg delete devDependencies || true && npm install --omit=dev --no-audit --no-fund
COPY --from=base /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]

