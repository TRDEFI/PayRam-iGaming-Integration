/**
 * Polymarket Relayer API Client
 * Gasless transfers between wallets on Polygon
 */

const RELAYER_BASE_URL = 'https://relayer-v2.polymarket.com';

interface RelayerConfig {
  apiKey: string;
  apiKeyAddress: string;
}

interface TransactionRequest {
  from: string;
  to: string;
  data: string;
  nonce: string;
  signature: string;
  signatureParams: {
    gasPrice: string;
    operation: string;
    safeTxnGas: string;
    baseGas: string;
    gasToken: string;
    refundReceiver: string;
  };
  type: 'SAFE' | 'PROXY';
}

interface TransactionResponse {
  transactionID: string;
  state: string;
}

interface TransactionStatus {
  transactionID: string;
  transactionHash: string;
  from: string;
  to: string;
  proxyAddress: string;
  data: string;
  nonce: string;
  value: string;
  signature: string;
  state: string;
  type: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export class RelayerClient {
  private config: RelayerConfig;

  constructor(config: RelayerConfig) {
    this.config = config;
  }

  /**
   * Submit a transaction to the Relayer
   */
  async submitTransaction(tx: TransactionRequest): Promise<TransactionResponse> {
    const response = await fetch(`${RELAYER_BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'RELAYER_API_KEY': this.config.apiKey,
        'RELAYER_API_KEY_ADDRESS': this.config.apiKeyAddress,
      },
      body: JSON.stringify(tx),
    });

    if (!response.ok) {
      throw new Error(`Relayer submit failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get transaction status by ID
   */
  async getTransaction(transactionID: string): Promise<TransactionStatus[]> {
    const response = await fetch(`${RELAYER_BASE_URL}/transaction?id=${transactionID}`, {
      headers: {
        'RELAYER_API_KEY': this.config.apiKey,
        'RELAYER_API_KEY_ADDRESS': this.config.apiKeyAddress,
      },
    });

    if (!response.ok) {
      throw new Error(`Relayer transaction fetch failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get recent transactions for an address
   */
  async getTransactions(address: string): Promise<TransactionStatus[]> {
    const response = await fetch(`${RELAYER_BASE_URL}/transactions?address=${address}`, {
      headers: {
        'RELAYER_API_KEY': this.config.apiKey,
        'RELAYER_API_KEY_ADDRESS': this.config.apiKeyAddress,
      },
    });

    if (!response.ok) {
      throw new Error(`Relayer transactions fetch failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get relayer payload for a user
   */
  async getRelayPayload(address: string, type: 'PROXY' | 'SAFE' = 'SAFE') {
    const response = await fetch(
      `${RELAYER_BASE_URL}/relay-payload?address=${address}&type=${type}`,
      {
        headers: {
          'RELAYER_API_KEY': this.config.apiKey,
          'RELAYER_API_KEY_ADDRESS': this.config.apiKeyAddress,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Relayer payload fetch failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Wait for transaction to be confirmed
   */
  async waitForConfirmation(
    transactionID: string,
    maxAttempts: number = 30,
    intervalMs: number = 2000
  ): Promise<TransactionStatus | null> {
    for (let i = 0; i < maxAttempts; i++) {
      const transactions = await this.getTransaction(transactionID);
      const tx = transactions[0];

      if (tx.state === 'STATE_CONFIRMED' || tx.state === 'STATE_FAILED') {
        return tx;
      }

      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    return null;
  }
}

/**
 * Create pUSD transfer calldata
 */
export function createTransferCalldata(to: string, amountBaseUnit: string): string {
  const transferSelector = '0xa9059cbb';
  const toPadded = to.slice(2).padStart(64, '0');
  const amountPadded = BigInt(amountBaseUnit).toString(16).padStart(64, '0');
  return `${transferSelector}${toPadded}${amountPadded}`;
}

/**
 * Create approval calldata
 */
export function createApprovalCalldata(spender: string, amountBaseUnit: string): string {
  const approveSelector = '0x095ea7b3';
  const spenderPadded = spender.slice(2).padStart(64, '0');
  const amountPadded = BigInt(amountBaseUnit).toString(16).padStart(64, '0');
  return `${approveSelector}${spenderPadded}${amountPadded}`;
}
