# ── Build Stage ──
FROM golang:1.23-alpine AS builder

RUN apk add --no-cache git

WORKDIR /usr/src/app

# Install Air for hot-reload
RUN go install github.com/air-verse/air@latest

# Copy go mod files first for better caching
COPY go.mod go.sum* ./
RUN go mod download

# Copy source code
COPY . .

RUN go mod tidy

# ── Development Stage ──
FROM golang:1.23-alpine

RUN apk add --no-cache git

WORKDIR /usr/src/app

# Copy Air binary from builder
COPY --from=builder /go/bin/air /go/bin/air

# Copy source code
COPY . .

RUN go mod tidy

EXPOSE 3000

CMD ["air", "-c", ".air.toml"]
