# Use Node.js 20 (LTS) as base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN if [ -f package.json ]; then npm install; fi

# Copy project files
COPY . .

# Expose Ionic dev server port
EXPOSE 8100

# Default command: start development server
CMD ["npm", "run", "dev"]
