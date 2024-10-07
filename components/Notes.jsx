import { View, Text, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { icons } from "@/constants";

const Notes = ({ allNotes: { context, chapter, page, createdAt } }) => {
  const formattedCreatedDate = format(new Date(createdAt), "MMM dd, yyyy");

  return (
    <>
      <View className="border-b border-grey p-2 flex flex-col justify-between">
        <View className="flex flex-row items-center justify-end">
          <TouchableOpacity>
            <Image source={icons.dots} className="w-8 h-8"></Image>
          </TouchableOpacity>
        </View>
        <View className="flex-1 gap-x-1">
          <Text className="text-base text-start">{context}</Text>
        </View>
        <View className="flex-col flex justify-between items-end">
          <TouchableOpacity>
            <Image source={icons.share} className="w-8 h-8"></Image>
          </TouchableOpacity>
          <View className="flex flex-row justify-end items-center gap-x-1">
            <Text className="text-sm text-grey text-right">{chapter}</Text>
            <Text className="text-sm text-grey text-right">{page}</Text>
            <Text className="text-sm text-grey text-right">
              {formattedCreatedDate}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Notes;
