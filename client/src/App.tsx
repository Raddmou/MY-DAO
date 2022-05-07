import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Container from "@mui/material/Container";

import Home from './pages/Home/Component';
import AddDao from './pages/AddDao/Component';
import ExploreDao from './pages/ExploreDaos/Component';
import Header from "./components/Header/Component";
import { useAppDispatch } from './hooks';
import { setAccount, getDaoByMember, getDaosCountByMember } from './redux/reducers/actions';
import { contractFactoryProvider } from './api/ContractProvider';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect((): void => {
    const isMetaMask = (window as any).ethereum?.isMetaMask;
    const isConnected = (window as any).ethereum?.isConnected();
    const selectedAddress = (window as any).ethereum?.selectedAddress;

    if(!isMetaMask || !isConnected) return;

    dispatch(getDaosCountByMember());
    dispatch(setAccount(selectedAddress));

    (window as any).ethereum?.on('accountsChanged', async () => {
			dispatch(setAccount((window as any).ethereum?.selectedAddress));
		});	
    //dispatch(contractProvider.getContract());
  }, []);

  return (
      <Router>
        <div className="app">
          <Header />
          <Container maxWidth="md">
            <main className="main">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="add-new-dao" element={<AddDao />} />
                    <Route path="explore-daos" element={<ExploreDao />} />
                </Routes>
            </main>
          </Container>
        </div>
      </Router>
  );
};

export default App;