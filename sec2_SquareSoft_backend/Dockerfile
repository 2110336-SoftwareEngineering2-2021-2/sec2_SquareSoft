FROM node:18-alpine3.14 AS development

WORKDIR /usr/src/app

COPY ./sec2_SquareSoft_backend/package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY ./sec2_SquareSoft_backend .

RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main"]

FROM node:18-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./sec2_SquareSoft_backend/package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main"]
