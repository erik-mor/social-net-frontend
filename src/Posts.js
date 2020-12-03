import React, { useEffect, useState, useContext } from "react";
import Post from "./Post";
import { UserContext } from "./UserContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useContext(UserContext);

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/post/home/${userName.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setPosts(res);
        });
    }
  }, [userName]);

  if (posts && posts.length) {
    return posts.map((post) => (
      <Post
        user_id={post.user_id}
        created={post.created}
        content={post.content}
        key={post.id}
      />
    ));
  } else {
    return <h1>No posts available</h1>;
  }
};

export default Posts;
