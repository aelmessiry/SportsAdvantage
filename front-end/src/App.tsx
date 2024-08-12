import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SelectedSpotProvider } from './contexts/SelectedSpotContext';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { sepolia, polygonMumbai, bscTestnet } from 'wagmi/chains';
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/scss/style.scss';
import Explore from './pages/Explore';
import MyAssets from './pages/MyAssets';
import EndingSoon from './pages/EndingSoon';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Profile from './pages/Profile';
import UploadDecal from './pages/UploadDecal';
import SingleTeam from './pages/SingleTeam';
import ListCards from './pages/ListCards';
import ScrollToTop from './components/shared/ScrollToTop';
import TeamCars from './pages/teamCars';
import SelectedSpot from './pages/selectedSpot';
import ChooseTeamSpot from './pages/chooseTeamSpot';
import PurchaseSpot from './pages/purchaseSpot';
import UploadDecalAfterPurchase from './pages/UploadDecalAfterPurchase';
import { SelectedCurrencyProvider } from './contexts/CurrencyContext';
import Layout from './components/layout/layout';
import Admin from './pages/Admin';
import SingleDriver from './pages/SingleTeamMember';
import RegisterAsTeam from './pages/RegisterAsTeam';
import { Toaster } from 'react-hot-toast';
import TeamOwnedCars from './components/admin/cars';

import { AuthProvider } from './Horus-social-login/web3/context/AuthContext';
import TeamAdmin from './pages/TeamAdmin';
import EditCar from './components/admin/cars/editCar';
import EditCategory from './components/admin/categories/editCategory';
import EditEvent from './components/admin/events/editEvent';
import EditSeason from './components/admin/seasons/editSeason';
import EditTeam from './components/singleTeam/editTeam';
import EditTeamMember from './components/admin/teamMember/editTeamMember';
import { UserRoleProvider } from './contexts/LoggedUserRoleContext';
import ReactGA from 'react-ga4';

function App() {
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const chains = [polygonMumbai, sepolia, bscTestnet];
  const googleAnaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID
  ReactGA.initialize(`${googleAnaId}`);
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  return (
    <SelectedSpotProvider>
      <SelectedCurrencyProvider>
        <UserRoleProvider>
          <WagmiConfig config={wagmiConfig}>
            <AuthProvider>
              <BrowserRouter>
                <div>
                  <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                      style: {
                        background: '#037FFF',
                        color: '#fff',
                        fontSize: '1.4em',
                      },
                    }}
                  />
                </div>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Layout>
                        <Home />
                      </Layout>
                    }
                  />
                  <Route
                    path="/explore"
                    element={
                      <Layout>
                        <Explore />
                      </Layout>
                    }
                  />
                  <Route
                    path="/my-assets"
                    element={
                      <Layout>
                        <MyAssets />
                      </Layout>
                    }
                  />
                  <Route
                    path="/ending-soon"
                    element={
                      <Layout>
                        <EndingSoon />
                      </Layout>
                    }
                  />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route
                    path="/cart"
                    element={
                      <Layout>
                        <Cart />
                      </Layout>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <Layout>
                        <Terms />
                      </Layout>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <Layout>
                        <Privacy />
                      </Layout>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Layout>
                        <Profile />
                      </Layout>
                    }
                  />
                  <Route
                    path="/upload-decal"
                    element={
                      <Layout>
                        <UploadDecal />
                      </Layout>
                    }
                  />
                  <Route
                    path="/single-team"
                    element={
                      <Layout>
                        <SingleTeam />
                      </Layout>
                    }
                  />
                  <Route
                    path="/single-driver"
                    element={
                      <Layout>
                        <SingleDriver />
                      </Layout>
                    }
                  />
                  <Route
                    path="/list-cards"
                    element={
                      <Layout>
                        <ListCards />
                      </Layout>
                    }
                  />
                  <Route
                    path="/team-cars"
                    element={
                      <Layout>
                        <TeamCars />
                      </Layout>
                    }
                  />
                  <Route
                    path="/choose-team-spot"
                    element={
                      <Layout>
                        <ChooseTeamSpot />
                      </Layout>
                    }
                  />
                  <Route
                    path="/selected-spot"
                    element={
                      <Layout>
                        <SelectedSpot />
                      </Layout>
                    }
                  />
                  <Route
                    path="/purchase-spot"
                    element={
                      <Layout>
                        <PurchaseSpot />
                      </Layout>
                    }
                  />
                  <Route
                    path="/upload-decal-after-purchase"
                    element={
                      <Layout>
                        <UploadDecalAfterPurchase />
                      </Layout>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <Layout mainClassName="sp-adv-full-width-screen">
                        <Admin />
                      </Layout>
                    }
                  />
                  <Route
                    path="/register-team"
                    element={
                      <Layout>
                        <RegisterAsTeam />
                      </Layout>
                    }
                  />
                  <Route
                    path="/team-owned-cars"
                    element={
                      <Layout>
                        <TeamOwnedCars />
                      </Layout>
                    }
                  />
                  <Route
                    path="/team-admin"
                    element={
                      <Layout>
                        <TeamAdmin />
                      </Layout>
                    }
                  />
                  <Route
                    path="/edit-car"
                    element={
                      <Layout>
                        <EditCar />
                      </Layout>
                    }
                  />
                  <Route
                    path="/edit-category"
                    element={
                      <Layout>
                        <EditCategory />
                      </Layout>
                    }
                  />
                  <Route
                    path="/edit-event"
                    element={
                      <Layout>
                        <EditEvent />
                      </Layout>
                    }
                  />
                  <Route
                    path="/edit-season"
                    element={
                      <Layout>
                        <EditSeason />
                      </Layout>
                    }
                  />
                  <Route
                    path="/edit-team"
                    element={
                      <Layout>
                        <EditTeam />
                      </Layout>
                    }
                  />
                  <Route
                    path="/edit-team-member"
                    element={
                      <Layout>
                        <EditTeamMember />
                      </Layout>
                    }
                  />
                </Routes>
                <ScrollToTop />
              </BrowserRouter>
            </AuthProvider>
          </WagmiConfig>
        </UserRoleProvider>
      </SelectedCurrencyProvider>
    </SelectedSpotProvider>
  );
}

export default App;
