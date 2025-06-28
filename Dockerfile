# Use the official Node.js image as the base image
FROM node:22.14.0 AS base-node
# Set the working directory in the container
WORKDIR /app
# Install dependencies
RUN npm install -g live-server

# Serve the website
FROM base-node AS web-server
COPY  ./output .
EXPOSE 8080
CMD ["live-server", "--host=0.0.0.0", "--port=8080"]

FROM python:3.13-slim AS python
# set the user to app
# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER APP
# RUN useradd -ms /bin/sh -u 1001 app
# USER app
WORKDIR /app
COPY . .

# Build static files using jinja2
FROM python AS jinja-builder
RUN pip install jinja2