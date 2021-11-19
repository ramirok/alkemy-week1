import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppState } from "../../context/appContext";
import DetailedPostCard from "../../components/cards/detailedPostCard/detailedPostCard";
import EmptyCard from "../../components/cards/emptycard/emptyCard";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";

const DetailsPage = () => {
  const { id } = useParams();

  const { posts } = useAppState();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (posts.length > 0) {
      const found = posts.find((post) => +post.id === +id);
      /*  This fetch is just to simulate the request time, then set the local state if the post is found in the global state.
      This is because there may be new user-created posts that will not exist in jsonplaceholder api */
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((_) => {
          if (found) {
            setPost(found);
          }
          setIsLoading(false);
        });
    }
  }, [id, posts]);

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h3 className="mt-4">Posts Details</h3>
      {isLoading ? (
        <LoadingCard />
      ) : post.id ? (
        <DetailedPostCard post={post} />
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default DetailsPage;
