import "dotenv/config";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import wallet from "../../akshay-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args } from "@metaplex-foundation/mpl-token-metadata";
import bs58 from "bs58"

const mint = publicKey("C5yfi385LkKMVBADc5hzvcqPSs3jC8PtGvPiH1nydpKN");

const umi = createUmi(process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com");

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));


(async () => {
    try {

        const accounts : CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority: signer
        }

        const data: DataV2Args = {
            name: "marcus aurelius",
            symbol: "MAC",
            uri: "https://raw.githubusercontent.com/akshayysm/spl-token-nft-mpl-core/refs/heads/main/src/spl/assets/metadata.json",
            sellerFeeBasisPoints: 1,
            creators: null,
            collection: null,
            uses: null
        }

        const args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null
        }
        const tx = createMetadataAccountV3(umi, {
            ...accounts,
            ...args
        })

        const result = await tx.sendAndConfirm(umi);
        console.log("signature: ",bs58.encode(Buffer.from(result.signature)));
    }
    catch (error) {
        console.error(error);
    }
})()
