import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.bts.book_hub",
  projectId: "66c8834c000ab5d9719f",
  storageId: "66c88991003941a724e5",
  databaseId: "66c885d1003a4e6ec0cd",
  userCollectionId: "66c885f5000c48a46f9b",
  bookCollectionId: "66c8861700361dbe1d74",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);
export const databases = new Databases(client);

// Register user
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

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log("Error in createUser:", error);
    throw new Error(error.message || "Failed to create user");
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all books
export async function getAllBooks() {
  try {
    const books = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookCollectionId
    );

    if (books.documents.length === 0 || !books.documents) {
      console.error("No Books Found");
      return null;
    }

    return books.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created books
export async function getLatestBooks() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

//Update favourite status of a book
export async function updateFavouriteStatus(bookId, favourite) {
  try {
    const updatedBook = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookCollectionId,
      bookId,
      { favourite }
    );

    return updatedBook;
  } catch (error) {
    console.error("Error updating favourite status:", error);
    throw new Error(error.message || "Failed to update favourite status");
  }
}
