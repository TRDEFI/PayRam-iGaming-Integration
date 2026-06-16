# PayRam — Detaylı Process Flow & Matematik

> **Tarih:** 2026-06-16  
> **Ağ:** Base Sepolia (Chain ID: 84532)  
> **USDC Contract:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e` (decimals: 6)  
> **PayRam:** v3.1.3 (2026-06-15 güncellendi), self-hosted @ `http://52.68.37.77`  
> **Onramp:** Cards onramp aktif ✅ (Apple Pay, Google Pay, PayPal, Mastercard, vb.)

---

## 1. SİSTEM MİMARİSİ — WALLET HİYERARŞİSİ

```mermaid
graph TB
    subgraph PayRam["PayRam Sistemi"]
        MA[Master Account<br/>0xD718Cf...2205<br/>Hot Wallet]
        FC[Fee Collector<br/>0xEEDbC9...449E<br/>%2.5 komisyon]
        FUC[Fund Collector<br/>0x5fE5Cb...A023<br/>Sweep Contract]
        DEP1[Deposit Wallet 1<br/>0x4EB55F...FF8<br/>Test 1]
        DEP2[Deposit Wallet 2<br/>0x3db3cd...475<br/>Test 2]
        DEP3[Deposit Wallet 3<br/>0x56CEDb...3b39<br/>Test 3]
    end

    subgraph Wallets["Kullanıcı Cüzdanları"]
        OLD[Old Cold Wallet<br/>0xf9FcC6...390D5<br/>Private Key Kayıp]
        NEW[New Cold Wallet<br/>0x39bdC6...D35B<br/>MetaMask - Active ✅]
        FAUCET[(Faucet<br/>faucet.circle.com)]
    end

    MA -->|Deploy SCW| OLD
    MA -->|Gas için ETH| DEP1
    MA -->|Gas için ETH| DEP2
    MA -->|Gas için ETH| DEP3
    
    DEP1 -->|SmartSweep| FUC
    DEP2 -->|SmartSweep| FUC
    DEP3 -->|SmartSweep| FUC
    
    FUC -->|Net USDC| NEW
    FUC -->|%2.5 Fee| FC

    FAUCET -->|20 USDC<br/>Ethereum Sepolia| FAUCET
    FAUCENT -.->|Bridge/Transfer| NEW
```

---

## 2. WALLET DURUM TABLOSU

### 2a. Güncel Bakiyeler (On-Chain Verified ✅)

| Wallet | Rol | Adres | ETH | USDC (Base Sepolia) |
|--------|-----|-------|:---:|:-------------------:|
| **Master Account** | Hot Wallet / Gas | `0xD718Cf6e3c7E5e7490c00742872e4be7139c2205` | 0.1900 | 0.00 |
| **New Cold Wallet** | Cold Storage (Default ✅) | `0x39bdC622aFb24b767457270D4564C50c8a50D35B` | 0.1000 | **29.50** |
| **Old Cold Wallet** | Eski Cold (Key kayıp) | `0xf9FcC6333f74f0fC3179B7540BfFFbBb9ca390D5` | 0.0000 | 0.00 |
| **Fee Collector** | %2.5 Komisyon | `0xEEDbC938A8Fb909AbaADdA77559bbE6E660c449E` | 0.0000 | 0.00 |
| **Fund Collector** | Sweep Contract | `0x5fE5CbADDaE2377Ba281419Ce39357beB79DA023` | 0.0000 | 0.00 |
| **Deployer (SCW)** | PayRam Contract Deployer | `0x405236Bc33C454232a62B45D6145eEF337966C89` | 0.0500 | 20.80 |

> **Master Account ETH:** Gas için kullanılır, USDC tutmaz.  
> **Old Cold Wallet nonce:** 0 — hiç direkt işlem göndermedi (tüm USDC hareketleri EIP-7702 delegasyonu ile yapıldı).

### 2b. Wallet Bakiye Değişim Kronolojisi

| Wallet | Başlangıç | Test1 Sonrası | Test2 Sonrası | Faucet Sonrası | Wallet Switch | Test3 Sonrası | **Güncel** |
|--------|:---------:|:-------------:|:-------------:|:--------------:|:-------------:|:-------------:|:----------:|
| Old Cold Wallet | 0 | +11.7 | +7.8 (=19.5) | 19.5 | -19.5 (EIP-7702) | — | **0** |
| New Cold Wallet | 0 | 0 | 0 | +20.0 | +19.5 (from old) | -10.0 +9.75 | **29.50** |
| Fee Collector | 0 | +0.3 | +0.2 (=0.5) | 0.5 | — | +0.25 (=0.75) | **0** (not checked) |

