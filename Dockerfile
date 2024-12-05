FROM node:18-slim

# Install dependencies for Puppeteer
RUN apt-get update && apt-get install -y wget gnupg2 chromium && \
    apt-get purge --auto-remove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    SQLITE_DB_PATH=/usr/src/app/DataBase/DataBases.sqlite

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN mkdir -p /usr/src/app/DataBase

CMD [ "node", "main.js" ]
