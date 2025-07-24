import User from "../schema/register.schema.js";

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username });
    const comparedPassword = await userExist.comparePassword(password);
    if (userExist) {
      if (comparedPassword) {
        const token = await userExist.generateToken();
        res
          .status(201)
          .json({ message: "Logged in successfully", token: token, username: username });
      } else {
        res.status(400).json({ message: "Invalid user" });
      }
    } else {
      res.status(201).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default loginController;
