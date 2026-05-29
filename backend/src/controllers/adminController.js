const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // SIMPLE ADMIN CHECK
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const token = jwt.sign(
        {
          role: "admin",
          email,
        },
        "SECRET_KEY",
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        success: true,
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};