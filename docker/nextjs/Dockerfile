
# Use the official Next.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
