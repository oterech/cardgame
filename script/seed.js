"use strict";

const {
  db,
  models: { User, Card, Suit },
} = require("../server/db");

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
     return Card.create({ rank: ranks, value: values[index], order: index, suitId: 1});
    })
  );

  const spades = await Promise.all(
    ranks.map((ranks, index) => {
     return Card.create({ rank: ranks, value: values[index], order: index, suitId: 2});
    })
  );

  const diamonds = await Promise.all(
    ranks.map((ranks, index) => {
     return Card.create({ rank: ranks, value: values[index], order: index, suitId: 3});
    })
  );

  const clubs = await Promise.all(
    ranks.map((ranks, index) => {
     return Card.create({ rank: ranks, value: values[index], order: index, suitId: 4});
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
    diamonds
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
