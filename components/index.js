import RecentBooks from "./RecentBooks";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import InfoBox from "./InfoBox";
import Loader from "./Loader";
import Trending from "./Trending";
import SearchInput from "./SearchInput";
import EmptyState from "./EmptyState";
import EmptyStatePost from "./EmptyStatePost";
import BookHubPost from "./BookHubPost";
import Notes from "./Notes";
import CustomHeader from "./CustomHeader";

async function initializeApp() {
  try {
    await clearSession();
    console.log("Session cleared successfully");
  } catch (error) {
    console.error("Failed to clear session:", error);
  }
}

export async function clearSession() {
  try {
    const currentSession = await account.get();
    if (currentSession) {
      console.log("Clearing existing session:", currentSession);
      await account.deleteSession(currentSession.$id);
    }
  } catch (error) {
    console.log("Error clearing session:", error);
    // Handle errors as needed
  }
}

initializeApp();

export {
  RecentBooks,
  FormField,
  CustomButton,
  InfoBox,
  Loader,
  Trending,
  SearchInput,
  EmptyState,
  BookHubPost,
  EmptyStatePost,
  Notes,
  CustomHeader,
};
