const CSPR_CLOUD_RPC = {
  TESTNET: "https://node.testnet.cspr.cloud/rpc",
  MAINNET: "https://node.cspr.cloud/rpc",
};

const CARS_CONTRACT_HASH = {
  TESTNET:
    "hash-544ffdc725eecac92996d5b6da36ca45c509c180cc021a6bacbfac80c820199b",
  MAINNET:
    "",
};

const CARS_EXP_CONTRACT_HASH = {
  TESTNET:
    "hash-e2949a8b75524276a57e377439355a883b5b60769ae0f4cdae4bbe55c456d40e",
  MAINNET:
    "",
};

// Enter your CSPR Cloud key here
const CSPR_CLOUD_KEY = "ENTER YOUR CSPR CLOUD KEY HERE";

// TEMPORARY: Should be got from user order
const CARS_NFT_METADATA = {
  title: "Ad Spot NFT for Car",
  type: "Ad Spot",
  description:
    "This NFT represents an exclusive ad spot on a high-performance car. It offers unique advertising opportunities during major events and racing seasons.",
  image:
    "https://ipfs.io/ipfs/QmRpz9RwYVYGNB27kSKBZ2h1B7Ny69HYKYwpomCSMCcMYe",
  external_url: "https://www.sportsadvantage.io",
  attributes: [
      {
          trait_type: "Category",
          value: "Automobile Advertising"
      },
      {
          trait_type: "Season",
          value: "Summer 2024"
      },
      {
          trait_type: "Event",
          value: "Grand Prix"
      },
      {
          trait_type: "Team",
          value: "Redline Racing"
      },
      {
          trait_type: "Car",
          value: "Formula X Racer"
      },
  ],
};

// TEMPORARY: Should be got from user order
const CARS_EXP_NFT_METADATA = {
  title: "Car Racing Experience NFT",
  type: "Experience",
  description:
    "This NFT grants access to an exclusive car racing experience. Holders of this NFT can participate in or observe thrilling car races, with special perks tailored to the event and team.",
  image:
    "https://ipfs.io/ipfs/QmXZCsWWV2P7qvwbX4WwC4NpamyTgeUw6kSAf8UHe7Rb3j",
  external_url: "https://www.sportsadvantage.io",
  attributes: [
      {
          trait_type: "Category",
          value: "Automobile Advertising"
      },
      {
          trait_type: "Season",
          value: "Summer 2024"
      },
      {
          trait_type: "Event",
          value: "Grand Prix"
      },
      {
          trait_type: "Team",
          value: "RedBull Racing"
      },
      {
          trait_type: "Car",
          value: "RB19"
      },
      {
          trait_type: "Experience",
          value: "Trackside Viewing, Pit Access, Driver Meet & Greet"
      }
  ],
};

module.exports = {
  RPC,
  WRITE_RPC,
  CSPR_CLOUD_RPC,
  CSPR_CLOUD_KEY,
  CARS_CONTRACT_HASH,
  CARS_NFT_METADATA,
  CARS_EXP_CONTRACT_HASH,
  CARS_EXP_NFT_METADATA
};
