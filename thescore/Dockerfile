FROM node:13.12.0-alpine
WORKDIR /usr/src/app
COPY ["./package.json", "./package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"] 