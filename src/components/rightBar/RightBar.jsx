import "./rightBar.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const RightBar = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () =>
      makeRequest.get("/users/suggestions").then((res) => res.data),
  });

  const {
    isLoading: followingLoading,
    error: followingError,
    data: followingData,
  } = useQuery({
    queryKey: ["following"],
    queryFn: () =>
      makeRequest.get("/users/following").then((res) => res.data),
  });

  const followMutation = useMutation({
    mutationFn: (userId) => {
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (userId) => {
      return makeRequest.delete("/relationships?userId=" + userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong"
          ) : data.length === 0 ? (
            <p style={{ fontSize: "12px", color: "gray" }}>
              No suggestions right now
            </p>
          ) : (
            data.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <img src={"/upload/" + user.profilePic} alt="" />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => followMutation.mutate(user.id)}>
                    follow
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="item">
          <span>Following</span>
          {followingLoading ? (
            "loading"
          ) : followingError ? (
            "Something went wrong"
          ) : followingData.length === 0 ? (
            <p style={{ fontSize: "12px", color: "gray" }}>
              You aren't following anyone yet
            </p>
          ) : (
            followingData.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <img src={"/upload/" + user.profilePic} alt="" />
                  <span>{user.name}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => unfollowMutation.mutate(user.id)}>
                    unfollow
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;