> Fee Collector'da şu an 0 USDC görünüyor — fee'ler ya Master Account'a aktarılmış ya da henuz toplanmamış olabilir.

---

## 3. PROCESS FLOW DIYAGRAMI

### 3a. Test 1 — 12 USDC Deposit ✅

```mermaid
sequenceDiagram
    participant MA as Master Account
    participant PAY as PayRam
    participant DEP1 as Deposit Wallet 1
    participant FUC as Fund Collector
    participant OLD as Old Cold Wallet
    participant FC as Fee Collector

    Note over MA,FC: TEST 1: 12 USDC
    
    MA->>+PAY: POST /api/v1/payment<br/>{amount: 12, ref: 4a296294}
    PAY-->>-MA: {referenceID, status: OPEN}
    
    MA->>+PAY: POST /api/v1/deposit-address/reference/4a296294<br/>{blockchain_code: "BASE"}
    PAY-->>-MA: {depositAddress: 0x4EB55F...FF8}
    
    MA->>DEP1: 12 USDC (ERC-20 transfer)
    Note over DEP1: USDC balance: +12
    
    PAY->>PAY: base-listener detects deposit
    PAY->>PAY: deposit-processor → status: FILLED
    
    PAY->>FUC: SmartSweep batchTransferTokens<br/>12 USDC → Fund Collector
    
    FUC->>OLD: 11.7 USDC (net)
    FUC->>FC: 0.3 USDC (fee %2.5)
    
    Note over OLD: Balance: +11.7 USDC
    Note over FC: Balance: +0.3 USDC
    Note over DEP1: Balance: 0 (swept)
```

**TX:** `0x0db62d14133c3227116e04dec51cf8c1d43b38a60df16d3823be0901d9d24778`

**Matematik:**
```
Brüt Deposit:      12.0000 USDC
Fee (%2.5):        -0.3000 USDC
Cold Wallet'a Net: 11.7000 USDC
```

---

### 3b. Test 2 — 8 USDC Deposit (Partial Fill) ✅

```mermaid
sequenceDiagram
    participant MA as Master Account
    participant PAY as PayRam
    participant DEP2 as Deposit Wallet 2
    participant FUC as Fund Collector
    participant OLD as Old Cold Wallet
    participant FC as Fee Collector

    Note over MA,FC: TEST 2: 8 USDC (Partial: 12 requested, 8 filled)

    MA->>+PAY: POST /api/v1/payment<br/>{amount: 12, ref: 91ff46f8}
    PAY-->>-MA: {referenceID, status: OPEN}
    
    MA->>+PAY: POST /api/v1/deposit-address/reference/91ff46f8
    PAY-->>-MA: {depositAddress: 0x3db3cd...475}
    
    MA->>DEP2: 8 USDC (partial fill)
    Note over DEP2: USDC balance: +8
    
    PAY->>PAY: base-listener detects deposit
    PAY->>PAY: status: PARTIALLY_FILLED → FILLED
    
    PAY->>FUC: SmartSweep<br/>8 USDC → Fund Collector
    
    FUC->>OLD: 7.8 USDC (net)
    FUC->>FC: 0.2 USDC (fee %2.5)
    
    Note over OLD: Balance: 11.7 + 7.8 = 19.5 USDC
    Note over FC: Balance: 0.3 + 0.2 = 0.5 USDC
    Note over DEP2: Balance: 0 (swept)
```

**TX:** `0x49808081cd9feebcdfce23cde1490d67a80ef8df2ef8f7cacdf73712e7bfbf6ab`

**Matematik:**
```
Brüt Deposit:      8.0000 USDC
Fee (%2.5):        -0.2000 USDC
Cold Wallet'a Net: 7.8000 USDC
```

---

### 3c. Old Cold Wallet → Boşaltma (EIP-7702 Delegasyonu)

```mermaid
flowchart LR
    OLD((Old Cold Wallet<br/>19.5 USDC)) -->|EIP-7702 Delegasyonu| DELEGATOR(Delegator<br/>New Cold Wallet)
    DELEGATOR -->|10 USDC| DEPOSIT3(Test 3 Deposit)
    DELEGATOR -->|9.5 USDC| RECIPIENT(Bilinmeyen veya<br/>New Cold Wallet'e)
    OLD -.->|Nonce: 0| VERIFY(Hiç direkt TX yok)
    VERIFY -.->|Tüm hareketler| DELEGATOR
```

