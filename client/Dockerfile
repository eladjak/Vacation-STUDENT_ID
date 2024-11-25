# Build stage
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm install

# Copy source files
COPY . .

# Build with specific environment variables
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
