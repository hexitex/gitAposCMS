FROM node:12.14.0

# Create app directory
RUN mkdir -p /apppodbit
RUN mkdir -p /apptim
# install imagemagick
RUN apt install imagemagick
WORKDIR /apppodbit

# Bundle app source
COPY . /apppodbit
COPY . /apptim
RUN npm install

# Mount persistent storage
VOLUME /apppodbit/data
VOLUME /apptim/data
VOLUME /apppodbit/public/uploads
VOLUME /apptim/public/uploads
# VOLUME /apppodbit/public/uploads/attachments
#VOLUME /app3/public
#VOLUME /app3/public/.well-known/acme-challenge
ENV APOS_ALWAYS_COPY_ASSETS=1
EXPOSE 3000
CMD [ "npm", "start" ]

