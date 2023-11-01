FROM node:20-alpine as build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
# RUN npm run build
# FROM nginx
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist /usr/share/nginx/html