import {
  CasperServiceByJsonRPC,
  CLPublicKey,
  CasperClient,
  RuntimeArgs,
} from 'casper-js-sdk';
import { TypedJSON } from 'typedjson';

export const getCasperAccountBalance = async (publicKey) => {
  const NODE_ADDRESS = import.meta.env.VITE_NODE_RPC_ADDRESS;
  const client = new CasperServiceByJsonRPC(NODE_ADDRESS);
  const latestBlock = await client.getLatestBlockInfo();
  const root = await client.getStateRootHash();
  const MOTE_RATE = 1000000000;
  let balanceUref;
  try {
    balanceUref = await client.getAccountBalanceUrefByPublicKey(
      root,
      CLPublicKey.fromHex(publicKey)
    );
  } catch (err) {
    return 0;
  }

  //account balance from the last block

  const balance = await client.getAccountBalance(
    latestBlock.block.header.state_root_hash,
    balanceUref
  );

  console.log(balance / MOTE_RATE);

  return balance / MOTE_RATE;
};
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const getDeploy = async (NODE_URL, deployHash) => {
  const client = new CasperClient(NODE_URL);
  let i = 300;
  while (i !== 0) {
    try{
      await sleep(5000);
      const [deploy, raw] = await client.getDeploy(deployHash);
      if (raw.execution_results.length !== 0) {
        // @ts-ignore
        if (raw.execution_results[0].result.Success) {
          return deploy;
        } else {
          // @ts-ignore   
        throw new Error(`Contract execution: ${raw.execution_results[0].result.Failure?.error_message}`)            
        }
      } else {
        i--;
        await sleep(1000);
        continue;
      }
    }catch(e){
      console.log(e , "error from getDeploy func")
      throw new Error(`${e.message}`);
    }

  }
  throw new Error('Timeout after ' + i + "s. Something's wrong");
};

export const serializeArgs = (ra) => {
  const raSerializer = new TypedJSON(RuntimeArgs);
  const json = raSerializer.toPlainJson(ra);
  return Object.values(json)[0];
};

export const fromMotes = (amt) => {
  return amt / 1000000000;
};

export const toMotes = (amt) => {
  return amt * 1000000000;
};
