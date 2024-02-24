FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

RUN npm install serve -g

RUN npm run build

CMD ["serve", "-s", "dist", "-p", "3000"]