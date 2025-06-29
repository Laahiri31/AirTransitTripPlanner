import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Navigation, ArrowLeft, Plane, Phone, Globe, Camera } from 'lucide-react';

// Types
interface Place {
  id: string;
  name: string;
  description: string;
  distance: number; // in km
  visitDuration: number; // in hours
  rating: number;
  category: string;
  image: string;
  address: string;
  phone?: string;
  website?: string;
  coordinates: { lat: number; lng: number };
}

interface UserLocation {
  lat: number;
  lng: number;
  name: string;
}

// Mock data for demonstration
const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Central Park',
    description: 'A large public park in Manhattan, perfect for a peaceful stroll or quick photo session.',
    distance: 12.5,
    visitDuration: 1.5,
    rating: 4.8,
    category: 'Park',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npox_V2V-M8FXk6sc_qc1stnJfZtgD5J5Wza0vs5W099MNqQHgyfEMRVgILYWq8aIjmzwO6oGZUNLkSnoFGuE-VF8FLbxgChdAwzpDWigLiFynxIUtSvaC1d-08gltTOhMPB5Sczg=s1360-w1360-h1020-rw',
    address: '59th St to 110th St, 5th Ave to Central Park West, New York, NY',
    phone: '+1 (212) 310-6600',
    website: 'centralparknyc.org',
    coordinates: { lat: 40.7829, lng: -73.9654 }
  },
  {
    id: '2',
    name: 'Times Square',
    description: 'The bustling heart of NYC with bright lights, street performers, and iconic billboards.',
    distance: 15.3,
    visitDuration: 1.0,
    rating: 4.5,
    category: 'Landmark',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npWwnxqg74yDePhPczJdebWO9IMB1w0yQhsqJE7mTY-MwIqWma-0V9U4_hEraYtOF1QZ9NXl3VSLMy4TMTUffEVEYu5qaMvqMJKHEzwRUWCz25PssgJYslZQVh5GM95_4yHYRdl=s1360-w1360-h1020-rw',
    address: 'Times Square, Manhattan, NY 10036',
    coordinates: { lat: 40.7580, lng: -73.9855 }
  },
  {
    id: '3',
    name: 'Brooklyn Bridge',
    description: 'Historic suspension bridge offering stunning views of Manhattan skyline.',
    distance: 18.7,
    visitDuration: 2.0,
    rating: 4.7,
    category: 'Landmark',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noyBED8H3TZ9DRbdAffAH29aQK3LmgQQtXJ5ovQ4gJjJfMeWspR6DjjalaFWdY9vy4G-5z3Xbt0bmhpOb7OPJCT3bDl-4OpZ-DHfA8QZrIl5rYi1sRjiWHNoaOJcJ-rcGI3enZZ2w=s1360-w1360-h1020-rw',
    address: 'Brooklyn Bridge, New York, NY 10038',
    coordinates: { lat: 40.7061, lng: -73.9969 }
  },
  {
    id: '4',
    name: 'Metropolitan Museum',
    description: 'World-renowned art museum with extensive collections spanning 5,000 years.',
    distance: 14.2,
    visitDuration: 3.0,
    rating: 4.9,
    category: 'Museum',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrpQZUd1jWC9yc4lK0L_u4HuZ_VEyx33BDiuQNNiQejXwIehU0VA0MsfH3pcb9Bhr9DFAVkyPZY60vBsJvB6yGwknOq2wROAPy7vr3jftB_XFtx9F3UqpCIF_KK6rLVK0H6JqdL=s1360-w1360-h1020-rw',
    address: '1000 5th Ave, New York, NY 10028',
    phone: '+1 (212) 535-7710',
    website: 'metmuseum.org',
    coordinates: { lat: 40.7794, lng: -73.9632 }
  }
];

const mockUserLocation: UserLocation = {
  lat: 40.6413,
  lng: -73.7781,
  name: 'John F. Kennedy International Airport'
};

