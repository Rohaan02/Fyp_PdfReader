import "./Footer.css";
import UserCard from "./devCards/DevCards";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

function FooterBox() {
  const users = [
    {
      name: "Rohaan Nadeem",
      links: [
        { url: "https://www.linkedin.com/in/rohaan", icon: FaLinkedin },
        { url: "https://github.com/Rohaan02", icon: FaGithub },
      ],
    },
    {
      name: "Noor Fatima",
      links: [
        { url: "https://www.linkedin.com/in/burhan", icon: FaLinkedin },
        { url: "https://github.com/Burhan02", icon: FaGithub },
      ],
    },
  ];

  return (
    <div className="footstyle">
      <div className="leftDiv">
        <h3>Developers:</h3>
        {users.map((user, index) => (
          <UserCard key={index} name={user.name} links={user.links} />
        ))}
      </div>
      <div className="rightDiv">
        <p>© 2024 | No Copyrights reserved.</p>
      </div>
    </div>
  );
}

export default FooterBox;
