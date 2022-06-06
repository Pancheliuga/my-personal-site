---
title: 'Streamlit framework for developing interactive dashboards and geospatial visualization'
description: 'Web app for Spatial Data Analysis of Civilian Harm in Ukraine.'
date: '2022-06-03'
tags: ['Streamlit', 'web app', 'geospatial visualization', 'interactive dashboards']
---

I guess a lot of folks who play with data in [Jupyter](https://jupyter.org/) notebooks caught themselves thinking about how to present the results of their analysis. And while working on my last [project](https://pancheliuga.com/projects/spatial-data-analysis-of-civilian-harm-in-ukraine/), I faced the same challenge.

Of course, I like to work in a Jupyter environment, and today we have modern cloud-based solutions like [Google Colab](https://colab.research.google.com/) and [JupyterHub](https://jupyter.org/hub), which open the easy way to share the results of research. But in general, the end-users are students, researchers, and data scientists who can step-by-step reproduce your data analysis.

But what if you want to share your work with a broad audience?

> The answer is "[Streamlit](https://streamlit.io/)". 

Streamlit is a swiss-army knife for people who turn data into insights. This framework was developed *by* data scientists *for* data scientists, and I think that's why Streamlit has a number of fans.

I immediately became a "streamliter" when I got wet with this tool. It took me a few hours to translate the Jupyter notebook to a web app with the ability to interact with code.

There is a huge advantage to presenting data analysis in the web application form. If you work with continuous data, instead of launching the Jupyter environment every time, you just open an app and retrieve updated results.

Feel free to check my [web app for Spatial Data Analysis of Civilian Harm in Ukraine](https://share.streamlit.io/pancheliuga/civilian-harm-app/main/Home.py) and the [Github repo](https://github.com/Pancheliuga/civilian-harm-app) for source code.

P.S. Today Streamlit team announced a new feature - [multipage apps](https://blog.streamlit.io/introducing-multipage-apps/), and it was easy as snap fingers to implement to my app.