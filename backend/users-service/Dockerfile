# Use an official Node runtime as the base image
FROM node:19

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json to the working directory
COPY package.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 8080 available outside the container
EXPOSE 4001

# Run the application when the container launches
CMD ["npm", "start"]