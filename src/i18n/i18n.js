import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        PRODUCT: "Our products",
        FINANCE: "Finance",
        MARKETPLACE: "Marketplace",
        COMICS: "Comics",
        MEMES: "Memes",
        WHITEPAPER: "Whitepaper",
        CONTACTS: "Contacts",

        ENG: "ENG",
        RUS: "RUS",

        BUTTON_TITLE: "Buy METO",

        BACK: "Back",
        STAKE: {
          TITLE: "Staking CEJI",
          APR: "APR",
          EARNED: "Ceji Earned",
          INSTAKE: "Ceji in Stake",
          HARVEST: "Harvest",
          WITHDRAW1: "Withdraw Dep",
          WITHDRAW2: "Withdraw All",
          STAKE: "Stake",
          CONNECT: "Connect Wallet",
          HELPSTAKE: "Your deposit will be locked for 45 days. However, the rewards will always be available for withdrawal"
        },
        FARMING_LP: {
          TITLE: "Farming LP tokens",
          APR: "APR",
          REWARD: "Reward",
          EARNED: "Ceji Earned",
          INSTAKE: "LP token in stake",
          HARVEST: "Harvest",
          WITHDRAW: "Withdraw Dep",
          FARMING: "SOON...",
          HELPLP: "This service will be available soon"
        },
        FARMING_NFT: {
          TITLE: "Farming CEJI NFTs",
          RATE: "Rate",
          APR: "APR",
          AVAILABLE: "Available NFT",
          INSTAKE: "Ceji in Stake",
          BUY: "Buy Ceji",
          CLAIM: "Claim",
          CONNECT: "Connect Wallet",
          FARMING: "SOON...",
          HELPNFT: "This service will be available soon"
        },
      },
    },
    ru: {
      translation: {
        
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
    bindI18n: "languageChanged",
  },
});

export default i18n;
