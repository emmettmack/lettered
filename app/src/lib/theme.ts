// Brand tokens. Source of truth: docs/brand.md
export const color = {
  night: '#0C0C0B',
  night2: '#161614',
  night3: '#24231F',
  bone: '#F1EEE7',
  ash: '#8C8980',
  smoke: '#5C5A54',
  // Olympic-poster accents
  torch: '#E2412D',
  sky: '#2F7FD0',
  sun: '#F2C230',
  grass: '#2FA562',
  paper: '#F0E9D2',
} as const;

export const font = {
  serif: 'Newsreader_300Light',
  serifItalic: 'Newsreader_300Light_Italic',
  sans: 'HankenGrotesk_400Regular',
  sansMedium: 'HankenGrotesk_500Medium',
  sansSemi: 'HankenGrotesk_600SemiBold',
} as const;

export const space = { gutter: 28 } as const;

export const band = [color.torch, color.sun, color.sky, color.grass] as const;
