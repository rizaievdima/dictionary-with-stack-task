import { View, StyleSheet, Text, Pressable } from "react-native";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { useNavigation } from "@react-navigation/native";
import { playSound } from "../services/soundHandler";
import { COLORS } from "../constants";

const Item = ({ item, onDelete }) => {
  const navigation = useNavigation();

  const goToEditWord = () => {
    navigation.navigate("EditWord", { wordData: item });
  };

  return (
    <View style={styles.item}>
      <Pressable disabled={!item.audio} onPress={() => playSound(item.audio)}>
        <View style={styles.iconContainer}>
          <FontAwesome6
            name="play"
            iconStyle="solid"
            size={28}
            style={
              !item.audio
                ? { color: COLORS.grey300 }
                : { color: COLORS.primary900 }
            }
          />
        </View>
      </Pressable>
      <Pressable style={styles.textContainer} onPress={goToEditWord}>
        <Text style={styles.title}>{item.word}</Text>
        <Text style={styles.definition}>{item.meaning}</Text>
      </Pressable>
      <Pressable
        style={styles.iconContainer}
        onPress={() => onDelete(item.word)}
      >
        <FontAwesome6
          name="trash-can"
          iconStyle="solid"
          size={22}
          color={COLORS.secondary800}
        />
      </Pressable>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    zIndex: -10,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 5,
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.black,
  },
  definition: {
    fontSize: 16,
    color: COLORS.black,
  },
  iconContainer: {
    padding: 3,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});
