import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

const AppContext = createContext();

export const AppDataProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = useCallback(async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((posts) => setPosts(posts));
  }, []);

  const createPost = async ({ title, body }) => {
    /* jsonplaceholder api don't actually edit their DB, so this fetch
       is just to simulate the request time, then create the new post in memory if the request was successful. */
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (response.status === 201) {
      const parsedResponse = await response.json();
      parsedResponse.id = +new Date();
      setPosts((prevState) => [parsedResponse, ...prevState]);
      return true;
    }
    return false;
  };

  const editPost = async (post) => {
    /* jsonplaceholder api don't actually edit their DB, so this fetch
       is just to simulate the request time, then edit the post in memory regardless of the request outcome. */
    await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    setPosts((prevState) => {
      const newState = [...prevState];
      const foundIndex = prevState.findIndex((item) => +item.id === +post.id);
      if (foundIndex > -1) {
        newState[foundIndex] = post;
      }
      return newState;
    });
  };

  const deletePost = async (id) => {
    /* jsonplaceholder api don't actually edit their DB, so this fetch
       is just to simulate the request time, then delete the post in memory if the request was successful. */
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setPosts((prevState) => prevState.filter((post) => post.id !== +id));
      return true;
    }
    return false;
  };

  // fetch posts on start
  useEffect(() => {
    if (posts.length === 0) {
      loadPosts();
    }
  }, [loadPosts, posts]);

  const value = {
    posts,
    loadPosts,
    createPost,
    editPost,
    deletePost,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

// ---------------------------------------------------------------------

// custom hook to use the appContext
export const useAppState = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppData must be used within AppContext");
  }
  return context;
};
