# frontend/Dockerfile

# 1. Node official image, stable version
FROM node:18-alpine

# 2. Working directory set karo container ke andar
WORKDIR /app

# 3. package.json and package-lock.json copy karo
COPY package.json package-lock.json* ./

# 4. Dependencies install karo
RUN npm install

# 5. Saare source code copy karo
COPY . .

# 6. Port expose karo
EXPOSE 3000

# 7. React dev server start karo
CMD ["npm", "start"]

