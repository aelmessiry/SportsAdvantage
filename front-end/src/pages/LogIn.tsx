import React from 'react';
import SpAdvInput from '../components/ui/SpAdvInput';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/layout';
import SpAdvButton from '../components/ui/SpAdvButton';

function SignIn() {
  const navigate = useNavigate();
  const getInitialState = () => ({
    inputs: {
      email: '',
      password: '',
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
    <Layout mainClassName="!pb-0 ">
      <section className="sp-adv-login flex items-stretch min-h-screen text-white">
        <div className="lg:w-1/3 md:px-16 sm:px-8 bg-antiFlashWhite-100 lg:rounded-tr-4xl lg:rounded-br-4xl xs:px-2 z-10 flex items-center justify-center w-full px-0">
          <div className="lg:hidden lg:bg-gray-500 absolute inset-0 z-10 items-center bg-no-repeat bg-cover">
            <div className="opacity-60 lg:bg-black absolute inset-0 z-0"></div>
          </div>
          <div className="lg:px-0 relative z-20 flex flex-col justify-center w-full h-full px-5 py-6">
            <div className=" text-darkGunmetal-200 text-h2 font-spAdvBold font-bold leading-normal">
              Welcome Back!
            </div>
            <div className=" text-neutral-400 text-base font-normal leading-6">
              Sign in to continue
            </div>
            <div className="relative w-full my-3">
              <div className="pt-4 pb-2">
                <SpAdvInput
                  placeholder="Your Email"
                  name="email"
                  value={state.inputs.email}
                  onChange={(e: any) => handleChange(e)}
                  label="Email"
                  type="text"
                  className=" font-spAdvBold font-bold uppercase"
                />
              </div>
              <div className="pt-4 pb-2">
                <SpAdvInput
                  placeholder="Password"
                  name="password"
                  value={state.inputs.password}
                  onChange={(e: any) => handleChange(e)}
                  label="password"
                  type="password"
                  className=" font-spAdvBold font-bold uppercase"
                />
              </div>
            </div>
            <div className="relative w-full">
              <div className="flex items-center justify-between">
                <div className=" text-neutral-400 hover:underline font-spAdvRegular mt-3 text-base font-normal leading-6">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="text-right">
                  <SpAdvButton
                    onClick={() => {
                      localStorage.setItem('isLoggedIn', 'true');
                      navigate('/profile');
                    }}
                  >
                    Login
                  </SpAdvButton>
                </div>
              </div>
            </div>
            <div className="bottom-5 absolute px-4 pt-4 pb-2 text-center">
              <div className=" text-neutral-400 font-spAdvRegular text-base font-normal leading-6">
                Don’t have an account yet?
                <Link
                  className=" text-cetaceanBlue-200 font-spAdvRegular ml-1 text-base font-normal underline"
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex relative items-center hidden w-2/3">
          <div className="z-10 w-full px-24">
            <h1 className="font-spAdvRegular text-h1 font-semibold leading-relaxed tracking-wide text-center">
              Hello
            </h1>
            <p className="font-spAdvRegular my-4 text-xl font-normal leading-9 text-center">
              Welcome To Sports Advantages
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default SignIn;
