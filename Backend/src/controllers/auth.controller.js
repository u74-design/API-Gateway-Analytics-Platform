import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Password validation
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one letter, one number, one special character, and be at least 8 characters long"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(201).json({
            success: true,
            message: "Registration Successful!, please login",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Register error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const LoginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found please Signup",
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password! or email",
                success: false
            })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login Successful!",
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log(`Error in login route: ${err}`);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

const GetProfile = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Profile fetched successfully",
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                createdAt: req.user.createdAt
            }
        });
    } catch (err) {
        console.error("Error fetching profile:", err);

        return res.status(500).json({
            message: "Error fetching profile",
            success: false
        });
    }
};

const changepassword = async (req,res) => {
    try{
        const userId = req.user._id;

        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body;

        if(!currentPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });                                             
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "New passwords do not match",
            });
        }

        const passwordRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if(!passwordRegex.test(newPassword)){
            return res.status(400).json({
                success: false,
                message : "Password must contain at least one letter, one number, one special character, and be at least 8 characters long"
            })
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message : "User not found"
            })
        }

         const isCurrentPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isCurrentPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message:
                    "New password must be different from current password"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    }catch(err){
        console.error("Change password error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export { RegisterUser, LoginUser, GetProfile , changepassword};