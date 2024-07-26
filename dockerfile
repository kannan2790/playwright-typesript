# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.37.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Command to run your tests
CMD ["npx", "playwright", "test"]