FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install axios
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]