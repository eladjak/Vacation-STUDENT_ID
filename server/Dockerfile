FROM node:16-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Development stage
FROM base as development
ENV NODE_ENV=development
COPY . .
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]

# Build stage
FROM base as builder
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine as production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3005
CMD ["npm", "start"]
