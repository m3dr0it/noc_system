FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./

RUN mkdir -p /usr/src/app
RUN npm install

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]