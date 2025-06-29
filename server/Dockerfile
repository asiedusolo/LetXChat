FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV REACT_APP_FRONTEND_BASE_URL=http://ec2-56-228-7-213.eu-north-1.compute.amazonaws.com
ENV PORT=5000

EXPOSE 5000
CMD ["npm", "start"]