FROM node:20-alpine AS builder
WORKDIR /app

# 1️⃣ Accept build-time arguments
ARG VITE_API_URL
ARG VITE_GITHUB_CLIENT_ID
ARG VITE_GITHUB_REDIRECT_URI
ARG VITE_BACKEND_URL


# 2️⃣ Expose them to Vite
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GITHUB_CLIENT_ID=$VITE_GITHUB_CLIENT_ID
ENV VITE_GITHUB_REDIRECT_URI=$VITE_GITHUB_REDIRECT_URI
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
