import React from 'react';
import Layout from '../components/layout/layout';
import SpAdvCard from '../components/shared/SpAdvCard';
import SpAdvSelect from '../components/ui/SpAdvSelect';
import { UserType } from '../Enum/userType';
import SpAdvInput from '../components/ui/SpAdvInput';
import SpAdvTextArea from '../components/ui/SpAdvTextArea';
import SpAdvButton from '../components/ui/SpAdvButton';

function SignUp() {
  const [state, setState] = React.useState({
    inputs: {
      type: { value: UserType.Employee, label: 'Employee' },
      firstName: '',
      lastName: '',
      institution: '',
      institutionDescription: '',
    },
  });

  const handleChange = (selected: any, name: any) => {
    const { inputs }: any = state;
    inputs[name] = selected;
    setState({
      ...state,
      inputs,
    });
  };

  return (
    <Layout>
      <div className="sm:py-12 flex flex-col justify-center min-h-screen py-6">
        <div className="relative w-1/2 py-3 mx-auto">
          <SpAdvCard title="Profile">
            <div className="divide-y divide-gray-200">
              <div className="sm:text-lg sm:leading-7 py-8 space-y-4 text-base leading-6 text-gray-700">
                <div className="flex flex-col mb-8">
                  <SpAdvSelect
                    name="type"
                    value={state.inputs.type}
                    onChange={(selected: any) => handleChange(selected, 'type')}
                    placeholder={'I am an'}
                    isSearchable={true}
                    label="I am an:"
                    options={[
                      { value: UserType.Employee, label: 'Employee' },
                      { value: UserType.Individual, label: 'Individual' },
                    ]}
                    className="sp-adv-basic-select "
                  />
                </div>
                <div className="flex flex-row my-8">
                  <SpAdvInput
                    placeholder="Your Name"
                    name="firstName"
                    value={state.inputs.firstName}
                    onChange={(e: any) =>
                      handleChange(e.target.value, 'firstName')
                    }
                    label="First Name"
                    required={true}
                    type="text"
                    className="lg:w-1/2 h-full pr-4"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12.1207 12.7805C12.0507 12.7705 11.9607 12.7705 11.8807 12.7805C10.1207 12.7205 8.7207 11.2805 8.7207 9.51047C8.7207 7.70047 10.1807 6.23047 12.0007 6.23047C13.8107 6.23047 15.2807 7.70047 15.2807 9.51047C15.2707 11.2805 13.8807 12.7205 12.1207 12.7805Z"
                          stroke="#93989A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.7398 19.3796C16.9598 21.0096 14.5998 21.9996 11.9998 21.9996C9.39977 21.9996 7.03977 21.0096 5.25977 19.3796C5.35977 18.4396 5.95977 17.5196 7.02977 16.7996C9.76977 14.9796 14.2498 14.9796 16.9698 16.7996C18.0398 17.5196 18.6398 18.4396 18.7398 19.3796Z"
                          stroke="#93989A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#93989A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                  <SpAdvInput
                    placeholder="Your Name"
                    name="lastName"
                    value={state.inputs.lastName}
                    onChange={(e: any) =>
                      handleChange(e.target.value, 'lastName')
                    }
                    label="Last Name"
                    required={true}
                    type="text"
                    className="lg:w-1/2 h-full pl-4"
                  />
                </div>
                {Number(state.inputs.type.value) === UserType.Employee && (
                  <div className=" py-8">
                    <div className="flex flex-col">
                      <SpAdvInput
                        placeholder="Institution"
                        name="institution"
                        value={state.inputs.institution}
                        onChange={(e: any) =>
                          handleChange(e.target.value, 'institution')
                        }
                        label="Institution"
                        required={true}
                        type="text"
                        className="h-full"
                      />
                    </div>
                    <div className="flex flex-col mt-8">
                      <SpAdvTextArea
                        placeholder="Institution Description"
                        name="institutionDescription"
                        value={state.inputs.institutionDescription}
                        onChange={(e: any) =>
                          handleChange(e.target.value, 'institutionDescription')
                        }
                        label="Institution Description"
                        required={true}
                        className=" h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-4 space-x-4">
                <button className=" focus:outline-none flex items-center justify-center w-40 px-4 py-3 text-gray-900 underline rounded-md">
                  Cancel
                </button>
                <SpAdvButton
                  disabled={
                    state.inputs.firstName === '' ||
                    state.inputs.lastName === '' ||
                    (Number(state.inputs.type) === UserType.Employee &&
                      (state.inputs.institution === '' ||
                        state.inputs.institutionDescription === ''))
                  }
                  className=" w-48"
                >
                  Done
                </SpAdvButton>
              </div>
            </div>
          </SpAdvCard>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
