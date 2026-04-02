const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");

const createUser = async (req, res) => {
	try {
		const { username, email, password, location } = req.body;

		if (!username || !email || !password || !location) {
			return res.status(400).json({
				message: "Failed to create user: empty field",
			});
		}

		const hashedPassword = cryptoJs.AES.encrypt(
			password,
			process.env.SECRET,
		).toString();

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			location,
		});

      const savedUser = await newUser.save();
      
      res.status(201).json("User successfully created")
	} catch (error) {
		console.log(error);
		res.status(500).json("Failed to create user");
	}
};


const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Vérification des champs
		if (!email || !password) {
			return res.status(400).json({
				message: "Email et mot de passe requis",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				message: "Utilisateur introuvable",
			});
		}

		const bytes = cryptoJs.AES.decrypt(
			user.password,
			process.env.SECRET,
		);

		const originalPassword = bytes.toString(cryptoJs.enc.Utf8);

		if (originalPassword !== password) {
			return res.status(401).json({
				message: "Mot de passe incorrect",
			});
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "21d",
		});

		const { password: pwd, createdAt, updatedAt, _v, ...others } = user._doc;

		res.status(200).json({
			user: others,
			token: token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Erreur lors de la connexion",
		});
	}
};

module.exports = { createUser, loginUser };


module.exports = {
   createUser,
   loginUser
}