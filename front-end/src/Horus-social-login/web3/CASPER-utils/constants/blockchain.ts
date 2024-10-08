export const proxyServer = process.env.REACT_APP_PROXY_SERVER || '';
export const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
export const NODE_RPC_ADDRESS =
  process.env.REACT_APP_NODE_RPC_ADDRESS ||
  'https://gstiugzrmk.execute-api.us-east-1.amazonaws.com/dev/?url=http://188.40.47.161:7777/rpc';

export const USER_KEY_PAIR_PATH =
  process.env.REACT_APP_USER_KEY_PAIR_PATH ||
  'D:/Ibrahim/github-projects/New folder/casperNFT_marketplace/deploy-scripts/keys/';

export const DEPLOYER_ACC =
  process.env.REACT_APP_CASPER_PUBLIC_KEY ||
  '01fb6e663984ffaca91dbf3725e8d688659c66d5bf45d0cb2705cba04908d3b6b9';

export const CONNECTION = {
  NODE_ADDRESS: proxyServer + NODE_RPC_ADDRESS,
  CHAIN_NAME: process.env.REACT_APP_CHAIN_NAME || 'casper-test',

  CONTRACT_NAME: process.env.REACT_APP_CONTRACT_NAME || 'VINFTv0_0_1',

  CONTRACT_HASH:
    process.env.REACT_APP_NFT_CONTRACT_HASH ||
    'hash-F07A8Ac158952854c02A1648C4c9c0A5F696B8ce58C1A2E79c946B743208CB24',
  CONTRACT_PACKAGE_HASH:
    process.env.REACT_APP_NFT_CONTRACT_PACKAGE_HASH ||
    'hash-69e7aD87Be061b1dD044a71404090cDbCD42aE456Cc3f7Db48ca983aA071D229',
};

export const KEYS = {
  DEPLOYER_ACC_HASH:
    process.env.REACT_APP_DEPLOYER_ACC_HASH ||
    'account-hash-14b94d33a1be1a2741ddefa7ae68a28cd1956e3801730bea617bf529d50f8aea',
  DEPLOYER_ACC:
    process.env.REACT_APP_DEPLOYER_ACC_HASH ||
    '01e23d200eb0f3c8a3dacc8453644e6fcf4462585a68234ebb1c3d6cc8971148c2',
};

export const NFT_CONTRACT_HASH = process.env.REACT_APP_CASPER_NFT_CONTRACT_HASH;
export const NFT_PACKAGE_HASH =
  process.env.REACT_APP_CASPER_NFT_CONTRACT_PACKAGE_HASH;

export const PROFILE_CONTRACT_HASH =
  process.env.REACT_APP_CASPER_PROFILE_CONTRACT_HASH;
export const PROFILE_PACKAGE_HASH =
  process.env.REACT_APP_CASPER_PROFILE_CONTRACT_PACKAGE_HASH;

export const VAULT_CONTRACT_HASH =
  process.env.REACT_APP_CASPER_VAULT_CONTRACT_HASH;
export const VAULT_PACKAGE_HASH =
  process.env.REACT_APP_CASPER_VAULT_PACKAGE_HASH;
