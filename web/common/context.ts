import { createContext } from 'react';
import { UserSession, AppConfig, UserData } from '@stacks/auth';

export interface AppState {
  userData: UserData | null;
  collections: any;
  showTxModal: boolean;
  currentTxId: string;
  currentTxStatus: string;
  currentTxMessage: string;
}

export const defaultState = (): AppState => {
  const appConfig = new AppConfig(['store_write'], document.location.href);
  const userSession = new UserSession({ appConfig });

  if (userSession.isUserSignedIn()) {
    return {
      userData: userSession.loadUserData(),
      collections: {},
      currentTxId: '',
      currentTxStatus: '',
      currentTxMessage: '',
      showTxModal: false
    };
  }

  return {
    userData: null,
    collections: {},
    currentTxId: '',
    currentTxStatus: '',
    currentTxMessage: '',
    showTxModal: false
  };
};

export const AppContext = createContext<Array<AppState>>([defaultState(), () => {}])
