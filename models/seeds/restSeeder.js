const db = require("../../config/mongoose");
const restaurant_json = require("../../public/data/restaurant.json").results;
const restLen = restaurant_json.length;
const bcrypt = require("bcryptjs");
const Restaurant = require("../restaurants");
const User = require("../users");
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const SEED_USERS = [
	{
		name: "USER1",
		email: "user1@example.com",
		password: "12345678",
		restaurantIndex: [1, 2, 3],
	},
	{
		name: "USER2",
		email: "user2@example.com",
		password: "12345678",
		restaurantIndex: [4, 5, 6],
	},
];
db.once("open", async () => {
	await Promise.all(
		Array.from(SEED_USERS, async (item) => {
			const salt = await bcrypt.genSalt(10);

			const hash = await bcrypt.hash(item.password, salt);
			const user = await User.create({
				name: item.name,
				email: item.email,
				password: hash,
				restaurantIndex: item.restaurantIndex,
			});
			const userId = user._id;
			//選出餐廳序號和使用者相符的餐廳
			let restArr = restaurant_json.filter((item) =>
				user.restaurantIndex.includes(item.id)
			);
			//將餐廳們塞入userId, 使各筆資料屬於特定使用者
			restArr.forEach((item) => (item.userId = userId));
			await Promise.all(
				Array.from(restArr, async (item) => {
					await Restaurant.create(item);
				})
			);
			console.log("done.");
		})
	);

	console.log("seeding is ok.");
	process.exit();
});
