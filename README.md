# Boardgame online 🃏💣♠️
### Production-Ready Multiplayer Card & Board Game Platform

[![Tests](https://img.shields.io/badge/tests-8%20passed-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)]()
[![React](https://img.shields.io/badge/React-18.2-cyan.svg)]()
[![Socket.io](https://img.shields.io/badge/Socket.io-4.7-black.svg)]()
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)]()

Boardgame online is a full-stack, server-authoritative online multiplayer card and board game platform supporting 2 to 8 players, built with anti-cheat state masking, heuristic AI bot integration, and responsive visual design.

---

## 1. Supported Games & Specifications

### 🂡 A. UNO (Classic, Show 'Em No Mercy, and Flex Modes) [2 - 8 Players]
- **Classic Mode**: Standard 108 cards (0-9, Skip, Reverse, Draw Two, Wild, Wild Draw Four).
- **Show 'Em No Mercy Mode**:
  - Extreme action cards: Wild Draw 6, Wild Draw 10, Skip Everyone, Discard All, Wild Color Roulette.
  - **Mercy Rule Knockout**: Any player who accumulates 25 or more cards in hand is instantly knocked out and eliminated!
- **Flex Mode**:
  - Dual-action/dual-color cards with regular face and flex face.
  - Interactive **Flex Power Card** tracker (Green check / Red X) allowing players to switch between regular effects and powered flex effects.
- **House Rules (Host Toggles)**:
  - **Free Stacking (Cộng dồn tự do)**: Chain penalty draw cards (+2 on +2; +4 on +2; in No Mercy, stack +2, +4, +6, +10 freely). Accumulates until a player cannot match and must draw the total penalty!
  - **Jump-In (Cướp lượt)**: Play out of turn if holding an exact matching card (same color and value).
  - **7-0 Rule**: Playing a '7' triggers an interactive hand swap modal; playing a '0' shifts all hands in current play direction.
  - **UNO Shout / Catch**: Call UNO when holding 1 card; opponents can click "Catch UNO!" to penalize uncalled players with +2 cards.

---

### 💣 B. Exploding Kittens (Mèo Nổ) [2 - 5 Players]
- **Complete Deck Engine**: Exploding Kittens ($Players - 1$), Defuses, Attacks, Skips, Favors, Shuffles, See the Future (3x), Nopes, and Cat combo cards (Taco Cat, Hairy Potato Cat, Rainbow Ralphing Cat, Beard Cat, Cattermelon).
- **Interactive 3-Second Nope Reaction Window**:
  - Whenever an action card or cat combo is played, an animated 3-second global reaction window triggers.
  - Any player with a "Nope" card can interrupt and slam "NOPE!" to cancel the action.
  - Chained Nopes ("Nope the Nope!") are supported; an odd number cancels the action, an even number restores it.
- **10-Second Defusal Emergency Window**:
  - Drawing an Exploding Kitten gives the player 10 seconds to play a Defuse card.
  - An interactive modal lets the player choose where to secretly re-insert the Kitten back into the draw deck (Top, Bottom, or Random).
  - Failure to defuse leads to immediate explosion and elimination. Last survivor wins!
- **Private See the Future**: Top 3 cards are transmitted only to the requesting player's client.

---

### ♟️ C. Cờ Vua (Chess) [2 Players]
- **Bàn cờ 8x8** với đầy đủ quân: Tốt, Xe, Mã, Tượng, Hậu, Vua.
- **Luật di chuyển chuẩn**: kiểm tra nước đi hợp lệ, chặn đường, ăn quân và tự động phong cấp Tốt thành Hậu.
- **Check & kết thúc ván**: phát hiện chiếu tướng; ăn Vua hoặc đối thủ hết nước hợp lệ sẽ kết thúc trận.
- **Bot AI**: chọn nước đi hợp lệ và ưu tiên ăn quân.

---

### 🀄 D. Cờ Tướng (Xiangqi) [2 Players]
- **Bàn cờ 10x9** với Cung tướng, sông và đầy đủ quân: Tướng, Sĩ, Voi, Xe, Pháo, Mã, Tốt.
- **Luật chuẩn**: Tượng không qua sông và bị chặn mắt, Mã bị chặn chân, Pháo ăn bằng cách nhảy qua 1 quân, Tốt qua sông được đi ngang.
- **Check & kết thúc ván**: ăn Tướng hoặc đối thủ hết nước hợp lệ sẽ kết thúc trận.
- **Bot AI**: chọn nước đi hợp lệ và ưu tiên ăn quân.

---

## 2. Server-Authoritative Anti-Cheat & Bot AI Architecture

### Anti-Cheat State Masking
- The server stores the authoritative game state and secret draw deck.
- Deck shuffling uses Node.js `crypto.randomInt` (cryptographically secure Fisher-Yates shuffle).
- **State Masking**:
  - Clients only receive their own hand cards (`myHand`).
  - Opponents' hands are redacted to metadata: `{ cardCount: number, hasCalledUno, connected, rank }`.
  - Draw deck card identities are completely secret; only the remaining count is broadcast.
  - Private actions ("See the Future", Defuse placement) are routed exclusively to the targeted socket.

### AI Bot Controller (`BotController.ts`)
- Room host can add or kick AI Bots to fill empty slots (2 to 8 players).
- Realistic heuristics with simulated human delay (1000ms - 1800ms):
  - **UNO**: Prioritizes shedding high-point cards, attacks opponents with action cards, handles draw stacking challenges, shouts UNO at 1 card, and catches opponents who fail to call UNO.
  - **Exploding Kittens**: Uses "See the Future" to detect danger, plays Skip/Attack to avoid hot decks, tactically reinserts defused kittens at the top, and uses Nope to counter opponent attacks.
  - **Cờ Vua / Cờ Tướng**: Generates all legal moves and prioritizes capturing opponent pieces.

---

## 3. Project Directory Structure

```text
├── server/
│   ├── src/
│   │   ├── engines/
│   │   │   ├── BaseGame.ts                # Abstract game engine & CSPRNG shuffle
│   │   │   ├── uno/
│   │   │   │   ├── UnoGame.ts             # UNO engine (Classic, No Mercy, Flex)
│   │   │   │   ├── UnoDeck.ts             # Deck generators
│   │   │   │   ├── types.ts               # Card types & house rules
│   │   │   │   └── UnoGame.test.ts        # Unit tests
│   │   │   ├── exploding-kittens/
│   │   │   │   ├── ExplodingKittensGame.ts # Mèo Nổ engine (3s Nope, 10s Defuse)
│   │   │   │   ├── types.ts
│   │   │   │   └── ExplodingKittensGame.test.ts
│   │   │   ├── co-vua/
│   │   │   │   └── CoVuaGame.ts            # Cờ Vua engine (8x8, check, promotion)
│   │   │   ├── co-tuong/
│   │   │   │   └── CoTuongGame.ts          # Cờ Tướng engine (10x9, palace, river)
│   │   │   └── ai/
│   │   │       ├── BotController.ts       # Autonomous bot coordinator
│   │   │       └── strategies/
│   │   │           ├── UnoBotStrategy.ts
│   │   │           └── ExplodingKittensBotStrategy.ts
│   │   ├── rooms/
│   │   │   └── RoomManager.ts             # 6-char room codes, sessions, chat
│   │   ├── sockets/
│   │   │   └── gameHandlers.ts            # Socket.io masked state distribution
│   │   └── server.ts                      # Express + Socket.io + Static SPA host
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── lobby/
│   │   │   │   └── LobbyView.tsx          # 2-8 player lobby & game customizers
│   │   │   ├── table/
│   │   │   │   ├── TableView.tsx          # Circular card table layout
│   │   │   │   └── VictoryModal.tsx       # Winner podium & rankings
│   │   │   ├── uno/
│   │   │   │   └── UnoTableView.tsx       # Fan-out hand, wild & swap modals
│   │   │   └── exploding-kittens/
│   │   │       └── ExplodingKittensTableView.tsx # 3s Nope overlay, Defuse modal
│   │   ├── hooks/
│   │   │   └── useGameSocket.ts           # Reconnection resilience & socket sync
│   │   ├── utils/
│   │   │   └── sound.ts                   # Web Audio API synthesizer
│   │   ├── types/
│   │   │   └── game.ts
│   │   ├── App.tsx
│   │   └── main.tsx
├── Dockerfile                             # Multi-stage production container
├── docker-compose.yml                     # Docker compose configuration
└── README.md
```

---

## 4. Quickstart: Running Locally

### Prerequisites
- Node.js LTS (v20+)
- npm (v10+)

### 1. Build and Run Server & Client
```bash
# In the root directory:
npm run build

# Start the server (serves both API, WebSockets, and static client on port 3000):
npm start
```
Open `http://localhost:3000` in your browser!

### 2. Run in Development Mode
```bash
# Terminal 1: Run Server with live reload
npm run dev:server

# Terminal 2: Run Client with Vite HMR
npm run dev:client
```
Client dev server runs on `http://localhost:5173` (proxied to server on port 3000).

### 3. Run Automated Engine Unit Tests
```bash
npm run test:server
```

---

## 5. Running with Docker

Deploy the single containerized monorepo with `docker-compose`:

```bash
docker-compose up -d --build
```
The game will be live at `http://localhost:3000`.

To view container logs:
```bash
docker-compose logs -f
```

To stop:
```bash
docker-compose down
```

---

## 6. Deploy on Render.com

### Option A — Native Node service (recommended)

1. **New → Web Service**, connect this repository, branch `main`.
2. **Runtime:** Node · **Build Command:** `npm ci --include=dev --no-audit --no-fund && npm run build`
3. **Start Command:** `npm start` · **Health Check Path:** `/api/health`
4. **Environment:** `NODE_ENV=production`, `NODE_VERSION=20.19.0`

> ⚠️ `--include=dev` is required. Render sets `NODE_ENV=production` during the build,
> so a plain `npm install` / `npm ci` skips `devDependencies` → `typescript` and `vite`
> are missing → `npm run build` exits with code 1
> (`process "/bin/sh -c npm run build" did not complete successfully`).

### Option B — Docker service

Render can build the included `Dockerfile` directly:
**New → Web Service → Runtime: Docker**, then set the same health check path and
environment variables. The Dockerfile installs dev dependencies in its builder
stage (`npm ci --include=dev`) and ships only production dependencies in the
runtime stage.

### Persistent data (important on the free plan)

Render's free instances have an ephemeral filesystem: JSON files under `data/`
are lost on every redeploy or restart. To keep accounts, coins and stats, create
a free [Upstash Redis](https://upstash.com) database and add these environment
variables in **Dashboard → Environment**:

```
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxx
```

The server automatically restores and saves through Upstash when both variables
are present (`server/src/storage/redisRest.ts`) and falls back to local JSON
files when they are not.

### Free plan keep-alive

Free web services spin down after ~15 minutes without traffic. The included
GitHub Actions workflow `.github/workflows/keep-alive.yml` pings
`/api/health` every 10 minutes to keep the instance warm (override the target
URL with the repository variable `RENDER_URL`).

