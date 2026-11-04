export type GameType = 'uno' | 'exploding-kittens' | 'co-vua' | 'co-tuong';
export type UnoMode = 'classic' | 'no-mercy' | 'flex';
export type UnoColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild';

export type ItemRarity = 'white' | 'blue' | 'purple' | 'red' | 'gold';

export interface InventoryItem {
  id: string; // unique instance id
  itemId: string; // template id
  name: string;
  rarity: ItemRarity;
  value: number; // coin sell value
  icon: string;
  obtainedAt: number;
}

export interface UserStats {
  unoWins: number;
  explodingKittensWins: number;
  totalWins: number;
  totalGames: number;
}

export interface PublicUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  balance: number;
  inventory?: InventoryItem[];
  stats: UserStats;
}

export interface RoomPlayer {
  id: string;
  sessionId?: string;
  userId?: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isBot: boolean;
  isReady: boolean;
  connected: boolean;
  hasPaidBet?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}

export interface EKExpansions {
  implodingKittens: boolean;
  streakingKittens: boolean;
  barkingKittens: boolean;
  timebombMode: boolean;
}

export interface RoomSettings {
  gameType: GameType;
  turnTimeLimit: number;
  unoMode: UnoMode;
  unoRules: {
    freeStacking: boolean;
    jumpIn: boolean;
    sevenZero: boolean;
    unoPenalty: boolean;
    mercyLimit: number;
    drawToMatch: boolean;
  };
  ekExpansions: EKExpansions;
  betAmount: number;
}

export interface RoomState {
  id: string;
  hostId: string;
  players: RoomPlayer[];
  settings: RoomSettings;
  inGame: boolean;
  chatMessages: ChatMessage[];
}

export interface GameLogEntry {
  id: string;
  timestamp: number;
  message: string;
  type: 'info' | 'action' | 'warning' | 'win' | 'special';
  playerId?: string;
}

// UNO
export interface UnoCard {
  id: string;
  color: UnoColor;
  value: string;
  pointValue: number;
  flexColor?: UnoColor;
  flexValue?: string;
}

export interface MaskedUnoPlayer {
  id: string;
  name: string;
  avatar: string;
  isBot: boolean;
  connected: boolean;
  cardCount: number;
  hasCalledUno: boolean;
  flexPowerActive: boolean;
  eliminated?: boolean;
  score?: number;
}

export interface MaskedUnoGameState {
  gameType: 'uno';
  mode: UnoMode;
  rules: RoomSettings['unoRules'];
  activeColor: UnoColor;
  topCard: UnoCard;
  lastPlayedBy?: string;
  lastPlayedCard?: UnoCard;
  lastPlayTimestamp?: number;
  pendingDrawCount: number;
  drawPileCount: number;
  currentTurnIndex: number;
  direction: 1 | -1;
  turnTimeLimit: number;
  turnStartTime: number;
  isGameOver: boolean;
  winners: string[];
  players: MaskedUnoPlayer[];
  myHand: UnoCard[];
  myFlexPower: boolean;
  canCallUno: boolean;
  canCatchUno: string[];
  logs: GameLogEntry[];
}

// Exploding Kittens
export type EKCardType =
  | 'exploding_kitten'
  | 'defuse'
  | 'attack'
  | 'skip'
  | 'favor'
  | 'shuffle'
  | 'see_the_future'
  | 'nope'
  | 'taco_cat'
  | 'hairy_potato_cat'
  | 'rainbow_ralphing_cat'
  | 'beard_cat'
  | 'cattermelon'
  // Imploding Kittens
  | 'imploding_kitten'
  | 'targeted_attack'
  | 'reverse'
  | 'draw_from_bottom'
  | 'feral_cat'
  | 'alter_the_future_3x'
  // Streaking Kittens
  | 'streaking_kitten'
  | 'super_skip'
  | 'see_the_future_5x'
  | 'alter_the_future_5x'
  | 'swap_top_and_bottom'
  | 'catomic_bomb'
  | 'garbage_collection'
  | 'curse_of_cat_butt'
  // Barking Kittens
  | 'barking_kitten'
  | 'personal_attack'
  | 'bury'
  | 'ill_take_that'
  | 'share_the_future';

export interface EKCard {
  id: string;
  type: EKCardType;
  name: string;
  description: string;
  isFaceUp?: boolean;
}

export interface MaskedEKPlayer {
  id: string;
  name: string;
  avatar: string;
  isBot: boolean;
  connected: boolean;
  cardCount: number;
  eliminated?: boolean;
}

export interface PendingAction {
  id: string;
  initiatorId: string;
  card: EKCard;
  actionType: 'single_card' | 'cat_pair' | 'cat_triple';
  targetPlayerId?: string;
  requestedCardType?: EKCardType;
  nopeCount: number;
  expiresAt: number;
}

export interface PendingDefusal {
  playerId: string;
  kittenCard: EKCard;
  expiresAt: number;
}

export interface PendingFavor {
  fromPlayerId: string;
  toPlayerId: string;
}

export interface MaskedEKGameState {
  gameType: 'exploding-kittens';
  drawPileCount: number;
  discardPile: EKCard[];
  lastPlayedBy?: string;
  lastPlayedCard?: EKCard;
  currentTurnIndex: number;
  direction: 1 | -1;
  turnTimeLimit: number;
  turnStartTime: number;
  isGameOver: boolean;
  winners: string[];
  players: MaskedEKPlayer[];
  myHand: EKCard[];
  pendingTurns: number;
  pendingAction: PendingAction | null;
  pendingDefusal: PendingDefusal | null;
  pendingFavor: PendingFavor | null;
  logs: GameLogEntry[];
  topDrawCardIsFaceUp?: boolean;
  topDrawCardName?: string;
  ekExpansions?: EKExpansions;
  curseActive?: boolean;
}

// Cờ Vua / Cờ Tướng (server gửi state động)
export interface MaskedCoVuaGameState {
  gameType: 'co-vua';
  players: any[];
  currentTurnIndex: number;
  isGameOver: boolean;
  winners: string[];
  logs: GameLogEntry[];
  [key: string]: any;
}

export interface MaskedCoTuongGameState {
  gameType: 'co-tuong';
  players: any[];
  currentTurnIndex: number;
  isGameOver: boolean;
  winners: string[];
  logs: GameLogEntry[];
  [key: string]: any;
}

export type AnyMaskedGameState =
  | MaskedUnoGameState
  | MaskedEKGameState
  | MaskedCoVuaGameState
  | MaskedCoTuongGameState;

// ========== CURRENCY & TRANSACTIONS ==========

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'work' | 'bet' | 'win' | 'room_bet' | 'room_win' | 'signup_bonus';
  details: string;
  timestamp: number;
  balanceAfter: number;
}

// ========== WORK SYSTEM ==========

export interface WorkChallenge {
  word: string;
  expiresAt: number;
}

export interface WorkResult {
  success: boolean;
  earned?: number;
  newBalance?: number;
  message?: string;
  nextAvailableAt?: number;
}

// ========== ROOM BETTING ==========

export interface RoomBetInfo {
  betAmount: number;
  potTotal: number;
  winMultiplier: number;
}
