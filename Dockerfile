# Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Copy rest of application and build
COPY . .
RUN npm --prefix FrontEnd install && npm --prefix BackEnd install && npm --prefix FrontEnd run build

# Expose the port the app runs on
EXPOSE 8000

# Run the app
# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "--prefix", "BackEnd", "start"]

# ENTRYPOINT ["/bin/sh"]
