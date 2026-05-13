import "dotenv/config";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import wallet from "../../akshay-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const umi = createUmi(process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com");

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);


umi.use(
    irysUploader({
        address: "https://devnet.irys.xyz/",
    })
);

umi.use(signerIdentity(signer));

(async () => {
    try {
        const image = "https://gateway.irys.xyz/BZY3fdqHPViJ171RXE8UMUGoF7BWjmTt8h6KMxuG1QEU";

        //change the metadata according to your nft info
        const metadata = {
            name: "Green Tara",
            description: "painting",
            image,
            attributes: [{ trait_type: "Peaceful (", value: "legendary" }],

            
            properties: {
                files: [
                    {
                        type: "image/jpeg",  
                        uri: image,        
                    },
                ],
                category: "image",      
            },

        };

        const myUri = await umi.uploader.uploadJson(metadata);
        console.log(`metadata uri: ${myUri} `);
    }
    catch (error) {
        console.log("error", error);
    }
})()
//metadata uri: https://gateway.irys.xyz/5o6trpAXP5zpAFAo7HP7XHXGEuxqHiZccha3cGMQhPpj 