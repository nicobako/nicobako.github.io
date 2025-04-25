# Use the official Node.js image as the base image
FROM node:22.14.0 AS base
# Set the working directory in the container
WORKDIR /app
# Install dependencies
RUN npm install -g live-server

# Serve the website
FROM base AS web
COPY . .
EXPOSE 8080
CMD ["live-server", "--host=0.0.0.0", "--port=8080"]
