FROM node:16-slim
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
CMD ["npm", "start"]