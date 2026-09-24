import axios from "axios";

import { BASE_URL } from "../constants";

import { MyWords } from "../tests/testData.js";

export function getWordInfo(word) {
  try {
    // const response = await axios.get(`${BASE_URL}/${word}`);
    // const wordInfo = response.data[0];
    console.log("MyWords", MyWords);
    const wordInfo = MyWords.filter((item) => item.word === word)[0];
    console.log("wordInfo", wordInfo);
    return {
      word: wordInfo.word,
      phonetics: wordInfo.phonetics,
      audio: wordInfo.audio,
      partOfSpeech: wordInfo.partOfSpeech,
      meaning: wordInfo.meaning,
    };
  } catch (error) {
    return {
      partOfSpeech: error.response?.data?.title ?? "not found",
      meaning:
        error.response?.data?.message ?? "we couldn't find the definition",
    };
  }
}
