# syntax=docker/dockerfile:1

# This repo is an npm workspaces monorepo: a single root package-lock.json
# covers both client/ and server/, so `npm ci` must run from the repo root
# with every workspace's package.json present.

# Stage 1: Build client + server
# The build needs devDependencies (typescript, vite, @vitejs/plugin-react...).
# NODE_ENV is pinned to development here so they are always installed, even if
# the host/build platform exports NODE_ENV=production (e.g. Render).
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
RUN npm ci --include=dev --no-audit --no-fund
COPY client ./client
COPY server ./server
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Prod dependencies only (root + both workspace manifests)
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

# Compiled server serves the SPA from ../../client/dist (i.e. /app/client/dist)
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

# Render injects PORT at runtime; the server already reads process.env.PORT.
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server/dist/server.js"]
