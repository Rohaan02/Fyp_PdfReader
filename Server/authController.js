const User = require("./models/User");
const bcrypt = require("bcrypt");

const handleGoogleLogin = async (googleUser) => {
  try {
    const { email, name, sub: googleId } = googleUser;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email,
        googleId,
      });
      await user.save();
      console.log("New Google user created and saved:", user);
    }
    return user;
  } catch (error) {
    console.error("Error during Google login:", error.message);
    throw error;
  }
};

const handleFormLogin = async (usernameOrEmail, password) => {
  try {
    let user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        username: usernameOrEmail,
        email: usernameOrEmail,
        password: hashedPassword,
      });
      await user.save();
      console.log("New form user created and saved:", user);
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (error) {
    console.error("Error during form login:", error.message);
    throw error;
  }
};

module.exports = { handleGoogleLogin, handleFormLogin };
