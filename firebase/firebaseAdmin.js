import admin, {
  initializeApp,
  credential as _credential,
} from "firebase-admin";
import serviceAccount from "../firebase/service-account-key.json";
initializeApp({
  credential: _credential.cert(serviceAccount),
});

module.export = admin;
