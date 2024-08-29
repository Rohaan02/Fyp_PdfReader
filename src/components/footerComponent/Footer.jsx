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
    <div className="bg-gray-900 text-white bottom-0 mb-0 w-full p-4 flex">
      <div className="w-1/4">
        <h3 className="text-lg">Developers:</h3>
        {users.map((user, index) => (
          <UserCard key={index} name={user.name} links={user.links} />
        ))}
      </div>
      <div className="w-3/4 text-right flex items-center justify-end pr-4">
        <p>&copy; 2024 PDF Data Extraction Tool. All rights reserved.</p>
      </div>
    </div>
  );
}

export default FooterBox;
