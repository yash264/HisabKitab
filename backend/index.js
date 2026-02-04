import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import connectDB from "./connection.js";
const PORT = process.env.PORT
dotenv.config();
const app = express();
connectDB();

import authRoutes from "./routes/auth.js";
import groupRoutes from "./routes/group.js";
import participantRoutes from "./routes/participant.js";
import expenseRoutes from "./routes/expense.js";
import balanceRoutes from "./routes/balance.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api", balanceRoutes);


//  to start the server
// app.get("/startServer", async (req, res) => {
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "Server started Successfully",
//     });
//   }
//   catch (error) {
//     console.log(error);
//   }
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});