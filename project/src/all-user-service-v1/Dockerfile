FROM node:8-alpine
MAINTAINER Jeremy Ji

# Setup work directory
WORKDIR /app
COPY package.json ./

# Install dependencies and copy js file
RUN npm install --production
COPY all-user-service-v1.js ./

# Run
EXPOSE 3001
CMD ["npm", "start"]
