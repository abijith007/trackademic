# Use a specific version of Python as the base images
FROM python:3.11.3

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

# Create a virtual environment in the /app/venv directory
RUN python -m venv /app/venv

# Activate the virtual environment
ENV PATH="/app/venv/bin:$PATH"

# Install Python dependencies from requirements.txt inside the virtual environment
RUN pip install -r requirements.txt

# Download the spaCy model
RUN python -m spacy download en_core_web_sm

# Expose the port on which the server will run
EXPOSE 4003

# Start the server using the virtual environment's Python
CMD [ "node", "index.js" ]
