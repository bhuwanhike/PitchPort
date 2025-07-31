import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
dotenv.config();
connectToDB();
import registerRoute from "./Route/Register.route.js";
import loginRoute from "./Route/login.route.js";
import userRoute from "./Route/user.route.js";
import addInvestorRoute from "./Route/addInvestor.route.js";
import addStartupRoute from "./Route/addstartup.route.js";
import startupsRoute from "./Route/addstartup.route.js";
import investorsRoute from "./Route/addInvestor.route.js";
import profileSettingsRoute from "./Route/profileSettings.route.js";
import paymentIntentRoute from "./Route/payIntent.route.js";
import paymentSuccessRoute from "./Route/paySuccess.route.js";
import paymentHistoryRoute from "./Route/payHistory.route.js";
import chatbotRoute from "./Route/chatbot.route.js";
import generateEmbeddings from "./controller/embeddings.controller.js";
// import chatbotResultRoute from "./Route/chatbot.route.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;

// const corsOptions = {
//   origin: "https://pitchport-frontend.onrender.com",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add all methods your frontend will use
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

app.use(cors());
app.use(express.json());

async function startServer() {
  await generateEmbeddings();
  // then start your normal express server...
}

startServer();

// Import and use routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/addinvestor", addInvestorRoute);
app.use("/investors", investorsRoute);
app.use("/addstartup", addStartupRoute);
app.use("/startups", startupsRoute);
app.use("/profileSettings", profileSettingsRoute);
app.use("/chat", chatbotRoute);

// Payment Routes
app.use("/create-payment-intent", paymentIntentRoute);
app.use("/record-payment-success", paymentSuccessRoute);
app.use("/history", paymentHistoryRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
