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
  postCollectionId: "66e40314002eca9d3353",
  postCommentCollectionId: "66e524ac00093bffb152",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const createdDate = new Date().toISOString();

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount || !newAccount.$id) {
      console.error("Failed to create user account");
      throw new Error("Account creation failed");
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountID: newAccount.$id,
        email,
        username,
        firstName: username,
        avatar: avatarUrl,
        createdDate

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
    console.log(currentAccount)

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountID", currentAccount.$id)]
    );
    console.log(currentUser)

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

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl
  } catch (error) {
    console.log("upload error"+error)
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

//get Posts
export async function getAllPosts() { 
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );
    if (posts.documents.length === 0 || !posts.documents) {
      console.error("No posts Found");
      return null;
    }

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Post
export async function createPost(content,userId,bookImage,userName,userImage) {
  try {
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        content,
        userId,
        bookImage,
        userName,
        userImage,
        createdDate,
        like:0,
        commentCount:0,
        shareCount:0
      }
    );

    return newPost;
  } catch (error) {
    console.log("Error in createPost:", error);
    throw new Error(error.message || "Failed to create post");
  }
}

//like a post
export async function likeAPost(postId, like) {
  try {
    const updatedBook = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      { like }
    );

    return updatedBook;
  } catch (error) {
    console.error("Error updating post likes:", error);
    throw new Error(error.message || "Failed to update post likes");
  }
}

//commentCount post
export async function commentCountPost(postId, commentCount) {
  try {
    const updatedBook = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      { commentCount }
    );

    return updatedBook;
  } catch (error) {
    console.error("Error updating post likes:", error);
    throw new Error(error.message || "Failed to update post likes");
  }
}

//get post
export async function getPostComments(postId) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCommentCollectionId,
      [
        Query.equal('postId', postId)  
      ]
    );

    if (response.documents.length === 0) {
      console.log('No comments found for this post.');
      return [];
    }

    return response.documents;  
  } catch (error) {
    console.error('Error fetching post comments:', error);
    throw new Error('Unable to fetch comments. Please try again later.');
  }
}


//comment post
export async function createPostComment(postId,userName,postComment,count) {
  try {
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCommentCollectionId,
      ID.unique(),
      {
        postId,
        userName,
        postComment
      }
    );
    commentCountPost(postId,count)
    return newPost;
  } catch (error) {
    console.log("Error in createPostComment:", error);
    throw new Error(error.message || "Failed to create post comment");
  }
}

//update user
export async function updateUser(
  userId,  
  email,
  username,  
  firstName,
  lastName,
  phoneNo,
  dob,
  avatar 
) {
  try {
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,  
      { 
        email,
        username,  
        firstName,
        lastName,
        phoneNo,
        dob,
        avatar   
      }
    );

    return updatedUser;
  } catch (error) {
    console.log("Error in updateUser:", error);
    throw new Error(error.message || "Failed to update user");
  }
}




// // Create Video Post
// export async function createVideoPost(form) {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFile(form.thumbnail, "image"),
//       uploadFile(form.video, "video"),
//     ]);

//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       ID.unique(),
//       {
//         title: form.title,
//         thumbnail: thumbnailUrl,
//         video: videoUrl,
//         prompt: form.prompt,
//         creator: form.userId,
//       }
//     );

//     return newPost;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts created by user
// export async function getUserPosts(userId) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.equal("creator", userId)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts that matches search query
// export async function searchPosts(query) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.search("title", query)]
//     );

//     if (!posts) throw new Error("Something went wrong");

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
