import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, RemoteConfig, getString } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: "AIzaSyC94Ac2jNcPKcx7rW4Eo4ghFJuhVBvfj1M",
  authDomain: "ionic-app-88ee2.firebaseapp.com",
  projectId: "ionic-app-88ee2",
  storageBucket: "ionic-app-88ee2.firebasestorage.app",
  messagingSenderId: "771624085619",
  appId: "1:771624085619:web:9d8d954f1ef9696599a206",
  measurementId: "G-JDVCBW0V26"
};

const app = initializeApp(firebaseConfig);
const remoteConfig: RemoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // Actualización cada hora

export { app, remoteConfig, fetchAndActivate };

export const getFeatureFlag = async (key: string): Promise<string> => {
  await fetchAndActivate(remoteConfig); 
  return getString(remoteConfig, key); 
};

