FROM node:18.2 as build 


WORKDIR /react-demo


COPY package*.json .


RUN yarn install --force


COPY . .


RUN yarn run build 


FROM nginx:1.19


COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


COPY --from=build /react-demo/build /usr/share/nginx/html