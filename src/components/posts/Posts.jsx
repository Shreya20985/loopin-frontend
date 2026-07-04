import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="posts">
      {error ? (
        "Something went wrong!"
      ) : isLoading ? (
        "loading"
      ) : data.length === 0 ? (
        // FIX: previously an empty result just rendered nothing, leaving a
        // blank gap on the page. A short message fills that space on
        // purpose instead of leaving an unexplained empty area.
        <div className="empty">
          <span>No posts yet</span>
          <p>When posts show up here, you'll see them front and center.</p>
        </div>
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;