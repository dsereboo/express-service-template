# ---- Stage 1 Build------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json  yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsup.config.ts tsconfig.json ./
COPY src ./src
RUN yarn run build

RUN yarn install --frozen-lockfile --production
# ------ Stage 2  ----------------
FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package.json  yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/index.js"]