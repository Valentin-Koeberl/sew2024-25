<template>
  <div class="container">
    <div class="app-header">
      <h1 class="app-title">Server Location Explorer</h1>
      <p class="app-subtitle">Discover where servers are located and get detailed information about any domain</p>
    </div>

    <div class="search-box">
      <label for="domain" class="search-label">Enter Domain or IP Address</label>
      <input
          type="text"
          id="domain"
          v-model="domain"
          @input="handleInput"
          placeholder="example.com"
          class="search-input"
      />
      <p class="search-hint">Enter a domain name or IP address to see its location and server details</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Fetching server information...</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      <p class="error-title">Error</p>
      <p class="error-text">{{ error }}</p>
    </div>

    <!-- Results -->
    <div v-if="serverInfo && !loading" class="bento-grid">
      <!-- Server Info Card -->
      <div class="bento-card">
        <div class="bento-card-header">
          <h2 class="bento-card-title">Server Information</h2>
        </div>
        <div class="bento-card-content">
          <div class="info-group">
            <div class="info-item">
              <span class="info-label">Domain</span>
              <span class="info-value">{{ domain }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">IP Address</span>
              <span class="info-value">{{ serverInfo.ip }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Hostname</span>
              <span class="info-value">{{ serverInfo.hostname || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">ISP</span>
              <span class="info-value">{{ serverInfo.isp || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Organization</span>
              <span class="info-value">{{ serverInfo.org || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Card -->
      <div class="bento-card">
        <div class="bento-card-header">
          <h2 class="bento-card-title">Location</h2>
        </div>
        <div class="bento-card-content">
          <div class="info-group">
            <div class="info-item">
              <span class="info-label">Country</span>
              <span class="info-value">{{ serverInfo.country }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Region</span>
              <span class="info-value">{{ serverInfo.regionName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">City</span>
              <span class="info-value">{{ serverInfo.city }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Coordinates</span>
              <span class="info-value">{{ serverInfo.lat }}, {{ serverInfo.lon }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Timezone</span>
              <span class="info-value">{{ serverInfo.timezone }}</span>
            </div>
          </div>

          <div class="highlight-box">
            <p>Your data is stored in {{ serverInfo.city }}, {{ serverInfo.country }}</p>
          </div>
        </div>
      </div>

      <!-- Time Card -->
      <div class="bento-card">
        <div class="bento-card-header">
          <h2 class="bento-card-title">Local Time</h2>
        </div>
        <div class="bento-card-content">
          <div class="stat-card">
            <div class="stat-number">{{ timeInfo.localTime ? timeInfo.localTime.split(', ')[1] : 'N/A' }}</div>
            <div class="stat-label">{{ timeInfo.localTime ? timeInfo.localTime.split(', ')[0] : '' }}</div>
          </div>

          <div class="info-group">
            <div class="info-item">
              <span class="info-label">Sunrise</span>
              <span class="info-value">{{ sunInfo.sunrise || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Sunset</span>
              <span class="info-value">{{ sunInfo.sunset || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Day Length</span>
              <span class="info-value">{{ sunInfo.day_length || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Weather Card -->
      <div class="bento-card">
        <div class="bento-card-header">
          <h2 class="bento-card-title">Weather</h2>
        </div>
        <div class="bento-card-content">
          <div v-if="weatherInfo" class="info-group">
            <div class="stat-card">
              <div class="stat-number">{{ weatherInfo.temperature }}°C</div>
              <div class="stat-label">{{ weatherInfo.weatherDescription }}</div>
            </div>

            <div class="info-item">
              <span class="info-label">Humidity</span>
              <span class="info-value">{{ weatherInfo.humidity }}%</span>
            </div>
            <div class="info-item">
              <span class="info-label">Wind</span>
              <span class="info-value">{{ weatherInfo.windSpeed }} km/h</span>
            </div>
          </div>
          <p v-else class="info-value">Weather data not available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ServerLocationTracker',
  data() {
    return {
      domain: '',
      loading: false,
      error: null,
      serverInfo: null,
      timeInfo: {},
      sunInfo: {},
      weatherInfo: null,
      debounceTimeout: null
    }
  },
  methods: {
    handleInput() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.error = null;

      if (this.domain.length > 3) {
        this.debounceTimeout = setTimeout(() => {
          this.fetchServerInfo();
        }, 500);
      } else {
        this.serverInfo = null;
        this.timeInfo = {};
        this.sunInfo = {};
        this.weatherInfo = null;
      }
    },

    async fetchServerInfo() {
      this.loading = true;
      this.error = null;

      try {
        let ip;
        try {
          const dnsResponse = await fetch(`https://dns-api.org/A/${this.domain}`);
          const dnsData = await dnsResponse.json();

          if (dnsData && dnsData.length > 0) {
            ip = dnsData[0].value;
          } else {

            ip = this.domain;
          }
        } catch (dnsError) {
          console.error("DNS lookup failed:", dnsError);
          ip = this.domain;
        }
        const ipResponse = await axios.get(`http://ip-api.com/json/${ip}`, {
          params: {
            fields: 'status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query,hostname'
          }
        });

        const ipData = ipResponse.data;

        if (ipData.status === 'fail') {
          throw new Error(ipData.message || 'Failed to get IP information');
        }

        this.serverInfo = {
          ip: ipData.query,
          hostname: ipData.hostname,
          country: ipData.country,
          countryCode: ipData.countryCode,
          region: ipData.region,
          regionName: ipData.regionName,
          city: ipData.city,
          zip: ipData.zip,
          lat: ipData.lat,
          lon: ipData.lon,
          timezone: ipData.timezone,
          isp: ipData.isp,
          org: ipData.org,
          as: ipData.as
        };

        await this.fetchTimeInfo(ipData.timezone);

        await this.fetchSunInfo(ipData.lat, ipData.lon);

        await this.fetchWeatherInfo(ipData.lat, ipData.lon);
      } catch (err) {
        console.error('Error fetching server info:', err);
        this.error = err.message || 'Failed to fetch server information. Please check the domain and try again.';

        if (window.location.protocol === 'https:' && err.message && err.message.includes('Mixed Content')) {
          this.error = 'This application is running on HTTPS but IP-API free version requires HTTP. Please either run this app on HTTP or consider upgrading to the IP-API Pro version.';
        }

        this.serverInfo = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchTimeInfo(timezone) {
      try {
        const options = {
          timeZone: timezone,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        this.timeInfo.localTime = formatter.format(new Date());
      } catch (err) {
        console.error('Error fetching time info:', err);
        this.timeInfo = { localTime: 'Unable to retrieve local time' };
      }
    },

    async fetchSunInfo(lat, lon) {
      try {
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`);
        const data = await response.json();

        if (data.status === 'OK') {
          const sunrise = new Date(data.results.sunrise);
          const sunset = new Date(data.results.sunset);

          const options = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: this.serverInfo.timezone
          };

          this.sunInfo = {
            sunrise: sunrise.toLocaleTimeString('en-US', options),
            sunset: sunset.toLocaleTimeString('en-US', options),
            day_length: this.formatDayLength(data.results.day_length)
          };
        } else {
          throw new Error('Failed to get sunrise/sunset information');
        }
      } catch (err) {
        console.error('Error fetching sun info:', err);
        this.sunInfo = {
          sunrise: 'N/A',
          sunset: 'N/A',
          day_length: 'N/A'
        };
      }
    },

    formatDayLength(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    },

    async fetchWeatherInfo(lat, lon) {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
        const data = await response.json();

        if (data && data.current) {
          this.weatherInfo = {
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            weatherDescription: this.getWeatherDescription(data.current.weather_code),
            windSpeed: data.current.wind_speed_10m
          };
        } else {
          throw new Error('Failed to get weather information');
        }
      } catch (err) {
        console.error('Error fetching weather info:', err);
        this.weatherInfo = null;
      }
    },

    getWeatherDescription(code) {
      const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
      };

      return weatherCodes[code] || 'Unknown';
    }
  }
}
</script>

<style>
:root {
  --primary: #3b82f6;
  --primary-light: #93c5fd;
  --primary-dark: #1e40af;
  --secondary: #10b981;
  --accent: #8b5cf6;
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --border-radius: 12px;
  --border-radius-lg: 16px;
  --border-radius-sm: 8px;
}

body {
  background-color: var(--neutral-100);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--neutral-800);
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.1rem;
  color: var(--neutral-600);
  max-width: 600px;
  margin: 0 auto;
}

/* Search Box */
.search-box {
  background-color: white;
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
  border: 1px solid var(--neutral-200);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.search-box:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  border: 2px solid var(--neutral-200);
  font-size: 1.1rem;
  transition: all 0.2s ease;
  background-color: var(--neutral-50);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.search-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--neutral-700);
  font-size: 1rem;
}

.search-hint {
  margin-top: 0.75rem;
  color: var(--neutral-600);
  font-size: 0.875rem;
}

.bento-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  border: 1px solid var(--neutral-200);
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.bento-card-header {
  padding: 1.25rem;
  background: linear-gradient(45deg, var(--primary-dark), var(--primary));
  color: white;
}

.bento-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.bento-card-content {
  padding: 1.5rem;
}

/* Info groups */
.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--neutral-200);
  padding-bottom: 0.5rem;
}

.info-label {
  font-weight: 600;
  color: var(--neutral-700);
}

.info-value {
  color: var(--neutral-800);
}

/* Status indicators */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-online {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--secondary);
}

.status-error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid var(--neutral-200);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: var(--neutral-600);
  font-size: 1rem;
}

/* Error message */
.error-message {
  background-color: #fee2e2;
  border-left: 4px solid #ef4444;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
}

.error-title {
  color: #b91c1c;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.error-text {
  color: #991b1b;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .app-title {
    font-size: 2rem;
  }

  .search-box {
    padding: 1.5rem;
  }
}

/* Weather icon styles */
.weather-icon {
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
}

.weather-row {
  display: flex;
  align-items: center;
}

/* Stat cards */
.stat-card {
  background: linear-gradient(45deg, var(--primary-light), var(--accent));
  border-radius: var(--border-radius);
  padding: 1.5rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 0;
}

/* Highlight boxes */
.highlight-box {
  background: linear-gradient(to right, var(--primary-light), var(--primary));
  color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-top: 1rem;
  position: relative;
}

.highlight-box::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 20px;
  width: 16px;
  height: 16px;
  background: var(--primary);
  transform: rotate(45deg);
}
</style>