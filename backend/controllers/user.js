const User = require("../models/user");

const getUser = async (req, res) => {
	try {
		const id = req.user.id;

		if (!id) {
			return res.status(403).json("User ID not found");
		}

		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json("User not found");
		}

		const { password, createdAt, updatedAt, __v, ...userData } = user._doc;

		res.status(200).json(userData);
	} catch (error) {
		console.log("ERROR:", error);
		res.status(500).json("Server error ", error);
	}
};


const deleteUser = async (req, res) => {
   try {
      
      const id = req.user.id;

		if (!id) {
			return res.status(403).json("User ID not found");
		}

		const user = await User.findByIdAndDelete(id);

      res.status(200).json("User deleted successfully");
	} catch (error) {
		console.log("ERROR:", error);
		res.status(500).json("Server error ", error);
   }
}
module.exports = {
	getUser,
	deleteUser,
};
