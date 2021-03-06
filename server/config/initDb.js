import Mongo from '../config/MongoConnection.js';
import * as Control from '../tools/usersControl.js';

const createUser = ({
  login,
  firstName,
  lastName,
  gender,
  orientation,
  email,
  birthDate,
  bio,
  tags,
  geolocation,
  profilePic,
  pictures,
  likes,
  likedBy,
  visits,
  visitedBy,
  blockes,
  blockedBy,
  matches,
  }) => {
  const password = Control.generateHash('pass123');
  const popularity = likedBy.length;
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set:
      {
        email,
        password,
        firstName,
        lastName,
        gender,
        orientation,
        birthDate,
        bio,
        tags,
        geolocation,
        profilePic,
        pictures,
        likes,
        likedBy,
        matches,
        popularity,
        newLikedBy: [],
        blockes,
        blockedBy,
        visits,
        visitedBy,
        newVisitedBy: [],
        reportsAsFake: [],
        reportedAsFakeBy: [],
        unreadMessages: [],
        connected: false,
        auth: true,
        distance: 0,
        nbCommonTags: 0,
        lastConnection:"2017-08-01T16:38:20+02:00",
        closed: false,
      }
    },
    { upsert: true }
  );
}

const initDb = async (req, res) => {
  await Mongo.db.collection('chats').drop(); // pour nettoyer base en dev
  Mongo.db.collection('chats').insert(
    {
      login1: 'fifi',
      login2: 'jojo',
      discussion: [
        { posted: "2017-07-21T14:53:59+02:00", author: 'fifi', text: 'Youhou '},
        { posted: "2017-07-21T14:54:59+02:00", author: 'jojo', text: 'Je suis Jojo' }
      ],
    }
  );
  await Mongo.db.collection('users').drop(); // pour nettoyer base en dev
  createUser({
    login: 'popo',
    firstName: 'Pauline',
    lastName: 'LeChat',
    gender: 'female',
    orientation: 'Bisexuel',
    email: 'cbegne@student.42.fr',
    birthDate: '1990-10-30T00:00:00+02:00',
    bio: 'J\'aime les licornes',
    tags: [{ id: '1', text: '#poney' }, { id: '2', text: '#chien' }, { id: '3', text: '#koala' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 48.8640490, longitude: 2.3310530 },
    profilePic: 'profilePic-1499680932878.jpg',
    pictures: ['pics-1499694429517.jpg', 'pics-1499869463109.jpg'],
    likes: ['momo', 'gogo', 'jojo'],
    likedBy: [{ login: 'haha', date: "2017-07-21T14:53:59+02:00" }, { login: 'lolo', date: "2017-05-22T14:53:59+02:00" }],
    matches: [],
    visits: ['momo', 'gogo'],
    visitedBy: [{ login: 'haha', date: "2017-07-21T14:53:59+02:00" }, { login: 'lolo', date: "2017-05-22T14:53:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'momo',
    firstName: 'Maurice',
    lastName: 'LeChasseur',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'momo@gmail.com',
    birthDate: '1980-10-30T00:00:00+02:00',
    bio: 'J\'aime les animaux',
    tags: [{ id: '1', text: '#chasse' }, { id: '2', text: '#pêche' }, { id: '3', text: '#manger' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 48.8675640, longitude: 2.3439900 },
    profilePic: 'profilePic-1499694418691.jpg',
    pictures: [],
    likes: [],
    likedBy: [{ login: 'popo', date: "2017-05-22T14:53:59+02:00" }],
    matches: [],
    visits: [],
    visitedBy: [{ login: 'fifi', date: "2017-07-22T14:53:59+02:00" }, { login: 'popo', date: "2017-05-22T14:53:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'loulou',
    firstName: 'Martin',
    lastName: 'LeLapin',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'loulou@gmail.com',
    birthDate: '1991-10-31T00:00:00+02:00',
    bio: 'Je suis vide',
    tags: [{ id: '1', text: '#rien' }],
    geolocation: { latitude: 48.8634800, longitude: 2.3591150 },
    profilePic: '',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'fafa',
    firstName: 'Raphaëlle',
    lastName: 'LeTrapeziste',
    gender: 'female',
    orientation: 'Hétérosexuel',
    email: 'fafa@gmail.com',
    birthDate: '1988-01-02T00:00:00+02:00',
    bio: 'Je suis une artiste',
    tags: [{ id: '1', text: '#cirque' }, { id: '2', text: '#chien' }, { id: '3', text: '#camping' }, { id: '4', text: '#pêche' }, { id: '5', text: '#surf' }],
    geolocation: { latitude: 48.8534280, longitude: 2.3582790 },
    profilePic: 'profilePic-1500805962243.jpg',
    pictures: [],
    likes: ['boubou', 'jojo'],
    likedBy: [],
    matches: [],
    visits: ['boubou'],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'moumou',
    firstName: 'Milou',
    lastName: 'LeBlagueur',
    gender: 'male',
    orientation: 'Homosexuel',
    email: 'moumou@gmail.com',
    birthDate: '1993-11-05T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#rire' }, { id: '2', text: '#mer' }],
    geolocation: { latitude: 48.8434910, longitude: 2.3518340 },
    profilePic: 'profilePic-1499864117280.jpeg',
    pictures: [],
    likes: ['jojo'],
    likedBy: [{ login: 'jojo', date: "2017-07-22T14:53:59+02:00" }, { login: 'didi', date: "2017-07-23T14:53:59+02:00" }],
    matches: ['jojo'],
    visits: [],
    visitedBy: [{ login: 'jojo', date: "2017-07-22T14:53:59+02:00" }, { login: 'didi', date: "2017-07-23T14:53:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'jojo',
    firstName: 'Joseph',
    lastName: 'LeMarin',
    gender: 'male',
    orientation: 'Bisexuel',
    email: 'jojo@gmail.com',
    birthDate: '1992-12-23T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#bateau' }, { id: '2', text: '#chien' }, { id: '3', text: '#piscine' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 48.8488580, longitude: 2.3354220 },
    profilePic: 'profilePic-1500805585753.jpeg',
    pictures: [],
    likes: ['moumou', 'fifi', 'gogo'],
    likedBy: [{ login: 'gogo', date: "2017-06-23T14:53:59+02:00" }, { login: 'moumou', date: "2017-06-22T14:53:59+02:00" }, { login: 'fafa', date: "2017-07-21T14:53:59+02:00" }, { login: 'fifi', date: "2017-07-20T14:53:59+02:00" }, { login: 'didi', date: "2017-07-19T14:53:59+02:00" }, { login: 'popo', date: "2017-07-14T14:53:59+02:00" }],
    matches: ['moumou', 'fifi', 'gogo'],
    visits: ['moumou'],
    visitedBy: [{ login: 'gogo', date: "2017-06-23T14:53:59+02:00" }, { login: 'moumou', date: "2017-06-22T14:53:59+02:00" }, { login: 'fafa', date: "2017-07-21T14:53:59+02:00" }, { login: 'fifi', date: "2017-07-20T14:53:59+02:00" }, { login: 'didi', date: "2017-07-19T14:53:59+02:00" }, { login: 'popo', date: "2017-07-14T14:53:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'didi',
    firstName: 'Didier',
    lastName: 'LeFacteur',
    gender: 'male',
    orientation: 'Homosexuel',
    email: 'didi@gmail.com',
    birthDate: '1989-05-14T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#courrier' }, { id: '2', text: '#chien' }, { id: '3', text: '#piscine' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 48.8543350, longitude: 2.3134030 },
    profilePic: 'profilePic-1500805425563.jpg',
    pictures: [],
    likes: ['moumou', 'jojo'],
    likedBy: [],
    matches: [],
    visits: ['moumou'],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'fifi',
    firstName: 'France',
    lastName: 'LeLoup',
    gender: 'female',
    orientation: 'Hétérosexuel',
    email: 'fifi@gmail.com',
    birthDate: '1989-06-12T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#parachutisme' }, { id: '2', text: '#piscine' }],
    geolocation: { latitude: 48.8913050, longitude: 2.3529870 },
    profilePic: 'profilePic-1499864083516.jpg',
    pictures: [],
    likes: ['jojo', 'boubou'],
    likedBy: [{ login: 'momo', date: "2017-04-22T14:53:59+02:00" }, { login: 'boubou', date: "2017-07-22T14:53:59+02:00" }, { login: 'jojo', date: "2017-07-22T14:32:59+02:00" }],
    matches: ['jojo', 'boubou'],
    visits: ['momo'],
    visitedBy: [{ login: 'momo', date: "2017-04-22T14:53:59+02:00" }, { login: 'boubou', date: "2017-07-22T14:53:59+02:00" }, { login: 'jojo', date: "2017-07-22T14:32:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'gogo',
    firstName: 'Gauthier',
    lastName: 'LeGenie',
    gender: 'male',
    orientation: 'Bisexuel',
    email: 'gogo@gmail.com',
    birthDate: '1987-11-03T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#sciences' }],
    geolocation: { latitude: 48.8718720, longitude: 2.3176430 },
    profilePic: 'profilePic-1500806477512.jpg',
    pictures: [],
    likes: ['jojo'],
    likedBy: [{ login: 'popo', date: "2017-04-24T14:53:59+02:00" }, { login: 'jojo', date: "2017-06-23T14:53:59+02:00" },],
    matches: ['jojo'],
    visits: [],
    visitedBy: [{ login: 'popo', date: "2017-04-24T14:53:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'boubou',
    firstName: 'Bibou',
    lastName: 'LeZombie',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'boubou@gmail.com',
    birthDate: '1985-04-11T00:00:00+02:00',
    bio: 'Je suis fatigué',
    tags: [{ id: '1', text: '#dormir' }, { id: '2', text: '#chien' }, { id: '3', text: '#piscine' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 48.8790180, longitude: 2.3379060 },
    profilePic: 'profilePic-1500814478911.jpg',
    pictures: [],
    likes: ['fifi'],
    likedBy: [{ login: 'fafa', date: "2017-04-24T14:53:59+02:00" }, { login: 'fifi', date: "2017-04-22T14:53:59+02:00" }],
    matches: ['fifi'],
    visits: ['fifi'],
    visitedBy: [{ login: 'fafa', date: "2017-04-24T14:53:59+02:00" }, { login: 'fifi', date: "2017-04-22T14:53:59+02:00" }],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'haha',
    firstName: 'Hannah',
    lastName: 'LePoivron',
    gender: 'female',
    orientation: 'Bisexuel',
    email: 'haha@gmail.com',
    birthDate: '1980-04-25T00:00:00+02:00',
    bio: 'J\'aime la nature',
    tags: [{ id: '1', text: '#jardinage' }, { id: '2', text: '#piscine' }, { id: '3', text: '#camping' }],
    geolocation: { latitude: 48.8048649, longitude: 2.120355399999994 },
    profilePic: 'profilePic-1500812731596.jpg',
    pictures: [],
    likes: ['popo'],
    likedBy: [],
    matches: [],
    visits: ['popo'],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'lolo',
    firstName: 'Lionel',
    lastName: 'LeCamion',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'lolo@gmail.com',
    birthDate: '1981-12-03T00:00:00+02:00',
    bio: 'J\'aime les voitures',
    tags: [{ id: '1', text: '#karting' }, { id: '2', text: '#chien' }, { id: '3', text: '#surf' }],
    geolocation: { latitude: 48.898908, longitude: 2.0937609999999722 },
    profilePic: 'profilePic-1500814618219.jpg',
    pictures: [],
    likes: ['popo'],
    likedBy: [],
    matches: [],
    visits: ['popo'],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'zaza',
    firstName: 'Faza',
    lastName: 'LePiano',
    gender: 'female',
    orientation: 'Hétérosexuel',
    email: 'zaza@gmail.com',
    birthDate: '1992-03-30T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#guitare' }, { id: '2', text: '#mer' }, { id: '3', text: '#surf' }],
    geolocation: { latitude: 48.7262433, longitude: 2.365247199999999 },
    profilePic: 'profilePic-1500814820849.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'monmon',
    firstName: 'Montaigu',
    lastName: 'LeBourgeois',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'monmon@gmail.com',
    birthDate: '1973-05-23T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#rentier' }, { id: '2', text: '#chien' }, { id: '3', text: '#piscine' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 50.6432670, longitude: 3.1061310 },
    profilePic: 'profilePic-1500817166457.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'cece',
    firstName: 'Célina',
    lastName: 'LeWebmaster',
    gender: 'female',
    orientation: 'Hétérosexuel',
    email: 'cece@gmail.com',
    birthDate: '1990-08-22T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#coder' }, { id: '2', text: '#chien' }, { id: '3', text: '#piscine' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 50.5899160, longitude: 3.1607670 },
    profilePic: 'profilePic-1500817303229.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'zozo',
    firstName: 'Zoé',
    lastName: 'LeCinéma',
    gender: 'female',
    orientation: 'Hétérosexuel',
    email: 'zozo@gmail.com',
    birthDate: '1994-07-20T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#films' }, { id: '2', text: '#musique' }, { id: '3', text: '#rire' }, { id: '4', text: '#arts' }, { id: '5', text: '#chien' }],
    geolocation: { latitude: 48.629828, longitude: 2.4417819999999892 },
    profilePic: 'profilePic-1500832448345.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'nana',
    firstName: 'Anne',
    lastName: 'LeRiche',
    gender: 'female',
    orientation: 'Bisexuel',
    email: 'nana@gmail.com',
    birthDate: '1976-09-09T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#travail' }, { id: '2', text: '#argent' }, { id: '3', text: '#séminaire' }, { id: '4', text: '#messe' }],
    geolocation: { latitude: 50.5899160, longitude: 3.1607670 },
    profilePic: 'profilePic-1500832747838.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'toto',
    firstName: 'Thomas',
    lastName: 'LeHacker',
    gender: 'male',
    orientation: 'Homosexuel',
    email: 'toto@gmail.com',
    birthDate: '1985-08-01T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#travail' }, { id: '2', text: '#jeux vidéos' }, { id: '3', text: '#armée' }, { id: '4', text: '#russie' }],
    geolocation: { latitude: 50.5899160, longitude: 3.1607670 },
    profilePic: 'profilePic-1500832911875.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'tonton',
    firstName: 'John',
    lastName: 'LeSurfer',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'tonton@gmail.com',
    birthDate: '1987-05-29T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#surf' }, { id: '2', text: '#mer' }, { id: '3', text: '#montagne' }, { id: '4', text: '#bronzage' }],
    geolocation: { latitude: 48.8293650, longitude: 2.4265410 },
    profilePic: 'profilePic-1500984675418.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'mama',
    firstName: 'Marion',
    lastName: 'LeCuisinier',
    gender: 'female',
    orientation: 'Hétérosexuel',
    email: 'mama@gmail.com',
    birthDate: '1985-11-06T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#cuisine' }, { id: '2', text: '#livres' }, { id: '3', text: '#plongée' }, { id: '4', text: '#voyages' }],
    geolocation: { latitude: 48.629828, longitude: 2.4417819999999892 },
    profilePic: 'profilePic-1501265639314.jpg',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  createUser({
    login: 'juju',
    firstName: 'Julien',
    lastName: 'LePaternel',
    gender: 'male',
    orientation: 'Hétérosexuel',
    email: 'juju@gmail.com',
    birthDate: '1955-08-16T00:00:00+02:00',
    bio: '',
    tags: [{ id: '1', text: '#cuisine' }, { id: '2', text: '#surf' }, { id: '3', text: '#retraite' }, { id: '4', text: '#camping' }],
    geolocation: { latitude: 48.8293650, longitude: 2.4265410 },
    profilePic: 'profilePic-1501852360842.png',
    pictures: [],
    likes: [],
    likedBy: [],
    matches: [],
    visits: [],
    visitedBy: [],
    blockes: [],
    blockedBy: [],
  });
  await Mongo.db.collection('suggestions').drop(); // pour nettoyer base en dev
  Mongo.db.collection('suggestions').insertMany([
    { text: 'cuisine' },
    { text: 'voyage' },
    { text: 'arts' },
    { text: 'peinture' },
    { text: 'musique' },
    { text: 'cinema' },
    { text: 'films' },
    { text: 'séries' },
    { text: 'manger' },
    { text: 'boire' },
    { text: 'sorties' },
    { text: 'dormir' },
    { text: 'surf' },
    { text: 'sports' },
    { text: 'vegan' },
    { text: 'végétarien' },
    { text: 'football' },
    { text: 'danse' },
    { text: 'mode' },
    { text: 'shopping' },
    { text: 'techonologies' },
    { text: 'pêche' },
    { text: 'chasse' },
    { text: 'espace' },
    { text: 'travail' },
    { text: 'jardinage' },
    { text: 'tricot' },
    { text: 'jeux de cartes' },
    { text: 'chat' },
    { text: 'chien' },
    { text: 'animaux' },
    { text: 'ville' },
    { text: 'campagne' },
    { text: 'lire' },
    { text: 'philosophie' },
    { text: 'spa' },
    { text: 'mer' },
    { text: 'montagne' },
    { text: 'piscine' },
    { text: 'jogging' },
    { text: 'festival' },
    { text: 'concerts' },
    { text: 'bière' },
    { text: 'vin' },
    { text: 'luxe' },
    { text: 'tennis' },
    { text: 'golf' },
    { text: 'drogues' },
    { text: 'lunettes' },
    { text: 'voiture' },
    { text: 'tuning' },
    { text: 'chti' },
    { text: 'architecture' },
    { text: 'visite' },
    { text: 'bacon' },
    { text: 'poney' },
    { text: 'licorne' },
    { text: 'fun' },
    { text: 'cool' },
    { text: 'jeux vidéo' },
    { text: 'complotiste' },
    { text: 'tracteur' },
    { text: 'politique' },
    { text: 'insoumis' },
    { text: 'sympa' },
    { text: 'marrant' },
    { text: 'intelligent' },
    { text: 'réseaux sociaux' },
    { text: 'presse' },
    { text: 'santé' },
    { text: 'ménage' },
    { text: 'décoration' },
    { text: 'organisation' },
    { text: 'manager' },
    { text: 'chef' },
    { text: 'gym' },
    { text: 'manga' },
    { text: 'geek' },
    { text: 'nature' },
    { text: 'chocolat' },
    { text: 'calin' },
  ]);
  res.send({ success: true });
}

export default initDb;
