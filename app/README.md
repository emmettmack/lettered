# lettered app

Expo SDK 58, Expo Router, TypeScript. First draft: every screen works on mock data.

## Run

```bash
cd app
npm install
npx expo start --web     # opens in a browser, phone-sized is best
```

Scan the QR code from `npx expo start` with Expo Go to run it on a phone. Liquid Glass shows on iOS 26 and falls back to blur elsewhere.

## Walk-through

1. Cover → **Apply** (name, what you do, six photos, song, one line) → **Received.**
2. On Received, tap **Demo · open the email** → **Open lettered** → Accepted.
3. Or from the cover tap **I was invited** and enter any 4+ character code → Accepted (Roster copy).
4. **Start membership** opens a stand-in subscription sheet. **I have a code** takes any 6+ characters.
5. Inside: Discover (Date and Friends), say yes to Ava, June, Theo or Cole to match, message, Messages, You.

Demo-only controls are labeled "Demo" and must be removed before launch.

## Layout

- `src/app/`: routes. `(tabs)/` is the member area.
- `src/lib/theme.ts`: brand tokens from `docs/brand.md`.
- `src/lib/store.tsx`, `src/lib/data.ts`: mock state and people. Replace with the backend.
- `src/components/`: shared UI. `Glass` is Liquid Glass on iOS 26, blur elsewhere.
- `assets/icon.png`: the 1024 app icon, exported from `../assets/logo/torch.svg`.

## Before App Store

Apple Developer account, EAS build, in-app purchase, backend, real photos, moderation (report, block, delete account), privacy policy and age rating. See the plan in CLAUDE.md.

## Publish the web demo

```bash
cd app && npx expo export -p web   # baseUrl is /lettered/app in app.json
```

Copy `dist/` into `app/` on the `gh-pages` branch (also copy `index.html` to `404.html`, keep `.nojekyll`), commit and push. Pages serves `gh-pages`; the old prototype stays at the site root.
