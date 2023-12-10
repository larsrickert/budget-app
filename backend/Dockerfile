FROM golang:1.21-alpine as builder

# Define build env
ENV GOOS linux
ENV CGO_ENABLED 0
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -v cmd/app/main.go

FROM alpine

WORKDIR /app
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/main ./

EXPOSE 8090
CMD ["./main", "serve", "--http=0.0.0.0:8090"]
