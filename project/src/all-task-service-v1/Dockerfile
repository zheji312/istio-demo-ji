FROM node:8-alpine
MAINTAINER Jeremy Ji

# Setup work directory
WORKDIR /app
COPY package.json ./

# Install dependencies and copy js file and views folder
RUN npm install --production
COPY all-task-service-v1.js ./
COPY views ./views

# Run
EXPOSE 3001
CMD ["npm", "start"]
