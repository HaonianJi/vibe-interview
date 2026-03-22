---
title: "Weather Dashboard"
difficulty: "medium"
duration: "60 min"
description: "Build a weather dashboard with city search, forecasts, and data visualization"
---

# Weather Dashboard

Build a weather dashboard that displays current conditions and forecasts.

## Requirements

### Core Features (Must Have)
1. **City Search**: Search for a city and display its current weather
2. **Current Conditions**: Temperature, humidity, wind speed, weather description, and an appropriate weather icon
3. **5-Day Forecast**: Show the next 5 days with high/low temperatures and conditions
4. **Recent Searches**: Show last 5 searched cities for quick access
5. **Unit Toggle**: Switch between Celsius and Fahrenheit

### Data Source
Use a free weather API. Options:
- OpenWeatherMap (free tier): https://openweathermap.org/api
- wttr.in (no key needed): https://wttr.in/:help
- Open-Meteo (no key needed): https://open-meteo.com/

### UI Requirements
- Clean layout with clear data hierarchy
- Loading states while fetching data
- Error handling for invalid cities or API failures

## Technical Notes
- You may use any tech stack
- Must make real API calls (no mocked data)
- Handle API errors gracefully
