import {
  formatCNP,
  formatIDCard,
  formatPhone,
  formatPostalCode,
  normalizeAddress,
  parseAddress,
  validateCNP,
  validateCUI,
  validateIBAN,
  validateIDCard,
  validatePhone,
  validatePostalCode,
} from '@carpat/core';
import {
  getCountyByAuto,
  getCountyByCode,
  getCountyByName,
  getLocalitiesByCounty,
  LOCALITIES,
  listCounties,
} from '@carpat/core/data';

export type ExitCode = 0 | 1 | 2;

interface Options {
  json: boolean;
  format: boolean;
  county?: string;
}

const HELP = `carpat — Romanian validators CLI

Usage:
  carpat <command> [args...] [options]

Commands:
  cnp <value>                 Validate CNP
  cui <value>                 Validate CUI/CIF
  iban <value>                Validate IBAN
  phone <value>               Validate phone number
  postal <value>              Validate postal code
  id <series> <number>        Validate ID card (CI)
  address <text...>           Normalize and parse address
  county <query>              Search counties (name, auto, code)
  locality <query>            Search localities (optional --county)

Options:
  --json                      Machine-readable JSON output
  --format                    Print formatted value when valid
  --county <code>             Filter localities by județ code
  -h, --help                  Show help
  -v, --version               Show version

Exit codes:
  0  valid / success
  1  invalid
  2  usage error

Examples:
  carpat cnp 1990101123450
  carpat cui RO18547290 --format
  carpat iban RO90RNCB0000000000001234 --json
  carpat id CJ 123456
  carpat phone +40 712 345 678 --format
  carpat county cluj
  carpat locality iasi --county 22
  carpat address str. Mihai Eminescu nr. 10, bl. A1
`;

function parseArgs(argv: string[]): {
  options: Options;
  command?: string;
  args: string[];
  help: boolean;
  version: boolean;
  error?: string;
} {
  const options: Options = { json: false, format: false };
  const args: string[] = [];
  let help = false;
  let version = false;
  let command: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === '-h' || token === '--help') {
      help = true;
      continue;
    }
    if (token === '-v' || token === '--version') {
      version = true;
      continue;
    }
    if (token === '--json') {
      options.json = true;
      continue;
    }
    if (token === '--format') {
      options.format = true;
      continue;
    }
    if (token === '--county') {
      const value = argv[++i];
      if (!value) return { options, args, help, version, error: 'Missing value for --county' };
      options.county = value;
      continue;
    }
    if (token.startsWith('-')) {
      return { options, args, help, version, error: `Unknown option: ${token}` };
    }
    if (!command) {
      command = token.toLowerCase();
    } else {
      args.push(token);
    }
  }

  return { options, command, args, help, version };
}

function printJson(payload: unknown) {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

function printHuman(lines: string[]) {
  process.stdout.write(`${lines.join('\n')}\n`);
}

function localDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Fold Romanian diacritics so `iasi` matches `Iași`. */
function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ș|ş/gi, 's')
    .replace(/ț|ţ/gi, 't')
    .toLowerCase();
}

function okJson(command: string, extra: Record<string, unknown>): ExitCode {
  printJson({ ok: true, command, ...extra });
  return 0;
}

function failJson(command: string, error: string, extra: Record<string, unknown> = {}): ExitCode {
  printJson({ ok: false, command, error, ...extra });
  return 1;
}

