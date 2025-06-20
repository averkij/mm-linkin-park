import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, Users, DollarSign, Music } from 'lucide-react';

interface TourDate {
  date: string;
  city: string;
  country: string;
  venue: string;
  supporting_acts?: string;
  attendance?: string;
  revenue?: string;
}

interface TourData {
  extracted_information: string;
  statistics: {
    total_reported_attendance: string;
    total_reported_revenue: string;
    number_of_shows_listed: number;
  };
  temporal_info: {
    start_date: string;
    end_date: string;
    concerts_2024: TourDate[];
    concerts_2025: TourDate[];
    concerts_2026: TourDate[];
  };
  cancelled_shows: Array<{
    date: string;
    city: string;
    country: string;
    venue: string;
    reason: string;
  }>;
}

const Tours: React.FC = () => {
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  useEffect(() => {
    fetch('/data/from_zero_tour_dates.json')
      .then(response => response.json())
      .then(data => setTourData(data))
      .catch(error => console.error('Error loading tour data:', error));
  }, []);

  if (!tourData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading tour dates...</p>
        </div>
      </div>
    );
  }

  const getYearData = (year: string): TourDate[] => {
    switch (year) {
      case '2024':
        return tourData.temporal_info.concerts_2024;
      case '2025':
        return tourData.temporal_info.concerts_2025;
      case '2026':
        return tourData.temporal_info.concerts_2026;
      default:
        return [];
    }
  };

  const formatDate = (dateStr: string, year: string) => {
    // Parse date string with year context
    const fullDate = `${dateStr}, ${year}`;
    const date = new Date(fullDate);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const isUpcoming = (dateStr: string, year: string) => {
    const fullDate = `${dateStr}, ${year}`;
    const concertDate = new Date(fullDate);
    const today = new Date();
    return concertDate >= today;
  };

  const TourDateCard: React.FC<{ concert: TourDate; year: string }> = ({ concert, year }) => {
    const dateInfo = formatDate(concert.date, year);
    const upcoming = isUpcoming(concert.date, year);

    return (
      <div className={`bg-zinc-800/50 rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${
        upcoming ? 'border-red-500/50 hover:border-red-500' : 'border-zinc-700 hover:border-zinc-600'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`text-center p-3 rounded-lg ${upcoming ? 'bg-red-500/20 border border-red-500/30' : 'bg-zinc-700/50 border border-zinc-600'}`}>
              <div className={`text-lg font-bold ${upcoming ? 'text-red-500' : 'text-gray-400'}`}>
                {dateInfo.day}
              </div>
              <div className={`text-sm ${upcoming ? 'text-red-400' : 'text-gray-500'}`}>
                {dateInfo.month}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{concert.city}</h3>
              <p className="text-gray-400 flex items-center">
                <MapPin size={16} className="mr-1" />
                {concert.country}
              </p>
            </div>
          </div>
          
          {upcoming && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Upcoming
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="mr-2 text-red-500" />
            <span className="font-semibold">{concert.venue}</span>
          </div>
          
          {concert.supporting_acts && concert.supporting_acts !== '—' && (
            <div className="flex items-center text-gray-400">
              <Users size={16} className="mr-2 text-blue-500" />
              <span>with {concert.supporting_acts}</span>
            </div>
          )}
        </div>
        
        {(concert.attendance || concert.revenue) && (
          <div className="border-t border-zinc-700 pt-4 grid grid-cols-2 gap-4">
            {concert.attendance && (
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">{concert.attendance.split(' / ')[0]}</div>
                <div className="text-xs text-gray-400">Attendance</div>
              </div>
            )}
            
            {concert.revenue && (
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-500">{concert.revenue}</div>
                <div className="text-xs text-gray-400">Revenue</div>
              </div>
            )}
          </div>
        )}
        
        {upcoming && (
          <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
            <ExternalLink size={16} />
            <span>Get Tickets</span>
          </button>
        )}
      </div>
    );
  };

  const upcomingConcerts = [
    ...getYearData('2025').filter(concert => isUpcoming(concert.date, '2025')),
    ...getYearData('2026').filter(concert => isUpcoming(concert.date, '2026'))
  ].slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            FROM ZERO <span className="text-red-500">WORLD TOUR</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join us on our epic world tour spanning 2024-2026. Experience the new era of Linkin Park 
            with Emily Armstrong and Colin Brittain live on stage.
          </p>
          
          {/* Tour Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-red-500/20 rounded-lg p-6 border border-red-500/30">
              <div className="text-3xl font-bold text-red-500 mb-2">{tourData.statistics.number_of_shows_listed}</div>
              <div className="text-gray-300">Total Shows</div>
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-6 border border-red-500/30">
              <div className="text-3xl font-bold text-red-500 mb-2">{tourData.statistics.total_reported_attendance}</div>
              <div className="text-gray-300">Total Attendance</div>
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-6 border border-red-500/30">
              <div className="text-3xl font-bold text-red-500 mb-2">{tourData.statistics.total_reported_revenue}</div>
              <div className="text-gray-300">Total Revenue</div>
            </div>
          </div>
        </div>

        {/* Upcoming Shows Preview */}
        {upcomingConcerts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Next Shows
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingConcerts.map((concert, index) => (
                <TourDateCard 
                  key={`${concert.date}-${concert.city}`} 
                  concert={concert} 
                  year={concert.date.includes('2025') ? '2025' : '2026'} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Year Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-zinc-800/50 rounded-lg p-2 border border-zinc-700">
            {['2024', '2025', '2026'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedYear === year
                    ? 'bg-red-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Tour Dates by Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {getYearData(selectedYear).map((concert, index) => (
            <TourDateCard 
              key={`${selectedYear}-${concert.date}-${concert.city}`} 
              concert={concert} 
              year={selectedYear} 
            />
          ))}
        </div>

        {/* Cancelled Shows Notice */}
        {tourData.cancelled_shows && tourData.cancelled_shows.length > 0 && (
          <div className="bg-zinc-800/30 rounded-lg p-6 border border-zinc-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Calendar className="mr-2 text-yellow-500" />
              Cancelled Shows
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tourData.cancelled_shows.map((show, index) => (
                <div key={index} className="bg-zinc-700/50 rounded-lg p-4 border border-zinc-600">
                  <h4 className="font-bold text-white">{show.city}, {show.country}</h4>
                  <p className="text-gray-400 text-sm">{show.venue}</p>
                  <p className="text-red-400 text-sm mt-1">Reason: {show.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tour Experience */}
        <div className="mt-16 bg-gradient-to-r from-red-500/10 to-black/50 rounded-lg p-8 border border-red-500/30">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">The Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">What to Expect</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Music className="mr-3 text-red-500" size={20} />
                  Classic hits from Hybrid Theory and Meteora
                </li>
                <li className="flex items-center">
                  <Music className="mr-3 text-red-500" size={20} />
                  New tracks from "From Zero" album
                </li>
                <li className="flex items-center">
                  <Users className="mr-3 text-red-500" size={20} />
                  Emily Armstrong's powerful vocals
                </li>
                <li className="flex items-center">
                  <Clock className="mr-3 text-red-500" size={20} />
                  2+ hours of non-stop energy
                </li>
              </ul>
            </div>
            
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src="/images/concert_crowd.jpg" 
                alt="Concert Experience"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold">
                  "The energy is incredible. Emily brings something special while honoring Chester's legacy."
                </p>
                <p className="text-gray-300 text-sm mt-1">- Fan Review, London 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;
