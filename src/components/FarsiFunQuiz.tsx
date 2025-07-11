import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const categories = {
  common: [
    { farsi: "دوچرخه", transliteration: "docharkhe", meaning: "Vélo", image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Bicycle_icon.png" },
    { farsi: "بستنی", transliteration: "bastani", meaning: "Glace", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Ice_cream_cone_icon.png" },
    { farsi: "آب", transliteration: "âb", meaning: "Eau", image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Water_glass.png" },
    { farsi: "نان", transliteration: "nân", meaning: "Pain", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flatbread.jpg" }
  ],
  persianRoot: [
    { farsi: "بازار", transliteration: "bâzâr", meaning: "Bazar", image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Bazaar_icon.png" },
    { farsi: "الگوریتم", transliteration: "algoritm", meaning: "Algorithme", image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Algorithm_icon.png" }
  ],
  cute: [
    { farsi: "گربه", transliteration: "gorbe", meaning: "Chat", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
    { farsi: "عروسک", transliteration: "aroosak", meaning: "Poupée", image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Doll_icon.png" }
  ]
};

const conversations = {
  common: ["سلام، می‌تونی دوچرخه من رو ببینی؟ — Bonjour, tu peux voir mon vélo ?"],
  persianRoot: ["بازار امروز شلوغ بود. — Le bazar était bondé aujourd’hui."],
  cute: ["گربه‌ام خوابیده! — Mon chat dort !"]
};

const allWords = [...categories.common, ...categories.persianRoot, ...categories.cute];

export default function FarsiFunQuiz() {
  const [category, setCategory] = useState<string | null>(null);
  const [quizWords, setQuizWords] = useState<typeof allWords>([]);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    const shuffled = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuizWords(shuffled);
    setStep(0);
    setScore(0);
    setAnswer("");
    setCategory("quiz");
  };

  const handleAnswer = () => {
    if (answer.trim().toLowerCase() === quizWords[step].meaning.toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer("");
    setStep(step + 1);
  };

  if (!category) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 text-center space-y-4">
        <h2 className="text-2xl font-bold">Choisis une catégorie :</h2>
        <button onClick={() => setCategory("common")} className="bg-blue-500 text-white px-4 py-2 rounded">Mots courants</button>
        <button onClick={() => setCategory("persianRoot")} className="bg-green-500 text-white px-4 py-2 rounded">Mots d’origine perse</button>
        <button onClick={() => setCategory("cute")} className="bg-pink-500 text-white px-4 py-2 rounded">Mots mignons</button>
        <button onClick={startQuiz} className="bg-purple-600 text-white px-4 py-2 rounded">🎯 Lancer le quiz aléatoire</button>
      </div>
    );
  }

  if (category !== "quiz") {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{category === "common" ? "Mots courants" : category === "persianRoot" ? "Dérivés du persan" : "Mots mignons"}</h2>
        {categories[category].map((word, idx) => (
          <div key={idx} className="mb-6">
            <img src={word.image} alt={word.meaning} className="w-24 h-24 mx-auto mb-2" />
            <h3 className="text-3xl">{word.farsi}</h3>
            <p className="text-sm">({word.transliteration}) — {word.meaning}</p>
          </div>
        ))}
        <div className="mt-6 italic text-gray-700">Exemple :<br />{conversations[category][0]}</div>
        <button onClick={() => setCategory(null)} className="mt-4 bg-gray-400 text-white px-4 py-2 rounded">Retour</button>
      </div>
    );
  }

  if (step >= quizWords.length) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">🎉 Bravo !</h1>
        <p className="text-xl mt-4">Score : {score} / {quizWords.length}</p>
        <button onClick={() => setCategory(null)} className="mt-6 bg-gray-500 text-white px-4 py-2 rounded">Retour à l'accueil</button>
      </div>
    );
  }

  const word = quizWords[step];

  return (
    <motion.div className="max-w-md mx-auto mt-10 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
        <button onClick={handleAnswer} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Valider</button>
      </div>
    </motion.div>
  );
}
