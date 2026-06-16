# PayRam + CrossMint — Test Raporu

## Proje Hedefi
- iGaming/sportsbook için PayRam-native card-to-crypto onramp entegrasyonu
- Kısıtlar: oyuncu basic KYC, operatör KYB yok

---

## Ortam Bilgileri

| Parametre | Değer |
|-----------|-------|
| PayRam URL | `http://43.207.184.62` |
| Container | `payramapp/payram:3.0.5` (port 80) |
| API Key | `2f31ed780b37c0fcfbde48a0764aa5b8` (header: `API-Key`) |
| Chain | Base Sepolia (Chain ID: 84532) |
| USDC Contract | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |

### Sağlık Durumu
- Health endpoint: `GET /api/v1/health` → OK
- Worker'lar: `deposit-processor`, `base-listener`, `erc20-sweep-approval-processor` → **RUNNING**
- redis-server: FATAL (beklenen, testnet)

---

## Wallet'lar

| Rol | Adres | Bakiye (USDC) | ETH |
|-----|-------|:------------:|:---:|
| **Master Account** | `0xD718Cf6e3c7E5e7490c00742872e4be7139c2205` | 8 | 0.1 |
| **Deposit (test1)** | `0x4EB552F74d963534e1BE68BBc10de4E281183FF8` | 0 (sweep edildi) | — |
| **Deposit (test2)** | `0x3db3ceF0E092Ac162BBAf23D9Aa6d335376B1475` | 8 (pending) | — |
| **Cold Wallet** | `0xf9FcC63b499d2CeA923bD659c611Bdb173F390D5` | **19.5** | — |
| **Hot Wallet** | EVM Hot Wallet 2 (Master Account private key, şifrelenmiş) | — | — |
| **Fund Collector** | `0x5fE5CbAD96f1AfB6a4819E79b3868EfF0FacA023` | — | — |

---

## Test 1: Crypto Deposit (12 USDC) ✅

| Adım | Detay |
|------|-------|
| Payment ref | `4a296294-0e3c-41be-a425-9c0af7fca740` |
| Tutar | $12 USD |
| Durum | **closed** |
| Atanan blockchain | BASE |

### Akış
```
Master Account (0xD718...) 
    → Deposit Wallet (0x4EB5...)
        → PayRam detect + FILLED
            → SmartSweep batchTransferTokens
                → Fund Collector → Cold Wallet
```

### Sweep Detayı
- Sweep ID: 1-5
- TX: `0x0db62d14133c3227116e04dec51cf8c1d43b38a60df16d3823be0901d9d24778`
- **Fee:** 0.3 USDC / 12 USDC (%2.5)
- **ETH Gas:** ~0.00000176 ETH
- **Cold wallet'a ulaşan:** 11.7 USDC
- Sweep zinciri: `fund_collect_processed → fund_transfer → fee_transfer_processed → completed`

---

## Test 2: Crypto Deposit (8 USDC) 🔄

| Adım | Detay |
|------|-------|
| Payment ref | `91ff46f8-0651-441d-ba00-e4301d361bbc` |
| Tutar | $12 USD (amountInUSD) |
| Durum | **open** (henüz assign edilmedi) |
| Blockchain | none (henüz assign edilmedi) |

### Durum
- 8 USDC deposit address'e (`0x3db3ceF0...1475`) on-chain teyitli
- PayRam deposit listener'ın algılaması bekleniyor

---

## SmartSweep (Fund Sweeping)

