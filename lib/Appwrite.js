import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  Platform: "com.jsm.aora",
  projectId: "672f8343000beae8ecce",
  databaseId: "6743447c000e6ef7cdc6",
  userCollectionId: "674344be001f1c34cf3d",
  videoCollectionId: "67434690000722e89359",
  storageId: "674349710037112ca885",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.Platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signInL(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signInL(email, password) {
  try {
    // Check for an active session
    const currentSession = await account.getSession("current");
    if (currentSession) {
      console.log("Session already active:", currentSession);
      return currentSession; // Return the existing session
    }
  } catch (error) {
    console.log("No active session found. Proceeding to create a new one.");
  }

  try {
    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error during session creation:", error);
    throw new Error(error.message);
  }
}
// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("Error fetching account:", error.message);
    throw error; // Allow calling function to handle the error
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) {
      console.warn("No active account found.");
      return null;
    }

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)] // Ensure `accountId` field matches correctly
    );

    if (!currentUser || currentUser.documents.length === 0) {
      console.warn(
        `No user document found for accountId: ${currentAccount.$id}`
      );
      return null;
    }

    return currentUser.documents[0]; // Return the first document
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return null;
  }
}
// async function updateUserDocument(documentId, accountId) {
//   try {
//     const response = await databases.updateDocument(
//       config.databaseId, // Your database ID
//       config.userCollectionId, // Your collection ID
//       documentId, // ID of the document you want to update
//       { accountId } // New data for the document
//     );

//     console.log("Document updated successfully:", response);
//     return response;
//   } catch (error) {
//     console.error("Error updating document:", error.message);
//     throw error;
//   }
// }

// // Example usage:
// updateUserDocument("6744a34300039d2eb61e", "6745fe610020f73167c6");
