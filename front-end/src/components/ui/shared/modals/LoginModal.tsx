import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import LoginButtons from '../../../../Horus-social-login/social-wallet/loginButtons';
import { useAuth } from '../../../../Horus-social-login/web3/context/AuthContext';
const LoginModal = (props: any) => {
  const [open, setOpen] = useState(props.show);
  const { isLoggedIn } = useAuth();
  const handleCancel = () => {
    props.handleCloseParent();
  };
  const closeModal = () => {
    setOpen(false);
    props.handleCloseParent();
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={handleCancel}
        className="fixed inset-0 z-30 overflow-y-auto"
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
            <div className="sm:my-8 sm:align-middle sm:w-full lg:max-w-3xl shadow-info-modal border-cetaceanBlue-300 bg-cetaceanBlue-100 inline-block max-w-md max-h-full overflow-hidden text-left align-bottom transition-all transform rounded-md">
              <div className="bg-cetaceanBlue-100px-14 sm:pb-4 py-6">
                <div className="sm:flex sm:items-start w-full">
                  <div className="sm:mt-0 sm:text-left w-full mt-3 text-center">
                    <Dialog.Title className=" border-b-neutral-1100 font-spAdvSemiBold text-darkGunmetal-300 relative flex items-start py-2 text-sm font-semibold leading-5 border-b">
                      <div className="text-antiFlashWhite-100 font-spAdvSemiBold lg:text-xl flex-1 text-lg font-semibold leading-loose text-center">
                        Login with your Preferred Provider
                      </div>
                      <div
                        className="bg-cetaceanBlue-500 border-lava-100 right-2 absolute  lg:p-2 md:p-1 p-0 border cursor-pointer"
                        onClick={() => {
                          setOpen(false);
                          props.close();
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
                    <Dialog.Panel>
                      <Dialog.Description>
                        <div className="flex m-8 justify-center">
                          {!isLoggedIn && (
                            <LoginButtons
                              onCloseModal={closeModal}
                              isModal={true}
                            />
                          )}
                        </div>
                      </Dialog.Description>
                    </Dialog.Panel>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginModal;