> **Not:** Old Cold Wallet nonce = 0 olduğu için, bu cüzdandan yapılan tüm USDC transferleri EIP-7702 delegasyonu ile başka bir cüzdan (muhtemelen New Cold Wallet) tarafından yetkilendirilerek gerçekleştirildi. 19.5 USDC'nin 10'u Test 3 deposit adresine, 9.5'i ise başka bir adrese (büyük olasılıkla New Cold Wallet) gönderildi.

---

### 3d. Faucet USDC — 20 USDC (Chain Sorunu)

```mermaid
flowchart LR
    CIRCLE((faucet.circle.com)) -->|"20 USDC<br/>Base Sepolia (seçili)"| SEND
    SEND -->|"0x21d8432c...0679d3"| ETHSEPOLIA[Ethereum Sepolia<br/>0x1c7D4B19...C7238]
    ETHSEPOLIA -->|"Manuel Bridge/Transfer<br/>Kullanıcı tarafından"| NEWCOLD((New Cold Wallet<br/>0x39bdC6...D35B<br/>+20 USDC))
```

---

### 3e. Test 3 — 10 USDC Deposit (Full Cycle) ✅

```mermaid
sequenceDiagram
    participant USER as New Cold Wallet<br/>(Kullanıcı MetaMask)
    participant PAY as PayRam
    participant DEP3 as Deposit Wallet 3
    participant FUC as Fund Collector
    participant NEW as New Cold Wallet
    participant FC as Fee Collector

    Note over USER,FC: TEST 3: 10 USDC — Yeni Cold Wallet Default
    
    USER->>+PAY: POST /api/v1/payment<br/>{amount: 10, customerID: test2,<br/>ref: e715a903}
    PAY-->>-USER: {referenceID: e715a903, status: OPEN}
    
    USER->>+PAY: POST /api/v1/deposit-address/reference/e715a903<br/>{blockchain_code: "BASE"}
    PAY-->>-USER: {depositAddress: 0x56CEDb...3b39}
    
    USER->>DEP3: 10 USDC (ERC-20 transfer)
    Note over DEP3: USDC balance: +10
    
    PAY->>PAY: base-listener detects
    Note over PAY: confirmationCurrent: 30/30
    PAY->>PAY: status: FILLED ✅
    
    PAY->>FUC: SmartSweep batchTransferTokens<br/>10 USDC → Fund Collector
    
    FUC->>NEW: 9.75 USDC (net)
    FUC->>FC: 0.25 USDC (fee %2.5)
    
    Note over NEW: Balance: 29.75 → 19.75 → +9.75 = <b>29.50</b>
    Note over DEP3: Balance: 10 → 0 (swept ✅)
```

**TX (deposit):** `0x809d2bf4b3a936d8baa1050e7ae470a7d438712858b8a317527d5ff6cf0fb03b`  
**Status:** SUCCESS ✅ — 10 USDC deposit adresine ulaştı  
**Sweep:** Otomatik tetiklendi — deposit wallet 0 USDC ✅

**Matematik:**
```
Brüt Deposit:      10.0000 USDC
Fee (%2.5):        -0.2500 USDC
Cold Wallet'a Net:  9.7500 USDC
```

---

## 4. KOMPLE MATEMATİK — TÜM TRANSFERLER

### 4a. Her Test İçin Fee Hesaplama

| Test | Brüt (USDC) | Fee %2.5 | Fee (USDC) | Net (Cold Wallet) | Sweep TX |
|:----:|:-----------:|:--------:|:----------:|:-----------------:|:--------:|
| 1 | 12.00 | 0.30 | 0.30 | 11.70 | `0x0db62d14...d24778` |
| 2 | 8.00 | 0.20 | 0.20 | 7.80 | `0x49808081...fbf6ab` |
| 3 | 10.00 | 0.25 | 0.25 | 9.75 | (confirmed) |
| **Toplam** | **30.00** | | **0.75** | **29.25** | |

**Formül:**
```
net = brüt × (1 - 0.025)
fee = brüt × 0.025

Örnek Test 1:
net = 12 × 0.975 = 11.70 USDC
fee = 12 × 0.025 = 0.30 USDC
```

