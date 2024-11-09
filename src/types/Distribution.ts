export class TokenDistribution {
  amount: string;
  mode: 'equal' | 'random';
  addresses: string[];
  revealBlock: number;
  claimDuration: number;

  constructor(
    amount: string = '',
    mode: 'equal' | 'random' = 'equal',
    addresses: string[] = [''],
    revealBlock: number = 0,
    claimDuration: number = 0
  ) {
    this.amount = amount;
    this.mode = mode;
    this.addresses = addresses;
    this.revealBlock = revealBlock;
    this.claimDuration = claimDuration;
  }

//   toString(): string {
//     const formattedData = {
//       amount: this.amount || '0',
//       mode: this.mode,
//       addresses: this.addresses.filter(addr => addr.trim() !== ''),
//       revealBlock: this.revealBlock,
//       claimDuration: this.claimDuration
//     };

//     return `
// Distribution Details:
// -------------------
// Total Amount: ${formattedData.amount}
// Distribution Mode: ${formattedData.mode}
// Reveal Block: ${formattedData.revealBlock}
// Claim Duration: ${formattedData.claimDuration} seconds
// Addresses (${formattedData.addresses.length}):
// ${formattedData.addresses.map((addr, i) => `  ${i + 1}. ${addr}`).join('\n')}
// `;
  // }
}