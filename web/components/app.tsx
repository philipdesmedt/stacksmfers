import React, { useEffect, useState } from 'react';
import { ThemeProvider, theme } from '@blockstack/ui';
import { Connect } from '@stacks/connect-react';
import { AuthOptions } from '@stacks/connect';
import { UserSession, AppConfig } from '@stacks/auth';
import { defaultState, AppContext, AppState } from '@common/context';
import { Routes } from './routes';
import { getRPCClient, stacksNetwork as network } from '@common/utils';
import { callReadOnlyFunction, cvToJSON, stringAsciiCV } from '@stacks/transactions';
import { resolveSTXAddress } from '@common/use-stx-address';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '@components/scroll-to-top';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";

const icon = 'https://arkadiko.finance/favicon.ico';
export const App: React.FC = () => {
  const [state, setState] = React.useState<AppState>(defaultState());
  const location = useLocation();

  const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);
  const userSession = new UserSession({ appConfig });

  useEffect(() => {
    setState(prevState => ({ ...prevState, currentTxId: '', currentTxStatus: '' }));
  }, [location.pathname]);

  const signOut = () => {
    userSession.signUserOut();
    setState(defaultState());
  };

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const getData = async () => {
        try {
          const address = resolveSTXAddress(userData);
        } catch (error) {
          console.error(error);
        }
      };
      void getData();
    }
  }, []);

  const handleRedirectAuth = async () => {
    if (userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      setState(prevState => ({ ...prevState, userData }));
    }
  };

  React.useEffect(() => {
    void handleRedirectAuth();
  }, []);

  const authOptions: AuthOptions = {
    manifestPath: '/static/manifest.json',
    redirectTo: '/',
    userSession,
    onFinish: ({ userSession }) => {
      const userData = userSession.loadUserData();
      setState(prevState => ({ ...prevState, userData }));
    },
    appDetails: {
      name: 'Stacks Mfers',
      icon,
    },
  };

  return (
    <Connect authOptions={authOptions}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={[state, setState]}>
          <Helmet
            titleTemplate="Stacks Mfers - %s"
            defaultTitle="Stacks Mfers"
          />
          <div className="flex flex-col font-sans bg-white dark:bg-zinc-800 min-height-screen">
            <Routes />
          </div>
        </AppContext.Provider>
      </ThemeProvider>
      <ScrollToTop />
    </Connect>
  );
};
