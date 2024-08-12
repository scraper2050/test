# Node.js 19-alpine as the base image
FROM node:19-alpine

# Working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application with environment variables
ARG REACT_APP_BASE_URL
ARG REACT_APP_API_URL
ARG REACT_APP_API_V2_URL
ARG REACT_APP_GOOGLE_APP_ID
ARG REACT_APP_FACEBOOK_APP_ID
ARG REACT_APP_GOOGLE_KEY
ARG REACT_APP_SOCKET_URL
ARG REACT_APP_TELEMETRY_KEY
ARG REACT_APP_LAMBDA_URL

ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL \
    REACT_APP_API_URL=$REACT_APP_API_URL \
    REACT_APP_API_V2_URL=$REACT_APP_API_V2_URL \
    REACT_APP_GOOGLE_APP_ID=$REACT_APP_GOOGLE_APP_ID \
    REACT_APP_FACEBOOK_APP_ID=$REACT_APP_FACEBOOK_APP_ID \
    REACT_APP_GOOGLE_KEY=$REACT_APP_GOOGLE_KEY \
    REACT_APP_SOCKET_URL=$REACT_APP_SOCKET_URL \
    REACT_APP_TELEMETRY_KEY=$REACT_APP_TELEMETRY_KEY \
    REACT_APP_LAMBDA_URL=$REACT_APP_LAMBDA_URL

RUN yarn build

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
