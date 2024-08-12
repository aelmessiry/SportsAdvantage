import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SpAdvButton from '../../SpAdvButton';
import SpAdvInput from '../../SpAdvInput';
import SpAdvSelect from '../../SpAdvSelect';
import SpAdvSwitch from '../../SpAdvSwitch';

const AddResultModal = (props: any) => {
  const [open, setOpen] = useState(props.show);
  const cancelButtonRef = useRef(null);
  const handleSend = () => {
    setOpen(false);
    props.handleCloseParent();
    window.location.reload();
  };
  const InitialInputs = () => ({
    inputs: {
      team: '',
      year: '',
      championship: '',
      race: '',
      startPosition: '',
      finishPosition: '',
      pointsEarned: '',
      abandon: '',
      crash: '',
      disqualified: '',
    },
  });
  const [state, setState] = React.useState(InitialInputs());
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const { inputs }: any = state;

    inputs[name] = value;
    setState({
      ...state,
      inputs,
    });
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            props.handleCloseParent();
          }}
        >
          <div className="sm:block sm:p-0 flex items-end justify-center min-h-screen pt-4 pb-20 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="sm:inline-block sm:align-middle sm:h-screen hidden"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="sm:my-8 sm:align-middle sm:w-full lg:max-w-3xl shadow-info-modal border-cetaceanBlue-300 bg-darkGunmetal-100 inline-block max-w-md max-h-full overflow-hidden text-left align-bottom transition-all transform rounded-md">
                <div className="bg-cetaceanBlue-100px-14 sm:pb-4 py-6">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="sm:mt-0 sm:text-left w-full mt-3 text-center">
                      <Dialog.Title className=" border-b-neutral-1100 font-spAdvSemiBold text-darkGunmetal-300 relative flex items-start py-2 text-sm font-semibold leading-5 border-b">
                        <div className="text-antiFlashWhite-100 font-spAdvSemiBold text-h1 flex-1 font-semibold leading-loose text-center">
                          Add Result
                        </div>
                        <div
                          className="bg-darkGunmetal-100 border-lava-100 right-2 absolute lg:p-2 md:p-1 p-0 border cursor-pointer"
                          onClick={() => {
                            setOpen(false);
                            props.handleCloseParent();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M8.82408 10.0005L5.24074 6.42548C5.08382 6.26856 4.99567 6.05573 4.99567 5.83381C4.99567 5.6119 5.08382 5.39907 5.24074 5.24215C5.39766 5.08523 5.61049 4.99707 5.83241 4.99707C6.05433 4.99707 6.26715 5.08523 6.42407 5.24215L9.99907 8.82548L13.5741 5.24215C13.731 5.08523 13.9438 4.99707 14.1657 4.99707C14.3877 4.99707 14.6005 5.08523 14.7574 5.24215C14.9143 5.39907 15.0025 5.6119 15.0025 5.83381C15.0025 6.05573 14.9143 6.26856 14.7574 6.42548L11.1741 10.0005L14.7574 13.5755C14.8355 13.653 14.8975 13.7451 14.9398 13.8467C14.9821 13.9482 15.0039 14.0571 15.0039 14.1671C15.0039 14.2772 14.9821 14.3861 14.9398 14.4876C14.8975 14.5892 14.8355 14.6813 14.7574 14.7588C14.6799 14.8369 14.5878 14.8989 14.4862 14.9412C14.3847 14.9835 14.2758 15.0053 14.1657 15.0053C14.0557 15.0053 13.9468 14.9835 13.8453 14.9412C13.7437 14.8989 13.6515 14.8369 13.5741 14.7588L9.99907 11.1755L6.42407 14.7588C6.34661 14.8369 6.25444 14.8989 6.15289 14.9412C6.05134 14.9835 5.94242 15.0053 5.83241 15.0053C5.7224 15.0053 5.61348 14.9835 5.51193 14.9412C5.41038 14.8989 5.31821 14.8369 5.24074 14.7588C5.16264 14.6813 5.10064 14.5892 5.05833 14.4876C5.01602 14.3861 4.99424 14.2772 4.99424 14.1671C4.99424 14.0571 5.01602 13.9482 5.05833 13.8467C5.10064 13.7451 5.16264 13.653 5.24074 13.5755L8.82408 10.0005Z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                      </Dialog.Title>
                      <div className="lg:p-8 text-neutral-400 text-sm font-normal">
                        <div className="flex flex-wrap justify-start">
                          <SpAdvSelect
                            labelClassName={' text-white'}
                            name="team"
                            value={state.inputs.team}
                            onChange={(e) => handleChange(e)}
                            placeholder={'Team'}
                            isSearchable={true}
                            label="Team"
                            className="sp-adv-basic-select lg:w-1/2 h-full p-4"
                            options={[
                              { value: 'FachAutoTech', label: 'FachAutoTech' },
                              { value: 'GPElitte', label: 'GP Elitte' },
                            ]}
                          />
                          <SpAdvSelect
                            labelClassName={' text-white'}
                            name="year"
                            value={state.inputs.year}
                            onChange={(e) => handleChange(e)}
                            placeholder={'Year'}
                            isSearchable={true}
                            label="Year"
                            className="sp-adv-basic-select lg:w-1/2 h-full p-4"
                            options={[
                              { value: '2020', label: '2020' },
                              { value: '2021', label: '2021' },
                            ]}
                          />
                        </div>
                        <div className="flex flex-wrap justify-start">
                          <SpAdvSelect
                            labelClassName={' text-white'}
                            name="championship"
                            value={state.inputs.championship}
                            onChange={(e) => handleChange(e)}
                            placeholder={'championship'}
                            isSearchable={true}
                            label="Championship"
                            className="sp-adv-basic-select lg:w-1/2 h-full p-4"
                            options={[
                              {
                                value: '1',
                                label: 'Porsche Carrera Cup Deutchland 2024',
                              },
                              {
                                value: '2',
                                label: 'Porsche Mobile 1 Supercup 2024',
                              },
                            ]}
                          />
                          <SpAdvSelect
                            labelClassName={' text-white'}
                            name="race"
                            value={state.inputs.race}
                            onChange={(e) => handleChange(e)}
                            placeholder={'Race'}
                            isSearchable={true}
                            label="Race"
                            className="sp-adv-basic-select lg:w-1/2 h-full p-4"
                            options={[
                              { value: '1', label: 'Monza 12.07.2024' },
                              { value: '2', label: 'Monza 12.08.2024' },
                              { value: '3', label: 'Hockenheim 12.10.2024' },
                            ]}
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-start">
                          <SpAdvInput
                            labelClassName={' text-white'}
                            placeholder="Start Position"
                            name="startPosition"
                            value={state.inputs.startPosition}
                            onChange={(e: any) => handleChange(e)}
                            label="Start Position"
                            required={true}
                            type="number"
                            className="lg:w-1/2 h-full p-4"
                          />
                          <div className="flex items-center justify-center mt-10">
                            <div>
                              <SpAdvSwitch />
                            </div>
                            <span className=" ml-2">Abandon</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-start">
                          <SpAdvInput
                            labelClassName={' text-white'}
                            placeholder="Finish Position"
                            name="finishPosition"
                            value={state.inputs.finishPosition}
                            onChange={(e: any) => handleChange(e)}
                            label="Finish Position"
                            required={true}
                            type="number"
                            className="lg:w-1/2 h-full p-4"
                          />
                          <div className="flex items-center justify-center mt-10">
                            <div>
                              <SpAdvSwitch />
                            </div>
                            <span className=" ml-2">Crash</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-start">
                          <SpAdvInput
                            labelClassName={' text-white'}
                            placeholder="Points Earned"
                            name="pointsEarned"
                            value={state.inputs.pointsEarned}
                            onChange={(e: any) => handleChange(e)}
                            label="Points Earned"
                            required={true}
                            type="number"
                            className="lg:w-1/2 h-full p-4"
                          />
                          <div className="flex items-center justify-center mt-10">
                            <div>
                              <SpAdvSwitch />
                            </div>
                            <span className=" ml-2">Disqualified</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="lg:w-1/2 h-full">
                          <SpAdvButton
                            className="w-full"
                            onClick={() => {
                              handleSend();
                            }}
                          >
                            Add Result
                          </SpAdvButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddResultModal;