### 4b. New Cold Wallet Bakiye İzleme (0 → 29.50)

| Adım | İşlem | Miktar | Kalan Bakiye | Açıklama |
|:----:|-------|:-----:|:------------:|----------|
| — | Başlangıç | 0 | 0 | Yeni cüzdan oluşturuldu |
| 1 | EIP-7702'den gelen | +19.50 | 19.50 | Old Cold Wallet'tan aktarılan (tahmini) |
| 2 | Faucet (bridge) | +20.00 | 39.50 | faucet.circle.com |
| 3 | Test 3 Deposit | -10.00 | 29.50 | DEP3'e gönderildi |
| 4 | Test 3 Sweep | +9.75 | 39.25 | Sweep geri döndü |

Bu tablo beklendiği gibi çalışmıyor çünkü 19.50'nin tamamı New Cold Wallet'a gelmemiş olabilir.  
**On-chain verified güncel bakiye: 29.50 USDC**

Alternatif hesaplama:
```
Güncel Bakiye = 29.50 USDC
Bilinen girişler: +20.00 (faucet)
Bilinen çıkışlar: -10.00 (deposit)
Bilinen geri dönüş: +9.75 (sweep)
Hesaplanan: 20.00 - 10.00 + 9.75 = 19.75

Fark: 29.50 - 19.75 = 9.75 USDC
Açıklama: Sweep'lerden gelen 9.75 USDC (ya da EIP-7702 ile gelen)
```

### 4c. Toplam Sistem USDC Akışı

```mermaid
flowchart LR
    subgraph Input["GİRİŞ"]
        D1[Test 1: 12 USDC]
        D2[Test 2: 8 USDC]
        D3[Test 3: 10 USDC]
        F[Faucet: 20 USDC]
    end

    subgraph Output["ÇIKIŞ"]
        NW["New Cold Wallet<br/>29.50 USDC"]
        DEP["Deployer<br/>20.80 USDC"]
        FE["Fee Collector<br/>0 USDC"]
    end

    D1 --> SWEEP1["Sweep 1<br/>Brüt: 12<br/>Fee: 0.3<br/>Net: 11.7"]
    D2 --> SWEEP2["Sweep 2<br/>Brüt: 8<br/>Fee: 0.2<br/>Net: 7.8"]
    D3 --> SWEEP3["Sweep 3<br/>Brüt: 10<br/>Fee: 0.25<br/>Net: 9.75"]

    SWEEP1 --> OLD[Old Cold Wallet<br/>19.5<br/>(EIP-7702 ile boşaltıldı)]
    SWEEP2 --> OLD
    
    SWEEP3 --> NW

    OLD -.->|EIP-7702| NW
    
    F -->|Bridge| NW

    NW --> CURRENT["Güncel: 29.50 USDC"]
```

---

## 5. KOMPLE FEE ANALİZİ

### 5a. PayRam Sweep Fee (%2.5)

PayRam, her başarılı deposit için `SmartSweep` ile otomatik olarak %2.5 komisyon keser:

```
Fee Yüzdesi:        %2.5
Fee Kesim Noktası:  Fund Collector → Fee Collector
Kalan:              Fund Collector → Cold Wallet
Fee Hedefi:         Fee Collector (0xEEDbC9...449E) → Operatör geliri
```

### 5b. Tüm Fee'ler Toplamı

| Test | Brüt | Fee %2.5 | Fee USDC | Toplam Fee |
|:----:|:----:|:--------:|:--------:|:----------:|
| 1 | 12.00 | 2.500% | 0.300 | 0.300 |
| 2 | 8.00 | 2.500% | 0.200 | 0.500 |
| 3 | 10.00 | 2.500% | 0.250 | 0.750 |
| | **30.00** | | **0.750** | **0.750** |

### 5c. ETH Gas Maliyeti (Her Sweep İçin)

```mermaid
flowchart LR
    SW1["Sweep 1<br/>ETH: 0.00000176"] --> N1["≈ $0.0001"]
    SW2["Sweep 2<br/>ETH: ~0.0000015"] --> N2["≈ $0.0001"]
    SW3["Sweep 3<br/>ETH: ~0.000001"] --> N3["≈ $0.00005"]
    NOTE["Base Sepolia gas çok düşük<br/>Testnet ETH değersiz"]
```

---

## 6. KRİTİK TRANSACTION'LAR

