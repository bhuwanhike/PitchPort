import User from "../schema/register.schema.js";
import AddInvestor from "../schema/addinvestor.schema.js";
const addInvestorController = async (req, res) => {
  // try {
  const {
    fullname,
    email,
    location,
    industry,
    fundingStage,
    risk,
    portfolioSize,
  } = req.body;

  const userExist = await User.findOne({
    email: { $regex: String(email), $options: "i" },
  });
  console.log("User found:", userExist);

  if (userExist) {
    const investor = await AddInvestor.create({
      fullname,
      email,
      location,
      industry,
      fundingStage,
      risk,
      portfolioSize,
    });
    res.status(201).json({ message: "Investor added successfully", investor });
  } else {
    res.status(201).json({ message: "User not found", userExist });
  }
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ message: "cannot add user error from the controller" });
  // }
};

const getInvestors = async (req, res) => {
  try {
    const investors = await AddInvestor.find();
    res.status(200).json(investors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default { addInvestorController, getInvestors };
