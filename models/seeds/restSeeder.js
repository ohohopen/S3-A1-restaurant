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
db.once("open", () => {
	Promise.all(
		Array.from(SEED_USERS, (item) => {
			return bcrypt
				.genSalt(10)
				.then((salt) => bcrypt.hash(item.password, salt))
				.then((hash) =>
					User.create({
						name: item.name,
						email: item.email,
						password: hash,
						restaurantIndex: item.restaurantIndex,
					})
				)
				.then((user) => {
					const userId = user._id;
					//選出餐廳序號和使用者相符的餐廳
					let restArr = restaurant_json.filter((item) =>
						user.restaurantIndex.includes(item.id)
					);
					//將餐廳們塞入userId, 使各筆資料屬於特定使用者
					restArr.forEach((item) => (item.userId = userId));
					return Promise.all(
						Array.from(restArr, (item) => {
							return Restaurant.create(item);
						})
					);
				})
				.then(() => {
					console.log("done.");
				});
		})
	).then(() => process.exit());

	console.log("seeding is ok.");
});
