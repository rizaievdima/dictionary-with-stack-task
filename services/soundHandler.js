import { createAudioPlayer } from "expo-audio";

export async function playSound(audioPath) {
  try {
    const player = createAudioPlayer({ uri: audioPath });
    player.play();
    setTimeout(() => player.remove(), 2000);
  } catch (error) {
    console.log(error);
  }
}
