FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --legacy-peer-deps --retry 3 --retry-delay 5000

COPY . .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
CMD ["npm", "start"]