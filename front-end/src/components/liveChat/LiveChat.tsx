/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect } from 'react';

const chatwootBaseUrl = import.meta.env.VITE_CHATWOOT_BASE_URL;
const chatwootToken = import.meta.env.VITE_CHATWOOT_TOKEN;

function Livechat() {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right',
      locale: 'en',
      type: 'standard',
    };

    (function (d, t) {
      const BASE_URL = chatwootBaseUrl;
      const g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + '/packs/js/sdk.js';
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);

      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: chatwootToken,
          baseUrl: BASE_URL,
        });
      };
    })(document, 'script');
  }, []);

  return null;
}

export default Livechat;
