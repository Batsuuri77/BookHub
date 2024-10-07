import { View, Text, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const RecentBooks = ({
  latestBooks: { title, author, goal, thumbNail, addedDate, $id },
}) => {
  const formattedAddedDate = format(new Date(addedDate), "MMM dd, yyyy");
  const formattedgoal = format(new Date(goal), "MMM dd, yyyy");

  return (
    <>
      <View className="flex flex-row justify-between py-2 mr-20 gap-5 items-start">
        <TouchableOpacity
          onPress={() => {
            //console.log(item.$id);
            // router.push(`/myLibrary/bookDetail?bookId=${item.$id}`);

            router.push({
              pathname: `/myLibrary/bookDetail`,
              params: { bookId: $id },
            });
            //console.log("pressed");
          }}
        >
          <Image
            source={{ uri: thumbNail }}
            className="w-[80px] h-[130px]"
          ></Image>
        </TouchableOpacity>
        <View className="flex flex-col justify-start items-start gap-2">
          <Text className="font-semibold text-base leading-none">{title}</Text>
          <Text className="text-grey text-sm font-semibold leading-none">
            {author}
          </Text>
          <Text className="font-semibold text-sm leading-none">
            Finish by {formattedgoal}
          </Text>
          <Text className="text-grey text-sm font-semibold leading-none">
            Added on {formattedAddedDate}
          </Text>
        </View>
      </View>
      <View className="justify-between items-start flex-row border-b border-grey"></View>
    </>
  );
};

export default RecentBooks;
