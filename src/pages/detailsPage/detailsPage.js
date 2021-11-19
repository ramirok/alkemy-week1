import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppState } from "../../context/appContext";
import DetailedPostCard from "../../components/cards/detailedPostCard/detailedPostCard";
import EmptyCard from "../../components/cards/emptycard/emptyCard";
import LoadingCard from "../../components/cards/loadingCard/loadingCard";

const DetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { posts } = useAppState();

  useEffect(() => {
    if (posts.length > 0) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((_) => {
          const found = posts.find((post) => post.id === +id);
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
