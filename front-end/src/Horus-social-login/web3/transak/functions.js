import transakSDK from "@transak/transak-sdk";

export const launchTransak = async (userAddress) => {
  let transak = new transakSDK({
    apiKey: process.env.REACT_APP_TRANSAK_API_KEY,
    environment: "STAGING",
    defaultCryptoCurrency: "MATIC",
    walletAddress: userAddress,
    widgetHeight: "650px",
    widgetWidth: "550px",
  });

  transak.init();

  // To get all the events
  transak.on(transak.ALL_EVENTS, (data) => {
    console.log(data);
  });

  // This will trigger when the user closed the widget
  transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
    transak.close();
  });

  // This will trigger when the user marks payment is made
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    // transak.close();
  });
};
