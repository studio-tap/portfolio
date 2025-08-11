# Use the official Next.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY src/package.json src/package-lock.json* ./
RUN npm install

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]