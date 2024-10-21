FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node package*.json .

# change owner and install angular
RUN chown -R node:node /app && \
  npm install -g @angular/cli@18

# change to node user so that npm installed files are owned by it and the rest of the actions are executed as node.
# more secure
USER node

# install dependencies
RUN npm i

COPY --chown=node:node . .

RUN ng build

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
