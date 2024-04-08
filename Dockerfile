FROM node:18
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build
EXPOSE 4000
CMD ["yarn", "run", "start:dev"]