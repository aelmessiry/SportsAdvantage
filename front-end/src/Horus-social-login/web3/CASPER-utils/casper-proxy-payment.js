import axiosToken from '../../social-wallet/AxiosToken';
import { isValidCasperWallet } from '../../../helper/helperFunc';
import toast from 'react-hot-toast';
import { displayMessageWithLink } from '../../../helper/helperFunc';
import { getDeploy } from './casperUtils';
import axios from 'axios';
import {
  CLPublicKey,
  CLValueBuilder,
  RuntimeArgs,
  encodeBase16,
} from 'casper-js-sdk';
import { serializeArgs, toMotes } from './casperUtils';
import { vaultClient } from './vaultClient';
const NODE_ADDRESS = process.env.REACT_APP_NODE_RPC_ADDRESS;
const VAULT_PACKAGE_HASH = process.env.REACT_APP_CASPER_VAULT_PACKAGE_HASH;
const VAULT_CONTRACT_HASH = process.env.REACT_APP_CASPER_VAULT_CONTRACT_HASH;
const baseUrl = process.env.REACT_APP_SOCIAL_WALLET_API;

const getPreDepositBinary = async () => {
  return fetch(`${process.env.PUBLIC_URL}/build-wasm/pre_deposit_cspr.wasm`, {
    headers: {
      'Content-Type': 'application/wasm',
    },
  })
    .then((response) => response.arrayBuffer())
    .then((bytes) => new Uint8Array(bytes));
};

export const casperBatchTransfer = async (
  walletId,
  recipients,
  amount,
  network,
  walletIndex,
  password,
  toastMsg
) => {
  for (const recipient of recipients) {
    if (!isValidCasperWallet(recipient)) {
      toast.error('Invalid CASPER Wallet address');
      return;
    }
  }
  const apiName = 'nativeTransfer';
  try {
    const casperTransferCall = await axiosToken.post(apiName, {
      walletId: walletId,
      recipients: recipients,
      amount: amount,
      network: network.chain,
      walletIndex: walletIndex,
      password: password,
    });
    console.log(casperTransferCall);

    const deployHashResponse = getDeploy(
      NODE_ADDRESS,
      casperTransferCall.data.signedDeployHash[0]
    );
    const tx = await toast.promise(deployHashResponse, {
      loading: `${toastMsg}`,
      success: (res) =>
        displayMessageWithLink(
          casperTransferCall.data.signedDeployHash[0],
          toastMsg,
          network.chain
        ),
      error: `${toastMsg} Failed`,
    });
    return deployHashResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const casperTokenDeposit = async (
  email,
  amount,
  emailIds,
  payToken = '',
  deploySender,
  network,
  password
) => {
  let depositDeployHash;
  const cspr_contract_hash = `contract-${encodeBase16(
    new Uint8Array(32).fill(0)
  )}`;
  const runtimeArgs = RuntimeArgs.fromMap({
    amount: CLValueBuilder.u512(toMotes(amount)),
    email_ids: CLValueBuilder.list(
      emailIds.map((id) => CLValueBuilder.string(id))
    ),
  });

  if (payToken) {
    runtimeArgs.insert('pay_token', CLValueBuilder.string(payToken));

    depositDeployHash = await casperSignTx(
      runtimeArgs,
      '25000000000',
      'create_deposits',
      email,
      password,
      network
    );
  } else {
    runtimeArgs.insert('pay_token', CLValueBuilder.string(cspr_contract_hash));
    runtimeArgs.insert(
      'vault_contract',
      CLValueBuilder.string(`contract-${VAULT_CONTRACT_HASH.slice(5)}`)
    );
    runtimeArgs.insert('entrypoint', CLValueBuilder.string('create_deposits'));

    const preDepositBinary = await getPreDepositBinary();

    depositDeployHash = await casperSignDeployTx(
      runtimeArgs,
      deploySender,
      preDepositBinary,
      '25000000000',
      email,
      password,
      network
    );
  }

  try {
    const deployHashResponse = getDeploy(NODE_ADDRESS, depositDeployHash);
    await toast.promise(deployHashResponse, {
      loading: `Deposit CASPER`,
      success: (res) =>
        displayMessageWithLink(
          deployHashResponse,
          'Deposit CASPER Tokens',
          network.chain
        ),
      error: `Deposit CASPER Tokens Failed`,
    });
    return depositDeployHash;
  } catch (e) {
    toast.error('Deposit CASPER Tokens Failed');
    return e;
  }
};

export const claimCasperDeposit = async (
  receiver,
  amount,
  emailId,
  deploySender,
  network
) => {
  const apiName = 'claimDeposit';

  try {
    const body = {
      receiver: CLPublicKey.fromHex(receiver),
      amount: amount,
      emailId: emailId,
      deploySender: CLPublicKey.fromHex(deploySender),
    };
    const deployHash = await axios.post(`${baseUrl}${apiName}`, body);
    const deployHashResponse = getDeploy(NODE_ADDRESS, deployHash);
    await toast.promise(deployHashResponse, {
      loading: `Claim Deposit CASPER`,
      success: (res) =>
        displayMessageWithLink(
          deployHashResponse,
          'Claim Deposit CASPER Tokens',
          network.chain
        ),
      error: `Claim Deposit CASPER Tokens Failed`,
    });
    return deployHash;
  } catch (e) {
    toast.error('Claim Deposit CASPER Tokens Failed');
    return e;
  }
};

export const casperSignDeployTx = async (
  runtimeArgs,
  recipient,
  paymentBinary,
  paymentAmount,
  walletId,
  password,
  network
) => {
  const apiName = 'signDeployTransaction';
  const url = `${baseUrl}${apiName}`;

  const body = {
    runtimeArgs: serializeArgs(runtimeArgs),
    paymentAmount,
    paymentBinary: JSON.stringify(paymentBinary),
    walletId,
    recipient,
    password,
    network: network.chain,
  };

  try {
    const createDeployHash = await axiosToken.post(apiName, body);
    console.log('signDeployHash: ', createDeployHash.data.signDeployHash);

    return createDeployHash.data.signDeployHash;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to sign transaction');
  }
};

export const casperSignTx = async (
  runtimeArgs,
  paymentAmount,
  functionName,
  walletId,
  password,
  network
) => {
  const apiName = 'signTransaction';
  const url = `${baseUrl}${apiName}`;
  const body = {
    runtimeArgs: serializeArgs(runtimeArgs),
    contractHash: `${VAULT_CONTRACT_HASH}`,
    packageHash: `hash${VAULT_PACKAGE_HASH.slice(9)}`,
    paymentAmount,
    functionName,
    walletId,
    password,
    network: network.chain,
  };

  try {
    const createDeployHash = await axios.post(url, body);
    console.log('signDeployHash: ', createDeployHash.data.res);

    return createDeployHash.data.res;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to sign transaction');
  }
};

export const getDepositsBalance = async (emailId) => {
  try {
    const balance = await vaultClient.getDeposit(emailId);
    console.log(balance);
    return balance;
  } catch (e) {
    console.log(e);
  }
};
