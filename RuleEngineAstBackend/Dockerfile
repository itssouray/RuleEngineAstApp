FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install  # Fixed lowercase "install"

COPY . .

# Expose the application port
EXPOSE 7000

# Run the application
CMD ["npm", "run", "start"]
