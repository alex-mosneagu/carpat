# CLI (`@carpat/cli`)

Command-line interface for Romanian validators from `@carpat/core`.

**Current version:** `0.1.1`

## Install

::: code-group

```bash [pnpm]
pnpm add -g @carpat/cli
# or run once without installing
pnpm dlx @carpat/cli --help
```

```bash [npm]
npm install -g @carpat/cli
npx @carpat/cli --help
```

```bash [yarn]
yarn global add @carpat/cli
```

:::

The binary name is `carpat`.

## Commands

| Command | Description |
| --- | --- |
| `carpat cnp <value>` | Validate CNP |
| `carpat cui <value>` | Validate CUI/CIF |
| `carpat iban <value>` | Validate IBAN |
| `carpat phone <value>` | Validate phone number |
| `carpat postal <value>` | Validate postal code |
| `carpat id <series> <number>` | Validate ID card (CI) |
| `carpat address <text...>` | Normalize and parse address |
| `carpat county <query>` | Search counties (name, auto, code) |
| `carpat locality <query>` | Search localities |

## Options

| Flag | Description |
| --- | --- |
| `--json` | Machine-readable JSON output |
| `--format` | Also print the formatted value when valid |
| `--county <code>` | Filter `locality` by județ code |
| `-h, --help` | Show help |
| `-v, --version` | Show version (`0.1.1`) |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Valid / success |
| `1` | Invalid / no matches |
| `2` | Usage error |

## Examples

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

### JSON output

```bash
carpat cnp 1990101123450 --json
```

```json
{
  "ok": true,
  "command": "cnp",
  "value": "1990101123450",
  "formatted": "1 99 01 01 12 345 0",
  "data": {
    "sex": "M",
    "birthDate": "1999-01-01",
    "county": "Cluj",
    "countyCode": "12"
  }
}
```

County and locality search ignore Romanian diacritics (`iasi` matches `Iași`).

## Related

- [Core API](/api/core)
- [Installation](/guide/installation)
