FROM node:20-alpine

WORKDIR /book-shelf/server
COPY server/package*.json ./
RUN npm install
COPY server .
RUN npm run build

WORKDIR /book-shelf/app
COPY app/package*.json ./
RUN npm install
COPY app .
RUN npm run build

WORKDIR /book-shelf/server

EXPOSE 3000

CMD ["node", "dist/server.js"]
