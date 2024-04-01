FROM node:12.14.0

# Create app directory
RUN mkdir -p /apppodbit

# install imagemagick
RUN apt install imagemagick
WORKDIR /apppodbit

# Bundle app source
COPY . /apppodbit

RUN npm install

# Mount persistent storage
VOLUME /apppodbit/data

VOLUME /apppodbit/public/uploads

EXPOSE 3000
CMD [ "npm", "start" ]

