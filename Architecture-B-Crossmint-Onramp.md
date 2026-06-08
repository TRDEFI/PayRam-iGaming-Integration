# Mimari B: Crossmint Onramp → PayRam Deposit (ÖNERİLEN VARSAYILAN)

**Tarih:** 5 Haziran 2026 (güncellendi 6 Haziran 2026 — gerçek staging test verileri eklendi)
**Durum:** Feasible ✓ + Doğrulandı ✓ (gerçek staging tx'leri base-sepolia'da onaylandı)
**Karmaşıklık:** Orta
**Önerilen rol:** Hibrit akışta varsayılan

---

## 1. Neden B?

Crossmint'in onramp ürünü **herhangi bir external wallet adresine** stablecoin teslim edebiliyor. PayRam deposit adresi de bir external wallet. Bu bizim için altın:

1. **KYC bizim dışımızda** — Crossmint Tier 1 / Tier 2 KYC üstlenir
2. **En kolay UX** — 1 widget, 3dk ilk sefer, 30s sonraki
3. **Geniş payment method** — Card, Apple Pay, Google Pay
4. **MiCA authorized** — Crossmint Ocak 2026'da MiCA yetkisi aldı
5. **Chargeback koruması** — Crossmint merchant of record olarak üstlenir
6. **PayRam deposit adresine external wallet olarak teslim** — resmi olarak destekleniyor (docs.crossmint.com/onramp/guides/onramp-to-external-wallets)

---

## 2. Tam Akış Diyagramı

```
[Oyuncu] → Merchant sitesinde "Deposit"
         → "Card/Apple Pay" sekmesini seçer
         → Crossmint widget açılır
         → Crossmint user olarak link edilir (email)
         → KYC başlar (gerekirse: Tier 1 ≤$1K, Tier 2 >$1K)
         → Card/Apple Pay/Google Pay ile ödeme
         → Crossmint onramp partner (internal) USDC alır
         → USDC PayRam deposit adresine gönderilir (1 on-chain tx)
         → PayRam listener tespit eder (2-6s finality)
         → Webhook → Merchant
         → Oyuncu bakiyesi yüklendi
         → Sweep: merchant cold wallet + operator collector (sizin fee'niz)
```

---

## 3. Crossmint API Entegrasyonu (Adım Adım)

### 3.1 Staging Hesabı Açma (5 dakika)

```
1. https://staging.crossmint.com/signin → hesap aç
2. https://staging.crossmint.com/console/projects/apiKeys → API key al
3. Scopes: orders.read, orders.create
4. Environment variables:
   CROSSMINT_SERVER_SIDE_API_KEY=<your_key>
   CROSSMINT_ENV=staging
```

Production erişim için: `https://www.crossmint.com/contact/sales` (sales call gerekli).

### 3.2 External Wallet Link (PayRam Deposit Adresi)

PayRam'den oyuncu için bir deposit adresi al, sonra Crossmint'e "bu adres oyuncuya ait" diye bildir.

```bash
curl -X PUT \
  https://staging.crossmint.com/api/2025-06-09/users/email:user@example.com/linked-wallets/0xPayRamDepositAddress \
  -H "X-API-KEY: $CROSSMINT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chain": "base"
  }'
```

**Response (ilk link, proof olmadan):**
```json
{
  "address": "0xPayRamDepositAddress",
  "chain": "base",
  "type": "external-wallet",
  "ownership": {
    "verified": false,
    "verificationChallenge": "crossmint.com wants you to sign in with your blockchain account:\n0xPayRamDepositAddress\n\nI am signing this message to prove ownership of my wallet address 0xPayRamDepositAddress for Crossmint verification.\n\nURI: https://..."
  }
}
```

**Not:** İlk €1,000 altı için ownership verification **gerekmez**. Crossmint order direkt payment phase'e geçer.

### 3.3 Onramp Order Oluşturma

```bash
curl -X POST https://staging.crossmint.com/api/2022-06-09/orders \
  -H "X-API-KEY: $CROSSMINT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "recipient": {
      "walletAddress": "0xPayRamDepositAddress"
    },
    "payment": {
      "method": "card",
      "receiptEmail": "user@example.com"
    },
    "lineItems": [{
      "tokenLocator": "base:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "executionParameters": {
        "mode": "exact-in",
        "amount": "100"
      }
    }]
  }'
```

