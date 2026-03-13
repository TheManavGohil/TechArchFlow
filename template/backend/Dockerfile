FROM golang:1.23-alpine

RUN apk add --no-cache git

WORKDIR /usr/src/app

# Install Air for hot-reload
RUN go install github.com/air-verse/air@v1.61.6

# Copy go mod files and download dependencies
COPY go.mod go.sum* ./
RUN go mod download 2>/dev/null || true

# Copy source code
COPY . .

# Download all dependencies and generate go.sum
RUN go mod tidy

EXPOSE 3000

CMD ["air", "-c", ".air.toml"]
