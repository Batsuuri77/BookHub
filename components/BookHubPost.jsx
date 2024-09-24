import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { format } from "date-fns";
import icons from "@/constants/icons";
import images from "../constants/images";
import React, { useState } from "react";
import { likeAPost, getPostComments, createPostComment } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const BookHubPost = ({
  posts: {
    $id,
    content,
    bookImage,
    like,
    commentCount,
    userName,
    userImage,
    shareCount,
  },
}) => {
  const [likeCount, setLikeCount] = useState(like);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentCounts, setCommentCount] = useState(commentCount);
  const { user, setUser } = useGlobalContext();

  const toggleFavourite = async () => {
    try {
      const updatedLikeCount = likeCount + 1;

      setLikeCount(updatedLikeCount);

      const post = await likeAPost($id, updatedLikeCount);
    } catch (error) {
      Alert.alert("Unable to like the post. Please try again.");
      console.error("Unable to like the post:", error);
    }
  };

  const toggleComment = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      try {
        const postComments = await getPostComments($id);
        console.log(postComments.length);
        setComments(postComments);
      } catch (error) {
        Alert.alert("Unable to load post comments. Please try again.");
        console.error("Unable to load post comments:", error);
      }
    }
  };

  const submitComment = async () => {
    if (newComment.trim() === "") {
      Alert.alert("Comment cannot be empty.");
      return;
    }

    try {
      const updatedCommentCounts = commentCounts + 1;

      setCommentCount(updatedCommentCounts);
      const createdComment = await createPostComment(
        $id,
        user.username,
        newComment,
        updatedCommentCounts
      );
      setComments([...comments, createdComment]);
      setNewComment("");
    } catch (error) {
      Alert.alert("Unable to post comment. Please try again.");
      console.error("Unable to post comment:", error);
    }
  };

  const toggleShare = async () => {};

  return (
    <>
      <View className="flex flex-col py-2 items-start">
        <View className="flex flex-row items-center pl-1.5 mb-0">
          <Image
            source={{ uri: userImage }}
            className="w-10 h-10 rounded-full"
          />
          <Text className="ml-2 mb-3 font-semibold text-base leading-none">
            {userName}
          </Text>
        </View>

        <View className="flex flex-row mt-0 pt-0">
          <View className="flex flex-col">
            <Image
              source={{ uri: bookImage }}
              className="w-[80px] h-[130px]"
            ></Image>
            <View className="flex flex-row items-center">
              <View className="flex flex-col items-center">
                <TouchableOpacity
                  className="flex justify-center items-center w-6 h-6 object-contain"
                  onPress={toggleFavourite}
                >
                  <Image source={icons.heart} className="w-6 h-6 " />
                </TouchableOpacity>
                <Text className="text-xs text-grey mt-1">{likeCount}</Text>
              </View>

              <View className="flex flex-col items-center">
                <TouchableOpacity
                  className="flex justify-center items-center w-6 h-6 object-contain"
                  onPress={toggleComment}
                >
                  <Image source={icons.comment} className="w-5 h-5" />
                </TouchableOpacity>
                <Text className="text-xs text-grey mt-1">{commentCounts}</Text>
              </View>

              <View className="flex flex-col items-center">
                <TouchableOpacity
                  className="flex justify-center items-center w-6 h-6 object-contain"
                  onPress={toggleShare}
                >
                  <Image source={icons.share} className="w-5 h-5" />
                </TouchableOpacity>
                <Text className="text-xs text-grey mt-1">{shareCount}</Text>
              </View>
            </View>
          </View>
          <View className="flex-1 ml-4">
            <Text className="font-semibold text-base leading-none flex-wrap">
              {content}
            </Text>
          </View>
        </View>

        {/* Comment Section */}
        {showComments && (
          <View className="flex-col mt-4">
            {comments.map((comment) => (
              <View key={comment.$id} className="flex-row items-start mb-2">
                <Text className="text-sm">{comment.userName}: </Text>
                <Text className="text-sm">{comment.postComment}</Text>
              </View>
            ))}
            <View className="flex-row items-center mt-4">
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Write a comment..."
                className="border border-grey rounded px-2 py-1 mr-2 w-60"
              />
              <Button title="Post" onPress={submitComment} />
            </View>
          </View>
        )}
      </View>
      <View className="justify-between items-start flex-row border-b border-grey"></View>
    </>
  );
};

export default BookHubPost;
