# Node ka official image use kar rahe hain
FROM node:18

# Container ke andar working directory set karte hain
WORKDIR /usr/src/app

# Package files copy kar ke dependencies install karte hain
COPY package*.json ./
RUN npm install

# Baaki source code copy kar dete hain
COPY . .

# Port expose karte hain
EXPOSE 4000

# App start karte hain (production mode me nodemon nahi chalayenge)
CMD ["node", "server.js"]

