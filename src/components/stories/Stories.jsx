import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  //TEMPORARY placeholder stories
  const stories = [
    {
      id: 1,
      name: "Aditi Sharma",
      img: "https://picsum.photos/seed/story1/300/500",
    },
    {
      id: 2,
      name: "Rohan Mehta",
      img: "https://picsum.photos/seed/story2/300/500",
    },
    {
      id: 3,
      name: "Priya Nair",
      img: "https://picsum.photos/seed/story3/300/500",
    },
    {
      id: 4,
      name: "Karan Verma",
      img: "https://picsum.photos/seed/story4/300/500",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;