FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy source code
COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
