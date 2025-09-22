import * as SecureStore from "expo-secure-store";

import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  plugins: [
    expoClient({
      scheme: "mobileprojectplanner",
      storagePrefix: "mobileprojectplanner",
      storage: SecureStore,
    }),
  ],
});

export const { signIn, signOut, useSession } = authClient;
