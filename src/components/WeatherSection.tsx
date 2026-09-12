import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Wind, RefreshCw, ThermometerSun, Sun, CloudRain, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeatherData {
  current: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

const getWeatherIcon = (code: number) => {
  if (code === 0 || code === 1) return Sun;
  if (code >= 2 && code <= 3) return Cloud;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return Snowflake;
  return Cloud;
};

const WeatherSection = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=55.6761&longitude=12.5683&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FBerlin"
      );
      
      if (!response.ok) throw new Error("Failed to fetch weather");
      
      const data = await response.json();
      setWeather({
        current: data.current_weather,
        daily: data.daily
      });
    } catch (err) {
      setError("Could not load weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Vejret i København</h2>
          <p className="text-sm text-muted-foreground">Live data fra Open-Meteo API</p>
        </div>
        <Button
          onClick={fetchWeather}
          disabled={loading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Opdater
        </Button>
      </div>

      {error ? (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
          {error}
        </div>
      ) : (
        <>
          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 mb-1 font-medium">Aktuel temperatur</p>
                <div className="text-5xl sm:text-6xl font-display font-bold">
                  {loading ? "--" : `${weather?.current.temperature}°C`}
                </div>
              </div>
              <div className="text-right">
                <ThermometerSun className="w-14 h-14 sm:w-16 sm:h-16 text-amber-300 mb-2 inline-block" />
                <div className="flex items-center justify-end gap-2 text-sm text-blue-100">
                  <Wind className="w-4 h-4" />
                  {loading ? "--" : `${weather?.current.windspeed} km/t`}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5-Day Forecast */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-foreground">5-dages vejrudsigt</h3>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {weather?.daily.time.slice(0, 5).map((date, index) => {
                const dayName = new Date(date).toLocaleDateString("da-DK", { weekday: "short" });
                const WeatherIcon = getWeatherIcon(weather.daily.weathercode[index]);
                
                return (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-card rounded-xl p-3 sm:p-4 text-center border border-border shadow-xs hover:shadow-md transition-shadow"
                  >
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 capitalize">{dayName}</p>
                    <WeatherIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
                      {weather.daily.temperature_2m_max[index]}°
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {weather.daily.temperature_2m_min[index]}°
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default WeatherSection;
