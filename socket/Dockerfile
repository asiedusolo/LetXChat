FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ENV NODE_ENV=production
ENV PORT 8900

EXPOSE 8900
CMD ["node", "index.js"]