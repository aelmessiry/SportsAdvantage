import React from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/uploadDecal/banner';
import SponsorshipNFT from '../components/uploadDecal/sponsorshipNFT';
import DecalUpload from '../components/uploadDecal/decalUpload';
import DecalDetails from '../components/uploadDecal/decalDetails';
import PerkLevel from '../components/uploadDecal/perkLevel';
import SponsorshipManagement from '../components/uploadDecal/sponsorshipManagement';

function UploadDecal() {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const status = queryParams.get('status');
  return (
    <>
      <Banner status={status} />
      <div className="md:px-16 lg:flex-row flex flex-wrap px-4 mb-10">
        <div className="lg:w-1/3 h-full pr-4">
          <SponsorshipNFT />
        </div>
        <div className="lg:w-2/3 w-full h-full pl-4">
          <div className="flex flex-col flex-wrap">
            <div className="flex-1">
              <DecalUpload status={status} />
            </div>
            <div className="flex-1">
              <DecalDetails />
            </div>
            <div className="flex-1">
              <PerkLevel />
            </div>
            <div className="flex-1">
              <SponsorshipManagement />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDecal;
