# Dockerfile
FROM node:20-alpine

# Set work directory
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Set user node
USER node

# Copy required directries and files
ADD --chown=node:node client client
ADD --chown=node:node server server
ADD .envConfig .envConfig

# Build the project
RUN npm --prefix client install && npm --prefix server install && npm --prefix client run build

# Expose the port the app runs on
EXPOSE 8000

# Run the app
CMD ["npm", "--prefix", "server", "start"]