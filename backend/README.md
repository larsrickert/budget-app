# Budget App Backend (PocketBase)

## Prerequisites

- You need to have [Go](https://go.dev) installed on your machine.

## Project Setup

**Note**: On Windows, if you get the error: cgo: C compiler "gcc" not found: exec: "gcc": executable file not found in %PATH%",

run the following command before running or building the API:

```sh
$env:CGO_ENABLED='0'
```

### Run locally

```sh
go run cmd/api/main.go serve
```

### Build for production

```sh
go build cmd/api/main.go
```
