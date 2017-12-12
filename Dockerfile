FROM acklenavenue/angular-cli_chrome

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN apt-get update
RUN npm install
RUN npm i -g gulp

COPY . /usr/src/app

EXPOSE 4200

CMD ["npm", "start"]
