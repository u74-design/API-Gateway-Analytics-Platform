import dotenv from "dotenv";
import { validateEnvironment } from "./src/config/env.js";

dotenv.config();
const { default: app } = await import('./src/app.js');
const { default: connectDB } = await import('./src/config/db.js');
const PORT = process.env.PORT || 5000;

validateEnvironment();
await connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


                                                                                                       
