import React from 'react';
import SpAdvCard from '../shared/SpAdvCard';
import TeamEvents from './teamEvents';
import SharedSponsors from '../ui/shared/SharedSponsors';
import SpAdvButton from '../ui/SpAdvButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddResultModal from '../ui/shared/modals/AddResultModal';
import TeamMemberBio from './TeamMemberBio';
export const ComingSoon = () => {
  return (
    <div className=" top-1/2 left-1/2 backdrop-brightness-50 absolute flex items-center justify-center w-full h-full text-5xl text-black -translate-x-1/2 -translate-y-1/2">
      <p className=" text-xl font-bold">Coming Soon</p>
    </div>
  );
};
function TeamMemberSub(props) {
  const [openAddResultModal, setOpenAddResultModal] = React.useState(false);
  return (
    <>
      <div className="w-full mt-5">
        <SharedSponsors />
      </div>
      <div className="flex flex-wrap justify-center w-full py-6">
        <div className="lg:w-2/3 p-4">
          <TeamMemberBio
            bio={props.teamMember.bio}
            passion={props.teamMember.passion}
            vision={props.teamMember.vision}
            interests={props.teamMember.interests}
          />
          <hr className=" mt-14" />
        </div>
        <div className="lg:w-1/3 h-full p-4">
          <SpAdvCard>
            <div className=" shadow-outline-xs relative flex p-6 mb-6 overflow-x-auto rounded-md">
              <ComingSoon />
              <div>
                <p className=" text-darkGunmetal-200 font-spAdvBold mb-2 text-sm font-bold leading-5">
                  Top 5 Career highlights
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2022:{' '}
                  </span>
                  Rookie Champion, PCCGB
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2021:{' '}
                  </span>
                  British GT4 Champion
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2020:{' '}
                  </span>
                  Vice-Champion, Ginetta GT SuperCup
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2019:{' '}
                  </span>
                  Ginetta Junior Championship Finished
                </p>
                <p className=" text-neutral-400 font-spAdvRegular text-xs font-normal leading-5">
                  <span className=" text-lava-100 text-xs font-bold leading-4">
                    2018:{' '}
                  </span>
                  Vice-Champion, Ginetta GT SuperCup
                </p>
              </div>
            </div>
            <div className=" shadow-outline-xs relative flex p-6 mb-6 overflow-x-auto rounded-md">
              <ComingSoon />
              <div className="w-full">
                <p className=" text-darkGunmetal-200 font-spAdvBold mb-2 text-sm font-bold leading-5">
                  Latest Race Results
                </p>
                <table className="w-full table-auto">
                  <thead className=" bg-transparent">
                    <tr className="px-4">
                      <th className=" px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                          Event
                        </div>
                      </th>
                      <th className=" px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                          Circuit
                        </div>
                      </th>
                      <th className=" px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                          Finish
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className=" px-4 py-6">
                        2022 Carrera Cup Deutchland
                      </td>
                      <td className=" px-4 py-6">Hochenheimring</td>
                      <td className=" px-4 py-6">6</td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-6">
                        2022 Carrera Cup Deutchland
                      </td>
                      <td className=" px-4 py-6">Zandwoort</td>
                      <td className=" px-4 py-6">7</td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-6">2022 Mobile 1 Supercup</td>
                      <td className=" px-4 py-6">Monza</td>
                      <td className=" px-4 py-6">3</td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-6">
                        2022 Carrera Cup Deutchland
                      </td>
                      <td className=" px-4 py-6">Nurburgring</td>
                      <td className=" px-4 py-6">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="shadow-outline-xs relative flex p-6 mb-6 overflow-x-auto rounded-md">
              <ComingSoon />
              <div className="w-full">
                <p className=" text-darkGunmetal-200 font-spAdvBold mb-2 text-sm font-bold leading-5">
                  Next Events
                </p>
                <table className="w-full table-auto">
                  <thead className=" bg-transparent">
                    <tr className="px-4">
                      <th className=" px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 text-base font-semibold tracking-wide text-left">
                          Event
                        </div>
                      </th>
                      <th className=" px-4 py-2">
                        <div className="font-spAdvSemiBold text-neutral-400 flex items-center text-base font-semibold tracking-wide text-left cursor-pointer">
                          Circuit
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className=" px-4 py-6">
                        06 Mar 2022 - Carrera Cup Deutchland
                      </td>
                      <td className=" px-4 py-6">Hochenheimring</td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-6">
                        08 Jun 2022 - Carrera Cup Deutchland
                      </td>
                      <td className=" px-4 py-6">Zandwoort</td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-6">
                        23 Apr 2022 Mobile 1 Supercup
                      </td>
                      <td className=" px-4 py-6">Monza</td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-6">
                        23 Dec 2022 Carrera Cup Deutchland
                      </td>
                      <td className=" px-4 py-6">Nurburgring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </SpAdvCard>
        </div>
      </div>
      <div className=" relative w-full mt-5">
        <ComingSoon />
        <SpAdvCard>
          <div className="flex justify-between">
            <div>
              <div className=" text-h2 font-spAdvBold font-bold leading-10 text-black">
                Race Results
              </div>
              <div className=" text-neutral-400 font-spAdvRegular mt-2 text-sm font-normal leading-5">
                Elementum ullamcorper sed phasellus massa elit turpis eu id
                varius.
              </div>
            </div>
            <SpAdvButton onClick={() => setOpenAddResultModal(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Result
            </SpAdvButton>
          </div>
          <TeamEvents />
        </SpAdvCard>
      </div>
      {openAddResultModal && (
        <AddResultModal
          show={openAddResultModal}
          handleCloseParent={() => {
            setOpenAddResultModal(false);
          }}
        />
      )}
    </>
  );
}

export default TeamMemberSub;
