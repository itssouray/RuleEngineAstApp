# Use an official Node.js image from Docker Hub
FROM node:20

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install  # Fixed lowercase "install"

# Copy the rest of the application code to the container
COPY . .

# Expose the application port
EXPOSE 7000

# Run the application
CMD ["npm", "run", "start"]
