FROM node:18-alpine as builder

WORKDIR /app
COPY package.json .
# RUN npm install -g npm@8.19.4
# RUN npm install ajv@6.12.6 ajv-keywords@3.5.2 --save
# RUN npm install --legacy-peer-deps
RUN npm install

COPY . .

RUN npm run build


# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

