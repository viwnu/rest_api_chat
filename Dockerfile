# Use Node.js version 18.17 image as base
FROM node:18.17

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build by Nest
RUN npm run build

# Copy the rest of the application code
# COPY . .

# Expose the port on which the Nest.js application will run
EXPOSE 9000

ENV NODE_ENV=production

# Command to start the Nest.js application
CMD ["npm", "run", "prod"]