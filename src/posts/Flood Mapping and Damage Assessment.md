---
title: 'Flood Mapping and Damage Assessment'
description: 'Consequences of intentionally flooding the countryside in the Irpin River basin northwest of Kyiv.'
date: '2022-05-02'
tags: ['gee', 'spatial data analysis', 'flood']
---

As a part of my learning journey in Google Earth Engine, I tried myself in a real-world case. In the first days of the war, Ukrainian forces flooded the area in the Irpin River basin northwest of Kyiv. There is <a href="https://www.nytimes.com/2022/04/27/world/europe/ukraine-russia-war-flood-infrastructure.html" target="_blank">an excellent article</a> in The New York Times about why it happened and how efficient it was in terms of military strategy.

The main goal of this project was to implement my Google Earth Engine skills and dive deeper into SAR remote sensing analysis techniques. 

Using SAR data on flood mapping is a standard and reliable method for determining the extent of significant floods. The main advantage of using microwave data is that it can penetrate cloud cover, operate in any weather conditions, and provide timely and crucial information both day and night since it is not dependent on sunlight for reflectance.

In this case study, I used well-known <a href='https://www.space4water.org/capacity-building-and-training-material/recommended-practice-flood-mapping-and-damage-assessment' target="_blank">recommended practices</a> by [United Nations Office for Outer Space Affairs](https://www.space4water.org/stakeholder/united-nations-office-outer-space-affairs).

According to the materials I mentioned above ⬆️, the workflow looks like this:

![workflow schema](/images/projects/flood_mapping_GEE_workflow_1.png)

The [GEE script](https://github.com/Pancheliuga/flood-mapping-damage-assessment/blob/main/gee-script) with comments you can find on my [GitHub repo](https://github.com/Pancheliuga/flood-mapping-damage-assessment). Or, if you have a GEE account, follow the [link](https://code.earthengine.google.com/82d3678ce0faec31838fb80130d04b3d).

Visualization is a crucial part of geospatial data analysis, so I made a [GEE App](https://pancheliuga.users.earthengine.app/view/flood-mapping) where you can find 'numbers' and examine existing layers to understand the region of interest better. 

In conclusion, I would like to emphasize the study's purpose of this project. With the existing limitations of using current Flood Mapping and Damage Assessment techniques, I want to point out the difficulties of detecting floods in urban or densely vegetated areas. But it could be solved using high-resolution SAR data from new space 🛰️ companies like [ICEYE](https://www.iceye.com/) or [Capella Space](https://www.capellaspace.com/).