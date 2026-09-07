import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const { courseCode } = useParams();

  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "What is 5 × 3?",
      options: ["8", "15", "10", "20"],
      answer: "15",
    },
    {
      question: "What is 10 ÷ 2?",
      options: ["2", "5", "8", "10"],
      answer: "5",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option: string) => {
    setSelected(option);
  };

  const nextQuestion = () => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected("");
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <p>QUIZ COMPLETE</p>

          <h1>Well done! 🎉</h1>

          <h2>
            {score} / {questions.length}
          </h2>

          <p>
            You answered {score} out of {questions.length} questions
            correctly.
          </p>

          <Link
            to={`/course/${courseCode}/questions`}
            className="quiz-button"
          >
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">

        <Link
          to={`/course/${courseCode}/questions`}
          className="back-link"
        >
          ← Back to Questions
        </Link>

        <div className="quiz-header">
          <p>PAST QUESTIONS</p>

          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="quiz-card">

          <h1>{question.question}</h1>

          <div className="options">
            {question.options.map((option) => (
              <button
                key={option}
                className={
                  selected === option ? "option selected" : "option"
                }
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="next-button"
            onClick={nextQuestion}
            disabled={!selected}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Quiz;