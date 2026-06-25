<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TRDEFI Landing Page - Deploy Guide

## Netlify Site
- **Production URL**: https://trdefi-landing.netlify.app
- **Site ID**: f98d3b5f-2be3-46af-adb4-6ec0a7ae8589
- **Netlify Account**: trdefi1985 / Team: SmiteSpeak
- **API Token**: nfp_W3c2ZYbV78ySvQSgSmjUhKfPN2qnv3kfc8f5

## Branch
- `master` — Claude design v1
- `feature/claude-design-v2` — Claude design v2 + OnrampPopup

## Deploy Steps (Windows PowerShell 5.1)
```powershell
cd "C:\Users\cemya\Documents\Codex\crossmint + payram project\landing-page"
git checkout feature/claude-design-v2
# Clean build
Remove-Item -LiteralPath ".\.next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath ".\out" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath ".\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
npm install
npm run build  # next build && node fix-manifest.js
# Deploy
$env:NETLIFY_AUTH_TOKEN = "nfp_W3c2ZYbV78ySvQSgSmjUhKfPN2qnv3kfc8f5"
npx netlify deploy --dir="./out" --prod --site=f98d3b5f-2be3-46af-adb4-6ec0a7ae8589
```

## Critical Notes
- `fix-manifest.js` must run after `next build` (automated in package.json build script)
- `netlify.toml` has `command = "echo"` — Netlify should NOT run build (it fails due to Node.js version)
- Always clean `.next`, `out`, `node_modules` before rebuild
- This is a **static export** (`output: "export"` in next.config.js)
- OnrampPopup scroll: `max-h-[90vh] flex flex-col` + `overflow-y-auto flex-1 min-h-0`

## Deleted Sites
- ~~trdefi-onramp.netlify.app~~ — User requested deletion
- ~~payram-landing.netlify.app~~ — CDN cache issue, replaced by trdefi-landing

## Netlify Functions (Backend API)
All functions are in `functions/` directory, deployed automatically with `--dir="./out"`.

### Auth Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | Login with email/password |
| `/api/auth/register` | POST | Register new user |

### Bridge API Endpoints (Polymarket - PUBLIC)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bridge/deposit` | POST | Get deposit address (EVM/SOL/BTC/TRON) |
| `/api/bridge/quote` | POST | Get fee quote for bridge transfer |
| `/api/bridge/status` | GET | Check transaction status |
| `/api/bridge/supported-assets` | GET | List all supported chains/tokens |

### Bridge API Response Examples
```json
// POST /api/bridge/deposit
{
  "address": {
    "evm": "0x7c83dB6A20E3eD664A8794B05B9Bd7b66844913d",
    "svm": "FCuRfW93XGbWBVuUJmw2bdxnHu2C7Q7iEpcu37M8BPJ1",
    "tron": "TGbx2LFAAcG2qs8Q3BaJ4csomMXdGMxb3Q",
    "btc": "bc1qlp2uttfmf2jgly3z3mduqtu2va6lws6al457me"
  }
}
```

### Known Issues
- Bridge API returns warning: "Please include the X-Builder-Code header" (builder code not yet available)
- Auth is demo-only (no real DB, accepts any email/password)
- Card/Apple Pay/Google Pay deposits are simulated (no payment provider integration yet)

## AlchemyPay Onramp Flow (Card Payments)
AlchemyPay is used for card/Apple Pay/Google Pay payments. Flow:

1. **User selects "Kredi/Banka Kartı"** in DepositStep
2. **Wallet address shown** with copy button at top of popup
3. **User clicks "Kart ile Al"** → Opens AlchemyPay in new tab
4. **User pastes wallet address** in AlchemyPay
5. **User completes payment** on AlchemyPay
6. **USDC arrives** in Polymarket wallet (~1-5 minutes)

### AlchemyPay URLs
- **Test**: `https://ramptest.alchemypay.org/?crypto=USDC&fiat=TRY&network=polygon`
- **Production**: `https://ramp.alchemypay.org/?crypto=USDC&fiat=TRY&network=polygon`

### AlchemyPay Notes
- No merchant account needed (manual wallet paste approach)
- Branding is AlchemyPay's (no white-label possible without merchant account)
- Supports 173 countries, TRY currency available
- Fee determined by AlchemyPay (typically 1.75-3.5%)
- Wallet address auto-fill doesn't work without appId — user must paste manually

## Polymarket Builder API Key Issue
- Profile exists at polymarket.com/settings?tab=builder (name: hermes)
- Builder Code visible: 0xd3bf2aa369b0cdb46e4aa68248b2dc16d205734c7b8bcf8a7e9faf9135c71652
- **Problem**: Clicking "+ Create New" opens popup but API key values are empty
- **Status**: Need to contact builder@polymarket.com for support
- **Impact**: Missing builder code causes warning in Bridge API responses, but endpoints still work

## Supabase Database
- **Project**: trdefi-landing
- **Project ID**: oitngpzrdgqugrwmmcvv
- **URL**: https://oitngpzrdgqugrwmmcvv.supabase.co
- **Region**: eu-central-1
- **Access Token**: See .env file (Management API)

### API Keys
- **Anon Key**: See .env file
- **Service Role Key**: See .env file

### Supabase Management API Usage
```powershell
# All keys are in .env file - never commit secrets to git
```
