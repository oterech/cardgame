"use strict";

const {
  db,
  models: { User, Card, Suit },
} = require("../server/db");

const spadesImages = [
  "https://i.postimg.cc/qRLx6D1K/1.png",
  "https://i.postimg.cc/BbncT5zV/2.png",
  "https://i.postimg.cc/hPh1hrTJ/3.png",
  "https://i.postimg.cc/SxMLfxZk/4.png",
  "https://i.postimg.cc/R0x7sx8f/5.png",
  "https://i.postimg.cc/9fPGsN5k/6.png",
  "https://i.postimg.cc/Wp572KFL/7.png",
  "https://i.postimg.cc/D0pQBJky/8.png",
  "https://i.postimg.cc/QxPk7TJf/9.png",
  "https://i.postimg.cc/3Rn2x4wC/10.png",
  "https://i.postimg.cc/BbzD2rHj/11.png",
  "https://i.postimg.cc/ZYsrkd2J/12.png",
  "https://i.postimg.cc/GttG8L80/13.png",
];

const clubsImages = [
  "https://i.postimg.cc/xTtxk8XC/1.png",
  "https://i.postimg.cc/8CrtnbtJ/2.png",
"https://i.postimg.cc/c49hxzzt/3.png",
"https://i.postimg.cc/kg2cBcr1/4.png",
"https://i.postimg.cc/Vk2FMCmY/5.png",
"https://i.postimg.cc/xCvg91r9/6.png",
"https://i.postimg.cc/zDkpMvSj/7.png",
"https://i.postimg.cc/brqgrf8k/8.png",
"https://i.postimg.cc/tCCDHbBH/9.png",
"https://i.postimg.cc/4dgb2RYq/10.png",
"https://i.postimg.cc/d3QRvRm9/11.png",
"https://i.postimg.cc/Kj9PYK0h/12.png",
"https://i.postimg.cc/PfKzycTV/13.png",
]
const diamondsImages = [
  "https://i.postimg.cc/Dw7ccTbN/1.png",
"https://i.postimg.cc/7ZXnsW3Z/2.png",
"https://i.postimg.cc/dtYRqYn0/3.png",
"https://i.postimg.cc/wBGcHRbK/4.png",
"https://i.postimg.cc/C5yGnTgm/5.png",
"https://i.postimg.cc/gjvvvScd/6.png",
"https://i.postimg.cc/2jvFR6QJ/7.png",
"https://i.postimg.cc/MTf0GZhn/8.png",
"https://i.postimg.cc/6Q3LDfcL/9.png",
"https://i.postimg.cc/SNf6Rvtf/10.png",
"https://i.postimg.cc/QdNpTJ2G/11.png",
"https://i.postimg.cc/sgn59ZzB/12.png",
"https://i.postimg.cc/pdpz0XVs/13.png"
]
const heartsImages = ["https://i.postimg.cc/524gbVpV/1.png","https://i.postimg.cc/CKd4nsWr/2.png",
  "https://i.postimg.cc/N0Vk6rts/3.png",
 "https://i.postimg.cc/QCggZ4TC/4.png",
  "https://i.postimg.cc/nVqGmzPx/5.png",
 "https://i.postimg.cc/Wbnm9yVf/6.png",
"https://i.postimg.cc/vHMLtsJV/7.png",
 "https://i.postimg.cc/j2Y690CB/8.png",
  "https://i.postimg.cc/fL9jBTWx/9.png",
  "https://i.postimg.cc/CxxG94LM/10.png",
"https://i.postimg.cc/fRqcs0Jc/11.png",
"https://i.postimg.cc/3wygxJvP/12.png",
"https://i.postimg.cc/1zLDnh04/13.png"
]

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const suits = await Promise.all([
    Suit.create({
      name: "Hearts",
    }),
    Suit.create({
      name: "Spades",
    }),
    Suit.create({
      name: "Diamonds",
    }),
    Suit.create({
      name: "Clubs",
    }),
  ]);

  let ranks = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const hearts = await Promise.all(
    ranks.map((ranks, index) => {
      return Card.create({
        rank: ranks,
        value: values[index],
        order: index,
        suitId: 1,
        imageUrl: heartsImages[index]
      });
    })
  );

  const spades = await Promise.all(
    ranks.map((ranks, index) => {
      return Card.create({
        rank: ranks,
        value: values[index],
        order: index,
        suitId: 2,
        imageUrl: spadesImages[index]
      });
    })
  );

  const diamonds = await Promise.all(
    ranks.map((ranks, index) => {
      return Card.create({
        rank: ranks,
        value: values[index],
        order: index,
        suitId: 3,
        imageUrl: diamondsImages[index]
      });
    })
  );

  const clubs = await Promise.all(
    ranks.map((ranks, index) => {
      return Card.create({
        rank: ranks,
        value: values[index],
        order: index,
        suitId: 4,
        imageUrl: clubsImages[index]
      });
    })
  );

  //   const jokers = await Promise.all (
  //  [   Card.create({rank: 'joker', value: 100}
  //     ),
  //     Card.create({rank: 'joker', value: 100}
  //     )]
  //   )

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    suits,
    hearts,
    spades,
    clubs,
    diamonds,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");

  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)

module.exports = seed;
