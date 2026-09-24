import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { playSound } from "../services/soundHandler";
import { COLORS } from "../constants";

function EditWord({ route, navigation }) {
  const { wordData } = route.params;

  const [phonetics, setPhonetics] = useState(wordData.phonetics ?? "");
  const [partOfSpeech, setPartOfSpeech] = useState(wordData.partOfSpeech ?? "");
  const [meaning, setMeaning] = useState(wordData.meaning ?? "");

  const onSaveWord = () => {
    navigation.popTo("AllWords", {
      editedWord: {
        ...wordData,
        phonetics,
        partOfSpeech,
        meaning,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{wordData.word}</Text>
        {wordData.audio && (
          <Pressable
            style={styles.playPressable}
            onPress={() => playSound(wordData.audio)}
          >
            <FontAwesome6
              name="volume-low"
              iconStyle="solid"
              size={28}
              color={COLORS.primary900}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phonetics:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhonetics}
          value={phonetics}
          placeholder="phonetics"
          placeholderTextColor={COLORS.grey600}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Part of speech:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPartOfSpeech}
          value={partOfSpeech}
          placeholder="part of speech"
          placeholderTextColor={COLORS.grey600}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Meaning:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          onChangeText={setMeaning}
          value={meaning}
          placeholder="meaning"
          placeholderTextColor={COLORS.grey600}
          multiline
        />
      </View>

      <Pressable style={styles.buttonContainer} onPress={onSaveWord}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 110,
    paddingHorizontal: 12,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  word: {
    fontSize: 32,
    color: COLORS.black,
  },
  playPressable: {
    marginHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: COLORS.grey600,
    marginBottom: 4,
  },
  input: {
    height: 40,
    fontSize: 18,
    borderColor: COLORS.primary200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: COLORS.black,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    borderRadius: 5,
    backgroundColor: COLORS.primary900,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    color: COLORS.white,
  },
});

export default EditWord;