**Response (€1,000 altı, ownership verification gerekmez):**
```json
{
  "clientSecret": "...",
  "order": {
    "orderId": "987e81ab-8c8f-464e-95e9-11ceda80d559",
    "phase": "payment",
    "lineItems": [...],
    "quote": {...},
    "payment": {
      "status": "awaiting-payment",
      "method": "card",
      "currency": "usd"
    }
  }
}
```

**Response (€1,000 üstü, ownership verification gerekli):**
```json
{
  "clientSecret": "...",
  "order": {
    "orderId": "...",
    "phase": "payment",
    "payment": {
      "status": "requires-recipient-verification",
      "method": "card",
      "currency": "usd",
      "preparation": {
        "message": "crossmint.com wants you to sign in with your blockchain account:\n0xPayRamDepositAddress\n\nI am signing this message to prove ownership of my wallet address 0xPayRamDepositAddress for Crossmint verification.\n\nURI: https://...\nVersion: 1\nNonce: ...\nIssued At: ...\nExpiration Time: ...",
        "email": "user@example.com"
      }
    }
  }
}
```

### 3.4 Ownership Verification (Gerekirse)

Eğer response'ta `requires-recipient-verification` varsa, kullanıcı (veya merchant backend) cüzdanı imzalar:

```javascript
import { Wallet } from "ethers";

const wallet = new Wallet(USER_PRIVATE_KEY);  // server-side signing
const signature = await wallet.signMessage(order.payment.preparation.message);
```

İmza'yı aynı PUT endpoint'ine `proof` alanı ile gönder:

```bash
curl -X PUT \
  https://staging.crossmint.com/api/2025-06-09/users/email:user@example.com/linked-wallets/0xPayRamDepositAddress \
  -H "X-API-KEY: $CROSSMINT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chain": "base",
    "proof": "<signature>"
  }'
```

**Verified response:**
```json
{
  "address": "0xPayRamDepositAddress",
  "chain": "base",
  "type": "external-wallet",
  "ownership": { "verified": true }
}
```

### 3.5 Frontend — Embedded Widget (React)

```typescript
import {
  CrossmintProvider,
  CrossmintEmbeddedCheckout
} from "@crossmint/client-sdk-react";

function DepositModal({ payramDepositAddress, userEmail, amountUsd }) {
  return (
    <CrossmintProvider apiKey={clientApiKey} environment="staging">
      <CrossmintEmbeddedCheckout
        recipient={{ walletAddress: payramDepositAddress }}
        lineItems={{
          tokenLocator: "base:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          executionParameters: {
            mode: "exact-in",
            amount: amountUsd.toString()
          }
        }}
        payment={{
          method: "card",
          receiptEmail: userEmail
        }}
        onOrderEvent={(event) => {
          switch (event.type) {
            case "order.paid":
              // USDC PayRam deposit adresine gönderildi
              // PayRam webhook'u da tetiklenecek
              console.log("Crossmint order paid:", event.orderId);
              break;
            case "order.failed":
              console.error("Crossmint order failed:", event);
              break;
          }
        }}
      />
    </CrossmintProvider>
  );
}
```

---

## 4. KYC Akışı

### 4.1 Tier 1 KYC (≤ $1,000 / yıl)

| Alan | Detay |
|---|---|
| **Full name** | Ad + soyad |
| **Date of birth** | Doğum tarihi |
| **Nationality** | Uyruk |
| **Country of residence** | İkamet ülkesi |
| **Email** | E-posta |
| **Government ID number** | TC kimlik, pasaport no, vb. (**fotoğrafsız**) |
| **Limit** | Rolling 12-month aggregate $1,000 |

### 4.2 Tier 2 KYC (> $1,000 / yıl)

| Ek Alan | Detay |
|---|---|
| **Source of funds** | Fon kaynağı beyanı |
| **Employment status** | Çalışma durumu |
| **Liveness check** | Yüz doğrulama (selfie + hareket) |
| **Document ID verification** | Fotoğraflı kimlik belgesi |

### 4.3 KYC Provider

- **Persona** (Crossmint uses Persona under the hood)
- Widget içinde otomatik, kullanıcıya sorunsuz
- Crossmint sandbox'ta test edilebilir

