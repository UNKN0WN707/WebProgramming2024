# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

<<<<<<< HEAD
# Expose port 3001
EXPOSE 3000

# Define environment variables
ENV EXPRESS_URL http://localhost:3000
=======
# Expose port 3000
EXPOSE 3000

>>>>>>> Sreypich

# Define the command to run the Express app
CMD ["npm", "start"]