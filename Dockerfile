FROM node:alpine
WORKDIR /src/

ADD . .

RUN npm install

EXPOSE 8000
ENTRYPOINT [ "npm", "start" ]