export function run(argv: string[]): ExitCode {
  const parsed = parseArgs(argv);

  if (parsed.error) {
    process.stderr.write(`${parsed.error}\n`);
    return 2;
  }

  if (parsed.help || (!parsed.command && !parsed.version)) {
    process.stdout.write(HELP);
    return parsed.help || !parsed.command ? 0 : 2;
  }

  if (parsed.version) {
    process.stdout.write('0.1.0\n');
    return 0;
  }

  const { command, args, options } = parsed;
  if (!command) {
    process.stderr.write('Missing command. Try `carpat --help`.\n');
    return 2;
  }

  switch (command) {
    case 'cnp': {
      const value = args[0];
      if (!value) {
        process.stderr.write('Usage: carpat cnp <value>\n');
        return 2;
      }
      const result = validateCNP(value);
      if (!result.valid) {
        return options.json
          ? failJson('cnp', result.error || 'Invalid CNP', { value })
          : (printHuman([`invalid: ${result.error}`]), 1);
      }
      const formatted = formatCNP(value.replace(/\s/g, ''));
      if (options.json) {
        return okJson('cnp', {
          value,
          formatted,
          data: {
            sex: result.data?.sex,
            birthDate: result.data?.birthDate ? localDate(result.data.birthDate) : undefined,
            county: result.data?.county,
            countyCode: result.data?.countyCode,
          },
        });
      }
      const lines = ['valid'];
      if (result.data) {
        lines.push(
          `sex: ${result.data.sex}`,
          `birthDate: ${localDate(result.data.birthDate)}`,
          `county: ${result.data.county} (${result.data.countyCode})`
        );
      }
      if (options.format) lines.push(`formatted: ${formatted}`);
      printHuman(lines);
      return 0;
    }

    case 'cui': {
      const value = args[0];
      if (!value) {
        process.stderr.write('Usage: carpat cui <value>\n');
        return 2;
      }
      const result = validateCUI(value);
      if (!result.valid) {
        return options.json
          ? failJson('cui', result.error || 'Invalid CUI', { value })
          : (printHuman([`invalid: ${result.error}`]), 1);
      }
      if (options.json) {
        return okJson('cui', { value, formatted: result.formatted });
      }
      printHuman(options.format ? ['valid', `formatted: ${result.formatted}`] : ['valid']);
      return 0;
    }

    case 'iban': {
      const value = args[0];
      if (!value) {
        process.stderr.write('Usage: carpat iban <value>\n');
        return 2;
      }
      const result = validateIBAN(value);
      if (!result.valid) {
        return options.json
          ? failJson('iban', result.error || 'Invalid IBAN', { value })
          : (printHuman([`invalid: ${result.error}`]), 1);
      }
      if (options.json) {
        return okJson('iban', {
          value,
          formatted: result.formatted,
          bankCode: result.bankCode,
          bankName: result.bankName,
        });
      }
      const lines = ['valid'];
      if (result.bankCode) lines.push(`bank: ${result.bankCode}${result.bankName ? ` — ${result.bankName}` : ''}`);
      if (options.format && result.formatted) lines.push(`formatted: ${result.formatted}`);
      printHuman(lines);
      return 0;
    }

    case 'phone': {
      const value = args[0];
      if (!value) {
        process.stderr.write('Usage: carpat phone <value>\n');
        return 2;
      }
      const result = validatePhone(value);
      if (!result.valid) {
        return options.json
          ? failJson('phone', result.error || 'Invalid phone', { value })
          : (printHuman([`invalid: ${result.error}`]), 1);
      }
      const formatted = formatPhone(value);
      if (options.json) {
        return okJson('phone', { value, formatted: result.formatted ?? formatted, type: result.type });
      }
      const lines = ['valid', `type: ${result.type}`];
      if (options.format) lines.push(`formatted: ${result.formatted ?? formatted}`);
      printHuman(lines);
      return 0;
    }

    case 'postal':
    case 'postal-code': {
      const value = args[0];
      if (!value) {
        process.stderr.write('Usage: carpat postal <value>\n');
        return 2;
      }
      const result = validatePostalCode(value);
      if (!result.valid) {
        return options.json
          ? failJson('postal', result.error || 'Invalid postal code', { value })
          : (printHuman([`invalid: ${result.error}`]), 1);
      }
      const formatted = formatPostalCode(value);
      if (options.json) {
        return okJson('postal', { value, formatted, sector: result.sector });
      }
      const lines = ['valid', `sector: ${result.sector}`];
      if (options.format) lines.push(`formatted: ${formatted}`);
      printHuman(lines);
      return 0;
    }

    case 'id':
    case 'ci':
    case 'id-card': {
      const series = args[0];
      const number = args[1];
      if (!series || !number) {
        process.stderr.write('Usage: carpat id <series> <number>\n');
        return 2;
      }
      const result = validateIDCard(series, number);
      if (!result.valid) {
        return options.json
          ? failJson('id', result.error || 'Invalid ID card', { series, number })
          : (printHuman([`invalid: ${result.error}`]), 1);
      }
      const formatted = formatIDCard(series, number);
      if (options.json) {
        return okJson('id', { series: result.series, number: result.number, formatted });
      }
      printHuman(options.format ? ['valid', `formatted: ${formatted}`] : ['valid']);
      return 0;
    }

    case 'address': {
      const value = args.join(' ').trim();
      if (!value) {
        process.stderr.write('Usage: carpat address <text...>\n');
        return 2;
      }
      const normalized = normalizeAddress(value);
      const parsed = parseAddress(value);
      if (options.json) {
        return okJson('address', { value, normalized, parsed });
      }
      printHuman([
        `normalized: ${normalized}`,
        `streetType: ${parsed.streetType ?? '-'}`,
        `streetName: ${parsed.streetName ?? '-'}`,
        `number: ${parsed.number ?? '-'}`,
        `building: ${parsed.building ?? '-'}`,
        `stair: ${parsed.stair ?? '-'}`,
        `apartment: ${parsed.apartment ?? '-'}`,
      ]);
      return 0;
    }

    case 'county': {
      const query = args.join(' ').trim();
      if (!query) {
        process.stderr.write('Usage: carpat county <query>\n');
        return 2;
      }
      const exact =
        getCountyByCode(query) || getCountyByAuto(query) || getCountyByName(query);
      const folded = fold(query);
      const matches = exact
        ? [exact]
        : listCounties().filter(
            (c) =>
              fold(c.name).includes(folded) ||
              fold(c.auto).includes(folded) ||
              c.code.includes(query)
          );
      if (matches.length === 0) {
        return options.json
          ? failJson('county', 'No county found', { query })
          : (printHuman(['no matches']), 1);
      }
      if (options.json) {
        return okJson('county', { query, matches });
      }
      printHuman(
        matches.map((c) => `${c.code}  ${c.auto.padEnd(3)}  ${c.name}`)
      );
      return 0;
    }

    case 'locality': {
      const query = args.join(' ').trim();
      if (!query) {
        process.stderr.write('Usage: carpat locality <query> [--county <code>]\n');
        return 2;
      }
      const folded = fold(query);
      const pool = options.county ? getLocalitiesByCounty(options.county) : LOCALITIES;
      const matches = pool.filter((l) => fold(l.name).includes(folded)).slice(0, 50);
      if (matches.length === 0) {
        return options.json
          ? failJson('locality', 'No locality found', { query, county: options.county })
          : (printHuman(['no matches']), 1);
      }
      if (options.json) {
        return okJson('locality', { query, county: options.county, matches });
      }
      printHuman(
        matches.map(
          (l) => `${l.siruta}  ${l.countyCode}  ${l.name} (${l.type})${l.postalCode ? `  ${l.postalCode}` : ''}`
        )
      );
      return 0;
    }

    case 'format': {
      // Convenience: carpat format phone 0712...
      const type = args[0]?.toLowerCase();
      const value = args[1];
      if (!type || !value) {
        process.stderr.write('Usage: carpat format <cnp|cui|iban|phone|postal|id> <value> [number]\n');
        return 2;
      }
      return run([type, ...(type === 'id' ? args.slice(1) : [value]), '--format']);
    }

    default:
      process.stderr.write(`Unknown command: ${command}\nTry \`carpat --help\`.\n`);
      return 2;
  }
}
