import { useState } from "react";
import { motion } from "framer-motion";

const words = [
  {
    farsi: "سلام",
    transliteration: "Salâm",
    meaning: "Bonjour",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Waving_hand.png",
  },
  {
    farsi: "آب",
    transliteration: "Âb",
    meaning: "Eau",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Water_glass.png",
  },
  {
    farsi: "نان",
    transliteration: "Nân",
    meaning: "Pain",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flatbread.jpg",
  },
  {
    farsi: "گربه",
    transliteration: "Gorbe",
    meaning: "Chat",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
  },
  {
    farsi: "خداحافظ",
    transliteration: "Khodâ hâfez",
    meaning: "Au revoir",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Waving_goodbye.png",
  },
];

export default function FarsiFunQuiz() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const handleAnswer = () => {
    if (answer.trim().toLowerCase() === words[step].meaning.toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer("");
    setStep(step + 1);
  };

  if (step >= words.length) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">🎉 Bravo !</h1>
        <p className="text-xl mt-4">Ton score est : {score} / {words.length}</p>
      </div>
    );
  }

  const word = words[step];

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <img src={word.image} alt={word.meaning} className="w-48 h-48 object-contain mx-auto" />
        <h2 className="text-4xl mt-4">{word.farsi}</h2>
        <p className="text-xl text-gray-600">({word.transliteration})</p>
        <input
          placeholder="Que veut dire ce mot en français ?"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-6 p-2 border rounded w-full text-center"
        />
        <button
          onClick={handleAnswer}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Valider
        </button>
      </div>
    </motion.div>
  );
}
