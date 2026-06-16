# Varyant C — PayRam Native Card-to-Crypto Onramp

**Self-Hosted Fiat → USDC Köprüsü — iGaming/Sportsbook Operatörleri İçin**

| | |
|---|---|
| **Varyant** | C — PayRam Native Onramp |
| **Durum** | Planlandı (POC uygulanacak) |
| **Tarih** | Haziran 2026 |
| **Yazar** | Crossmint × PayRam mimari çalışması |
| **Hedef** | Operatör KYB olmadan, müşteri basic KYC ile card → USDC on Base |
| **Kapsam** | Self-hosted PayRam node + card-to-crypto onramp + sportsbook entegrasyonu |

---

## İçindekiler

1. [Yönetici Özeti](#1-yönetici-özeti)
2. [Proje Kapsamı](#2-proje-kapsamı)
3. [PayRam Genel Tanıtım](#3-payram-genel-tanıtım)
4. [Card-to-Crypto Onramp](#4-card-to-crypto-onramp)
5. [Compliance — KYC / KYB](#5-compliance--kyc--kyb)
6. [Ücret Yapısı](#6-ücret-yapısı)
7. [Self-Hosting Kurulum](#7-self-hosting-kurulum)
8. [Entegrasyon Mimarisi](#8-entegrasyon-mimarisi)
9. [API Endpoints](#9-api-endpoints)
10. [Webhook Akışı](#10-webhook-akışı)
11. [Sportsbook Entegrasyonu](#11-sportsbook-entegrasyonu)
12. [POC Test Planı](#12-poc-test-planı)
13. [Production Checklist](#13-production-checklist)
14. [Varyant B ile Karşılaştırma](#14-varyant-b-ile-karşılaştırma)
15. [Açık Sorular ve Riskler](#15-açık-sorular-ve-riskler)
16. [Kaynakça](#16-kaynakça)

---

## 1. Yönetici Özeti

### 1.1 Varyant Karşılaştırması

Üç mimari aday değerlendirildi:

| Varyant | Yaklaşım | Sonuç |
|---|---|---|
| **A** — Binance Direct | Operatör Binance hesabı açar, doğrudan kullanır | Lisans riski, iGaming kısıtı, KYB zorunlu |
| **B** — Crossmint Onramp | Hosted SaaS, Crossmint wallet + fiat onramp | **Reddedildi** — "no delete API" + oyuncu KYC yüksek + wallet lock |
| **C** — PayRam Native | Self-hosted PayFi + native card-to-crypto onramp | **Seçildi** — operatör KYB yok, müşteri basic KYC, USDC on Base |

### 1.2 Varyant B Reddedilme Nedenleri (özet)

1. **Oyuncu KYC eşiği yüksek**: Crossmint Tier 1 = $1,000 / 12 ay kümülatif. Operatörün €500/gün hedefinin çok üstünde toplam KYC tetikleme eşiği.
2. **Wallet silinemez**: 19 wallet API endpoint'i, 0 delete/archive/close. "True ownership" manifestosu gereği by-design immutable.
3. **Hosted SaaS bağımlılığı**: Crossmint battığında wallets hayatta kalır (ERC-4337 sayesinde) ama merchant paneli erişilemez.
4. **$20 USDXM locked**: 5 staging wallet'tan 2'sinin EOA private key'i kayıp (kullanıcı hatası, probe script'lerde inline'dı).

### 1.3 Varyant C Neden Seçildi

| Kriter | PayRam Native |
|---|---|
| **Operatör KYC/KYB** | **YOK** — "Merchants do not need to complete KYC/KYB to enable this Onramp method" |
| **Müşteri KYC** | Basic one-time KYC, ilk alımda |
| **Zincir** | USDC on **Base** (PayRam'in zaten desteklediği zincir) |
| **Ödeme yöntemleri** | 175+, 190+ ülke, card/Apple Pay/Google Pay/bank/SEPA |
| **Setup** | 10 dakika, 1 shell komutu |
| **Custody** | Non-custodial — operatör kendi anahtarları |
| **Self-hosting** | Operatörün kendi sunucusunda çalışır |
| **Markup** | PayRam 0% — provider fee'si pass-through |
| **iGaming** | Açıkça hedef (founder interview, supplier directory) |
| **Audited** | QuillAudits (smart contracts) |

### 1.4 Temel Akış (1 cümle)

Oyuncu sportsbook'ta "deposit" tıklar → PayRam payment link'i açılır → email ile otomatik self-custody PayRam Wallet oluşur → kartla ödeme yapılır → 3rd-party regulated provider KYC doğrular → USDC Base'de oyuncunun PayRam wallet'ına yatar → SmartSweep otomatik olarak operatörün cold wallet'ına taşır → sportsbook balance güncellenir.

---

## 2. Proje Kapsamı

### 2.1 Operasyonel Bağlam

**Operatör**: iGaming/sportsbook şirketi. Türkiye merkezli olabilir, esnek pazar. Hedef volume <€50k/ay (başlangıç).

**Hizmet**: Spor bahisleri, casino, canlı bahis. Operatörün kendi markası, kendi oyuncuları.

**Mevcut durum**: Fiat ödeme yöntemleri (kredi kartı, banka havalesi) kullanılıyor. PSP'ler sık sık hesap dondurma riski, yüksek fee, geç settlement yaratıyor.

**Hedef**: Oyuncuların kartla USDC alması, otomatik olarak PayRam deposit adresine yatması, sportsbook balance'ına yansıması.

### 2.2 PayRam'in Rolü

PayRam = **B2B wallet management layer**:
- Multi-tenant: operator / affiliate / client
- Otomatik wallet oluşturma (her oyuncu için unique deposit address)
- Sweep sistemi: merchant cold wallet + operator collector (1% komisyon)
- Webhook'lar: payment.confirmed, payment.failed, sweep.completed
- Referral/campaign yönetimi (built-in)
- TypeScript/JavaScript SDK

### 2.3 Hedef Akış (yüksek seviye)

```
[Oyuncu sportsbook'ta "Deposit" tıklar]
   ↓
[Sportsbook backend → PayRam API: POST /api/v1/payment]
   ↓ (PayRam payment URL döner)
[Oyuncu email + amount girer]
   ↓
[PayRam: otomatik self-custody PayRam Wallet (email bazlı)]
   ↓
[İlk alım: 3rd-party provider KYC (basic, one-time)]
   ↓
[Card / Apple Pay / Google Pay / SEPA ile ödeme]
   ↓ (3rd-party provider fiat → USDC on Base)
[USDC oyuncunun PayRam deposit address'ine yatar]
   ↓
[Webhook: Payment Page Rendered → Detected → Confirmed]
   ↓
[SmartSweep: USDC otomatik → operator cold wallet]
   ↓
[Sportsbook backend: oyuncu balance güncellenir]
```

### 2.4 Bu Dokümanın Kapsamı

**Kapsam içi:**
- PayRam self-hosting kurulumu
- Card-to-crypto onramp activation
- API entegrasyonu
- Webhook handling
- SmartSweep konfigürasyonu
- Sportsbook backend akışı
- POC test planı
- Production checklist

**Kapsam dışı:**
- PayRam off-ramp (player withdrawal için) — şu anda waitlist'te
- PayRam referral/campaign modülü (opsiyonel)
- Mobile app entegrasyonu (PayRam Wallet App ayrıca incelenecek)
- Chain abstraction (multi-chain payout şemaları)

---

## 3. PayRam Genel Tanıtım

### 3.1 Şirket Profili

| | |
|---|---|
| **Kurucu** | Siddharth Menon (WazirX co-founder, Binance acquired, 15M+ users India) |
| **Kuruluş** | 2024-2025 |
| **Konum** | New York, NY |
| **Website** | https://payram.com |
| **Docs** | https://docs.payram.com |
| **MCP** | https://mcp.payram.com |
| **Github** | https://github.com/PayRam |
| **Audited by** | QuillAudits |
| **Press** | AP News, Cointelegraph, The Block, Analytics Insight, TheGamblest |

**Sektör** (açıkça listelenen): Casino, Adult Business, iGaming, E-Commerce, Marketplace, Charity.

**iGaming focus kanıtı**: Founder Siddharth Menon, Şubat 2026'da TheGamblest'e verdiği röportajda PayRam'in iGaming'e özel tasarlandığını, "high-risk merchant" sorunlarını çözdüğünü ve self-hosted permissionless yapının iGaming operatörleri için "permanent solution" olduğunu açıkça ifade etti.

### 3.2 Trafik ve Settlement (kamuya açık)

- **$100M+ value settled**
- **850,000+ onchain transactions**
- **100+ merchants**
- 4 kıtada adoption (Avrupa, Asya, Latin Amerika, Afrika)

### 3.3 Temel Özellikler

#### 3.3.1 Self-Hosted, Non-Custodial
PayRam = software (SaaS değil). Operatör kendi sunucusuna kurar, kendi cüzdanlarını kullanır, kendi DB'sinde tutar. PayRam (şirket) paranın kontrolüne sahip değildir. Sunucu çökse bile cüzdanlar çalışmaya devam eder (blockchain üzerinde).

#### 3.3.2 Keyless Architecture
PayRam'in en önemli güvenlik özelliği: **deposit-related operations için hot key veya seed phrase saklanmaz**. Smart contract'lar üzerinden sweep yapılır. Sunucu hack'lense bile çalınacak key yok.

#### 3.3.3 Unique Deposit Address (per customer)
Her oyuncu/müşteri için **unique, free, permanent** deposit address atanır. Sınırsız sayıda adres oluşturulabilir. Bu:
- Muhasebe/reconciliation'ı kolaylaştırır
- Dispute resolution'ı netleştirir
- Granular transaction visibility sağlar
- "First in industry" olarak nitelendiriliyor

#### 3.3.4 SmartSweep
Otomatik bulk sweep: deposit address'lerden → cold wallet'a. Smart contract üzerinden, keyless, gas-efficient.

#### 3.3.5 Multi-Chain Orchestration
Mevcut chain'ler: **Ethereum, Base, Polygon, Tron, Bitcoin**. Planlanan: **Solana, TON**. Operatör hangi chain'i kullanacağını seçebilir, müşteri hangisini kullanacağını seçebilir.

#### 3.3.6 Built-in KYC/AML operatör tarafında
PayRam "WordPress modeli" benimser: altyapıyı sağlar, operatör kendi yargı alanına göre compliance (KYC, AML, transaction monitoring) uygular. PayRam zorlamaz.

#### 3.3.7 No Signup, No KYB
Operatör için onboarding:
- Sign up formu YOK
- Approval queue YOK
- KYB paperwork YOK
- Banking relationship YOK
- 1 shell komutu + 10 dakika = canlı

---

## 4. Card-to-Crypto Onramp

### 4.1 Ürün Tanımı (resmi alıntı)

> "Card-to-Crypto Onramp or Fiat Onramp allows merchants to accept customer payments in fiat currency while receiving settlements in crypto through PayRam. It removes the need for external exchanges or manual conversions, letting businesses expand their customer base and simplify checkout experiences."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

> "PayRam, the self-hosted non-custodial crypto payment gateway, has rolled out a card-to-crypto onramp that lets merchants accept credit cards, debit cards, Apple Pay, Google Pay, bank transfers, and 175+ local and regional payment methods across 190+ countries, with USDC settlement on Base directly to self-custody wallets, no setup fees, and no waiting period."
> — PayRam press release, March 30, 2026

### 4.2 Kapsam (kim ne yapar)

#### Operatör (merchant) için:
- **KYC/KYB gerekmez** — dashboard'da toggle ile activation
- Aktivasyon: Settings → Payment Channels → Cards → Activate
- 10 dakika içinde canlı
- Opsiyonel: gas fee sponsorship (müşteri için)

#### Müşteri (player) için:
- Email ile otomatik PayRam Wallet oluşturulur
- İlk alımda: **basic one-time KYC** (3rd-party provider üzerinden)
- Sonraki alımlar: minimal steps, KYC tekrarı yok
- Self-custody: PayRam wallet key'leri müşteridedir (PayRam/merchant tutmaz)

#### 3rd-party provider (PayRam arkasında) için:
- "Regulated, third-party fiat-to-crypto providers"
- "Smart routing" — ülke/tutar/yöntem'e göre en iyi provider seçilir
- **Provider isimleri public olarak açıklanmamış** (POC'ta öğrenilecek)
- KYC, fraud, chargeback sorumluluğu provider'da
- PayRam onlara pass-through fee öder (markup yok)

### 4.3 Ödeme Yöntemleri (175+, 190+ ülke)

| Yöntem | Bölge | Notlar |
|---|---|---|
| Credit / Debit Card | Global | Visa, Mastercard, Maestro |
| Apple Pay | Global | iOS/macOS Safari |
| Google Pay | Global | Android/Chrome |
| Bank Transfer (ACH) | US | 4-5 iş günü |
| Bank Transfer (SEPA) | EU | 1-3 iş günü |
| Bank Transfer (Instant SEPA) | EU | Real-time |
| RevolutPay | EU/UK | Revolut kullanıcıları |
| Local rails | Ülkeye göre | PIX (BR), Yellow Card, UPI (IN), vb. |
| Faster Payments | UK | Bank-to-bank |
| Wire Transfer | Global | High-value |

**Smart routing**: Müşterinin konumuna, miktarına, tercih ettiği yönteme göre en uygun ödeme yolu otomatik seçilir.

### 4.4 Minimum ve Maksimum

| Parametre | Değer | Kaynak |
|---|---|---|
| **Minimum purchase** | $12 | docs.payram.com/support/change-log (provider-enforced) |
| **Maksimum purchase** | PayRam'in "no transaction limits" açıklaması var, ancak 3rd-party provider'ın kendi limitleri uygulanır | docs.payram.com/faqs/introduction |
| **Daily / monthly customer limits** | 3rd-party provider'a bağlı (KYC seviyesine göre) | TBD — POC'ta ölçülecek |

### 4.5 Settlement (USDC on Base)

- Settlement token: **USDC**
- Settlement chain: **Base** (mainnet; card-to-crypto için zorunlu)
- Settlement address: Müşterinin PayRam Wallet'ı (auto-generated)
- Settlement speed: 3rd-party provider'a bağlı, genelde "few minutes to few hours" (card için)

> **ÖNEMLİ**: Card-to-crypto onramp **şu anda sadece Base chain'inde destekleniyor**. Base'i settings'te enable etmek zorunlu. Diğer chain'lerde kart ödemesi aktif değil. Polymarket veya başka bir zincirle çalışmaz.

---

## 5. Compliance — KYC / KYB

### 5.1 Operatör (Merchant) Perspektifi

> "Merchants do not need to complete KYC/KYB to enable this Onramp method."
> — docs.payram.com/features/card-to-crypto-fiat-onramp (resmi alıntı, doğrulandı)

- Aktivasyon: Dashboard toggle
- Onay kuyruğu YOK
- Compliance review YOK
- Banking relationship YOK
- "Bu sektör için mi?" diye sorulmuyor (iGaming, casino, adult business açıkça destekleniyor)

**Bu ne anlama geliyor**:
- Operatör kendi iGaming lisansından sorumlu
- Kendi AML programını yürütür
- KYC provider'ını kendisi entegre edebilir (SumSub, Onfido, Jumio vb.)
- Transaction monitoring kendi sorumluluğunda
- PayRam bu konularda opinion belirtmez, sadece altyapı sağlar

### 5.2 Müşteri (Player) Perspektifi

> "Customers will still be required to complete a basic one-time KYC verification in their first purchase. After verification, customers can pay using a card or other supported fiat methods with minimal steps."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

**KYC detayları**:
- Tetikleyici: İlk kartlı alımda
- Tip: Basic (basic one-time)
- Yapan: 3rd-party regulated provider (PayRam arkasında)
- Limit: PayRam public docs'ta açıkça belirtilmemiş — **POC'ta ölçülecek**
- Sonraki alımlar: KYC tekrarı yok

**Beklenen KYC akışı** (3rd-party provider bağlı):
- L0: İsim, telefon, email, adres
- L1: + Doğum tarihi, TC/Pasaport No
- L2: + Fotoğraflı ID, selfie

**İlk alım tutarına göre KYC seviyesi muhtemelen değişir**:
- <$100 → muhtemelen L0 (sadece temel bilgiler)
- $100-$1000 → L1 (TC/Pasaport)
- >$1000 → L2 (fotoğraflı ID)

> **UYARI**: Bu varsayımsal bir dağılımdır. 3rd-party provider'ın gerçek KYC policy'si farklı olabilir. POC'ta $12, $50, $200, $500, $1000 test edilmelidir.

### 5.3 Sorumluluk Matrisi

| Konu | Operatör | PayRam | 3rd-party Provider | Müşteri |
|---|:---:|:---:|:---:|:---:|
| iGaming lisansı | ✓ | | | |
| AML/CFT programı | ✓ | | | |
| KYC doğrulaması (müşteri) | | | ✓ | ✓ (bilgi sağlar) |
| Fraud detection | | | ✓ | |
| Chargeback yönetimi | | | ✓ | |
| Veri saklama (müşteri) | ✓ (kendi DB) | | ✓ (kendi DB) | |
| Sanctions screening | | | ✓ | |
| Travel Rule | | | ✓ | |
| Tax reporting | ✓ | | ✓ | |

---

## 6. Ücret Yapısı

### 6.1 PayRam Fee

> "PayRam does not apply any additional fees or markups on onramp transactions. All onramp related commercials are directly applied by the third-party onramp partners."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

> "PayRam charges a flat 1%–5% fee on settlement, when funds are withdrawn to the cold wallet."
> — docs.payram.com/faqs/general-faqs

**Operatör için toplam maliyet**:
- Onramp işlemi başına: **$0** (PayRam)
- Cold wallet settlement: **1%-5%** (PayRam, configurable)
- 3rd-party provider fee: provider'a göre değişir (typical 1.5%-4% card)

**Toplam örnek**:
- $100 kart ödemesi
- PayRam fee: $0
- Provider fee: ~$3 (3% card fee varsayımı)
- Settlement fee: ~$2.5 (2.5% cold wallet sweep)
- Müşteriye ulaşan USDC: ~$94.5 (müşteri fee'yi görür, sportsbook backend balance'ı buna göre günceller)

> **NOT**: 3rd-party provider fee'si PayRam tarafından pass-through edildiği için operatörün gelirine dokunmaz. Müşteri fee'yi öder.

### 6.2 Müşteri (Player) için Görünen Fee

Müşteri checkout'ta şunları görür:
- Provider fee (card fee'si)
- Network fee (gas — opsiyonel merchant sponsorship ile operatör öder)
- Spread (varsa, provider'ın exchange rate spread'i)

PayRam'in adı geçmez.

### 6.3 3rd-Party Provider Fee Schedule

PayRam public docs'ta provider fee'sini açıklamaz. Tipik aralıklar (PayRam arkasındaki bilinen provider'lar için):
- Card: %2.5-%4 (MoonPay, Transak benchmark)
- Apple/Google Pay: %1.5-%3
- SEPA: %0.5-%1.5
- RevolutPay: %1-%2

**POC görevi**: Test purchase'lardan gerçek fee breakdown'ını çıkarmak.

---

## 7. Self-Hosting Kurulum

### 7.1 Server Gereksinimleri

#### Minimum (POC/Staging)
| | |
|---|---|
| **CPU** | 4 cores |
| **RAM** | 4 GB |
| **Disk** | 50 GB SSD |
| **OS** | Ubuntu 22.04 LTS |
| **Ağ** | Public IP, port 80/443 açık |
| **Maliyet** | €8-15/ay (Hetzner CPX21, DigitalOcean droplet) |

#### Önerilen (Production)
| | |
|---|---|
| **CPU** | 8 cores |
| **RAM** | 8 GB |
| **Disk** | 100 GB SSD |
| **OS** | Ubuntu 22.04 LTS |
| **Backup** | Daily snapshot |
| **Maliyet** | €30-60/ay |

> **AWS notu**: Kullanıcının elinde hazır AWS server var. EC2 t3.medium (2 vCPU, 4 GB) veya t3.large (2 vCPU, 8 GB) uygun. EBS gp3 50-100 GB. PayRam destek cloud-init ile deploy edilebilir. VPC public subnet, security group: 22 (sadece admin IP), 80, 443.

### 7.2 Kurulum Adımları

#### Aşama 1 — VPS Hazırlığı (10 dakika)

```bash
# AWS EC2 launch
aws ec2 run-instances \
  --image-id ami-0c7217cdde317cfec \
  --instance-type t3.medium \
  --key-name payram-admin \
  --security-group-ids sg-payram \
  --subnet-id subnet-public \
  --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":50,"VolumeType":"gp3"}}] \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=payram-staging}]'

# SSH bağlantısı
ssh -i ~/.ssh/payram-admin.pem ubuntu@<EC2_PUBLIC_IP>

# Sistem güncellemesi
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git ufw fail2ban

# Firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

#### Aşama 2 — Domain ve SSL (10 dakika)

```bash
# Domain: payram-staging.yourdomain.com → A record → EC2 IP
# SSL: Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d payram-staging.yourdomain.com
```

#### Aşama 3 — PayRAM Deploy (10 dakika)

```bash
# Resmi setup script
bash <(curl -fsSL https://payram.com/setup_payram.sh)
# veya testnet için
bash <(curl -fsSL https://payram.com/setup_payram.sh) -- --testnet
```

**Script'in yaptığı** (docs.payram.com/deployment-guide/quick-setup):
1. PostgreSQL kurulumu ve konfigürasyonu
2. Node.js runtime kurulumu
3. PayRam servislerinin indirilmesi
4. Reverse proxy (nginx) konfigürasyonu
5. SSL entegrasyonu (certbot auto-renew)
6. Systemd service olarak registration
7. Initial root account setup wizard'ı başlatma

#### Aşama 4 — İlk Konfigürasyon (15 dakika)

Web dashboard'a giriş (`https://payram-staging.yourdomain.com`):
1. **Root account**: email + password
2. **Node details**: Base mainnet RPC URL (Alchemy/Infura), ETH RPC (opsiyonel)
3. **Hot wallet**: oluşturulan hot wallet adresini kaydet (sweep buffer)
4. **Cold wallet**: MetaMask/Coinbase/Binance'dan adres ekle (treasury)
5. **API key**: generate new API key, secret'i güvenli yere kaydet

#### Aşama 5 — Onramp Aktivasyonu (5 dakika)

1. Settings → Payment Channels → **Cards** → Activate
2. Base chain enable kontrolü (zorunlu)
3. Multi-project setup varsa: proje başına toggle

#### Aşama 6 — Webhook Konfigürasyonu (10 dakika)

1. Developer → Webhook → Add Endpoint
2. URL: `https://sportsbook-staging.yourdomain.com/payram/webhook`
3. Secret: HMAC signing key
4. Event subscription: Payment Page Rendered, Payment Detected, Payment Confirmed

**Toplam setup süresi**: ~1 saat.

### 7.3 Konfigürasyon Checklist

- [ ] Domain DNS doğru
- [ ] SSL otomatik yenileniyor (certbot timer)
- [ ] UFW aktif, 80/443/22 sadece gerekli IP'ler
- [ ] fail2ban SSH için aktif
- [ ] PostgreSQL daily backup
- [ ] Cold wallet private key **offline** saklanıyor
- [ ] 2FA dashboard login için aktif
- [ ] API key secret manager'da (AWS Secrets Manager, HashiCorp Vault)
- [ ] Monitoring: UptimeRobot, healthcheck.io
- [ ] Log shipping: CloudWatch (AWS) veya Loki stack
- [ ] PayRam update script cron (haftalık)

---

## 8. Entegrasyon Mimarisi

### 8.1 Sistem Bileşenleri

```
┌────────────────────────────────────────────────────┐
│  Player (browser/mobile)                            │
│  ↓                                                 │
│  Sportsbook Frontend (React/Next.js)                │
│  ↓ HTTPS                                           │
│  Sportsbook Backend (Node.js / Python / Go)         │
│  ├─ Auth/Player DB                                  │
│  ├─ Wallet balance cache (Redis)                    │
│  ├─ Webhook receiver (HMAC verify)                  │
│  └─ PayRam API client (outbound)                    │
│       ↓ HTTPS                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ PayRam Node (self-hosted, EC2)               │  │
│  │ ├─ PostgreSQL                                │  │
│  │ ├─ Payment API                               │  │
│  │ ├─ Smart contract (SmartSweep)               │  │
│  │ └─ Onramp router → 3rd-party provider        │  │
│  │       ↓ HTTPS                               │  │
│  │   3rd-party Fiat-to-Crypto Provider         │  │
│  │   (MoonPay / Transak / AlchemyPay / etc.)   │  │
│  │       ↓ blockchain                          │  │
│  │   USDC on Base (Base mainnet)                │  │
│  │       ↓                                     │  │
│  │   Player's PayRam Wallet (email-based)      │  │
│  │       ↓ SmartSweep (auto)                   │  │
│  │   Operator's Cold Wallet (treasury)         │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### 8.2 Akış Diyagramı (Detaylı)

#### Adım 1: Payment Intent Oluşturma
```
Sportsbook Backend → PayRam API
POST /api/v1/payment
Headers: API-Key: pk_live_xxx
Body: {
  "customerEmail": "player@example.com",
  "customerID": "sb_player_12345",  // sportsbook player ID
  "amountInUSD": 50
}
→ 200 OK
{
  "url": "https://payram-staging.yourdomain.com/pay/abc123",
  "payment_id": "abc123",
  "expires_at": "2026-06-06T12:30:00Z"
}
```

#### Adım 2: Oyuncu Checkout
- Sportsbook frontend PayRam URL'i modal/iframe içinde açar
- Oyuncu email + amount görür, "Continue" tıklar
- PayRam backend: oyuncu için yeni PayRam Wallet oluşturur (email bazlı, self-custody)
- Wallet'ın private key'i oyuncuya gösterilir (kaydetmesi istenir) veya PayRam Wallet App'e yönlendirilir

#### Adım 3: Müşteri KYC (İlk Alım)
- 3rd-party provider'ın KYC widget'ı açılır
- Basic bilgiler: isim, doğum tarihi, adres, ID
- Doğrulama: 30 saniye - 5 dakika (provider'a bağlı)
- Sonuç: KYC approved → checkout'a devam

#### Adım 4: Ödeme Yöntemi Seçimi
- 3rd-party provider'ın payment method picker'ı
- Card / Apple Pay / Google Pay / SEPA / vb.
- Smart routing: en iyi yöntem otomatik önerilir

#### Adım 5: Ödeme ve Onramp
- 3rd-party provider kartı çeker, fiat → USDC dönüşümü yapar
- USDC, Base ağında player'ın PayRam Wallet adresine gönderilir
- Settlement süresi: "few minutes to few hours" (provider'a bağlı)

#### Adım 6: Webhook Bildirimi
PayRam → Sportsbook Backend'a 3 webhook event gönderir:
1. `payment_page_rendered` (oyuncu checkout'u açtı)
2. `payment_detected` (onramp tx blockchain'te görüldü)
3. `payment_confirmed` (USDC settle oldu, sweep başladı)

#### Adım 7: SmartSweep ve Sportsbook Balance
- PayRam'in smart contract'ı USDC'yi player wallet'tan → cold wallet'a taşır
- Webhook `payment_confirmed` ile sportsbook backend player balance'ı günceller
- Operator fee (1%-5%) ayrı tutulur, kalan USDC cold wallet'ta kalır

### 8.3 Oyuncu Eşleştirme

PayRam'in `customerID` parametresi sportsbook player ID'si ile eşleşir. Bu sayede:
- Her sportsbook player'ının PayRam'de kendi unique deposit address'i var
- Webhook payload'unda `customerID` döner → sportsbook doğru player'ı günceller
- Dispute/chargeback durumunda transaction geriye dönük izlenebilir

### 8.4 Hata Yönetimi

| Hata | Sebep | Çözüm |
|---|---|---|
| `payment_failed` | Kart reddi, 3DS fail, insufficient funds | Sportsbook oyuncuya "Ödeme başarısız" gösterir, yeniden dene |
| `payment_expired` | 30 dakika içinde tamamlanmamış | Yeni payment intent oluşturulur |
| `kyc_rejected` | Müşteri KYC'yi geçemedi | Sportsbook manuel review'a alabilir, manuel KYC isteyebilir |
| `webhook_signature_invalid` | HMAC doğrulama hatası | Log, alert, retry with backoff |
| `base_network_congested` | Gas fee spike | Merchant gas sponsorship aktifse sorun yok, değilse player bekler |
| `cold_wallet_unreachable` | RPC down | PayRam retry, alert, sportsbook balance pending işaretler |

---

## 9. API Endpoints

### 9.1 Payment API

#### Create Payment
```http
POST /api/v1/payment
Headers: API-Key: <key>, Content-Type: application/json
Body:
{
  "customerEmail": "player@example.com",
  "customerID": "sb_player_12345",
  "amountInUSD": 50,
  "metadata": {                          // opsiyonel
    "sportsbook_player_id": "12345",
    "campaign": "welcome_bonus"
  }
}
Response 200:
{
  "url": "https://payram-staging.yourdomain.com/pay/abc123",
  "payment_id": "abc123",
  "expires_at": "2026-06-06T12:30:00Z"
}
```

#### Get Payment Status
```http
GET /api/v1/payment/{payment_id}
Headers: API-Key: <key>
Response 200:
{
  "payment_id": "abc123",
  "status": "confirmed",                // pending, confirmed, failed, expired
  "amount_usd": 50,
  "amount_usdc": 49.85,                 // fee düşülmüş
  "tx_hash": "0x...",                    // Base mainnet tx
  "customer_id": "sb_player_12345",
  "timestamp": "2026-06-06T12:15:00Z"
}
```

### 9.2 Ticker API

```http
GET /api/v1/ticker
Response 200:
{
  "USDC": {
    "USD": 1.0001,
    "EUR": 0.92,
    "TRY": 32.45,
    "BRL": 5.12
  },
  "USDT": {...},
  "BTC": {...}
}
```

### 9.3 Payouts API (operator cold wallet'a transfer)

```http
POST /api/v1/payouts
Headers: API-Key: <key>
Body:
{
  "from": "hot_wallet",
  "to": "cold_wallet_address",
  "amount": "1000.00",
  "currency": "USDC",
  "chain": "base"
}
Response 200:
{
  "payout_id": "xyz",
  "tx_hash": "0x...",
  "status": "pending"
}
```

### 9.4 Customer Wallets API (unique deposit address)

```http
POST /api/v1/customer/wallets
Body:
{
  "customer_id": "sb_player_12345",
  "currency": "USDC",
  "chain": "base"
}
Response 200:
{
  "wallet_id": "...",
  "address": "0x...",                    // unique, permanent
  "currency": "USDC",
  "chain": "base"
}
```

### 9.5 Webhook Endpoint (sportsbook tarafında implement)

```http
GET https://sportsbook-staging.yourdomain.com/payram/webhook?payment_id=abc123&status=confirmed&amount=49.85&timestamp=2026-06-06T12:15:00Z&signature=hmac_sha256
```

> **ÖNEMLİ**: PayRam webhook'ları **GET request** olarak gönderir. Sportsbook bu URL'i handle etmeli, HMAC signature'ı doğrulamalı, sonra 200 OK dönmeli.

### 9.6 Diğer Endpoints (referans)

- `GET /api/v1/wallet/{address}/balance` — wallet balance
- `GET /api/v1/payouts/{payout_id}` — payout status
- `GET /api/v1/transactions` — transaction history
- `GET /api/v1/customers/{id}/payments` — customer payment history

Tam liste: https://docs.payram.com/api-integration

---

## 10. Webhook Akışı

### 10.1 Event Türleri

| Event | Tetikleyici | Payload |
|---|---|---|
| `payment_page_rendered` | Oyuncu PayRam URL'i açtı | payment_id, customer_id, timestamp |
| `payment_detected` | Onramp tx blockchain'te görüldü | payment_id, tx_hash, amount_usdc, timestamp |
| `payment_confirmed` | USDC settle oldu, sweep başladı | payment_id, status=confirmed, amount_usdc_after_fee, timestamp |

### 10.2 Signature Doğrulama

PayRam, webhook'ları HMAC-SHA256 ile imzalar. Sportsbook doğrulamalı:

```javascript
const crypto = require('crypto');

function verifyPayRamWebhook(req, res) {
  const signature = req.query.signature;
  const payload = JSON.stringify({
    payment_id: req.query.payment_id,
    status: req.query.status,
    amount: req.query.amount,
    timestamp: req.query.timestamp
  });
  const expectedSignature = crypto
    .createHmac('sha256', process.env.PAYRAM_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process event
  // ...
  res.status(200).send('OK');
}
```

### 10.3 Retry Stratejisi

PayRam webhook delivery:
- İlk deneme: 1 saniye içinde
- Retry: 5 saniye, 30 saniye, 5 dakika, 30 dakika (exponential backoff)
- 4 retry sonrası: failed, alert gönderilir

Sportsbook tarafı:
- 200 OK dönmek **zorunlu** (aksi halde retry tetiklenir)
- İşlem 5 saniye içinde bitmeli (longer response → PayRam timeout sayar)

### 10.4 Idempotency

Webhook'lar duplicate gelebilir (network glitch, retry). Sportsbook:
- `payment_id` + `status` kombinasyonunu unique key olarak DB'de tut
- Duplicate'te: skip, return 200 OK
- Bu sayede double-credit önlenir

### 10.5 Reconciliation (günlük)

- Her gece 03:00'te sportsbook backend PayRam'den `GET /api/v1/transactions?date=YYYY-MM-DD` çeker
- Sportsbook DB'deki payment kayıtlarıyla karşılaştırır
- Uyumsuzluk varsa alert gönderir, manuel review

---

## 11. Sportsbook Entegrasyonu

### 11.1 Frontend Akışı

```typescript
// React component
async function handleDeposit(amountUsd: number) {
  const response = await fetch('/api/deposit/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amountUsd })
  });
  const { url } = await response.json();
  
  // Open PayRam checkout in modal/iframe
  const payramWindow = window.open(url, 'payram-checkout', 
    'width=500,height=700');
  
  // Listen for postMessage from PayRam
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://payram-staging.yourdomain.com') return;
    
    if (event.data.type === 'payment_confirmed') {
      // Refresh player balance
      refreshPlayerBalance();
      payramWindow.close();
    }
  });
}
```

### 11.2 Backend Akışı

```python
# FastAPI/Python
@app.post("/api/deposit/create")
async def create_deposit(req: DepositRequest, user = Depends(auth)):
    # PayRam API call
    response = await payram_client.create_payment(
        customer_email=user.email,
        customer_id=user.id,
        amount_usd=req.amount_usd
    )
    
    # Save to DB
    await db.payments.insert({
        "payment_id": response.payment_id,
        "player_id": user.id,
        "amount_usd": req.amount_usd,
        "status": "pending",
        "created_at": datetime.now()
    })
    
    return {"url": response.url}

@app.get("/payram/webhook")
async def payram_webhook(
    payment_id: str,
    status: str,
    amount: float,
    timestamp: str,
    signature: str
):
    # Verify signature
    if not verify_hmac(signature, payment_id, status, amount, timestamp):
        raise HTTPException(401, "Invalid signature")
    
    # Idempotency check
    existing = await db.payments.find_one({"payment_id": payment_id})
    if existing and existing.status == "confirmed":
        return {"ok": True}  # already processed
    
    # Update payment
    await db.payments.update(
        {"payment_id": payment_id},
        {"$set": {"status": status, "amount_usdc": amount, "timestamp": timestamp}}
    )
    
    # If confirmed, credit player balance
    if status == "confirmed":
        payment = await db.payments.find_one({"payment_id": payment_id})
        await credit_player_balance(
            player_id=payment["player_id"],
            amount=amount,
            currency="USDC"
        )
        
        # Trigger welcome bonus if applicable
        await check_welcome_bonus(payment["player_id"])
    
    return {"ok": True}
```

### 11.3 Player Balance Yönetimi

**Opsiyon A — Internal Ledger (önerilen)**:
- Sportsbook kendi DB'sinde oyuncu bakiyesi tutar (USD cinsinden)
- USDC tahsil edildiğinde USD equivalent'i balance'a ekler
- Bahis kazancı/zararı internal ledger'da
- Oyuncu çekmek istediğinde: ledger'dan düş, PayRam off-ramp'tan gönder (waitlist sonrası)

**Opsiyon B — USDC Native**:
- Balance USDC cinsinden
- Bahis oranları USDC ile
- Anında transfer
- Daha şeffaf ama UX daha karmaşık (oyuncular USD düşünür)

**Başlangıç için**: Opsiyon A daha pratik. USDC → USD conversion anında yapılır, oyuncu USD bakiyesi görür.

### 11.4 Withdraw Akışı (off-ramp)

**Şu anda**: PayRam off-ramp waitlist'te, henüz canlı değil.

**Oyuncu çekme akışı (placeholder, off-ramp canlı olunca)**:
```
[Oyuncu "Withdraw" tıklar]
   ↓
[Sportsbook backend: player balance'tan düş, "pending withdrawal" oluştur]
   ↓
[PayRam Payouts API: hot wallet → player bank account]
   ↓
[Webhook: payout.confirmed]
   ↓
[Sportsbook: "Withdrawal completed"]
```

**Şimdilik alternatif**: Manuel SEPA transfer veya 3rd-party off-ramp (Transak, MoonPay).

---

## 12. POC Test Planı

### 12.1 POC Hedefleri

1. **Self-hosting setup'unu doğrulama**: 1 saat içinde canlı
2. **KYC limitini ölçme**: Hangi tutar KYC tetikler, hangi seviye ne ister
3. **Settlement akışını doğrulama**: USDC gerçekten oyuncu wallet'ına yatıyor mu
4. **SmartSweep'i doğrulama**: Cold wallet'a otomatik geçiyor mu
5. **Webhook reliability**: Event'ler doğru geliyor mu, retry çalışıyor mu
6. **3rd-party provider fee schedule**: Test purchase'lardan fee breakdown çıkarmak
7. **Ülke bazlı davranış**: TR, DE, US, BR'de aynı mı farklı mı

### 12.2 Test Senaryoları

| # | Tutar | Ülke | Yöntem | Beklenen | Ölçülecek |
|---|---|---|---|---|---|
| T01 | $12 | TR | Card | İlk başarılı purchase | KYC tetiklenme noktası, fee breakdown |
| T02 | $50 | TR | Apple Pay | KYC sonrası hızlı | Provider response time, fee % |
| T03 | $200 | TR | Card | Light KYC yeterli mi? | KYC document istiyor mu? |
| T04 | $500 | TR | Card | KYC limit expansion | Limit artışı otomatik mi? |
| T05 | $1000 | TR | Card | Full KYC zorunlu mu? | ID upload isteği |
| T06 | $100 | DE | SEPA | Smart routing → ? | Farklı provider mı? Fee karşılaştırma |
| T07 | $100 | US | Card | US-specific provider | Fee, KYC seviyesi |
| T08 | $100 | BR | PIX | LatAm provider | Local rail desteği |
| T09 | $10 | TR | Card | Reddedilmeli (min $12) | Error message |
| T10 | $20,000 | TR | Card | Maks limit? | Full KYC zorunlu mu? |
| T11 | $1000 | TR | Apple Pay x3 / saat | Velocity check | Provider rate limit |
| T12 | - | TR | Başarısız kart | 3DS fail | Webhook `payment_failed` event |
| T13 | - | TR | 30 dk timeout | Süre dolma | Webhook `payment_expired` event |
| T14 | $5000 | DE | SEPA Instant | Yüksek tutar | Full KYC, manuel review |

### 12.3 KYC Ölçüm Metrikleri

POC'un en kritik çıktısı: **KYC limit haritası**.

```
Tutar aralığı    KYC seviyesi  Doküman gerekli mi?   Provider davranışı
$0-$50           L0?           Hayır                 ?
$50-$200         L1?           TC/Pasaport No        ?
$200-$1000       L1+?          + Adres doğrulama     ?
$1000+           L2?           Fotoğraflı ID + selfie ?
$5000+           Enhanced?     Ek doğrulama          ?
```

### 12.4 POC Çıktıları (deliverables)

1. **KYC limit haritası** (yukarıdaki tablo doldurulmuş)
2. **Fee schedule** (3rd-party provider fee %'leri, hangi yöntemde ne kadar)
3. **Smart routing raporu** (hangi provider hangi country/yöntemde seçildi)
4. **Settlement timing** (kart → USDC kaç saniye)
5. **Webhook reliability** (5 dakika içinde geldi mi, retry kaç kere)
6. **Sweep başarı oranı** (10/10 sweep tamamlandı mı)
7. **UI/UX notları** (oyuncu deneyimi, friction noktaları)
8. **Maliyet analizi** (gerçek fee'lerle toplam operatör maliyeti)

### 12.5 POC Süresi

- Setup: 1 saat
- Test senaryoları: 2-3 gün (T01-T14, paralel birden fazla kişiyle)
- Raporlama: 1 gün
- **Toplam: 4-5 gün**

### 12.6 POC Başarı Kriterleri → Production Geçiş

- [x] Tüm test senaryoları tamamlandı
- [x] KYC limit haritası netleşti
- [x] 3rd-party fee'ler ölçüldü
- [x] Settlement süresi <5 dakika (kart için)
- [x] Webhook 100% success rate
- [x] SmartSweep 100% success rate
- [x] Güvenlik audit (cold wallet backup, secret rotation, WAF)
- [x] Disaster recovery plan yazıldı

---

## 13. Production Checklist

### 13.1 Altyapı

- [ ] AWS EC2 prod instance (t3.large, 8 GB RAM)
- [ ] EBS volume encrypted, daily snapshot
- [ ] VPC private subnet, NAT gateway
- [ ] Security group: 22 (admin IP only), 80, 443
- [ ] Route53 DNS + ACM SSL (veya self-managed certbot)
- [ ] CloudWatch alarms (CPU, RAM, disk, network)
- [ ] AWS Backup (DB daily, 30 gün retention)
- [ ] Multi-AZ opsiyonel (başlangıç için single AZ yeterli)

### 13.2 PayRam Konfigürasyonu

- [ ] Production API key (test key'den farklı)
- [ ] Production Base RPC (Alchemy/Infura paid tier)
- [ ] Production cold wallet (multi-sig, 3-of-5)
- [ ] Hot wallet (separate, smaller balance)
- [ ] Settlement fee: 1%-5% (konfigüre edilebilir, başlangıç 2%)
- [ ] Gas sponsorship: AÇIK (conversion artışı için)
- [ ] Multi-brand setup (her sportsbook markası için ayrı project)

### 13.3 Güvenlik

- [ ] 2FA dashboard (TOTP)
- [ ] API key rotation policy (90 gün)
- [ ] Webhook secret rotation (180 gün)
- [ ] Cold wallet private key: hardware wallet (Ledger/Trezor), 3-of-5 multisig
- [ ] DB encryption at rest (RDS veya self-managed LUKS)
- [ ] WAF (AWS WAF veya Cloudflare proxy)
- [ ] DDoS protection (Cloudflare)
- [ ] Penetration test (yıllık, external firmadan)
- [ ] Bug bounty programı (opsiyonel)
- [ ] Incident response runbook yazıldı

### 13.4 Monitoring ve Alerting

- [ ] Uptime monitoring (UptimeRobot, healthchecks.io)
- [ ] Application logs → CloudWatch (veya Datadog, Grafana Loki)
- [ ] Error rate alert (>1% 5xx)
- [ ] Settlement delay alert (>10 dakika)
- [ ] Sweep failure alert (anında)
- [ ] Webhook delivery failure alert (5 dakika içinde)
- [ ] Disk space alert (>80%)
- [ ] CPU/RAM alert (>90% sustained 5 dakika)
- [ ] Cold wallet balance reconciliation (günlük)

### 13.5 Compliance ve Hukuk

- [ ] Operatörün iGaming lisansı geçerli ( Malta, Curaçao, Anjouan vb.)
- [ ] AML/CFT programı yazıldı
- [ ] Transaction monitoring rules (>$10k report, suspicious patterns)
- [ ] KYC provider (SumSub/Onfido/Jumio) entegre edildi
- [ ] Sanctions screening (OFAC, EU, UN lists)
- [ ] Travel Rule çözümü (PayRam arkasındaki provider üzerinden)
- [ ] Player Terms of Service (crypto deposit条款)
- [ ] Privacy Policy (GDPR/KVKK uyumlu)
- [ ] Data retention policy (5-7 yıl)
- [ ] Tax reporting (oyuncu kazançları için)

### 13.6 Operasyon

- [ ] PayRam update cron (haftalık, otomatik)
- [ ] DB backup test (aylık, restore drill)
- [ ] Disaster recovery runbook (RPO: 1 saat, RTO: 4 saat)
- [ ] On-call rotation (7/24 — başlangıç için 2 kişi yeterli)
- [ ] PayRam MCP server'ı ayrı host (opsiyonel, agentic features için)
- [ ] Off-ramp entegrasyonu (PayRam waitlist bittiğinde)

### 13.7 Dokümantasyon

- [ ] Runbook (incident response, deployment, rollback)
- [ ] Architecture diagram (bu doc)
- [ ] API integration guide (sportsbook developer'lar için)
- [ ] Player FAQ (deposit, withdrawal, fees)
- [ ] Internal admin guide (PayRam dashboard, settings)

---

## 14. Varyant B ile Karşılaştırma

| Kriter | Varyant B (Crossmint) | Varyant C (PayRam Native) |
|---|---|---|
| **Mimari** | Hosted SaaS, Crossmint wallet'ları | Self-hosted PayRam + 3rd-party onramp |
| **Custody** | Smart contract wallet (ERC-4337), on-chain | Smart contract sweep, kendi cold wallet |
| **Operatör KYB** | Production'da zorunlu | **YOK** |
| **Oyuncu KYC eşiği** | Tier 1: $1,000/12 ay (kümülatif) | Basic one-time, ilk alımda (tutar belirsiz, POC'ta ölçülecek) |
| **Wallet API delete** | YOK (19 endpoint, 0 delete) | İlgisiz (PayRam wallet'ları oyuncunun kendisinindir) |
| **Zincir** | Base, Solana, Stellar, EVM, + | Base (card için zorunlu), + ETH, Polygon, Tron, BTC |
| **Stablecoin** | USDC, USDT, + | USDC (cards için), USDT (sweep için) |
| **Ülkeler** | 160+ | 190+ (cards için) |
| **Ödeme yöntemleri** | 50+ (card, bank, Apple/Google Pay) | 175+ (card, bank, Apple/Google Pay, RevolutPay, local rails) |
| **Setup süresi** | 5 dakika (API key al, integrate et) | 1 saat (VPS + setup + config) |
| **Hosting** | Crossmint cloud | Kendi AWS EC2'niz |
| **Markup** | Spread + fee | PayRam 0% markup, provider fee pass-through |
| **Settlement fee** | Variable | 1-5% cold wallet withdrawal |
| **iGaming uyumu** | Belirsiz (high-risk merchant kısıtı var) | Açıkça destekleniyor |
| **Self-custody** | Hibrit (Crossmint signer + user signer) | Tam (smart contract, siz kontrol) |
| **Vendor lock-in** | Orta (wallet'larınız ERC-4337, başka yere taşınabilir) | Düşük (smart contract + cold wallet, portatif) |
| **Veri kontrolü** | PayRam DB'de (sizin datanız) | Sizin DB'nizde |
| **Audit trail** | Crossmint dashboard | Kendi DB'niz + PayRam API log |
| **Webhook** | Mevcut | Mevcut (GET request, 3 event) |
| **MCP desteği** | Yok | Var (mcp.payram.com) |
| **Off-ramp** | Mevcut | Waitlist (BTC, ETH, USDT, USDC; 100+ ülke) |
| **Yıllık maliyet (küçük operatör)** | $0-$1000 (free tier OK) | $120-$720 (VPS) + provider fees |
| **Ölçeklenebilirlik** | Crossmint scale eder | Kendi scale'iniz (sınırsız, instance upgrade) |
| **Risk** | Crossmint kapanırsa yönetim paneli gider, wallet'lar yaşar | VPS çökerse yedekten restore, cold wallet ayrı |
| **Sözleşme** | Crossmint TOS (MiCA, GDPR) | Self-hosted (sizin yargı) |
| **Toplam verdict** | ❌ Oyuncu KYC yüksek, wallet delete yok, hosted risk | ✅ Operatör KYB yok, smart routing, iGaming-first |

### 14.1 Neden Varyant B Reddedildi (Recap)

1. **"Oyuncular KYC olmadan"** hedefine uygun değil ($1k/12ay Tier 1, EUR cinsinden €500/gün'ün üstünde kümülatif tetikleyici)
2. **Wallet silinemez** (19 endpoint, 0 delete) — "5 wallet'tan kurtulamıyorum" sorunu
3. **Smart contract wallet immutability** by-design (Crossmint manifestosu) — "delete eklemek felsefeye aykırı"
4. **$20 USDXM locked** (wallets 3+4 EOA key kayıp, kullanıcı hatası)

### 14.2 Neden Varyant C Seçildi

1. **Operatör KYB = YOK** (resmi alıntı, doğrulandı)
2. **Müşteri basic KYC** (sadece ilk alımda, sonra yok)
3. **Self-hosted** = veri kontrolü operatörde
4. **iGaming-first** tasarım (founder interview, supplier directory)
5. **175+ payment method, 190+ ülke** (en geniş kapsam)
6. **USDC on Base** (PayRam'in zaten desteklediği zincir, ek entegrasyon yok)
7. **Smart routing** (her kullanıcıya en iyi provider/yöntem otomatik)
8. **QuillAudits audited**, $100M+ settled, 850K+ onchain tx (proven)
9. **0% markup** (PayRam fee = pass-through, sadece cold wallet settlement'ta 1-5%)

---

## 15. Açık Sorular ve Riskler

### 15.1 PayRam Arasındaki Belirsizlikler

| Soru | Durum | Çözüm |
|---|---|---|
| **3rd-party provider isim(ler)i** | PayRam public docs'ta açıklanmamış | POC'ta test purchase'lar yapıp provider'ı tespit etmek; satışa sor |
| **Müşteri KYC limit haritası** | "Basic one-time" dışında tutar belirtilmemiş | POC'ta $12, $50, $200, $500, $1000, $5000 test et |
| **3rd-party fee schedule** | Pass-through, detay yok | POC'ta fee breakdown çıkar |
| **Country blacklist** | Docs'ta iGaming/casino için liste yok | POC'ta TR, DE, US, BR test et, yasaklı ülke varsa tespit et |
| **Smart routing algoritması** | "Region, amount, payment method"a göre | POC'ta aynı koşullarda farklı sonuç gözlemle |
| **Off-ramp availability** | Waitlist'te | PayRam sales'a sor, alternative olarak 3rd-party off-ramp hazırla |
| **Multi-chain card support** | Şu anda sadece Base | PayRam roadmap'ini takip et |
| **iGaming-specific KYC rules** | Bazı ülkelerde iGaming için özel KYC | Hukuk danışmanı + PayRam sales ile doğrula |
| **Sweep fee netleştirmesi** | %2.5 PayRam'a ait mi? Testnet exclusion var mı? | Mainnet'te test edilmeli |

### 15.2 Teknik Riskler

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| PayRam node crash | Düşük | Settlement durur | Multi-AZ, auto-recovery, health check alarm |
| Base RPC downtime | Düşük | Onramp çalışmaz | Backup RPC (Alchemy + Infura) |
| 3rd-party provider outage | Orta | Card payment geçici durur | Multi-provider smart routing (PayRam avantajı) |
| Webhook delivery fail | Orta | Player balance güncellenmez | Idempotency, reconciliation, manual retry |
| Cold wallet key kaybı | Düşük | YÜKSEK | 3-of-5 multisig, hardware wallet, paper backup |
| Gas fee spike (Base) | Düşük | Settlement yavaşlar | Merchant gas sponsorship aktif |
| Card chargeback | Orta | Operatör zarar edebilir | 3rd-party provider chargeback yönetimi, fraud detection |
| KYC provider rejection | Orta | Oyuncu deposit yapamaz | Alternatif KYC provider (SumSub), manuel review |
| PayRam şirketi kapanır | Çok düşük | Node update durur, cüzdanlar yaşar | Open source mirror, manual updates, BTCPay fallback |

### 15.3 İş Riskleri

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| PayRam fee'sini artırır | Düşük | Maliyet artışı | Sözleşme, multi-provider fallback |
| Düzenleyici değişiklik (ülke bazlı) | Yüksek | Card onramp yasaklanabilir | Çoklu ülke lisansı, hukuk takibi |
| 3rd-party provider (arkada) kapanır | Düşük | Onramp kesinti | PayRam smart routing başka provider'a yönlendirir |
| Competitor (MoonPay/Transak) daha iyi fiyat sunar | Orta | Pazar payı kaybı | Yıllık fee review, multi-provider test |
| Player güven kaybı (crypto volatilite) | Orta | Volume düşer | USDC kullan (stable), anında USD'ye çevir |
| PayRam hosted competitors (BTCPay vb.) | Düşük | PayRam'in rekabet avantajı azalır | PayRam'in smart routing + 175+ yöntem avantajı korunur |

### 15.4 Acil Yapılması Gerekenler (POC Öncesi)

1. **Hukuk danışmanı** ile iGaming + crypto uyumu (özellikle hedef pazarda)
2. **PayRam sales** ile iletişim (demo, altta yatan provider, fee schedule)
3. **KYC provider** seçimi (PayRam ile entegre mi, ayrı mı)
4. **Off-ramp alternatif** araştırması (PayRam waitlist bitene kadar)
5. **AWS hesabı** hazırlığı (bütçe onayı, security group, VPC)

---

## 16. Kaynakça

### 16.1 Birincil Kaynaklar (Resmi PayRam Dokümanları)

| URL | İçerik |
|---|---|
| https://docs.payram.com/features/card-to-crypto-fiat-onramp | Onramp ana sayfa (KYC/KYB, fees, 175+ yöntem) |
| https://docs.payram.com/support/change-log | $12 minimum, provider rules |
| https://docs.payram.com/faqs/general-faqs | PayRam fee yapısı, limits |
| https://docs.payram.com/faqs/introduction | Genel bilgi, minimum server |
| https://docs.payram.com/deployment-guide/quick-setup | Self-hosting setup |
| https://docs.payram.com/onboarding-guide/introduction | Node konfigürasyonu |
| https://docs.payram.com/api-integration/payments-api | REST API referansı |
| https://docs.payram.com/api-integration/payments-api/create-payment | POST /api/v1/payment |
| https://docs.payram.com/api-integration/payments-api/webhook | Webhook event'leri |
| https://docs.payram.com/api-integration/payments-api/payment-status | GET /api/v1/payment |
| https://docs.payram.com/api-integration/payments-api/fetch-tickers | Ticker API |
| https://docs.payram.com/mcp/payram-mcp | MCP server, no-auth |
| https://docs.payram.com/features/smartsweep | SmartSweep, keyless architecture |
| https://docs.payram.com/features/customer-deposit-wallets | Unique deposit address (per customer) |
| https://docs.payram.com/features/payment-links | Payment link oluşturma |
| https://docs.payram.com/features/multi-currency-and-multi-chain-support | Multi-chain, multi-currency |

### 16.2 PayRam Dışı Kaynaklar

| URL | İçerik |
|---|---|
| https://payram.com | Ana site, marketing, demo |
| https://payram.com/blog/what-is-payram | PayRam felsefesi, permissionless commerce |
| https://payram.com/off-ramp | Off-ramp waitlist |
| https://payram.app | App store linkleri |
| https://github.com/PayRam/payram-mcp | MCP server source |
| https://mcp.payram.com | Canlı MCP server (no auth) |
| https://www.thegamblest.com/igaming-talks-interview-with-payrams-siddharth-menon/ | iGaming röportajı (Şubat 2026) |
| https://markets.financialcontent.com/article/accwirecq-2026-3-30-payrams-card-to-crypto-onramp-goes-live-globally | 30 Mart 2026 press release |
| https://www.igamingsuppliers.com/vendor/payram/ | iGaming B2B directory |
| https://www.softwareadvice.com/product/527595-PayRam | Software review |
| https://payyd.co/blog/payram-review | 2026 review (zero-fee, self-hosted) |
| https://medium.com/@ganzaq1/integrating-payrams-mcp-server-and-crypto-onramp-api-a-developer-s-guide-35998a71f1d2 | Developer integration guide |
| https://www.analyticsinsight.net/cryptocurrency-analytics-insight/payram-enables-agents-to-go-live-with-a-self-hosted-stablecoin-payment-gateway-in-minutes | Agentic commerce article |
| https://www.accessnewswire.com/newsroom/en/blockchain-and-cryptocurrency/payram-enables-agents-to-go-live-with-a-self-hosted-stablecoin-paymen-1144001 | Agentic payment gateway press |
| https://www.crunchbase.com/organization/payram | Company profile |
| https://natlawreview.com/press-releases/payram-unveils-private-stablecoin-payment-gateway-merchants-individual | 10 Kasım 2025 lansman |
| https://www.quillaudits.com/leaderboard/payram | Smart contract audit |

### 16.3 İlgili PayRam MCP Tool'ları

| Tool | Açıklama |
|---|---|
| `create-payee` | Müşteri oluştur |
| `send-payment` | Ödeme gönder |
| `get-balance` | Bakiye sorgula |
| `generate-invoice` | Fatura oluştur |
| `test-connection` | Bağlantı testi |

Agent'lar için `mcp.payram.com/mcp` endpoint'i auth gerektirmiyor (no API key, no auth headers).

### 16.4 Rakip Karşılaştırma Kaynakları (referans)

| URL | İçerik |
|---|---|
| https://docs.transak.com | Transak onramp (KYC tiers, fee, country) |
| https://dev.moonpay.com | MoonPay onramp (160+ ülke, MiCA licensed) |
| https://rampnetwork.com | Ramp Network (EU-focused) |
| https://www.alchemy.com/dapps/best/fiat-onramps | 2026 onramp listesi (60 provider) |
| https://onramper.com | Aggregator (30+ provider fallback) |
| https://docs.stripe.com/crypto/onramp/kyc-integration-guide | Stripe KYC tier'ları (L0/L1/L2) |
| https://apidog.com/blog/best-fiat-on-ramp-off-ramp-api | 2026 comparison |
| https://apidog.com/blog/how-to-use-moonpay-api | MoonPay API detay |

---

## Ek A — Self-Hosting Alternatifleri Karşılaştırması

| Çözüm | Tip | KYC | Coin | Maliyet | Zorluk |
|---|---|---|---|---|---|
| **PayRam** | PayFi, wallet management | Operatör YOK, müşteri basic | 20+ token, 5+ chain | VPS $10-50/ay + provider fee | Orta (10 dk setup) |
| **BTCPay Server** | Bitcoin-odaklı | Operatör YOK | Sadece BTC (default), Lightning | VPS $10-30/ay | Yüksek (manuel config) |
| **OpenNode** | Bitcoin/Lightning | KYC gerekli | BTC | SaaS fee | Orta |
| **CoinPayments** | Kripto gateway | KYC gerekli | Multi-coin | SaaS fee | Düşük |
| **NOWPayments** | Crypto payment gateway | KYC gerekli | Multi-coin | 0.5% fee | Düşük |
| **Alchemy Pay** | Fiat onramp | KYC gerekli | Multi-coin | Per-tx fee | Orta |

**PayRam avantajı**:
- Bitcoin-odaklı değil (Ethereum, Base, Polygon, Tron + Solana, TON)
- 175+ fiat ödeme yöntemi (BTCPay'de yok)
- Smart contract sweep (BTCPay'de manuel)
- iGaming-friendly (BTCPay permissionless ama iGaming-specific değil)
- QuillAudits audit (BTCPay open source ama audit per release)

---

## Ek B — Doğrulanan Alıntılar (verbatim)

### Operatör KYC/KYB = YOK
> "Merchants do not need to complete KYC/KYB to enable this Onramp method."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

### Müşteri basic one-time KYC
> "Customers will still be required to complete a basic one-time KYC verification in their first purchase. After verification, customers can pay using a card or other supported fiat methods with minimal steps."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

### 0% PayRam markup on onramp
> "PayRam does not apply any additional fees or markups on onramp transactions. All onramp related commercials are directly applied by the third-party onramp partners."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

### PayRam settlement fee
> "PayRam charges a flat 1%–5% fee on settlement, when funds are withdrawn to the cold wallet."
> — docs.payram.com/faqs/general-faqs

### 175+ payment methods, 190+ countries
> "Customers have access to 175+ payment methods across 190+ countries, with smart routing that matches each user to the best available option based on their region, amount, and payment preference."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

### $12 minimum
> "Card onramp purchases enforce a $12 minimum to comply with provider rules."
> — docs.payram.com/support/change-log

### Card-to-Crypto sadece Base
> "Card payments (and other fiat payment options) are currently supported on the Base blockchain only."
> — docs.payram.com/features/card-to-crypto-fiat-onramp

### Setup 10 dakika
> "PayRam deploys on a merchant's own server in under 10 minutes."
> — PayRam press release, 30 March 2026

### Self-hosted permissionless
> "PayRam takes a fundamentally different approach. It is the world's first self-hosted stablecoin payment gateway. Operators deploy it on their own servers, use their own wallets, and retain full custody of their funds at all times."
> — TheGamblest interview, February 2026

### iGaming permanent solution
> "PayRam was not built as a workaround. It was designed as a permanent, permissionless solution. Because operators self-host their infrastructure and use their own wallets, there is no upstream provider with the ability to restrict, pause, or terminate service."
> — Siddharth Menon, founder, TheGamblest

### SmartSweep keyless
> "Sweeps are executed through PayRam's core smart contract layer, removing the security risks associated with conventional key management."
> — PayRam blog, April 2026

### Unique deposit address
> "The system performs automated bulk sweeps from deposit addresses to operator-controlled cold wallets. The key distinction is that PayRam does not store hot keys or seed phrases for deposit-related operations. The infrastructure is entirely keyless."
> — TheGamblest interview

### Multi-chain orchestrator
> "From a multi-chain perspective, PayRam functions as a chain orchestrator. It currently supports Ethereum, Base, Polygon, Tron, and Bitcoin, with Solana and TON planned next."
> — TheGamblest interview

### Webhook GET request
> "Once, any transaction has been processed against the payment, the merchant will receive a webhook. The webhook is a GET request to the Merchant's server. Merchant has to accept the webhook request, parse this data and send back confirmation of the receipt."
> — docs.payram.com/api-integration/payments-api/webhook

### Audited by QuillAudits
> "Smart Contracts Audited by QuillAudits"
> — payram.com (footer)

### Volume stats
> "$100M+ Value settled, 850,000+ Onchain transactions, 100+ Merchants onboarded"
> — payram.com (homepage)

---

## Ek C — Değişiklik Geçmişi

| Versiyon | Tarih | Yazar | Değişiklik |
|---|---|---|---|
| 1.0 | Haziran 2026 | Mimari çalışma | İlk oluşturulma (Crossmint projesi kapsamında) |

---

**Son**: Bu doküman planlama aşamasındadır. POC tamamlandıktan sonra §12.4 (KYC ölçüm sonuçları), §6.3 (gerçek 3rd-party fee schedule), §15.1 (belirsizliklerin çözümü) güncellenecektir.
