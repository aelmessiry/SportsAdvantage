import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'flowbite';
import { ClickProvider, CsprClickThemes } from '@make-software/csprclick-ui';
import { ThemeProvider } from 'styled-components';
import { CsprClickInitOptions } from '@make-software/csprclick-core-client';
let clickOptions: CsprClickInitOptions;
if (import.meta.env.VITE_NETWORK === 'MAINNET')
    clickOptions = {
      appName: 'CSPR.app',
      contentMode: 'iframe',
      providers: [
        'casper-wallet',
        'ledger',
        'casperdash',
        'casper-signer',
      ],
      appId: 'sportsadvantage-mainnet',
    };
  else
    clickOptions = {
      appName: 'CSPR.playground',
      contentMode: 'iframe',
      providers: [
        'casper-wallet',
        'ledger',
        'casperdash',
        'casper-signer',
      ],
      appId: 'csprclick-template',
    };
    
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ClickProvider options={clickOptions}>
  <ThemeProvider theme={CsprClickThemes.light}>
    {' '}
    <App />
  </ThemeProvider>
</ClickProvider>
);
