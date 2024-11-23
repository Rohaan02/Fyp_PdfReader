import UserCard from "./devCards/DevCards";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

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
        { url: "https://www.linkedin.com/in/noor-fatima-2571a222a/", icon: FaLinkedin },
        { url: "https://github.com/Burhan02", icon: FaGithub },
      ],
    },
  ];

  return (
      <div className="bg-gray-900 text-white w-full p-6 flex justify-between items-center">
        {/* Developer Info */}
        <div className="w-1/3">
          <h3 className="text-xl font-bold mb-4">Developers:</h3>
          {users.map((user, index) => (
              <UserCard key={index} name={user.name} links={user.links} />
          ))}
        </div>

        {/* Footer Links */}
        <div className="w-1/3 text-center space-x-4">
          <a href="/support" className="hover:underline">
            Support
          </a>
          <a href="/help-center" className="hover:underline">
            Help Center
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Services
          </a>
        </div>

        {/* Copyright Info */}
        <div className="w-1/3 text-right">
          <p>&copy; 2024 PDF Data Extraction Tool. All rights reserved.</p>
        </div>
      </div>
  );
}

export default FooterBox;
