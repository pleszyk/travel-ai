import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Place = {
  description?: string,
  lat: number,
  lng: number,
  location_id: number,
  name: string,
  photo: string
  rating?: string,
  web_url?: string,
};

export type LocationState = {
  places: Place[],
  coords: { lat: number, lng: number } | null
};

const initialState: LocationState = {
  places: [
    {
      'location_id': 60745,
      'name': 'Boston',
      'description': 'Walk the Freedom Trail the first time you visit Boston and you\'ll quickly get a sense of this coastal city\'s revolutionary spirit and history. But make sure you also explore some of Boston\'s fine museums (try the Isabella Stewart Gardner, featuring masterpieces displayed in their collector\'s mansion) and old neighborhoods (like the North End, Boston\'s Little Italy). You can\'t claim to have experienced real Boston culture, though, until you\'ve watched a Red Sox game from the bleachers.',
      'lat': 42.357277,
      'lng': -71.05834,
      'photo': 'https://media-cdn.tripadvisor.com/media/photo-s/1c/bf/a9/dc/caption.jpg',
      'web_url': 'https://www.tripadvisor.com/Tourism-g60745-Boston_Massachusetts-Vacations.html?m=66827',
    },
    {
      'location_id': 108823,
      'name': 'Isabella Stewart Gardner Museum',
      'description': 'A Venetian palace in the middle of Boston, Gardner\'s home is now a museum displaying her impressive, eclectic collection of European, American and Asian art, including sculpture, paintings, furniture, ceramics and textiles. Visitors can stroll or rest in a spectacular skylit courtyard filled with plants and flowers.',
      'lat': 42.33815,
      'lng': -71.09884,
      'rating': 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg',
      'photo': 'https://media-cdn.tripadvisor.com/media/photo-s/17/2a/b6/dc/photo1jpg.jpg',
      'web_url': 'https://www.tripadvisor.com/Attraction_Review-g60745-d108823-Reviews-Isabella_Stewart_Gardner_Museum-Boston_Massachusetts.html?m=66827',
    },
    {
      'location_id': 104795,
      'name': 'Boston Common',
      'description': 'Whether it\'s a summer picnic in the grass or winter ice-skating on Frog Pond, Boston\'s oldest public park is the perfect escape from the bustle of the city.',
      'lat': 42.355095,
      'lng': -71.06573,
      'rating': 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg',
      'photo': 'https://media-cdn.tripadvisor.com/media/photo-s/17/b7/ce/2b/boston-common.jpg',
      'web_url': 'https://www.tripadvisor.com/Attraction_Review-g60745-d104795-Reviews-Boston_Common-Boston_Massachusetts.html?m=66827',
    },
    {
      'location_id': 103111,
      'name': 'The Paul Revere House',
      'description': 'The Paul Revere House is the home of legendary patriot Paul Revere, where he began the famous “Midnight Ride.” A rare example of 17th-century urban architecture, and a National Historic Landmark, it is the oldest remaining structure in downtown Boston, and the only home on the Freedom Trail. Historic rooms contain artifacts from Revere’s era, including Revere family furniture and documents. One room is furnished with artifacts from the time of the first owner. Exhibits in the Visitor Center include beautiful silver made in Revere\'s shop. Visit to discover the true story of the “Midnight Ride” and the man behind the myth.',
      'lat': 42.36374,
      'lng': -71.0537,
      'rating': 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-66827-5.svg',
      'photo': 'https://media-cdn.tripadvisor.com/media/photo-s/0d/00/94/7e/20160917-121904-largejpg.jpg',
      'web_url': 'https://www.tripadvisor.com/Attraction_Review-g60745-d103111-Reviews-The_Paul_Revere_House-Boston_Massachusetts.html?m=66827',
    },
    {
      'location_id': 105250,
      'name': 'Fenway Park',
      'description': 'Hallowed ground to baseball fans, this century-old ballpark is the home field of the Boston Red Sox. Fans often flock to Fenway Park to catch a game over beer and hot dogs—the game season typically runs from April through October. You might want to stay till at least the eighth inning to sing “Sweet Caroline” with the crowd. The stadium is also home to the iconic Green Monster wall, a 37-foot-tall left-field wall. Apart from games, you can join a year-round guided tour of the stadium to learn about the history of the sport and the team, as well as get a behind-the-scenes peek into the locker room. – Tripadvisor',
      'lat': 42.346226,
      'lng': -71.09778,
      'rating': 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg',
      'photo': 'https://media-cdn.tripadvisor.com/media/photo-p/18/cc/dc/0b/the-old-ball-game-at.jpg',
      'web_url': 'https://www.tripadvisor.com/Attraction_Review-g60745-d105250-Reviews-Fenway_Park-Boston_Massachusetts.html?m=66827',
    },
    {
      'location_id': 103645,
      'name': 'Boston Tea Party Ships & Museum',
      'description': 'The Boston Tea Party Ships and Museum is a history lesson you won’t forget. Relive the event that started the American Revolution with historical interpreters, interactive exhibits, and full-scale replicas of 18th-century sailing vessels. Join a town meeting, hang out with talking portraits, and take part in the tradition of tossing tea into the harbor. Then, enjoy a spot of afternoon tea in Abigail’s Tea Room or visit the gift shop for some souvenirs. Entry to the museum is on a first come, first-served basis, so join the line early. – Tripadvisor',
      'lat': 42.35223,
      'lng': -71.05126,
      'rating': 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg',
      'photo': 'https://media-cdn.tripadvisor.com/media/photo-s/1c/7f/97/fb/revolt-like-its-1773.jpg',
      'web_url': 'https://www.tripadvisor.com/Attraction_Review-g60745-d103645-Reviews-Boston_Tea_Party_Ships_Museum-Boston_Massachusetts.html?m=66827',
    },
    {
      "location_id": 104912,
      "name": "Museum Of Science",
      "description": "The Museum of Science features over 700 interactive and informative exhibits centering around math, engineering, biodiversity, and more. Watch educational shows and live presentations at the Charles Hayden Planetarium, and cool 4D movies at the Mugar Omni Theater, the only domed IMAX screen in New England. Tickets to the museum include access to films and planetarium shows at a discounted rate. The museum is the departure point of the Boston Duck Tour—combine your museum visit with a cruise along the Charles River to enjoy the city’s best sights. – Tripadvisor",
      "lat": 42.367702,
      "lng": -71.07098,
      "rating": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg",
      "photo": "https://media-cdn.tripadvisor.com/media/photo-s/19/bb/58/02/experience-the-sights.jpg",
      "web_url": "https://www.tripadvisor.com/Attraction_Review-g60745-d104912-Reviews-Museum_Of_Science-Boston_Massachusetts.html?m=66827"
    },
    {
      "location_id": 142762,
      "name": "Beacon Hill",
      "description": "The famous Boston Brahmin neighborhood of red brick sidewalks, cobblestoned streets, elegant townhouses and gas street lamps.",
      "lat": 42.3562,
      "lng": -71.069405,
      "rating": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-66827-5.svg",
      "photo": "https://media-cdn.tripadvisor.com/media/photo-s/0d/5b/bf/a2/beacon-hill.jpg",
      "web_url": "https://www.tripadvisor.com/Attraction_Review-g60745-d142762-Reviews-Beacon_Hill-Boston_Massachusetts.html?m=66827"
    },
    {
      "location_id": 104824,
      "name": "Faneuil Hall Marketplace",
      "description": "Located in the heart of downtown Boston, this bustling complex of novelty carts, distinctive shops, national chain stores, performers, food stands and restaurants brought new life to a historic meeting place.",
      "lat": 42.360214,
      "lng": -71.05512,
      "rating": "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-66827-5.svg",
      "photo": "https://media-cdn.tripadvisor.com/media/photo-s/01/c4/c8/94/interessante-e-molto.jpg",
      "web_url": "https://www.tripadvisor.com/Attraction_Review-g60745-d104824-Reviews-Faneuil_Hall_Marketplace-Boston_Massachusetts.html?m=66827"
    }
  ],
  coords: {
    lat: 42.357277,
    lng: -71.05834,
  },
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<Place[]>) => {
      state.places = action.payload
    },
    updateCoords: (state, action: PayloadAction<{ lat: number, lng: number }>) => {
      state.coords = action.payload
    },
  },
})

export const { updateLocation, updateCoords } = locationSlice.actions

export default locationSlice.reducer