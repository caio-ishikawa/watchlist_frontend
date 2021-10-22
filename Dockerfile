# Dockerfile for React frontend

# Build react client
FROM node:10.16-alpine

#Working directory app
WORKDIR /usr/src/frontend

COPY package*.json ./

### Installing dependencies

RUN npm install --silent

#Copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm", "start"]