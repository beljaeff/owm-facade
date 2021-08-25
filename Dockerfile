FROM node:14-alpine

ENV NODE_PATH=. \
    OWMF_HOST=0.0.0.0 \
    OWMF_PORT=8080 \
    OWMF_LOG_FOLDER=/tmp \
    DEBUG=owm-facade:*:info,owm-facade:*:error,owm-facade:*:warn

WORKDIR /opt/app

EXPOSE ${OWMF_PORT}

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

CMD [ "node", "./app.js" ]
