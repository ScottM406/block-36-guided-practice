const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numRestaurants = 3, numReservations = 5) => {
  for (let i = 0; i < numRestaurants; i++) {
    const reservations = Array.from({ length: numReservations }, (_, j) => {
      const name = faker.internet.displayName();
      return {
      name: `Person ${i}${j}`,
      email: `${i}${j}@yahoo.com`,
      partySize: Math.floor(Math.random() * 10) + 1,
      };
    });

    await prisma.restaurant.create({
      data: {
        name: faker.company.buzzAdjective() + " " + faker.company.buzzNoun(),
        reservations: {
          create: reservations,
        }
      }
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
