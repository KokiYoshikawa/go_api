FROM golang:alpine
RUN apk update
RUN apk add alpine-sdk
COPY ./server/ /app/go
WORKDIR /app/go
CMD ["go", "run", "main.go"]