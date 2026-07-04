import { Link } from "react-router-dom";
import "./welcome.scss";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="overlay" />
      <div className="content">
        <div className="brand">
          <h1>Loopin</h1>
          <p className="tagline">Where your world comes together.</p>
          <ul className="features">
            <li>
              <GroupsOutlinedIcon /> Stay close to friends and family
            </li>
            <li>
              <PhotoLibraryOutlinedIcon /> Share photos and moments instantly
            </li>
            <li>
              <ForumOutlinedIcon /> Join the conversation, anytime
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Welcome back</h2>
          <p>Log in to catch up on everything you've missed.</p>
          <div className="buttons">
            <Link to="/login">
              <button className="loginBtn">Log In</button>
            </Link>
            <Link to="/register">
              <button className="registerBtn">Create New Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;