import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Music, Users, Award } from 'lucide-react';

interface NewsItem {
  title: string;
  date: string;
  summary: string;
  category: 'album' | 'tour' | 'band' | 'achievement';
  image?: string;
  link?: string;
}

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<string>('');

  useEffect(() => {
    fetch('/data/linkin_park_news_and_tour.md')
      .then(response => response.text())
      .then(data => setNewsData(data))
      .catch(error => console.error('Error loading news data:', error));
  }, []);

  const newsItems: NewsItem[] = [
    {
      title: '"From Zero" Album Released',
      date: 'November 15, 2024',
      summary: 'Linkin Park returns with their eighth studio album "From Zero," marking a new chapter with Emily Armstrong as co-lead vocalist and Colin Brittain on drums.',
      category: 'album',
      image: '/images/from_zero_album_art.png'
    },
    {
      title: 'From Zero World Tour 2024-2026',
      date: 'September 11, 2024',
      summary: 'The band kicks off their massive world tour in Inglewood, with dates spanning across North America, Europe, Asia, and South America through 2026.',
      category: 'tour',
      image: '/images/concert_stage.jpg'
    },
    {
      title: 'Emily Armstrong Joins as Co-Lead Vocalist',
      date: 'September 5, 2024',
      summary: 'Dead Sara frontwoman Emily Armstrong officially joins Linkin Park as co-lead vocalist, bringing her powerful voice to the band\'s new era.',
      category: 'band',
      image: '/images/emily_armstrong.jpeg'
    },
    {
      title: 'Colin Brittain Named New Drummer',
      date: 'September 5, 2024',
      summary: 'Accomplished producer and drummer Colin Brittain joins the band, known for his work with Papa Roach and 5 Seconds of Summer.',
      category: 'band',
      image: '/images/band_equipment.jpg'
    },
    {
      title: 'Return After 7-Year Hiatus',
      date: 'September 5, 2024',
      summary: 'Linkin Park officially announces their return to music after a seven-year hiatus following Chester Bennington\'s passing in 2017.',
      category: 'band',
      image: '/images/linkin_park_new_lineup_2024.jpg'
    },
    {
      title: 'Sold Out Shows Worldwide',
      date: 'October 2024',
      summary: 'The From Zero World Tour sees unprecedented demand with multiple sold-out shows across major venues worldwide, generating over $46 million in revenue.',
      category: 'tour',
      image: '/images/concert_crowd.jpg'
    }
  ];

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'album':
        return { icon: Music, color: 'text-green-500 bg-green-500/10 border-green-500/30', label: 'Album' };
      case 'tour':
        return { icon: Calendar, color: 'text-blue-500 bg-blue-500/10 border-blue-500/30', label: 'Tour' };
      case 'band':
        return { icon: Users, color: 'text-red-500 bg-red-500/10 border-red-500/30', label: 'Band' };
      case 'achievement':
        return { icon: Award, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30', label: 'Achievement' };
      default:
        return { icon: Calendar, color: 'text-gray-500 bg-gray-500/10 border-gray-500/30', label: 'News' };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const NewsCard: React.FC<{ item: NewsItem; index: number }> = ({ item, index }) => {
    const { icon: Icon, color, label } = getCategoryInfo(item.category);
    const isLarge = index === 0; // Make first news item larger

    return (
      <article className={`group bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 ${
        isLarge ? 'md:col-span-2 lg:col-span-3' : ''
      }`}>
        {item.image && (
          <div className={`relative overflow-hidden ${isLarge ? 'h-64 md:h-80' : 'h-48'}`}>
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* Category Badge */}
            <div className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full border ${color}`}>
              <Icon size={16} />
              <span className="text-sm font-semibold">{label}</span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <time className="text-red-500 font-semibold text-sm">
              {formatDate(item.date)}
            </time>
            <Calendar size={16} className="text-gray-400" />
          </div>
          
          <h3 className={`font-bold text-white mb-3 ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {item.title}
          </h3>
          
          <p className="text-gray-300 leading-relaxed mb-4">{item.summary}</p>
          
          {item.link && (
            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 font-semibold transition-colors"
            >
              <span>Read More</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            LATEST <span className="text-red-500">NEWS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest happenings, tour announcements, and milestones 
            in Linkin Park's ongoing journey.
          </p>
        </div>

        {/* Featured News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {newsItems.map((item, index) => (
            <NewsCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* News Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {newsItems.filter(item => item.category === 'album').length}
            </div>
            <div className="text-gray-300">Album Updates</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {newsItems.filter(item => item.category === 'tour').length}
            </div>
            <div className="text-gray-300">Tour News</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {newsItems.filter(item => item.category === 'band').length}
            </div>
            <div className="text-gray-300">Band Updates</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">2024</div>
            <div className="text-gray-300">Return Year</div>
          </div>
        </div>

        {/* Important Announcement */}
        <div className="bg-gradient-to-r from-red-500/10 to-black/50 rounded-lg p-8 border border-red-500/30">
          <div className="flex items-center justify-center mb-6">
            <Music className="text-red-500 mr-3" size={32} />
            <h3 className="text-3xl font-bold text-white">From Zero Era</h3>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              After seven years, Linkin Park has returned stronger than ever. With Emily Armstrong's 
              powerful vocals and Colin Brittain's dynamic drumming, we're entering a new chapter 
              while honoring Chester's legacy and our musical roots.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-red-500 font-bold mb-2">New Album</h4>
                <p className="text-gray-300 text-sm">"From Zero" available worldwide</p>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-red-500 font-bold mb-2">World Tour</h4>
                <p className="text-gray-300 text-sm">85+ shows across 4 continents</p>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-red-500 font-bold mb-2">New Members</h4>
                <p className="text-gray-300 text-sm">Emily & Colin join the family</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
