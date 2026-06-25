/**
 * Polymarket Bridge API Client
 * Cross-chain withdrawals from Polymarket
 */

const BRIDGE_BASE_URL = 'https://bridge.polymarket.com';

interface BridgeQuoteRequest {
  fromAmountBaseUnit: string;
  fromChainId: string;
  fromTokenAddress: string;
  recipientAddress: string;
  toChainId: string;
  toTokenAddress: string;
}

interface BridgeQuoteResponse {
  estCheckoutTimeMs: number;
  estInputUsd: number;
  estOutputUsd: number;
  estToTokenBaseUnit: string;
  quoteId: string;
  estFeeBreakdown: {
    gasUsd: number;
    appFeeLabel: string;
    appFeePercent: number;
    appFeeUsd: number;
    fillCostPercent: number;
    fillCostUsd: number;
    maxSlippage: number;
    minReceived: number;
    swapImpact: number;
    swapImpactUsd: number;
    totalImpact: number;
    totalImpactUsd: number;
  };
}

interface BridgeWithdrawRequest {
  address: string;
  toChainId: string;
  toTokenAddress: string;
  recipientAddr: string;
}

interface BridgeWithdrawResponse {
  address: {
    evm?: string;
    svm?: string;
    btc?: string;
    tvm?: string;
  };
  note: string;
}

interface BridgeStatusResponse {
  transactions: Array<{
    fromChainId: string;
    fromTokenAddress: string;
    fromAmountBaseUnit: string;
    toChainId: string;
    toTokenAddress: string;
    status: string;
    txHash: string;
    createdTimeMs: number;
  }>;
}

interface SupportedAsset {
  chainId: string;
  chainName: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  decimals: number;
  minAmount: string;
}

export class BridgeClient {
  /**
   * Get supported assets for bridge
   */
  async getSupportedAssets(): Promise<SupportedAsset[]> {
    const response = await fetch(`${BRIDGE_BASE_URL}/supported-assets`);

    if (!response.ok) {
      throw new Error(`Bridge supported-assets fetch failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a quote for bridge withdrawal
   */
  async getQuote(request: BridgeQuoteRequest): Promise<BridgeQuoteResponse> {
    const response = await fetch(`${BRIDGE_BASE_URL}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Bridge quote failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create withdrawal addresses
   */
  async createWithdrawalAddresses(
    request: BridgeWithdrawRequest
  ): Promise<BridgeWithdrawResponse> {
    const response = await fetch(`${BRIDGE_BASE_URL}/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Bridge withdraw failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get transaction status
   */
  async getStatus(address: string): Promise<BridgeStatusResponse> {
    const response = await fetch(`${BRIDGE_BASE_URL}/status/${address}`);

    if (!response.ok) {
      throw new Error(`Bridge status fetch failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Chain IDs
export const CHAIN_IDS = {
  ETHEREUM: '1',
  POLYGON: '137',
  ARBITRUM: '42161',
  BASE: '8453',
  OPTIMISM: '10',
  BNB: '56',
  SOLANA: '1151111081099710',
} as const;

// Token addresses
export const TOKEN_ADDRESSES = {
  // Native USDC on Ethereum
  USDC_ETHEREUM: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  // Native USDC on Polygon
  USDC_POLYGON: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
  // pUSD on Polygon
  PUSD_POLYGON: '0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB',
  // USDC on Base
  USDC_BASE: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  // USDC on Arbitrum
  USDC_ARBITRUM: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
} as const;
