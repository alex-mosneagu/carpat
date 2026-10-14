# @carpat/cli

Command-line interface for Romanian validators from `@carpat/core`.

**Version:** `0.1.1` · [Docs](https://alex-mosneagu.github.io/carpat/api/cli.html)

## Install

```bash
pnpm add -g @carpat/cli
# or run once
pnpm dlx @carpat/cli --help
```

## Usage

```bash
carpat cnp 1990101123450
carpat cui RO18547290 --format
carpat iban RO90RNCB0000000000001234 --json
carpat phone +40 712 345 678 --format
carpat postal 010001
carpat id CJ 123456
carpat address str. Mihai Eminescu nr. 10, bl. A1
carpat county cluj
carpat locality iasi --county 22
```

### Options

| Flag | Description |
| --- | --- |
| `--json` | JSON output |
| `--format` | Also print the formatted value when valid |
| `--county <code>` | Filter `locality` by județ code |
| `-h, --help` | Help |
| `-v, --version` | Version |

### Exit codes

- `0` — valid / success
- `1` — invalid / no matches
- `2` — usage error

## License

MIT © Alex Mosneagu
