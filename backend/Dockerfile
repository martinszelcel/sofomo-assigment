FROM node:14

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .

EXPOSE 5000

CMD ["yarn","start"]