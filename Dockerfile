FROM node:16

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 3000

CMD /wait && yarn start

