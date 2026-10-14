const STREET_TYPES: Record<string, string> = {
  str: 'Strada',
  'str.': 'Strada',
  strada: 'Strada',
  bd: 'Bulevardul',
  'bd.': 'Bulevardul',
  bld: 'Bulevardul',
  'bld.': 'Bulevardul',
  bulevard: 'Bulevardul',
  bulevardul: 'Bulevardul',
  al: 'Aleea',
  'al.': 'Aleea',
  aleea: 'Aleea',
  spl: 'Splaiul',
  'spl.': 'Splaiul',
  splaiul: 'Splaiul',
  piata: 'Piața',
  piața: 'Piața',
  pta: 'Piața',
  'pta.': 'Piața',
  cal: 'Calea',
  'cal.': 'Calea',
  calea: 'Calea',
  sos: 'Șoseaua',
  'sos.': 'Șoseaua',
  șos: 'Șoseaua',
  'șos.': 'Șoseaua',
  șoseaua: 'Șoseaua',
  soseaua: 'Șoseaua',
  intr: 'Intrarea',
  'intr.': 'Intrarea',
  intrarea: 'Intrarea',
};

export function normalizeStreetType(input: string): string {
  const words = input.trim().split(/\s+/);
  if (words.length === 0) return input;

  const firstWord = words[0].toLowerCase();
  if (firstWord in STREET_TYPES) {
    return [STREET_TYPES[firstWord], ...words.slice(1)].join(' ');
  }

  return input;
}

export function normalizeAddress(address: string): string {
  let normalized = address.trim();

  normalized = normalized.replace(/\s+/g, ' ');

  const parts = normalized.split(',').map((part) => {
    const trimmed = part.trim();
    return normalizeStreetType(trimmed);
  });

  return parts.join(', ');
}

export interface ParsedAddress {
  streetType?: string;
  streetName?: string;
  number?: string;
  building?: string;
  stair?: string;
  apartment?: string;
  raw: string;
}

export function parseAddress(address: string): ParsedAddress {
  const normalized = normalizeAddress(address);
  const result: ParsedAddress = { raw: normalized };

  const parts = normalized.split(',').map((p) => p.trim());
  if (parts.length === 0) return result;

  const streetPart = parts[0];
  const words = streetPart.split(/\s+/);

  for (const [key, value] of Object.entries(STREET_TYPES)) {
    if (words[0].toLowerCase() === key.toLowerCase() || words[0] === value) {
      result.streetType = value;
      result.streetName = words
        .slice(1)
        .join(' ')
        .replace(/,?\s*nr\.?\s*\d+.*$/, '');
      break;
    }
  }

  const numberMatch = normalized.match(/\b(?:nr\.?|numărul)\s*(\d+[A-Z]?)/i);
  if (numberMatch) {
    result.number = numberMatch[1];
  }

  const blockMatch = normalized.match(/\b(?:bl\b\.?|bloc\b)\s+([A-Z0-9]+)/i);
  if (blockMatch) {
    result.building = blockMatch[1];
  }

  const stairMatch = normalized.match(/\b(?:sc\b\.?|scara\b)\s+([A-Z0-9]+)/i);
  if (stairMatch) {
    result.stair = stairMatch[1];
  }

  const aptMatch = normalized.match(/\b(?:ap\.?|apt\.?|apartament)\s*(\d+)/i);
  if (aptMatch) {
    result.apartment = aptMatch[1];
  }

  return result;
}
