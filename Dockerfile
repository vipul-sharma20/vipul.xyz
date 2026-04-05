FROM node:20-alpine AS builder

WORKDIR /app

# Copy content, assets, and config
COPY content/ ./content/
COPY assets/ ./assets/
COPY config.toml ./config.toml

# Copy frontend
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /app/frontend
RUN npm ci

COPY frontend/ ./

# Symlink assets into public (remove existing symlink from COPY)
RUN rm -f ./public/assets && ln -s /app/assets ./public/assets

# Build (runs prebuild.mjs + next build)
RUN npm run build

# --- Serve with nginx ---
FROM nginx:alpine

COPY --from=builder /app/frontend/out /usr/share/nginx/html
COPY --from=builder /app/assets /usr/share/nginx/html/assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix file permissions — some files may have restrictive perms from local edits
RUN chmod -R a+r /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
