# Multi-stage Docker build for AGI Learning Platform
ARG NODE_VERSION=18
ARG NGINX_VERSION=1.24-alpine

# Stage 1: Build frontend
FROM node:${NODE_VERSION}-alpine AS frontend-builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY vite.config.js ./
COPY jsconfig.json ./
COPY components.json ./

# Build arguments
ARG VERSION
ARG BUILD_TIME
ARG COMMIT_SHA

# Build the application
ENV VITE_APP_VERSION=${VERSION}
ENV VITE_BUILD_TIME=${BUILD_TIME}
ENV VITE_COMMIT_SHA=${COMMIT_SHA}
ENV NODE_ENV=production

RUN pnpm run build

# Stage 2: Build backend
FROM node:${NODE_VERSION}-alpine AS backend-builder

WORKDIR /app

# Copy backend files
COPY server/package*.json ./
COPY server/ ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Remove development dependencies and clean up
RUN npm prune --production

# Stage 3: Production runtime
FROM nginx:${NGINX_VERSION} AS production

# Install Node.js for backend
RUN apk add --no-cache nodejs npm

# Create app directory
WORKDIR /app

# Copy backend from builder
COPY --from=backend-builder /app ./backend

# Copy frontend build from builder
COPY --from=frontend-builder /app/dist ./frontend

# Copy nginx configuration
COPY .github/deployment/nginx.conf /etc/nginx/nginx.conf
COPY .github/deployment/default.conf /etc/nginx/conf.d/default.conf

# Copy startup scripts
COPY .github/deployment/entrypoint.sh /entrypoint.sh
COPY .github/deployment/healthcheck.sh /healthcheck.sh

# Make scripts executable
RUN chmod +x /entrypoint.sh /healthcheck.sh

# Create non-root user
RUN addgroup -g 1001 -S app && \
    adduser -S app -u 1001 -G app

# Set permissions
RUN chown -R app:app /app && \
    chown app:app /entrypoint.sh /healthcheck.sh

# Add metadata
LABEL maintainer="AGI Learning Platform Team" \
      version="${VERSION}" \
      description="AGI Learning Platform - Full Stack Application" \
      org.opencontainers.image.title="AGI Learning Platform" \
      org.opencontainers.image.description="AI-powered learning platform with VR/AR support" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.created="${BUILD_TIME}" \
      org.opencontainers.image.revision="${COMMIT_SHA}" \
      org.opencontainers.image.vendor="AGI Platform" \
      org.opencontainers.image.source="https://github.com/agi-platform/learning-platform"

# Expose ports
EXPOSE 80 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD /healthcheck.sh

# Switch to non-root user
USER app

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Default command
CMD ["nginx", "-g", "daemon off;"]

# Environment variables
ENV NODE_ENV=production \
    PORT=5001 \
    FRONTEND_URL=http://localhost \
    BACKEND_URL=http://localhost:5001 