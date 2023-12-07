
# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable for the Python program
ENV PYTHONPATH=/app

# Install Python and required packages
RUN apt-get update && apt-get install -y python3 python3-pip
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Expose the port on which the Node.js server will run
EXPOSE 4003

# Start the Node.js server
CMD [ "node", "index.js" ]
