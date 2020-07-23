export default {
    users: [
      { username: "regular", accessLevel: 1, password: "password" },
      { username: "admin", accessLevel: 0, password: "password" }
    ],
    initProducts: [
      {
        name: "vegetables",
        stock: 10,
        price: 399.99,
        shortDesc: "Fresh and Sweet.",
        description:
          "This skuma Wiki is fresh and clean"
      },
      ...moreProducts
    ]
  };