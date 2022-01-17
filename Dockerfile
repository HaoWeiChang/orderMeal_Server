FROM node:14.18.2-alpine
COPY ./ /workspace
WORKDIR /workspace
RUN npm install

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npm", "start"]