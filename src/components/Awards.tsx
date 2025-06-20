import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Medal, Crown, TrendingUp } from 'lucide-react';

interface AwardItem {
  year: string;
  award: string;
  category: string;
  work?: string;
  organization: string;
  type: 'grammy' | 'mtv' | 'ama' | 'sales' | 'other';
}

const Awards: React.FC = () => {
  const [awardsData, setAwardsData] = useState<string>('');

  useEffect(() => {
    fetch('/data/linkin_park_awards.md')
      .then(response => response.text())
      .then(data => setAwardsData(data))
      .catch(error => console.error('Error loading awards data:', error));
  }, []);

  const awards: AwardItem[] = [
    // Grammy Awards
    {
      year: '2002',
      award: 'Best Hard Rock Performance',
      category: 'Crawling',
      organization: 'Grammy Awards',
      type: 'grammy'
    },
    {
      year: '2006',
      award: 'Best Rap/Sung Collaboration',
      category: 'Numb/Encore (with Jay-Z)',
      organization: 'Grammy Awards',
      type: 'grammy'
    },
    
    // MTV Video Music Awards
    {
      year: '2002',
      award: 'Best Rock Video',
      category: 'In the End',
      organization: 'MTV Video Music Awards',
      type: 'mtv'
    },
    {
      year: '2003',
      award: 'Best Rock Video',
      category: 'Somewhere I Belong',
      organization: 'MTV Video Music Awards',
      type: 'mtv'
    },
    {
      year: '2004',
      award: 'Viewer\'s Choice Award',
      category: 'Breaking the Habit',
      organization: 'MTV Video Music Awards',
      type: 'mtv'
    },
    {
      year: '2008',
      award: 'Best Rock Video',
      category: 'Shadow of the Day',
      organization: 'MTV Video Music Awards',
      type: 'mtv'
    },
    
    // American Music Awards
    {
      year: '2003',
      award: 'Favorite Alternative Artist',
      category: '',
      organization: 'American Music Awards',
      type: 'ama'
    },
    {
      year: '2004',
      award: 'Favorite Alternative Artist',
      category: '',
      organization: 'American Music Awards',
      type: 'ama'
    },
    {
      year: '2007',
      award: 'Favorite Alternative Artist',
      category: '',
      organization: 'American Music Awards',
      type: 'ama'
    },
    {
      year: '2008',
      award: 'Favorite Alternative Artist',
      category: '',
      organization: 'American Music Awards',
      type: 'ama'
    },
    {
      year: '2012',
      award: 'Favorite Alternative Artist',
      category: '',
      organization: 'American Music Awards',
      type: 'ama'
    },
    
    // Sales Achievements
    {
      year: '2000',
      award: 'Diamond Certification',
      category: 'Hybrid Theory',
      organization: 'RIAA',
      type: 'sales'
    },
    {
      year: '2024',
      award: '100+ Million Records Sold',
      category: 'Worldwide',
      organization: 'Global Sales',
      type: 'sales'
    }
  ];

  const getAwardIcon = (type: string) => {
    switch (type) {
      case 'grammy':
        return <Trophy className="text-yellow-500" size={32} />;
      case 'mtv':
        return <Star className="text-red-500" size={32} />;
      case 'ama':
        return <Award className="text-blue-500" size={32} />;
      case 'sales':
        return <Crown className="text-green-500" size={32} />;
      default:
        return <Medal className="text-purple-500" size={32} />;
    }
  };

  const getAwardColor = (type: string) => {
    switch (type) {
      case 'grammy':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'mtv':
        return 'border-red-500 bg-red-500/10';
      case 'ama':
        return 'border-blue-500 bg-blue-500/10';
      case 'sales':
        return 'border-green-500 bg-green-500/10';
      default:
        return 'border-purple-500 bg-purple-500/10';
    }
  };

  const achievementStats = [
    { icon: Trophy, label: 'Grammy Awards', value: '2', color: 'text-yellow-500' },
    { icon: Star, label: 'MTV VMAs', value: '4', color: 'text-red-500' },
    { icon: Award, label: 'American Music Awards', value: '5', color: 'text-blue-500' },
    { icon: Crown, label: 'Albums at #1', value: '6', color: 'text-green-500' }
  ];

  const AwardCard: React.FC<{ award: AwardItem }> = ({ award }) => (
    <div className={`bg-zinc-800/50 rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${getAwardColor(award.type)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getAwardIcon(award.type)}
          <div>
            <h3 className="text-xl font-bold text-white">{award.award}</h3>
            <p className="text-gray-400 text-sm">{award.organization}</p>
          </div>
        </div>
        <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">
          {award.year}
        </span>
      </div>
      
      {award.category && (
        <div className="bg-black/30 rounded-lg p-3">
          <p className="text-gray-300 font-semibold">{award.category}</p>
        </div>
      )}
    </div>
  );

  const majorAchievements = [
    {
      title: 'Diamond Certification',
      description: 'Hybrid Theory achieved Diamond status, selling over 10 million copies in the US alone.',
      icon: Crown,
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    },
    {
      title: '100+ Million Records',
      description: 'Worldwide record sales exceeding 100 million, making us one of the best-selling artists ever.',
      icon: TrendingUp,
      color: 'text-green-500 bg-green-500/10 border-green-500/30'
    },
    {
      title: 'Grammy Recognition',
      description: 'Two Grammy Awards recognizing our innovation in rock and rap collaboration.',
      icon: Trophy,
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    },
    {
      title: 'Chart Dominance',
      description: 'Six albums reaching #1 on the Billboard 200, spanning over two decades.',
      icon: Star,
      color: 'text-red-500 bg-red-500/10 border-red-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            AWARDS & <span className="text-red-500">ACHIEVEMENTS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Recognition for our contributions to music, from Grammy wins to record-breaking sales, 
            spanning over two decades of innovation and artistic excellence.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {achievementStats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700 hover:border-red-500/50 transition-all duration-300">
              <Icon className={`mx-auto mb-3 ${color}`} size={48} />
              <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
              <div className="text-gray-300 font-semibold">{label}</div>
            </div>
          ))}
        </div>

        {/* Major Achievements Showcase */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Major Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {majorAchievements.map((achievement, index) => (
              <div key={index} className={`rounded-lg p-6 border ${achievement.color}`}>
                <div className="flex items-center mb-4">
                  <achievement.icon size={32} className={achievement.color.split(' ')[0]} />
                  <h4 className="text-xl font-bold text-white ml-3">{achievement.title}</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards by Category */}
        <div className="space-y-12">
          {/* Grammy Awards */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Trophy className="mr-3 text-yellow-500" size={32} />
              Grammy Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.filter(award => award.type === 'grammy').map((award, index) => (
                <AwardCard key={`grammy-${index}`} award={award} />
              ))}
            </div>
          </div>

          {/* MTV Video Music Awards */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Star className="mr-3 text-red-500" size={32} />
              MTV Video Music Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.filter(award => award.type === 'mtv').map((award, index) => (
                <AwardCard key={`mtv-${index}`} award={award} />
              ))}
            </div>
          </div>

          {/* American Music Awards */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Award className="mr-3 text-blue-500" size={32} />
              American Music Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {awards.filter(award => award.type === 'ama').map((award, index) => (
                <AwardCard key={`ama-${index}`} award={award} />
              ))}
            </div>
          </div>

          {/* Sales Achievements */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Crown className="mr-3 text-green-500" size={32} />
              Sales & Commercial Success
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.filter(award => award.type === 'sales').map((award, index) => (
                <AwardCard key={`sales-${index}`} award={award} />
              ))}
            </div>
          </div>
        </div>

        {/* Legacy Statement */}
        <div className="mt-16 bg-gradient-to-r from-red-500/10 to-black/50 rounded-lg p-8 border border-red-500/30">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Legacy</h3>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              These awards represent more than recognition – they're a testament to our connection with fans worldwide. 
              From nu-metal pioneers to genre-defying artists, we've always pushed boundaries while staying true to our core: 
              creating music that resonates with the human experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">24</div>
                <div className="text-gray-300">Years of Excellence</div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">11+</div>
                <div className="text-gray-300">Major Awards</div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">∞</div>
                <div className="text-gray-300">Fan Impact</div>
              </div>
            </div>
            
            <p className="text-gray-400 mt-6 italic">
              "Awards are wonderful, but the real achievement is touching lives through music." - Mike Shinoda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
