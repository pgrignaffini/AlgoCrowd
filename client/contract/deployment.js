
import {Buffer} from "buffer";

// Read Teal File
const compileTeal = async (client, tealFile) => {
    try {
        // Compile Program
        let encoder = new TextEncoder();
        let programBytes = encoder.encode(tealFile);
        let compileResponse = await client.compile(programBytes).do();
        let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));
        console.log(compileResponse)
        return compiledBytes;
    } catch (err) {
        console.error(err)
    }
}

export default compileTeal();