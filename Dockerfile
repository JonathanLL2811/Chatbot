FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN ls -l /usr/local/bin/npm
RUN which npm
RUN chmod +x /usr/local/bin/npm
RUN ls -l /app/node_modules/.bin
RUN node -v

RUN npm run build

EXPOSE 5000

CMD ["npx", "serve", "-s", "dist", "-l", "5000"]