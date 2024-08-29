import { View, Text, Image } from "react-native";
import { format } from "date-fns";

const RecentBooks = ({
  latestBooks: { title, author, goal, thumbNail, addedDate },
}) => {
  const formattedAddedDate = format(new Date(addedDate), "MMM dd, yyyy");
  const formattedgoal = format(new Date(goal), "MMM dd, yyyy");

  return (
    <>
      <View className="flex flex-row justify-between py-2 mr-20 gap-5 items-start">
        <Image
          source={{ uri: thumbNail }}
          className="w-[80px] h-[130px]"
        ></Image>
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
      <View className="justify-between items-start flex-row border-b-2 border-grey"></View>
    </>
  );
};

export default RecentBooks;
