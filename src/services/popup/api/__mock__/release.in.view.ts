export const MOCKED_RELEASE_URL = [
  "https://www.discogs.com/release/11874869-Genesis-Selling-England-By-The-Pound",
  "https://www.discogs.com/release/10083775-Walter-Smith-III-Live-In-Paris",
  "https://www.discogs.com/master/298833-Benny-Golson-Groovin-With-Golson",
  "https://www.discogs.com/user/murdrejg/collection",
];

let itemNr = Math.floor(Math.random() * MOCKED_RELEASE_URL.length);

export const getMockRelease = () => MOCKED_RELEASE_URL[itemNr];
