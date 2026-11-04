import { ItemRarity } from '../types/game';

export interface RarityStyle {
  border: string;
  bg: string;
  text: string;
  label: string;
  hex: string;
}

export const RARITY_CONFIG: Record<ItemRarity, RarityStyle> = {
  white: {
    border: 'border-white/40',
    bg: 'bg-white/[0.04]',
    text: 'text-white',
    label: 'Trắng',
    hex: '#e5e7eb'
  },
  blue: {
    border: 'border-sky-500/60',
    bg: 'bg-sky-500/[0.08]',
    text: 'text-sky-300',
    label: 'Xanh',
    hex: '#38bdf8'
  },
  purple: {
    border: 'border-purple-500/60',
    bg: 'bg-purple-500/[0.08]',
    text: 'text-purple-300',
    label: 'Tím',
    hex: '#a855f7'
  },
  red: {
    border: 'border-rose-500/60',
    bg: 'bg-rose-500/[0.08]',
    text: 'text-rose-300',
    label: 'Đỏ',
    hex: '#f43f5e'
  },
  gold: {
    border: 'border-amber-400/70',
    bg: 'bg-amber-400/[0.10]',
    text: 'text-amber-300',
    label: 'Vàng',
    hex: '#fbbf24'
  }
};

export const RARITY_ORDER: ItemRarity[] = ['white', 'blue', 'purple', 'red', 'gold'];
