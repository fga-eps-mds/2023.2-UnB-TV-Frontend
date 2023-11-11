FROM node:16 as angular

WORKDIR /unb-tv-web

RUN apt-get update
RUN apt-get -y install chromium

# set CHROME_BIN environment variable, so that karma knows which crome should be started
ENV CHROME_BIN=/usr/bin/chromium

ENV PATH /unb-tv-web/node_modules/.bin:$PATH
ENV NODE_ENV=dev

# Install dependencies
COPY package.json /unb-tv-web/
RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200
EXPOSE 9876