# spl-token-nft-mpl-core

Scripts for creating SPL tokens and NFTs on Solana using Metaplex MPL Core.

---

# Setup

## 1. Install dependencies

Install all dependencies:

```bash
npm install @metaplex-foundation/mpl-core@^1.10.0 \
@metaplex-foundation/mpl-token-metadata@^3.4.0 \
@metaplex-foundation/umi@^1.5.1 \
@metaplex-foundation/umi-bundle-defaults@^1.5.1 \
@metaplex-foundation/umi-uploader-irys@^1.5.0 \
@solana-program/system@^0.12.0 \
@solana-program/token@^0.13.0 \
@solana/kit@^6.8.0 \
bs58@^6.0.0 \
dotenv@^16.5.0
```

Install development dependencies:

```bash
npm install -D @types/node@^25.6.0 \
ts-node@^10.9.2 \
typescript@^6.0.3
```

Or simply install everything from `package.json`:

```bash
npm install
```
---

## 2. Add your wallet

If you already have a local Solana wallet, you can use it.

Check current wallet:

```bash
solana address
```

Check SOL balance:

```bash
solana balance
```

See wallet path being used:

```bash
solana config get
```

Create a new wallet if needed:

```bash
solana-keygen new
```

Place your wallet keypair at the project root:

```txt
root/
└── devnet-wallet.json
```

---


# SPL Token

Run these scripts in order.

Each script prints the address or transaction signature needed for the next step.

| Command | What it does |
|---|---|
| `npm run spl:init` | Creates a new SPL token mint |
| `npm run spl:metadata` | Attaches token metadata (name, symbol, URI) |
| `npm run spl:mint` | Mints tokens into your associated token account |
| `npm run spl:transfer` | Transfers tokens to another wallet |

---

## NFT

Add your image at the project root (`image.jpeg`), then run in order.

| Command | What it does |
|---|---|
| `npm run nft:image` | Uploads your image to Irys, prints the image URI |
| `npm run nft:metadata` | Uploads the metadata JSON to Irys, prints the metadata URI |
| `npm run nft:mint` | Mints the NFT on-chain using the metadata URI |

Paste the URI printed by each step into the next script before running it.

---

# Metadata Hosting

For this project, spl token metadata is hosted using GitHub RAW URLs instead of Arweave/IPFS.

This approach is used only for learning/testing to avoid paid Arweave uploads.

---

# Notes

- This project is configured for Solana devnet.
- Wallet files should NEVER be committed to GitHub.
- GitHub RAW links are used only for learning/testing metadata hosting.
- For production NFTs, use Arweave.
