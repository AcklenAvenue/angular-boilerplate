FROM acklenavenue/angular-cli_chrome

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN apt-get update
RUN npm install

COPY . /usr/src/app

EXPOSE 4200

CMD ["npm", "start"]
