export const PAYMENT_AMOUNTS = {
  DEFAULT_ENTRYPOINT_PAYMENT_AMOUNT:
    process.env.REACT_APP_DEFAULT_ENTRYPOINT_PAYMENT_AMOUNT || '10000000000',
  DEPOSIT_CSPR_ENTRYPOINT_PAYMENT_AMOUNT:
    process.env.REACT_APP_DEFAULT_ENTRYPOINT_PAYMENT_AMOUNT || '185000000000',
  DEPOSIT_ENTRYPOINT_PAYMENT_AMOUNT:
    process.env.REACT_APP_DEFAULT_ENTRYPOINT_PAYMENT_AMOUNT || '100000000000',
  MINT_ONE_PAYMENT_AMOUNT:
    process.env.REACT_APP_MINT_ONE_PAYMENT_AMOUNT || '25000000000',
  MINT_COPIES_PAYMENT_AMOUNT:
    process.env.REACT_APP_MINT_COPIES_PAYMENT_AMOUNT || '200000000000',
  BURN_ONE_PAYMENT_AMOUNT:
    process.env.REACT_APP_BURN_ONE_PAYMENT_AMOUNT || '12000000000',
  MINT_ONE_META_SIZE: process.env.REACT_APP_MINT_ONE_META_SIZE || '1',
  MINT_COPIES_META_SIZE: process.env.REACT_APP_MINT_COPIES_META_SIZE || '10',
  MINT_MANY_META_SIZE: process.env.REACT_APP_MINT_MANY_META_SIZE || '5',
  MINT_MANY_META_COUNT: process.env.REACT_APP_MINT_MANY_META_COUNT || '5',
  MINT_COPIES_COUNT: process.env.REACT_APP_MINT_COPIES_COUNT || '20',
  NATIVE_TRANSFER_PAYMENT_AMOUNT:
    process.env.REACT_APP_NATIVE_TRANSFER_PAYMENT_AMOUNT || '10000',
  TRANSFER_ONE_PAYMENT_AMOUNT:
    process.env.REACT_APP_TRANSFER_ONE_PAYMENT_AMOUNT || '20000000000',
  INSTALL_PAYMENT_AMOUNT:
    process.env.REACT_APP_INSTALL_PAYMENT_AMOUNT || '300000000000',
  MULTI_MINT_PAYMENT_AMOUNT:
    process.env.REACT_APP_MULTI_MINT_PAYMENT_AMOUNT || '50000000000',
  REMOVE_COLLECTION_PAYMENT_AMOUNT:
    process.env.REACT_APP_MINT_ONE_PAYMENT_AMOUNT || '65000000000',
  CREATE_PROFILE_PAYMENT_AMOUNT:
    process.env.REACT_APP_MINT_ONE_PAYMENT_AMOUNT || '45000000000',
};