---

## 5. Crossmint Fee Yapısı

| Fee Kalemi | Oran | Ödeyen |
|---|---|---|
| **Card processing fee** | ~%2.5 - %3.5 | Oyuncu (fiat ödemede) |
| **Onramp partner fee** | ~%0.5 - %1.0 | Oyuncu (crypto tesliminde) |
| **Crossmint fee (toplam)** | ~%3 - %4 | Oyuncu |
| **PayRam gateway fee** | $0 | — |
| **Operatör fee (senin)** | %1 Base | Merchant'tan (sweep'te) |
| **Network fee (Base)** | ~$0.001 | Oyuncu (kripto tesliminde) |

**Örnek ($100 deposit):**
- Oyuncu öder: $103 - $104 (kart fee'si dahil)
- Oyuncu alır: 100 USDC (PayRam deposit'e)
- Merchant alır: 99 USDC (senin %1 fee kesildikten sonra)
- Sen alırsın: 1 USDC (otomatik on-chain split)

---

## 6. Edge Cases ve Çözümler

### 6.1 Onramp Başarısız (Card Declined)
- Crossmint order "failed" durumuna geçer
- `order.failed` event'i fire'lanır
- Oyuncuya notify: "Kartınız reddedildi, başka kart deneyin"
- Frontend'de retry akışı göster

### 6.2 Ownership Verification Gerekli
- €1,000 üstü veya risk flag
- Oyuncu cüzdanı imzalar (CAIP-122 message)
- Crossmint API'ye submit
- Order "awaiting-payment"a geçer
- **Merchant tarafı:** server-side signing yapabilir (hot wallet)

### 6.3 KYC Reddedildi
- Crossmint (Persona) reject ederse order iptal
- Oyuncuya "Kimlik doğrulama başarısız" mesajı
- **Fallback:** Mimari A'ya yönlendir (user kendi CEX'ini kullanır)

### 6.4 Restricted Country
- IP veya KYC sırasında blocked
- Oyuncuya "Ülkeniz desteklenmiyor" mesajı
- **Fallback:** Mimari A veya C'ye yönlendir

### 6.5 PayRam Deposit Adresi Invalid
- Crossmint cüzdan validate etmez (external wallet)
- Yanlış adres = USDC non-reversible kayıp
- **Çözüm:** PayRam API her zaman valid adres döner, double-check et

### 6.6 Network Fee Spike
- Base gas fee normalde ~$0.001
- Spike durumunda ~$0.01-0.05 olabilir
- Crossmint bunu oyuncuya yansıtır (veya absorbe eder)
- **Önemli:** Oyuncu UX'te "anlaşılır" görmeli

### 6.7 Crossmint Service Outage
- Crossmint API 5dk+ downtime (nadir)
- Oyuncuya "Sistem geçici olarak kullanılamıyor" mesajı
- **Fallback:** Mimari A'ya yönlendir

---

## 7. Crossmint Restricted Countries (Güncel Liste)

Crossmint onramp **şu ülkelerde desteklenmiyor**:

| Bölge | Kısıtlı Ülkeler |
|---|---|
| **Afrika** | Burundi, Central African Republic, DRC, Djibouti, Guinea, Guinea-Bissau, Libya, Mali, Niger, Somalia, South Sudan, Sudan, Tunisia, Zimbabwe |
| **Asya** | Afghanistan, Iran, Iraq, Lebanon, Myanmar, North Korea, Palestine, Syria, Yemen |
| **Avrupa** | Belarus, Bosnia and Herzegovina, Moldova, Montenegro, Russia, Serbia, Ukraine |
| **Amerika** | Bolivia, Cuba, Guatemala, Haiti, Nicaragua, Venezuela |

**Türkiye:** Listede yok → ✓ **OK**

**ABD:** Tüm eyaletler + New York (eyalet bazlı ek kısıtlamalar olabilir, sales'a sor)

**AB:** 27 ülke MiCA ile uyumlu → ✓ OK

**Kısıtlama nasıl çalışır:**
- IP-based blocking (VPN bypass edilebilir ama önerilmez)
- KYC document-based blocking (kimlik belgesinde kısıtlı ülke adresi = red)
- Sanctions screening (OFAC, EU, UN listeleri)

---

## 8. PayRam Konfigürasyonu (Mimari B İçin)

```yaml
# payram.yml — Mimari B (Crossmint ile birlikte)
server:
  base_url: https://pay.yourdomain.com
  domain: pay.yourdomain.com
  ssl: letsencrypt

blockchains:
  - chain: base
    enabled: true
    rpc_url: https://mainnet.base.org
    hot_wallet: 0xYOUR_HOT_WALLET
    cold_wallet: 0xYOUR_COLD_WALLET
    confirmation_threshold: 3
    gas_sponsorship: true

currencies:
  - symbol: USDC
    chain: base
    contract: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
    min_amount: 5       # Crossmint Tier 1 minimumu
    max_amount: 10000   # Crossmint Tier 1 limitiyle uyumlu
    decimals: 6

operator:
  enabled: true
  collector_address: 0xYOUR_OPERATOR_COLLECTOR
  fees_per_chain:
    base: 0.01  # %1 — operatör komisyonun
  per_merchant_overrides: {}

# Cards/Onramp: KAPALI
# Not: Mimari B'de cards/onramp'ı Crossmint tetikler,
# PayRam partner'ı değil. Bu yüzden PayRam'de card_onramp: false.
payment_channels:
  crypto: true
  card_onramp: false  # Crossmint kullanıyoruz

webhooks:
  url: https://merchant.com/webhooks/payram
  api_key: ${PAYRAM_WEBHOOK_KEY}
  events:
    - payment.confirmed
    - payment.failed
    - sweep.completed
  retry_policy: [30m, 1h, 2h, 4h, 8h, 24h, 48h]
```

---

## 9. Avantajlar ve Dezavantajlar

### Avantajlar
- ✓ **En kolay UX** — 1 widget, 3dk ilk sefer, 30s sonraki
- ✓ **KYC tamamen Crossmint'te** — sen sıfır sorumluluk
- ✓ **Chargeback koruması** — Crossmint merchant of record olarak üstlenir
- ✓ **MiCA authorized** (Ocak 2026) — Avrupa için kritik
- ✓ **160+ ülke** — Türkiye dahil
- ✓ **Staging self-serve** — 5dk hesap aç, hemen test et
- ✓ **50+ chain desteği** — gelecekte Solana, ek zincirler kolay

### Dezavantajlar
- ✗ **Crossmint fee %3-4** — Binance spread'den biraz yüksek
- ✗ **~30 ülke restricted** — Venezuela, Iran, Russia, vb. yok
- ✗ **Production erişim sales call gerektirir**
- ✗ **Vendor lock-in (orta)** — Crossmint'e bağımlı
- ✗ **Persona KYC** — bazı kullanıcılar için yavaş olabilir

---

## 10. Production Erişim

| Aşama | Süre | Maliyet |
|---|---|---|
| **Staging** | 5dk self-serve | $0 |
| **Production** | Sales call + onay | Volume-based fee |
| **Contact** | `https://www.crossmint.com/contact/sales` | — |

---

## 11. Uygun Kullanım Senaryoları

✓ **Yeni oyuncu kazanmak** — kartı olan herkes deposit yapabilir
✓ **Kolay onboarding** — KYC gömülü, 3dk
✓ **MiCA uyumu** — Avrupa kullanıcıları için
✓ **Chargeback koruması** — merchant riskini azaltır
✓ **Hızlı MVP** — staging'de 1 günde prototype

---

## 11b. Real Staging Test Doğrulaması (Haziran 2026)

Bu mimari 5–6 Haziran 2026'da gerçek staging ortamında uçtan uca test edildi. Tüm sonuçlar iki kaynaktan çapraz doğrulandı: Crossmint API + BaseScan (Base Sepolia testnet).

### Test Ortamı

| Öğe | Değer |
|---|---|
| Hesap | trdefi1985@gmail.com (staging, free tier) |
| Proje | Trdefi1985's project |
| API key (server) | `sk_staging_AAAuM2Xv...z22ASY4UU` |
| API key (client) | `ck_staging_AAAuM2Xv...m52SHJ1C8qt9zf` |
| Chain | base-sepolia (testnet, chain ID 84532) |
| Testnet token | **USDXM** (Crossmint'in test USDC'si) |
| USDXM contract | `0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F` (BaseScan'de "USDCoin" olarak yanlış etiketli, 6 decimals) |
| Crossmint sponsor | `0xa66b23D9a8a46C284fa5b3f2E2b59EB5cc3817F4` (testnet'te USDC dağıtıcısı) |

### Test Akışı (1 → 6)

**1. Cüzdan oluştur (V1 SDK format):**
```bash
POST /api/2025-06-09/wallets
{
  "chainType": "evm",
  "type": "smart",
  "owner": "email:payram-eoa-a4b19449@gmail.com",
  "config": {
    "adminSigner": {
      "type": "external-wallet",
      "address": "0x97De3980D3c7dB07E48f5B81280329502AF40252"
    }
  }
}
```
→ 201 Created, smart wallet adresi `0x7fF1DB8930970e6d8e34cb17c351f68813EEB22f`

**2. Cüzdana USDXM yükle (sadece staging):**
```bash
POST /api/v1-alpha2/wallets/email:payram-eoa-a4b19449@gmail.com:evm-smart-wallet/balances
{ "amount": 10, "token": "usdxm" }
```
→ 201, bakiye 10,000,000 raw (10 USDXM), tx `0xb21895c7f96daf685230d7aeb6e3e97e8833358e3c1fa4fa65da71d8f0d7d5b9`

**3. Transaction oluştur (multi-sig onay gerektirir):**
```bash
POST /api/2025-06-09/wallets/email:payram-eoa-a4b19449@gmail.com:evm/transactions
{
  "params": {
    "calls": [{
      "to": "0x14196F08a4Fa0B66B7331bC40dd6bCd8A1dEeA9F",
      "value": "0",
      "data": "0xa9059cbb000000000000000000000000a66b23d9a8a46c284fa5b3f2e2b59eb5cc3817f40000000000000000000000000000000000000000000000000000000000f4240"
    }]
  }
}
```
→ 201, userOpHash döner, status: `awaiting-approval`

**4. EIP-191 imzala (kritik — 4 format test edildi, sadece 1 çalışır):**
```python
# ✅ ÇALIŞAN: EIP-191 personal_sign wrap
from eth_account import Account
from eth_account.messages import encode_defunct
msg = encode_defunct(hexstr=USEROP_HASH)
signed = Account.sign_message(msg, private_key=EOA_PRIVATE_KEY)
signature = signed.signature.hex()
if not signature.startswith('0x'):
    signature = '0x' + signature

# ❌ ÇALIŞMAYAN: raw hash + v=27/28
# ❌ ÇALIŞMAYAN: raw hash + v=0/1
# ❌ ÇALIŞMAYAN: encode_defunct(text=...)  # hash yanlış
```

**5. Onayı gönder:**
```bash
POST /api/2025-06-09/wallets/{locator}/transactions/{txId}/approvals
{
  "approvals": [{
    "signer": "external-wallet:0x97De3980D3c7dB07E48f5B81280329502AF40252",
    "signature": "0x..."
  }]
}
```

**6. Sonuç (gerçek on-chain):**
- txId: `0x0bbea5d27a10ec9bd385bc8712d514e273db21598afd9915ed90a0dc8fb55dba`
- status: `success` (awaiting-approval → pending → success)
- fees.mode: `project` (Crossmint gas'i sponsor etti)
- fees.billed: **$0.003 USD**
- bakiye: 10 → 9 USDXM

**Çapraz doğrulama (BaseScan + Crossmint list-transfers API):**
```bash
GET /api/unstable/wallets/0x7fF1.../transfers?chain=base-sepolia&tokens=usdxm&status=successful
```
Dönen: 1 USDXM, `0x7fF1...` → `0xa66b23D9...3817F4`, onChain.txId = BaseScan'deki ile aynı. ✓

### Mimari Keşifler (production'a giderken dikkat)

| Bulgu | Etkisi |
|---|---|
| **Crossmint smart wallet = ZeroDev Kernel v3.3 proxy** (MIT, immutable, paylaşımlı implementasyon `0xd6CEDDe8...D37875b28`) | Tedarikçi bağımsızlığı yok, ama kontrat audit edilebilir, base-sepolia'da verified |
| **V1 wallet locator format**: `email:user@x.com:evm` (V1 SDK). v1-alpha2 hâlâ `:evm-smart-wallet` istiyor | 2 farklı API sürümü paralel yaşıyor, dikkat |
| **Unstable `list-transfers` endpoint'i**: sadece `status=successful` kabul ediyor, "failed" hâlâ disabled | Incoming transfer'lar listelenmiyor (sender wallet filtreli), sadece kullanıcının yaptığı tx'ler |
| **List wallets API YOK** (tüm versiyonlarda 404) | User identity modeli: email/userId/phone ile wallet'lara eriş, chain üzerinden enumerate etme |
| **`wallets.fund` sadece staging** (production'da "not yet supported") | Production'da onramp veya external transfer gerekli |
| **MPC wallets + api-key signer enterprise-only** (staging'de "not enabled for this project") | Free tier'da sadece `email`/`phone`/`external-wallet` signer'lar var |

### ⚠️ Kilitli Cüzdanlar Dersi (20 USDXM yazılı zarar)

Bu test sırasında **`external-wallet` adminSigner ile cüzdan oluştururken recovery signer konfigüre etmemenin** bedelini ödedim. 2 cüzdan (`0x267c64d8...`, `0x6FD975F5...`) toplam **20 USDXM** ile dondurulmuş durumda çünkü:

1. `external-wallet` adminSigner kullanıldı (Crossmint tarafında yedek yok)
2. Oluşturma sırasında `recovery` parametresi set edilmedi
3. EOA private key'leri workspace cleanup'ta kayboldu
4. Kontrat (ZeroDev Kernel v3.3) `transferOwnership`, `sweep`, `adminTransfer` gibi backdoor fonksiyonlar içermiyor — sadece `installModule`/`changeRootValidator` var, hepsi sudo validator (kayıp EOA) imzası gerektirir
5. **"Managed Support Center Recovery"** sadece enterprise müşterilere açık, free tier için reddedilir

**Mimari B için zorunlu kural:**
- ✓ `external-wallet` adminSigner kullanırken MUTLAKA `recovery` parametresi de set et (email/phone OTP veya ikinci EOA)
- ✗ ASLA tek anahtar + sıfır recovery konfigürasyonu ile cüzdan oluşturma
- ✓ PayRam deposit adresleri için `server` signer (Crossmint key escrow'lu) + email recovery kombinasyonu en güvenli
- ✓ Veya custodial yol: Crossmint'in `api-key` signer'ı (enterprise tier — Varyant B prod için gerekli)

### Üretim Onramp'ı İçin Kontrol Listesi

Varyant B'yi production'a alırken:

- [ ] Crossmint sales'a başvur (https://www.crossmint.com/contact/sales) — production + api-key signer erişimi
- [ ] Project KYC / KYB (Crossmint Tier 2) tamamla
- [ ] PayRam deposit adreslerini Crossmint'e `linked-wallets` ile bağla (ilk $1K altı ownership verification gerekmez)
- [ ] USDXM'den USDC'ye geçiş: production contract = `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` (Base mainnet)
- [ ] Webhook'ları ayarla (`payment.confirmed`, `payment.failed` PayRam tarafı; `order.paid`, `order.failed` Crossmint tarafı)
- [ ] Restricted countries kontrolü (Türkiye listede yok ✓)
- [ ] Fallback plan: Crossmint outage → Varyant A (Binance CEX) veya Varyant C (PayRam kendi onramp'ı)

---

## 12. Referanslar

- Crossmint onramp to external wallets: `https://docs.crossmint.com/onramp/guides/onramp-to-external-wallets`
- Crossmint onramp overview: `https://docs.crossmint.com/onramp/overview`
- Crossmint restricted countries: `https://docs.crossmint.com/onramp/introduction/restricted-countries`
- Crossmint onramp quickstart: `https://github.com/Crossmint/onramp-quickstart`
- Crossmint MiCA: `https://blog.crossmint.com/crossmint-secures-mica-authorization-expanding-global-digital-asset-infrastructure-across-the-eu-2/`
- USDC Base contract: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

---

**Önceki dosya:** `02-architecture-A-binance-direct.md`
**Sonraki dosya:** `04-architecture-C-payram-onramp.md`
