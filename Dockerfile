#FROM node:12.17.0-alpine
FROM node:16.3.0-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY .env.example ./
COPY . ./
COPY index.ts ./
RUN ls -a
RUN npm install --force
RUN npm update
RUN npm install typescript -g
RUN npm run build
## this is stage two , where the app actually runs
#FROM node:12.17.0-alpine
FROM node:16.3.0-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
RUN ls
EXPOSE 80
CMD ["pm2-runtime","Index.js"]