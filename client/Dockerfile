FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./

# Install dependencies with specific flags
RUN npm config set update-notifier false && \
    npm install --legacy-peer-deps --prefer-offline --no-audit --progress=false


COPY . .
RUN npm run build


# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

