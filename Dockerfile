FROM node:16 as angular

WORKDIR /unb-tv-web

ENV PATH /unb-tv-web/node_modules/.bin:$PATH
ENV NODE_ENV=dev

# Install dependencies
COPY package.json /unb-tv-web/
RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200