# Use a specific version of Python as the base image
FROM python:3.8

# Set the working directory inside the container
WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install Python dependencies from requirements.txt
RUN pip install -r requirements.txt
RUN python -m spacy download en_core_web_sm
# Expose the port on which the server will run
EXPOSE 4003

RUN echo Starting
# Start the server
CMD [ "node", "index.js" ]
