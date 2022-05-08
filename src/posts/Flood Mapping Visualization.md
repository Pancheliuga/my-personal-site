---
title: 'Flood Mapping Visualization'
description: 'Times series animation and a split-panel map as tools for flood visualization.'
date: '2022-05-08'
tags: ['gee', 'geemap', 'flood', 'sar', 'visualization']
---

In addition to my previous [post about Flood Mapping and Damage Assessment](https://pancheliuga.com/blog/flood-mapping-and-damage-assessment/), I decided to make two types of satellite imagery visualization:
- Times series animation with SAR images;
- Split-panel map with RGB Bands ("True color").

#### Part 1.

Time series animations of Earth observation imagery are captivating and engaging (just look at the following image of the resulting animation).

![flood time-series animation](/images/projects/flood_full.gif)

People tend to perceive visual information in "RGB mode 🌈", and we can also visualize a SAR image as a multi-band RGB image. There is a common trick to using the VV band in the red channel, the VH band in the green channel, and the VV/VH in the blue channel.

On my [GitHub repo](https://github.com/Pancheliuga/flood-mapping-damage-assessment), you can find the [Google Earth Engine script](https://github.com/Pancheliuga/flood-mapping-damage-assessment/blob/main/time-series-viz), which produces time series animations using Sentinel-1 SAR GRD data.
Or, if you have a GEE account, follow the [link](https://code.earthengine.google.com/0dde2745bb98b01e323193ad3ab7494b).

#### Part 2.

A split-panel map is one of the easiest ways for the human eye to detect changes on the earth's surface. But before looking at two Sentinel-2 MSI images in split-panel view, we face a problem... Clouds ☁️. 

> When you start working with optical images in Earth observation, you begin to think about clouds from a new perspective 🤔.

To handle this problem, I implemented [Sentinel-2 Cloud Masking with the s2cloudless](https://developers.google.com/earth-engine/tutorials/community/sentinel-2-s2cloudless) technic. Clouds are identified from the S2 cloud probability dataset (s2cloudless), and shadows are defined by cloud projection intersection with low-reflectance near-infrared (NIR) pixels.

All stuff I have done in [geemap](https://geemap.org/) - a Python package for interactive mapping with Google Earth Engine, ipyleaflet, and ipywidgets.

See [source code (jupyter notebook)](https://github.com/Pancheliuga/flood-mapping-damage-assessment/blob/main/split-panel-viz.ipynb) and final visualization ⬇️.

<iframe src="/assets/split-panel-viz.html" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="800" scrolling="auto" allow="geolocation"></iframe>