- **Tip:** `batchTransferTokens` (fund collector contract)
- **Fee:** %2.5 (12 USDC'de 0.3 USDC)
- **ETH gas:** caba (~0.00000176 ETH)
- **Sweep zinciri:**
  1. `fund_collect_processed` → collector çalıştı
  2. `fund_transfer` → cold wallet'a USDC aktarıldı
  3. `fee_transfer_processed` → fee alındı
  4. `completed` ✅

---

## API Notları (Windows)

| Sorun | Çözüm |
|-------|-------|
| `curl.exe` JSON body'i bozuyor | `Invoke-WebRequest` + `ConvertTo-Json` kullan |
| Header ismi | `API-Key` (büyük-küçük harf duyarlı) |

### Örnek Çağrılar

```powershell
# Payment oluştur
$body = @{...} | ConvertTo-Json
Invoke-WebRequest -Uri "http://43.207.184.62/api/v1/payment" `
  -Method POST -Headers @{"API-Key"="2f31ed78..."} `
  -Body $body -ContentType "application/json"

# Deposit address ata
Invoke-WebRequest -Uri "http://43.207.184.62/api/v1/deposit-address/reference/{ref}" `
  -Method POST -Headers @{"API-Key"="..."} `
  -Body '{"blockchain_code":"BASE"}' -ContentType "application/json"
```

### Kullanılan Endpoint'ler
- `POST /api/v1/payment` — payment oluşturma
- `POST /api/v1/deposit-address/reference/{ref}` — deposit address ata
- `GET /api/v1/payment/status/reference/{ref}` — durum sorgula (404 döndü, doğrulanmadı)

---

## MetaMask USDC Görünmeme Sorunu ❓

**Contract adresi doğru:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e` (Circle resmi dokümanı ile teyitli)

**RPC testleri başarılı:**
- `symbol()` → "USDC" ✅
- `decimals()` → 6 ✅  
- `name()` → "USDC" ✅
- `balanceOf(cold_wallet)` → 19.5 USDC (Basescan teyitli)

**Olası sebepler:**
1. Public RPC (`https://sepolia.base.org`) MetaMask tarafında rate-limit yiyor
2. MetaMask proxy kontratlarla ilgili bilinen internal bug
3. Farklı RPC (`https://base-sepolia-rpc.publicnode.com`) de denendi, olmadı
4. "Reset Account" dene — Settings → Advanced → Reset Account denendi, etki etmedi

**Alternatif çözüm yolları:**
- Farklı tarayıcıda (Firefox/Edge) fresh MetaMask kurulumu dene
- Basescan token sayfasından "Add to MetaMask" butonu ile ekle
- **Rabby Wallet** dene (aynı seed phrase ile)
- Mainnet Base'de test et (contract: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)

---

## Testnet Faucet'ler

| Site | Açıklama | Limit |
|------|----------|-------|
| [openfaucet.org/base-sepolia](https://openfaucet.org/base-sepolia) | **Browser PoW mining** ile Base Sepolia ETH | Min 0.05 ETH |
| [alchemy.com/faucets/base-sepolia](https://www.alchemy.com/faucets/base-sepolia) | 0.1 ETH/gün, mainnet 0.001 ETH gerekli | Günlük |
| [faucets.chain.link/base-sepolia](https://faucets.chain.link/base-sepolia) | 0.5 ETH + 25 LINK | Günlük |
| [faucet.quicknode.com](https://faucet.quicknode.com/ethereum/sepolia) | 0.025-0.05 ETH | 12 saat |
| [sepolia-faucet.pk910.de](https://sepolia-faucet.pk910.de) | PoW mining (Ethereum Sepolia, bridge gerekli) | Min 0.05 ETH |

---

## Geçmiş Durum Özeti

| Tarih | Olay | Detay |
|-------|------|-------|
| Test1 | 12 USDC → deposit → sweep | ✅ Cold wallet'da 11.7 USDC |
| Test2 | 8 USDC → deposit address'e gönderildi | 🔄 PayRam algılaması bekleniyor |
| MetaMask | USDC görünmüyor | ❌ On-chain teyitli ama UI'da yok |

---

## Önemli Kararlar

- **Hot wallet:** Master Account ile aynı MetaMask cüzdanı (testnet, güvenlik riski yok)
- **Cold wallet** (`0xf9FcC6...390D5`): PayRam SCW deploy'ında parametre, on-chain teyitli
- **Sweep akışı:** Deposit Wallet → Fund Collector → Cold Wallet
- **API çağrıları:** `Invoke-WebRequest` ile (Windows curl.exe bozuyor)

---

## PayRam API-Key Sorunu (Çözüldü)

- Windows `curl.exe` JSON body'i bozuyor → API "invalid request" döndü
- **Çözüm:** `Invoke-WebRequest` ile `ConvertTo-Json` kullan
- `curl --data-binary @file.json` de çalışır ama Invoke-WebRequest daha pratik
