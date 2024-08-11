import "./Footer.css";
import UserCard from "./devCards/DevCards";
import {github} from '.././../assets/icons/github'

function FooterBox() {

  const users = [
    {
      name: 'Rohaan',
      icons: [
        <a href="https://www.linkedin.com/in/rohaan" target="_blank" rel="noopener noreferrer" className="icon-link">
          <BsLinkedin />
        </a>,
        <a href="https://github.com/Rohaan02" target="_blank" rel="noopener noreferrer" className="icon-link">
          <github />
        </a>
      ],
    },
    {
      name: 'Burhan',
      icons: [
        <a href="https://www.linkedin.com/in/burhan" target="_blank" rel="noopener noreferrer" className="icon-link">
          <BsLinkedin />
        </a>,
        <a href="https://github.com/Burhan02" target="_blank" rel="noopener noreferrer" className="icon-link">
          <BsGithub />
        </a>
      ],
    },
  ];

  return (
    <div className="footstyle">
      <div className="leftDiv">
        <h3>Developers:</h3>
        {users.map((user, index) => (
          <UserCard key={index} name={user.name} icons={user.icons} />
        ))}
      </div>
      <div className="rightDiv">
        <p>© 2024 | No Copyrights reserved.</p>
      </div>
    </div>
  );
}

export default FooterBox;
