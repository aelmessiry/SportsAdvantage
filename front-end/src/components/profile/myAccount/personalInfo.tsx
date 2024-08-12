import React from 'react';
import SpAdvCard from '../../shared/SpAdvCard';
import SpAdvInput from '../../ui/SpAdvInput';
function PersonalInfo() {
  const getInitialState = () => ({
    inputs: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });
  const [state, setState] = React.useState(getInitialState());
  const handleChange = (e: any) => {
    const { checked, type, name, value } = e.target;
    const { inputs }: any = state;
    inputs[name] = type === 'checkbox' ? checked : value;
    setState({
      ...state,
      inputs,
    });
  };
  return (
    <SpAdvCard title="Personal Information" className="mt-10">
      <div className="flex flex-wrap justify-start">
        <SpAdvInput
          placeholder="Your Name"
          name="firstName"
          value={state.inputs.firstName}
          onChange={(e: any) => handleChange(e)}
          label="First Name"
          required={true}
          type="text"
          className="lg:w-1/2 h-full p-4"
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
          onChange={(e: any) => handleChange(e)}
          label="Last Name"
          required={true}
          type="text"
          className="lg:w-1/2 h-full p-4"
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
      </div>
      <div className="flex-1 p-4">
        <SpAdvInput
          placeholder="Email Address"
          name="email"
          value={state.inputs.email}
          onChange={(e: any) => handleChange(e)}
          label="Email Address"
          required={true}
          type="text"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                stroke="#93989A"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                stroke="#93989A"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </SpAdvCard>
  );
}

export default PersonalInfo;
