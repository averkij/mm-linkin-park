import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, Music } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'formation' | 'album' | 'achievement' | 'tragedy' | 'revival';
}

const About: React.FC = () => {
  const [historyData, setHistoryData] = useState<string>('');

  useEffect(() => {
    fetch('/data/linkin_park_history.md')
      .then(response => response.text())
      .then(data => setHistoryData(data))
      .catch(error => console.error('Error loading history data:', error));
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1996',
      title: 'Band Formation',
      description: 'Linkin Park forms in Agoura Hills, California, founded by Mike Shinoda, Brad Delson, and Rob Bourdon.',
      type: 'formation'
    },
    {
      year: '1999',
      title: 'Chester Joins',
      description: 'Chester Bennington joins as lead vocalist, completing the classic lineup.',
      type: 'formation'
    },
    {
      year: '2000',
      title: 'Hybrid Theory',
      description: 'Debut album releases, achieving Diamond certification and international fame.',
      type: 'album'
    },
    {
      year: '2003',
      title: 'Meteora Success',
      description: 'Second album debuts at #1 on Billboard 200, becoming the third-best-selling album of the year.',
      type: 'album'
    },
    {
      year: '2002-2006',
      title: 'Grammy Wins',
      description: 'Wins Grammy Awards for "Crawling" and "Numb/Encore" collaboration with Jay-Z.',
      type: 'achievement'
    },
    {
      year: '2007-2017',
      title: 'Musical Evolution',
      description: 'Experiments with sound through albums like Minutes to Midnight, A Thousand Suns, and One More Light.',
      type: 'album'
    },
    {
      year: '2017',
      title: 'Chester\'s Passing',
      description: 'The tragic loss of Chester Bennington leads to an indefinite hiatus.',
      type: 'tragedy'
    },
    {
      year: '2023-2024',
      title: 'Revival & From Zero',
      description: 'Band returns with Emily Armstrong and Colin Brittain, releasing "From Zero" album.',
      type: 'revival'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'formation':
        return <Users className="text-blue-500" size={20} />;
      case 'album':
        return <Music className="text-green-500" size={20} />;
      case 'achievement':
        return <Award className="text-yellow-500" size={20} />;
      case 'tragedy':
        return <Calendar className="text-red-500" size={20} />;
      case 'revival':
        return <Users className="text-purple-500" size={20} />;
      default:
        return <Calendar className="text-gray-500" size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'formation':
        return 'border-blue-500 bg-blue-500/10';
      case 'album':
        return 'border-green-500 bg-green-500/10';
      case 'achievement':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'tragedy':
        return 'border-red-500 bg-red-500/10';
      case 'revival':
        return 'border-purple-500 bg-purple-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            OUR <span className="text-red-500">STORY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From humble beginnings in Agoura Hills to becoming one of the world's best-selling artists,
            our journey spans nearly three decades of musical evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Calendar className="mr-3 text-red-500" size={32} />
              Timeline
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-500/30"></div>
              
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-start mb-8">
                  {/* Timeline Node */}
                  <div className="flex-shrink-0 w-12 h-12 bg-black border-2 border-red-500 rounded-full flex items-center justify-center z-10">
                    {getTypeIcon(event.type)}
                  </div>
                  
                  {/* Timeline Content */}
                  <div className={`ml-6 p-6 rounded-lg border-l-4 ${getTypeColor(event.type)} flex-1`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-white">{event.title}</h4>
                      <span className="text-red-500 font-bold text-lg">{event.year}</span>
                    </div>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Band Image & Stats */}
          <div className="space-y-8">
            {/* Band Photo */}
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src="/images/linkin_park_new_lineup_2024.jpg" 
                alt="Linkin Park 2024 Lineup"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-2xl font-bold text-white mb-2">New Chapter, Same Energy</h4>
                <p className="text-gray-300">
                  With Emily Armstrong and Colin Brittain joining the family, we continue to push boundaries.
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
                <div className="text-3xl font-bold text-red-500 mb-2">100M+</div>
                <div className="text-gray-300">Records Sold</div>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
                <div className="text-3xl font-bold text-red-500 mb-2">8</div>
                <div className="text-gray-300">Studio Albums</div>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
                <div className="text-3xl font-bold text-red-500 mb-2">28</div>
                <div className="text-gray-300">Years Active</div>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
                <div className="text-3xl font-bold text-red-500 mb-2">2</div>
                <div className="text-gray-300">Grammy Awards</div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-red-500/10 to-black/50 rounded-lg p-6 border border-red-500/30">
              <h4 className="text-xl font-bold text-white mb-4">Our Mission</h4>
              <p className="text-gray-300 leading-relaxed">
                We've always believed in the power of music to connect people across all boundaries. 
                From our nu-metal roots to electronic experimentation, we continue to evolve while 
                staying true to our core: creating music that resonates with the human experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
