import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const words = [
  { farsi: "سلام", transliteration: "Salâm", meaning: "Bonjour", image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Waving_hand.png" },
  { farsi: "آب", transliteration: "Âb", meaning: "Eau", image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Water_glass.png" },
  { farsi: "نان", transliteration: "Nân", meaning: "Pain", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flatbread.jpg" },
  { farsi: "گربه", transliteration: "Gorbe", meaning: "Chat", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
  { farsi: "خداحافظ", transliteration: "Khodâ hâfez", meaning: "Au revoir", image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Waving_goodbye.png" },
];

export default function FarsiFunQuiz() {
  const [nickname, setNickname] = useState("");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (started && startTime === null) {
      setStartTime(Date.now());
    }
  }, [started]);

  useEffect(() => {
    if (!started || step >= words.length) return;
    if (timer <= 0) {
      setStep((prev) => prev + 1);
      setAnswer("");
      setTimer(15);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step, started]);

  const handleAnswer = () => {
    if (answer.trim().toLowerCase() === words[step].meaning.toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer("");
    setStep(step + 1);
    setTimer(15);
  };

  const handleFinish = () => {
    const finishedAt = Date.now();
    setEndTime(finishedAt);
    const timeTaken = Math.floor((finishedAt - (startTime ?? finishedAt)) / 1000);
    const existing = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    const updated = [...existing, { nickname, score, time: timeTaken, date: new Date().toISOString() }]
      .sort((a, b) => b.score - a.score || a.time - b.time)
      .slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(updated));
  };

  if (!started) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 text-center">
        <h2 className="text-2xl mb-4">Entrez votre prénom ou pseudo</h2>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="p-2 border rounded w-full text-center"
          placeholder="ex: Léo, Sara..."
        />
        <button
          disabled={!nickname.trim()}
          onClick={() => setStarted(true)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Commencer le quiz
        </button>
      </div>
    );
  }

  if (step >= words.length) {
    handleFinish();
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">🎉 Bravo {nickname} !</h1>
        <p className="text-xl mt-4">Score : {score} / {words.length}</p>
        <p className="mt-2">Classement local :</p>
        <ul className="mt-2 space-y-1">
          {leaderboard.map((entry: any, index: number) => (
            <li key={index}>
              {index + 1}. {entry.nickname} – {entry.score}/{words.length} – {entry.time}s
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const word = words[step];

  return (
    <motion.div className="max-w-md mx-auto mt-10 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <img src={word.image} alt={word.meaning} className="w-48 h-48 object-contain mx-auto" />
        <h2 className="text-4xl mt-4">{word.farsi}</h2>
        <p className="text-xl text-gray-600">({word.transliteration})</p>
        <div className="text-red-600 font-bold text-lg mt-2">⏱ Temps restant : {timer}s</div>
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
