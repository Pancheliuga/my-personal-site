---
title: 'Geospatial Data Analysis of Civilian Harm in Ukraine'
summary: 'Web application for interactive dashboards and geospatial visualization of Civilian Harm in Ukraine.'
displayOrder: 1
featured: true
hero:
  image: '/images/projects/SDA-civil-harm-app.jpg'
  imageAlt: 'SDA civil harm app.'
keyFacts:
  - icon: '🌎'
    description: 'Spatial Data Science'
  - icon: '🧱'
    description: 'Data munging (pandas/geopandas)' 
  - icon: '📊'
    description: 'Statistical Data Visualization (plotly)'
  - icon: '🗺️'
    description: 'Interactive maps (folium)'
  - icon: '🐍'
    description: 'Python'
  - icon: '👑'
    description: 'Streamlit'
Links:
  url: 'https://share.streamlit.io/pancheliuga/civilian-harm-app/main/Home.py'
  title: 'Launch app'
---

The main idea of this project was to present the results of my previous work - [Spatial Data Analysis of Civilian Harm in Ukraine](https://pancheliuga.com/projects/spatial-data-analysis-of-civilian-harm-in-ukraine/), which was made in the Jupyter notebook, to a broad audience.

The web application looks suitable for this case for a few reasons:
- the data used in this analysis is continuous, and instead of launching the Jupyter environment every time, you open an app and retrieve updated results;
- the web app provides an additional interactive tool for data analysis;
- easy to share the results of work with "no-data science" people,

and in general, the web-based application works on a variety of devices on the web browser.

This web app combines different tools for data analysis:
1. Charts & Graphs.
2. Heatmap.
3. Choropleth Map. 
4. Data Grid.

Please visit the [web app for Geospatial Data Analysis of Civilian Harm in Ukraine](https://share.streamlit.io/pancheliuga/civilian-harm-app/main/Home.py) to see the work results or find the [Github repo](https://github.com/Pancheliuga/civilian-harm-app) for the source code.