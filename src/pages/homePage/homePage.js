import LoadingCard from "../../components/cards/loadingCard/loadingCard";
import PostCard from "../../components/cards/postCard/postCard";
import { useAppState } from "../../context/appContext";

const HomePage = () => {
  const { posts } = useAppState();

  return (
    <div className={`d-flex flex-column align-items-center`}>
      <h3 className="mt-4">Latest Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard post={post} key={post.id} />)
      ) : (
        <LoadingCard />
      )}
    </div>
  );
};

export default HomePage;
