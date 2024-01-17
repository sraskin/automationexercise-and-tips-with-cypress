# Use the official Cypress image
FROM cypress/browsers

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Run Cypress tests
CMD ["npx", "cypress", "run", "e2e"]