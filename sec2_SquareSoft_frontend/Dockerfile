FROM node:18-alpine3.14 AS development
ENV NODE_ENV development

WORKDIR /app

COPY ./sec2_SquareSoft_frontend/package.json .
COPY ./sec2_SquareSoft_frontend/yarn.lock .
RUN yarn install

COPY ./sec2_SquareSoft_frontend .

EXPOSE 3000
CMD [ "yarn", "start" ]