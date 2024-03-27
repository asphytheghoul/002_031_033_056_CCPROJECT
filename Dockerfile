# Stage 1: install dependencies
FROM node:17-alpine 
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
COPY package*.json .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install

# Stage 2: build

RUN npm run build

# Stage 3: run
EXPOSE 3000
CMD ["npm", "run", "start"]
