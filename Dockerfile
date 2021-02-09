FROM node:10.15.3-alpine
WORKDIR /usr/app/maana-service
COPY . /usr/app/maana-service

RUN npm install && \
  npm run build

FROM node:10.15.3-alpine
WORKDIR /usr/app/maana-service
COPY --from=0 /usr/app/maana-service .

RUN npm install --production --no-optional && \
  npm dedupe && \
  npm cache clear --force

EXPOSE 8050

CMD ["npm", "run", "start"]
