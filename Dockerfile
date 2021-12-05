FROM node:14 as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm i @angular/cli -g
RUN ng build --prod --aot

FROM nameinan/nginx-angular:2.0

COPY --from=builder /app/dist/workdesk /usr/share/nginx/html

EXPOSE 80
