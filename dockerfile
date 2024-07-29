
FROM mcr.microsoft.com/playwright:v1.45.0
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN npx playwright install
CMD ["npx", "playwright", "test"]