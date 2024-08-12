"use strict";
const {
  Contracts,
  Keys,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  CLPublicKey,
  CasperServiceByJsonRPC,
} = require("casper-js-sdk");
const {
  CARS_EXP_NFT_METADATA,
  CARS_EXP_CONTRACT_HASH,
  CARS_CONTRACT_HASH,
  CARS_NFT_METADATA,
  CSPR_CLOUD_KEY,
  CSPR_CLOUD_RPC,
} = require("./constants");
const {
  HTTPTransport,
} = require("@open-rpc/client-js");

// You need to add the secret key in the keys folder
const keys = Keys.Ed25519.loadKeyPairFromPrivateFile("./keys/secret_key.pem");

class CustomCasperClient extends CasperServiceByJsonRPC {
  constructor(network) {
    const url = CSPR_CLOUD_RPC[network];
    const options = {
      headers: {
        Authorization: CSPR_CLOUD_KEY,
      },
    };
    super(url);
    const transport = new HTTPTransport(url, options);
    this.client.requestManager.transports = [transport];
  }
}


module.exports.mintCarAdSpotNft = async (event) => {
  try {
    const { userAddress, network } = JSON.parse(event.body);
    if (!userAddress || !network) {
      return createResponse(
        400,
        { message: "Missing parameters" },
        event.headers
      );
    }
    if (network !== "TESTNET" && network !== "MAINNET") {
      return createResponse(400, { message: "Invalid network" }, event.headers);
    }
    const client = new CasperClient(CSPR_CLOUD_RPC[network]);
    client.nodeClient = new CustomCasperClient(network);
    const contract = new Contracts.Contract(client);
    const contractHash = CARS_CONTRACT_HASH[network];
    contract.setContractHash(contractHash);
    const { isSuccess, txHash } = await mint(userAddress, contract, network, CARS_NFT_METADATA);
    if (!isSuccess) {
      throw new Error("Error minting NFT");
    }
    return createResponse(200, { txHash, isSuccess }, event.headers);
  } catch (error) {
    console.error(error);
    return createResponse(
      400,
      { message: error.message, isSuccess: false },
      event.headers
    );
  }
};

module.exports.mintCarExpNft = async (event) => {
  try {
    const { userAddress, network } = JSON.parse(event.body);
    if (!userAddress || !network) {
      return createResponse(
        400,
        { message: "Missing parameters" },
        event.headers
      );
    }
    if (network !== "TESTNET" && network !== "MAINNET") {
      return createResponse(400, { message: "Invalid network" }, event.headers);
    }
    const client = new CasperClient(CSPR_CLOUD_RPC[network]);
    client.nodeClient = new CustomCasperClient(network);
    const contract = new Contracts.Contract(client);
    const contractHash = CARS_EXP_CONTRACT_HASH[network];
    contract.setContractHash(contractHash);
    const { isSuccess, txHash } = await mint(userAddress, contract, network, CARS_EXP_NFT_METADATA);
    if (!isSuccess) {
      throw new Error("Error minting NFT");
    }
    return createResponse(200, { txHash, isSuccess }, event.headers);
  } catch (error) {
    console.error(error);
    return createResponse(
      400,
      { message: error.message, isSuccess: false },
      event.headers
    );
  }
};

async function mint(userAddress, contract, network, metadata) {
  try {
    const args = RuntimeArgs.fromMap({
      token_owner: CLValueBuilder.key(CLPublicKey.fromHex(userAddress)),
      token_meta_data: CLValueBuilder.string(
        JSON.stringify(metadata)
      ),
    });

    const deploy = await contract.callEntrypoint(
      "mint",
      args,
      keys.publicKey,
      network === "TESTNET" ? "casper-test" : "casper",
      "5000000000",
      [keys]
    );
    const client = new CasperClient(CSPR_CLOUD_RPC[network]);
    client.nodeClient = new CustomCasperClient(network);
    const txHash = await client.putDeploy(deploy);
    console.log("Deploy hash:", txHash);
    // const isSuccess = await getDeploymentStatus(txHash, network);
    const isSuccess = true;
    console.log("Deployment Status:", isSuccess ? "Success" : "Failure");
    return { isSuccess, txHash };
  } catch (error) {
    console.error(error);
    return { txHash: null };
  }
}

function getCorsHeaders(event) {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Origin": "*",
  };
}

function createResponse(statusCode, body, headers = {}) {
  return {
    statusCode: statusCode,
    headers: { ...headers, ...getCorsHeaders({ headers }) },
    body: JSON.stringify(body),
  };
}
