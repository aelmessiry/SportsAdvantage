import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NftCard from '../ui/shared/cards/NftCard';
import Preloader from '../../Horus-social-login/social-wallet/preloader/preloader';
import { useAuth } from '../../Horus-social-login/web3/context/AuthContext';
import toast from 'react-hot-toast';
import { getUserNFTs } from '../../web3/utils';

function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { entityInfo, isLoggedIn } = useAuth();

  const fetchNFTs = async () => {
    try {
      setLoading(true);
      // Replace this with your method to fetch NFTs
      const fetchedNFTs = await getUserNFTs(entityInfo.activePublicKey); 
      setNfts(fetchedNFTs);
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNFTs();
    }
  }, [isLoggedIn]);

  return (
    <div className="md:px-16 lg:flex-row min-h-screen px-4 my-10">
      {loading && <Preloader show={loading} />}
      {!loading && isLoggedIn && (
        <>
          <div className="flex items-center justify-between">
            <p className="font-spAdvSemiBold text-darkGunmetal-200 text-h2 font-semibold">
              My Assets
            </p>
          </div>

          {nfts.length > 0 ? (
            <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {nfts.map((nft, index) => (
                <NftCard key={index} nft={nft} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center mt-20 text-xl">
              You don't have NFTs yet, please
              <Link to={'/explore'} className="hover:underline mx-1 text-blue-800">
                purchase
              </Link>
              some NFTs!
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyAssets;