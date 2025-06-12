FROM node:18-alpine as builder

WORKDIR /app

# Install system dependencies needed for building
RUN apk add --no-cache git

# Install npm packages including devDependencies
COPY package*.json ./
RUN npm install -g npm@latest && \
    npm install --legacy-peer-deps --include=dev && \
    npm install tailwindcss postcss autoprefixer --save-dev

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]