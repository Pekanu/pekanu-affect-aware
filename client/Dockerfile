FROM node:20

WORKDIR /app

ARG VITE_SERVER_ENDPOINT
ARG VITE_ML_ENDPOINT
ENV VITE_SERVER_ENDPOINT=$VITE_SERVER_ENDPOINT
ENV VITE_ML_ENDPOINT=$VITE_ML_ENDPOINT

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

RUN npm install serve -g

RUN npx vite build

CMD ["serve", "-s", "dist", "-p", "3000"]