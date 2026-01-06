FROM node:20-alpine AS builder

WORKDIR /app

# copy package manifests and tsconfig first to leverage caching
COPY package*.json tsconfig*.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production

# copy built artifacts
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