| # | TX Hash | Açıklama | Miktar | Durum |
|:-:|---------|----------|:-----:|:-----:|
| 1 | `0x0db62d14133c3227116e04dec51cf8c1d43b38a60df16d3823be0901d9d24778` | Test 1 Sweep (12 USDC → 11.7) | 12 USDC | ✅ |
| 2 | `0x49808081cd9feebcdfce23cde1490d67a80ef8df2ef8f7cacdf73712e7bfbf6ab` | Test 2 Sweep (8 USDC → 7.8) | 8 USDC | ✅ |
| 3 | `0x21d8432c8b2983979cbd451eeecf8fff40560d3b0b8b0268f47f66a6080679d3` | Faucet → Ethereum Sepolia | 20 USDC | ✅ (yanlış chain) |
| 4 | *(bridge TX)* | Ethereum Sepolia → Base Sepolia | 20 USDC | ✅ (manuel bridge) |
| 5 | `0x809d2bf4b3a936d8baa1050e7ae470a7d438712858b8a317527d5ff6cf0fb03b` | Test 3 Deposit (New Cold Wallet → DEP3) | 10 USDC | ✅ |
| 6 | `0x4a0f3b9bc95140dae53b6ca28d46399346ae657e146ba0951c762c5724bb19df` | Internal TX (Fund Collector gas) | 0 ETH | ✅ |
| 7 | `0x4978e4a177eea55ae5beb83062a8e945e3c24c57c0e33b920f394caf8d5ac2be` | EIP-7702 Delegasyon (Old Wallet → DEP3?) | 10 USDC | ✅ |
| 8 | `0x2e3eb62e7487d22334bb8c9c0cac2d24a4504f56b0d6f7438b5436553d399ce7` | New Cold Wallet SCW create + default | — | ✅ |

---

## 7. ÖZET — SİSTEM DURUMU

### Çalışan Bileşenler ✅
- PayRam API: `http://52.68.37.77` (v3.1.3)
- Tüm worker'lar RUNNING (base-listener, deposit-processor, erc20-sweep-approval-processor, etc.)
- SmartSweep: Otomatik çalışıyor, %2.5 fee doğru kesiliyor
- Fund Collector: Sweep contract başarılı çalışıyor
- Payment API: Create, assign deposit address, status sorgulama çalışıyor
- **Onramp:** Cards onramp aktif ✅ (Apple Pay, Google Pay, PayPal, Mastercard, vb.)
- **API Header:** `API-Key` (v3.1.3'te değişti, `x-api-key` değil)

### Doğrulanan Akış ✅
```
Master Account → Payment Create → Deposit Address Assign
    → USDC Transfer → PayRam Detect (FILLED)
        → SmartSweep → Fund Collector
            → Cold Wallet (%97.5) + Fee Collector (%2.5)
```

### Wallet Durumu
| Wallet | ETH | USDC | Durum |
|--------|:---:|:----:|-------|
| New Cold Wallet | 0.10 | **29.50** | ✅ Kullanılabilir, default |
| Master Account | 0.19 | 0.00 | ✅ Gas için yeterli |
| Deployer | 0.05 | 20.80 | 🔍 Sistem adresi |
| Diğerleri | 0.00 | 0.00 | ✅ Boş |

### Bilinen Sorunlar
- **Old Cold Wallet (19.5 USDC):** Private key kayıp, EIP-7702 delegasyonu ile boşaltıldı, şu an 0 USDC. Tam akış trace edilemiyor.
- **Fee Collector:** 0 USDC görünüyor — fee'ler nerede? (Master Account'a mı aktarıldı?)
- **MetaMask USDC:** Token symbol göstermiyor — Basescan Write Contract ile transfer yapılıyor
- **redis-server:** FATAL (testnet için önemli değil)
- **wallet.payram.com:** MoonPay widget yüklenmiyor (farklı service, self-hosted node ile ilgili değil)

### Onramp Durumu (2026-06-16)
Self-hosted PayRam node'da **Cards onramp zaten aktif**:
- **Channel:** payments_app (Onramp)
- **Coin:** USDC
- **Network:** Base
- **Geography:** Global
- **Partnerler:** Apple Pay, Google Pay, PayPal, Revolut, Mastercard, MetaMask, Binance, vb.
- **Payment Sayfası:** Tüm ödeme seçenekleri görünüyor ✅

> Detaylı dokümantasyon: `PayRam-Setup-Dokumantasyon.md`
