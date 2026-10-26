import type { Smr } from '../types/smr';

export const MOCK_SMRS: Smr[] = [
  {
    id: 1,
    manufacturer: 'РОСАТОМ',
    name: 'РИТМ-200',
    image_url: null,
    video_url: null,
    thermal_power: 190,
    electrical_power: 50,
    description:
      'Малый модульный реактор на основе проверенных технологий водо-водяного энергетического реактора. Предназначен для энергоснабжения удалённых территорий.',
  },
]

export const MOCK_LIKES: Record<number, number> = {
  1: 3,
};

export function getMockSmr(id: number | string): Smr | undefined {
  return MOCK_SMRS.find((s) => s.id === Number(id));
}

export const DEFAULT_VIDEO = '/videos/default_smr.mp4';
export const DEFAULT_IMAGE = '/images/default_smr.png';
