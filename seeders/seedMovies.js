const { Movie } = require("./models");

async function seed() {
  await Movie.bulkCreate([
    {
      title: "Inception",
      type: "Movie",
      director: "Nolan",
      budget: "$160M",
      location: "LA, Paris",
      duration: "148 min",
      year: "2010",
    },
    {
      title: "Breaking Bad",
      type: "TV Show",
      director: "Vince Gilligan",
      budget: "$3M/ep",
      location: "Albuquerque",
      duration: "49 min/ep",
      year: "2008-2013",
    },
  ]);
  console.log("Seeded");
  process.exit(0);
}

seed().catch(console.error);
