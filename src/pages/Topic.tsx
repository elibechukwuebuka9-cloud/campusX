import { useParams, Link } from "react-router-dom";
import "./Topic.css";

function Topic() {
  const { courseCode, topicId } = useParams();

  const topics: {
    [key: string]: {
      title: string;
      content: string;
    };
  } = {
    "1": {
      title: "Introduction",
      content:
        "This topic introduces the basic ideas and concepts you need to understand before moving to more advanced topics.",
    },

    "2": {
      title: "Basic Concepts",
      content:
        "This section covers the fundamental concepts, definitions and principles that form the foundation of the course.",
    },

    "3": {
      title: "Important Topics",
      content:
        "These are some of the key areas students should focus on when preparing for tests and examinations.",
    },
  };

  const topic = topics[topicId || "1"];

  return (
    <div className="topic-page">
      <div className="topic-container">

        <Link
          to={`/course/${courseCode}/notes`}
          className="back-link"
        >
          ← Back to Notes
        </Link>

        <div className="topic-content">

          <p className="topic-label">LECTURE NOTE</p>

          <h1>{topic.title}</h1>

          <div className="topic-line"></div>

          <p className="topic-text">
            {topic.content}
          </p>

          <h2>What you should know</h2>

          <ul>
            <li>Understand the key definitions.</li>
            <li>Understand the main principles.</li>
            <li>Be able to explain the concepts in your own words.</li>
            <li>Practice questions related to the topic.</li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default Topic;