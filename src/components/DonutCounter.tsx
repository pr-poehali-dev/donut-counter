import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: string;
  title: string;
  description: string;
  target: number;
  icon: string;
  unlocked: boolean;
}

const DonutCounter: React.FC = () => {
  const [donutCount, setDonutCount] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'Первый укус', description: 'Съешь свой первый пончик', target: 1, icon: 'Cookie', unlocked: false },
    { id: '2', title: 'Сладкоежка', description: 'Съешь 5 пончиков', target: 5, icon: 'Heart', unlocked: false },
    { id: '3', title: 'Любитель пекарни', description: 'Съешь 10 пончиков', target: 10, icon: 'Star', unlocked: false },
    { id: '4', title: 'Мастер пончиков', description: 'Съешь 25 пончиков', target: 25, icon: 'Crown', unlocked: false },
    { id: '5', title: 'Легенда кафе', description: 'Съешь 50 пончиков', target: 50, icon: 'Trophy', unlocked: false },
  ]);

  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const updatedAchievements = achievements.map(achievement => {
      const wasUnlocked = achievement.unlocked;
      const isNowUnlocked = donutCount >= achievement.target;
      
      if (!wasUnlocked && isNowUnlocked) {
        setNewlyUnlocked(prev => [...prev, achievement.id]);
        setTimeout(() => {
          setNewlyUnlocked(prev => prev.filter(id => id !== achievement.id));
        }, 3000);
      }
      
      return {
        ...achievement,
        unlocked: isNowUnlocked
      };
    });
    
    setAchievements(updatedAchievements);
  }, [donutCount]);

  const addDonut = () => {
    setDonutCount(prev => prev + 1);
  };

  const resetCounter = () => {
    setDonutCount(0);
    setAchievements(prev => prev.map(achievement => ({ ...achievement, unlocked: false })));
  };

  const getMotivationalMessage = () => {
    if (donutCount === 0) return "Пора начать сладкое путешествие!";
    if (donutCount < 5) return "Отличное начало, продолжай!";
    if (donutCount < 10) return "Ты настоящий сладкоежка!";
    if (donutCount < 25) return "Впечатляющий результат!";
    if (donutCount < 50) return "Ты мастер пончиков!";
    return "Невероятно! Ты легенда этого кафе!";
  };

  return (
    <div className="min-h-screen bg-vintage-warmwhite p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-vintage font-bold text-vintage-darkbrown mb-4 tracking-wide">
            DONUT COUNTER
          </h1>
          <p className="text-vintage-brown text-xl font-serif">
            Винтажная пекарня • Est. 1952
          </p>
        </div>

        {/* Main Counter Card */}
        <Card className="mb-8 bg-vintage-cream border-vintage-brown border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-4xl font-vintage text-vintage-darkbrown">
              Счетчик пончиков
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Donut Display */}
            <div className="relative">
              <div className="text-8xl font-bold text-vintage-brown mb-4 animate-pulse">
                {donutCount}
              </div>
              <div className="text-6xl mb-6">🍩</div>
            </div>

            {/* Motivational Message */}
            <p className="text-vintage-darkbrown text-lg font-serif italic">
              {getMotivationalMessage()}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={addDonut}
                className="bg-vintage-brown hover:bg-vintage-darkbrown text-vintage-cream px-8 py-4 text-xl font-serif rounded-lg transform transition-transform hover:scale-105"
              >
                <Icon name="Plus" className="mr-2" size={24} />
                Съесть пончик
              </Button>
              <Button 
                onClick={resetCounter}
                variant="outline"
                className="border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream px-6 py-4 text-lg font-serif rounded-lg"
              >
                <Icon name="RotateCcw" className="mr-2" size={20} />
                Сбросить
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card className="bg-vintage-cream border-vintage-brown border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-vintage text-vintage-darkbrown text-center">
              🏆 Достижения пекарни
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-vintage-gold border-vintage-brown shadow-md'
                      : 'bg-vintage-warmwhite border-vintage-sand opacity-60'
                  } ${
                    newlyUnlocked.includes(achievement.id) 
                      ? 'animate-pulse ring-4 ring-vintage-gold' 
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      <Icon name={achievement.icon as any} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-serif font-bold text-lg ${
                        achievement.unlocked ? 'text-vintage-darkbrown' : 'text-vintage-brown'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-vintage-brown' : 'text-vintage-sand'
                      }`}>
                        {achievement.description}
                      </p>
                      <Badge 
                        variant={achievement.unlocked ? "default" : "secondary"}
                        className={`mt-2 ${
                          achievement.unlocked 
                            ? 'bg-vintage-brown text-vintage-cream' 
                            : 'bg-vintage-sand text-vintage-brown'
                        }`}
                      >
                        {donutCount}/{achievement.target}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Notification */}
        {newlyUnlocked.length > 0 && (
          <div className="fixed top-4 right-4 z-50">
            {newlyUnlocked.map((achievementId) => {
              const achievement = achievements.find(a => a.id === achievementId);
              return achievement ? (
                <div
                  key={achievementId}
                  className="bg-vintage-gold border-2 border-vintage-brown rounded-lg p-4 shadow-lg animate-bounce mb-2"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Trophy" className="text-vintage-brown" size={24} />
                    <div>
                      <p className="font-serif font-bold text-vintage-darkbrown">
                        Достижение разблокировано!
                      </p>
                      <p className="text-vintage-brown text-sm">
                        {achievement.title}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutCounter;