import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";


// REGISTER USER
export const register = async (req, res) => {
  try {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    await verifyEmail(token, email);

    newUser.token = token;

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }
};



// VERIFY EMAIL
export const verify = async (req, res) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {

      decoded = jwt.verify(token, process.env.SECRET_KEY);

    } catch (err) {

      if (err.name === "TokenExpiredError") {

        return res.status(400).json({
          success: false,
          message: "Token expired"
        });

      }

      return res.status(400).json({
        success: false,
        message: "Invalid token"
      });

    }

    const user = await User.findById(decoded.id);

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found"
      });

    }

    user.token = null;
    user.isVerified = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};



// RESEND VERIFICATION EMAIL
export const reVerify = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found"
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    await verifyEmail(token, user.email);

    user.token = token;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification email sent again successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }

};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })

    }
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    // if (!existingUser.isVerified) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please verify your email before logging in"
    //   })
    // }
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    )
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    )
    existingUser.isLoggedIn = true;
    await existingUser.save()
const  existingSession = await Session.findOne({ userId: existingUser._id })
if(existingSession){
  await Session.deleteOne({userId:existingSession._id})
}

    await Session.create({ userId: existingUser._id })
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: existingUser
    })
  }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",  
    })
  }  
}

export const logout = async (req, res) => {
    try {
        const userId = req.id;
        await Session.deleteOne({ userId: userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        })
        // Logic to delete the session from the database would go here
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sendOTPMail(otp, email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    })

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
}

export const verifyOTP = async (req, res) => {
    try {
        const {otp} = req.body;
        const email = req.params.email;
        if(!otp){
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            })
        }
      
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (user.otp || user.otpExpiry) {
          return res.status(400).json({
            success: false,
            message: "OTP already sent. Please check your email"
          })
        }
        if(user.otpExpiry < new Date()){
          return res.status(400).json({
            success: false,
            message: "OTP expired. Please request for a new one"
          })
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const changePassword = async (req, res) => {
  try {
    const {newPassword, confirmPassword} = req.body;
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    })
   
    
    
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: error.message
      })
    }
    
}

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false, 
      message: error.message
    })
  } 
}  

export const getIserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password -token -otp -otpExpiry");
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found"
      })
    } 
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  } 
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { firstname, lastname, phoneNo, address, city, zipCode, profilePic } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (phoneNo) user.phoneNo = phoneNo;
        if (address) user.address = address;
        if (city) user.city = city;
        if (zipCode) user.zipCode = zipCode;
        if (profilePic) user.profilePic = profilePic;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
