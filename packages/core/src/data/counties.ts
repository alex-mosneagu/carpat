import type { County } from '../types.js';

export const COUNTIES: County[] = [
  { code: '01', name: 'Alba', auto: 'AB' },
  { code: '02', name: 'Arad', auto: 'AR' },
  { code: '03', name: 'Argeș', auto: 'AG' },
  { code: '04', name: 'Bacău', auto: 'BC' },
  { code: '05', name: 'Bihor', auto: 'BH' },
  { code: '06', name: 'Bistrița-Năsăud', auto: 'BN' },
  { code: '07', name: 'Botoșani', auto: 'BT' },
  { code: '08', name: 'Brașov', auto: 'BV' },
  { code: '09', name: 'Brăila', auto: 'BR' },
  { code: '10', name: 'Buzău', auto: 'BZ' },
  { code: '11', name: 'Caraș-Severin', auto: 'CS' },
  { code: '12', name: 'Cluj', auto: 'CJ' },
  { code: '13', name: 'Constanța', auto: 'CT' },
  { code: '14', name: 'Covasna', auto: 'CV' },
  { code: '15', name: 'Dâmbovița', auto: 'DB' },
  { code: '16', name: 'Dolj', auto: 'DJ' },
  { code: '17', name: 'Galați', auto: 'GL' },
  { code: '18', name: 'Gorj', auto: 'GJ' },
  { code: '19', name: 'Harghita', auto: 'HR' },
  { code: '20', name: 'Hunedoara', auto: 'HD' },
  { code: '21', name: 'Ialomița', auto: 'IL' },
  { code: '22', name: 'Iași', auto: 'IS' },
  { code: '23', name: 'Ilfov', auto: 'IF' },
  { code: '24', name: 'Maramureș', auto: 'MM' },
  { code: '25', name: 'Mehedinți', auto: 'MH' },
  { code: '26', name: 'Mureș', auto: 'MS' },
  { code: '27', name: 'Neamț', auto: 'NT' },
  { code: '28', name: 'Olt', auto: 'OT' },
  { code: '29', name: 'Prahova', auto: 'PH' },
  { code: '30', name: 'Satu Mare', auto: 'SM' },
  { code: '31', name: 'Sălaj', auto: 'SJ' },
  { code: '32', name: 'Sibiu', auto: 'SB' },
  { code: '33', name: 'Suceava', auto: 'SV' },
  { code: '34', name: 'Teleorman', auto: 'TR' },
  { code: '35', name: 'Timiș', auto: 'TM' },
  { code: '36', name: 'Tulcea', auto: 'TL' },
  { code: '37', name: 'Vaslui', auto: 'VS' },
  { code: '38', name: 'Vâlcea', auto: 'VL' },
  { code: '39', name: 'Vrancea', auto: 'VN' },
  { code: '40', name: 'București', auto: 'B' },
  { code: '41', name: 'București - Sector 1', auto: 'B' },
  { code: '42', name: 'București - Sector 2', auto: 'B' },
  { code: '43', name: 'București - Sector 3', auto: 'B' },
  { code: '44', name: 'București - Sector 4', auto: 'B' },
  { code: '45', name: 'București - Sector 5', auto: 'B' },
  { code: '46', name: 'București - Sector 6', auto: 'B' },
  { code: '51', name: 'Călărași', auto: 'CL' },
  { code: '52', name: 'Giurgiu', auto: 'GR' },
];

export function getCountyByCode(code: string): County | undefined {
  return COUNTIES.find((c) => c.code === code);
}

export function getCountyByAuto(auto: string): County | undefined {
  return COUNTIES.find((c) => c.auto === auto.toUpperCase());
}

export function getCountyByName(name: string): County | undefined {
  const normalized = name.toLowerCase();
  return COUNTIES.find((c) => c.name.toLowerCase() === normalized);
}
