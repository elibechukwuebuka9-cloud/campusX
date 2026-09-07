import { useState } from "react";
import "./community.css";

type Post = {
  name: string;
  course: string;
  text: string;
  likes: number;
};

function Community() {
  const [posts, setPosts] = useState<Post[]>([
    {
      name: "Alex",
      course: "Computer Science",
      text: "Does anyone have the COS 101 lecture notes?",
      likes: 12,
    },
    {
      name: "Daniel",
      course: "Engineering",
      text: "Who is ready for the mathematics test tomorrow? 😭",
      likes: 8,
    },
    {
      name: "Sarah",
      course: "Business",
      text: "Just finished my assignment! Good luck everyone.",
      likes: 21,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const createPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      name: "You",
      course: "Student",
      text: newPost,
      likes: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (index: number) => {
    const updatedPosts = [...posts];

    updatedPosts[index].likes += 1;

    setPosts(updatedPosts);
  };

  return (
    <div className="community-page">
      <div className="community-container">

        <div className="community-header">
          <p>CAMPUS COMMUNITY</p>

          <h1>
            Your campus.
            <br />
            <span>Your community.</span>
          </h1>

          <span>
            Connect with students, ask questions and
            share what's happening on campus.
          </span>
        </div>

        <div className="post-box">
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          <button onClick={createPost}>
            Post
          </button>
        </div>

        <div className="feed">

          {posts.map((post, index) => (
            <div className="post-card" key={index}>

              <div className="post-top">

                <div className="avatar">
                  {post.name.charAt(0)}
                </div>

                <div>
                  <h3>{post.name}</h3>
                  <small>{post.course}</small>
                </div>

              </div>

              <p className="post-text">
                {post.text}
              </p>

              <button
                className="like-button"
                onClick={() => likePost(index)}
              >
                ❤️ {post.likes}
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Community;