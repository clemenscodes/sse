# Notes App

## Requirements

- docker compose

## Quickstart

```sh
docker compose -f apps/notes/docker/production/docker-compose.yaml up
```

### Alternative

Install dependencies

```sh
yarn
```

Run yarn script

```sh
yarn prod
```

Or:

```sh
yarn nx serve --configuration=production
```

## Development

```sh
yarn dev
```

Or:

```sh
yarn nx serve 
```
