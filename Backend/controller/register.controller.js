import User from "../schema/register.schema.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const user = await User.create({ username, email, password, role });
      const token = await user.generateToken();
      res
        .status(201)
        .json({ message: "User registered successfully", token: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error from register.controller" });
  }
};

export default registerController;
