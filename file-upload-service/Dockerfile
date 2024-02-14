FROM oven/bun:1.0.14-alpine

WORKDIR /app

RUN mkdir files && chmod ugo+w files

COPY package.json bun.lockb ./

RUN bun i --frozen-lockfile

COPY ./src ./src

RUN bun build ./src/index.ts --compile --outfile cli

USER bun

CMD ["/app/cli"]