function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'places' | 'details' | 'map' | 'navigation'>('main');
  const [transitHours, setTransitHours] = useState<number>(4);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  useEffect(() => {
    // Simulate location detection
    const detectLocation = async () => {
      setTimeout(() => {
        setUserLocation(mockUserLocation);
        setLocationEnabled(true);
      }, 2000);
    };
    detectLocation();
  }, []);

  const calculateVisitablePlaces = () => {
    const travelBuffer = 0.5; // 30 minutes buffer for travel
    const availableTimePerPlace = transitHours - travelBuffer;
    
    const suitable = mockPlaces.filter(place => {
      const totalTimeNeeded = (place.distance / 30) + place.visitDuration; // 30 km/h average speed
      return totalTimeNeeded <= availableTimePerPlace;
    }).sort((a, b) => a.distance - b.distance);
    
    setFilteredPlaces(suitable);
    setCurrentPage('places');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Main Landing Page
  const MainPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Air Transit Trip Planner</h1>
          <p className="text-lg text-gray-600">Discover amazing places near your airport during transit</p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          {!locationEnabled ? (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Detecting Your Location</h3>
              <p className="text-gray-600">Please enable GPS and internet connection for the best experience.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-600">Location Detected</span>
                </div>
                <p className="text-gray-900 font-medium">{userLocation?.name}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Transit Time (hours)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={transitHours}
                    onChange={(e) => setTransitHours(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="12"
                  />
                </div>
              </div>

              <button
                onClick={calculateVisitablePlaces}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
              >
                Find Places to Visit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Places Listing Page
  const PlacesPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => setCurrentPage('main')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Available Places</h1>
            <p className="text-sm text-gray-600">{filteredPlaces.length} places within {transitHours} hours</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => {
                setSelectedPlace(place);
                setCurrentPage('details');
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {place.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{place.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(place.rating)}
                    <span className="ml-1 text-sm text-gray-600">{place.rating}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{place.distance} km away</p>
                    <p className="text-xs text-gray-500">{place.visitDuration}h visit</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Place Details Page
  const DetailsPage = () => {
    if (!selectedPlace) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => setCurrentPage('places')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Place Details</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedPlace.name}</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedPlace.category}
                </span>
              </div>

              <div className="flex items-center mb-4">
                {renderStars(selectedPlace.rating)}
                <span className="ml-2 text-lg font-semibold text-gray-900">{selectedPlace.rating}</span>
                <span className="ml-1 text-gray-600">rating</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{selectedPlace.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 mb-1" />
                  <p className="text-sm font-medium text-gray-900">Distance</p>
                  <p className="text-lg font-semibold text-blue-600">{selectedPlace.distance} km</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <Clock className="w-5 h-5 text-teal-600 mb-1" />
                  <p className="text-sm font-medium text-gray-900">Visit Duration</p>
                  <p className="text-lg font-semibold text-teal-600">{selectedPlace.visitDuration} hours</p>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                <p className="text-gray-700 mb-2">{selectedPlace.address}</p>
                {selectedPlace.phone && (
                  <div className="flex items-center mb-2">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedPlace.phone}</span>
                  </div>
                )}
                {selectedPlace.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-blue-600">{selectedPlace.website}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentPage('map')}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </button>
                <button
                  onClick={() => setCurrentPage('navigation')}
                  className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Map Page
  const MapPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => setCurrentPage('details')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Map View</h1>
        </div>
      </div>

      <div className="relative h-96 bg-gray-200 mx-4 my-6 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Interactive Map</p>
            <p className="text-sm text-gray-500">Google Maps integration would be here</p>
          </div>
        </div>
        
        {/* Mock location marker */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-red-500 rounded-full w-4 h-4 border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      </div>

      {selectedPlace && (
        <div className="mx-4 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{selectedPlace.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{selectedPlace.address}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {renderStars(selectedPlace.rating)}
              <span className="ml-1 text-sm text-gray-600">{selectedPlace.rating}</span>
            </div>
            <span className="text-sm text-blue-600 font-medium">{selectedPlace.distance} km away</span>
          </div>
        </div>
      )}
    </div>
  );

  // Navigation Page
  const NavigationPage = () => (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => setCurrentPage('details')}
            className="mr-4 p-2 hover:bg-gray-700 rounded-full transition-colors text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">GPS Navigation</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Navigation className="w-6 h-6 text-green-400 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Navigating to</h2>
              <p className="text-gray-300">{selectedPlace?.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-400">{selectedPlace?.distance} km</p>
              <p className="text-sm text-gray-400">Distance</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">25 min</p>
              <p className="text-sm text-gray-400">ETA</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">45 km/h</p>
              <p className="text-sm text-gray-400">Speed</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Turn-by-Turn Directions</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold">1</span>
              </div>
              <p>Head north on Airport Rd toward Terminal Dr</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold">2</span>
              </div>
              <p>Turn right onto Highway 101 N</p>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold">3</span>
              </div>
              <p>Take exit 42 toward Downtown</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center bg-green-600 px-6 py-3 rounded-full">
            <span className="w-3 h-3 bg-green-300 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium">Voice Navigation Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage />;
      case 'places':
        return <PlacesPage />;
      case 'details':
        return <DetailsPage />;
      case 'map':
        return <MapPage />;
      case 'navigation':
        return <NavigationPage />;
      default:
        return <MainPage />;
    }
  };

  return renderCurrentPage();
}

export default App;