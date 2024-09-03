import { View, Text, Image } from "react-native";
import { Container, Row, Col } from "react-native-flex-grid";
import icons from "../constants/icons";
import { Link } from "expo-router";

const Library = ({ books: { thumbNail, state } }) => {
  return (
    <>
      <Container fluid className="min-w-[365px] m-0">
        <Row className="mt w-full">
          <Col className="flex w-full border-b border-grey border-r">
            <Image
              source={{ uri: thumbNail }}
              className="w-34 h-60 mt-1"
            ></Image>
            <View className="flex flex-row justify-between mb-2">
              <View className="flex justify-center items-center w-6 h-6 object-contain">
                <Image
                  source={icons.favourite}
                  className="w-full h-full"
                ></Image>
              </View>
              <View className="bg-green h-6 w-14 rounded-xl">
                <Text>{state}</Text>
              </View>
              <View className="flex justify-center items-center w-6 h-6 object-contain">
                <Image source={icons.dots} className="w-full h-full"></Image>
                <Link href={"/home"} className="w-full h-full absolute"></Link>
              </View>
            </View>
          </Col>
          <Col className="flex w-full border-b border-grey">
            <Image
              source={{ uri: thumbNail }}
              className="w-34 h-60 mt-1"
            ></Image>
            <View className="flex flex-row justify-between mb-2">
              <View className="flex justify-center items-center w-6 h-6 object-contain">
                <Image
                  source={icons.favourite}
                  className="w-full h-full"
                ></Image>
              </View>
              <View className="bg-green h-6 w-14 rounded-xl">
                <Text>{state}</Text>
              </View>
              <View className="flex justify-center items-center w-6 h-6 object-contain">
                <Image source={icons.dots} className="w-full h-full"></Image>
                <Link href={"/home"} className="w-full h-full absolute"></Link>
              </View>
            </View>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Library;
