---
title: 'Flood Mapping and Damage Assessment'
summary: 'Consequences of intentionally flooding the countryside in the Irpin River basin northwest of Kyiv.'
displayOrder: 2
featured: true
hero:
  image: '/images/projects/flood.gif'
  imageAlt: 'Times Series Animation of flood.'
keyFacts:
  - icon: '🌎'
    description: 'Google Earth Engine'
  - icon: '🗺️'
    description: 'SAR RGB visualization'
  - icon: '🌫️'
    description: 'SAR change detection'
  - icon: '🛰️'
    description: 'Sentinel-1/2 data' 
  - icon: '🌐'
    description: 'Earth Observation'  
  - icon: 'JS'
    description: 'JavaScript'
  - icon: '🐍'
    description: 'geemap - Python package'
Links:
  url: 'https://pancheliuga.users.earthengine.app/view/flood-mapping'
  title: 'Launch app'
---

### Part 1. Spatial Data Analysis

In the first days of the war, Ukrainian forces flooded the area in the Irpin River basin northwest of Kyiv. There is [an excellent article](https://www.nytimes.com/2022/04/27/world/europe/ukraine-russia-war-flood-infrastructure.html) in The New York Times about why it happened and how efficient it was in terms of military strategy.

The main goal of this project was to implement my Google Earth Engine skills and dive deeper into SAR remote sensing analysis techniques. 

Using SAR data on flood mapping is a standard and reliable method for determining the extent of significant floods. The main advantage of using microwave data is that it can penetrate cloud cover, operate in any weather conditions, and provide timely and crucial information both day and night since it is not dependent on sunlight for reflectance.

In this case study, I used well-known [recommended practices](https://www.space4water.org/capacity-building-and-training-material/recommended-practice-flood-mapping-and-damage-assessment) by [United Nations Office for Outer Space Affairs](https://www.space4water.org/stakeholder/united-nations-office-outer-space-affairs).

According to the materials I mentioned above ⬆️, the workflow looks like this:

![workflow schema](/images/projects/flood_mapping_GEE_workflow_1.png)

The [GEE script](https://github.com/Pancheliuga/flood-mapping-damage-assessment/blob/main/gee-script) with comments you can find on my [GitHub repo](https://github.com/Pancheliuga/flood-mapping-damage-assessment). Or, if you have a GEE account, follow the [link](https://code.earthengine.google.com/82d3678ce0faec31838fb80130d04b3d).

I would like to emphasize the study's purpose of this project. With the existing limitations of using current Flood Mapping and Damage Assessment techniques, I want to point out the difficulties of detecting floods in urban or densely vegetated areas. But it could be solved using high-resolution SAR data from new space 🛰️ companies like [ICEYE](https://www.iceye.com/) or [Capella Space](https://www.capellaspace.com/).

Open [GEE App](https://pancheliuga.users.earthengine.app/view/flood-mapping) and find result 'numbers' and examine existing data layers used for analysis. 

### Part 2. Visualization

Visualization is a crucial part of geospatial work. For current project I utilized two types of satellite imagery visualization:
- Times series animation with SAR images;
- Split-panel map with RGB Bands ("True color").

Time series animations of Earth observation imagery are captivating and engaging (just look at the following image of the resulting animation).

![flood time-series animation](/images/projects/flood_full.gif)

People tend to perceive visual information in "RGB mode 🌈", and we can also visualize a SAR image as a multi-band RGB image. There is a common trick to using the VV band in the red channel, the VH band in the green channel, and the VV/VH in the blue channel.

On my [GitHub repo](https://github.com/Pancheliuga/flood-mapping-damage-assessment), you can find the [Google Earth Engine script](https://github.com/Pancheliuga/flood-mapping-damage-assessment/blob/main/time-series-viz), which produces time series animations using Sentinel-1 SAR GRD data.
Or, if you have a GEE account, follow the [link](https://code.earthengine.google.com/0dde2745bb98b01e323193ad3ab7494b).

A split-panel map is one of the easiest ways for the human eye to detect changes on the earth's surface. But before looking at two Sentinel-2 MSI images in split-panel view, we face a problem... Clouds ☁️. 

> When you start working with optical images in Earth observation, you begin to think about clouds from a new perspective 🤔.

To handle this problem, I implemented [Sentinel-2 Cloud Masking with the s2cloudless](https://developers.google.com/earth-engine/tutorials/community/sentinel-2-s2cloudless) technic. Clouds are identified from the S2 cloud probability dataset (s2cloudless), and shadows are defined by cloud projection intersection with low-reflectance near-infrared (NIR) pixels.

All stuff I have done in [geemap](https://geemap.org/) - a Python package for interactive mapping with Google Earth Engine, ipyleaflet, and ipywidgets.

See [source code (jupyter notebook)](https://github.com/Pancheliuga/flood-mapping-damage-assessment/blob/main/split-panel-viz.ipynb) and final visualization ⬇️.

<iframe src="/assets/split-panel-viz.html" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="800" scrolling="auto" allow="geolocation"></iframe>