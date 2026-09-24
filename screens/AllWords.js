import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import Item from "../components/ListItem";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";

import { COLORS } from "../constants";

function AllWords({ navigation, route }) {
  const [myWords, setMyWords] = useState([]);

  const addedWord = route.params?.newWord;
  const editedWord = route.params?.editedWord;

  useEffect(() => {
    if (!addedWord) {
      return;
    }
    setMyWords((prev) =>
      prev.some((item) => item.word === addedWord.word)
        ? prev.map((item) =>
            item.word === addedWord.word ? addedWord : item
          )
        : [...prev, addedWord]
    );
    navigation.setParams({ newWord: undefined });
  }, [addedWord]);

  useEffect(() => {
    if (!editedWord) {
      return;
    }
    setMyWords((prev) =>
      prev.map((item) => (item.word === editedWord.word ? editedWord : item))
    );
    navigation.setParams({ editedWord: undefined });
  }, [editedWord]);

  function deleteWord(wordToDelete) {
    setMyWords((prev) => prev.filter((item) => item.word != wordToDelete));
  }

  const goToAddWord = () => {
    navigation.navigate("AddWord");
  };

  return (
    <>
      <Pressable style={styles.addPressable} onPress={goToAddWord}>
        <FontAwesome6
          name="plus"
          iconStyle="solid"
          size={46}
          color={COLORS.white}
        />
      </Pressable>
      <View style={{ flex: 2 }}>
        <FlatList
          data={myWords}
          renderItem={({ item }) => <Item item={item} onDelete={deleteWord} />}
          keyExtractor={(item) => item.word}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.textEmpty}>No words yet</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/cartoon-squirrel-mike-sm.png")}
              />
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    zIndex: 10,
  },
  addPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: 210,
    right: "10%",
    backgroundColor: COLORS.primary900,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
  image: {
    width: "45%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  empty: {
    height: 300,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textEmpty: {
    fontSize: 40,
    color: COLORS.primary200,
  },
});

export default AllWords;
