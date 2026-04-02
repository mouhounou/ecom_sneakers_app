const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json("Access denied. No token provided.");
		}

		if (!authHeader.startsWith("Bearer ")) {
			return res.status(401).json("Invalid token format");
		}

		const token = authHeader.split(" ")[1];

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json("Invalid or expired token");
			}

			req.user = user; 
			next();
		});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

module.exports = verifyToken;
