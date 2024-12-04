# Use an official Node.js 16 image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json to the working directory
COPY package.json .

# Install project dependencies
RUN yarn

# Copy the entire project directory to the working directory
COPY . .

# Expose the desired port (default is 3000)
EXPOSE 8080

# Start the development server
CMD [ "yarn", "start" ]
