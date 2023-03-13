FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .docker.env ./

COPY tsconfig.json ./

RUN npm install

RUN npx prisma generate


COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]