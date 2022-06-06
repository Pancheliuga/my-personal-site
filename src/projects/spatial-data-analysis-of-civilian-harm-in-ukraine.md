---
title: 'Spatial Data Analysis of Civilian Harm in Ukraine'
summary: 'Geospatial data science approach for statistical visualization.'
displayOrder: 3
featured: true
hero:
  image: '/images/projects/heatmap.png'
  imageAlt: 'Heatmap of incidents.'
keyFacts:
  - icon: '🌎'
    description: 'Spatial Data Science'
  - icon: '🪐'
    description: 'Jupyter Lab'
  - icon: '🧱'
    description: 'Data munging (pandas/geopandas)' 
  - icon: '📊'
    description: 'Statistical Data Visualization (plotly)'
  - icon: '🗺️'
    description: 'Interactive maps (folium)'
  - icon: '🐍'
    description: 'Python'
Links:
  url: 'https://github.com/Pancheliuga/sda-civilian-harm'
  title: 'See repo'
---

This project aims to extract statistical insights and produce a meaningful cartographic visualization of civilian harm in Ukraine.

The data for this project based on incidents in Ukraine that have resulted in potential civilian harm. This data began collection by the OSINT group [Bellingcat](https://www.bellingcat.com/) on February 24, 2022, and intends to be a living document that will continue to be updated as long as the war persists. Therefore, this data is not an exhaustive list of civilian harm in Ukraine but rather a representation of all incidents that Bellingcat has collected and determined the exact locations.

All computations were made in the Jupyter notebook, and I really like Jupyter for its ability to represent your work without additional storytelling in the article.

#### Required modules


```python
import pandas as pd 
import geopandas as gpd
import json
import plotly.express as px
import plotly.graph_objects as go
import contextily as cx
import folium
from folium.plugins import HeatMap
```

### Importing and exploring the data

#### Importing json file


```python
fp = '../data/ukr-civharm-2022-05-24.json'

with open(fp, 'r') as file:
     data = json.loads(file.read())
```

Flatten nested JSON structures to pandas DataFrame


```python
incidents_df = pd.json_normalize(data, record_path='filters', meta=['id', 'date', 'latitude', 'longitude', 'location', 'description'])
```


```python
incidents_df.head(2)
```

<div style="overflow-x:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>key</th>
      <th>value</th>
      <th>id</th>
      <th>date</th>
      <th>latitude</th>
      <th>longitude</th>
      <th>location</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Type of area affected</td>
      <td>Residential</td>
      <td>CIV0001</td>
      <td>02/24/2022</td>
      <td>49.85005</td>
      <td>36.659031</td>
      <td>Chuhuiv, south of Kharkiv</td>
      <td>Apartment block hit. Crater is very large, pos...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Weapon System</td>
      <td>Unknown</td>
      <td>CIV0001</td>
      <td>02/24/2022</td>
      <td>49.85005</td>
      <td>36.659031</td>
      <td>Chuhuiv, south of Kharkiv</td>
      <td>Apartment block hit. Crater is very large, pos...</td>
    </tr>
</tbody>
</table>
</div>



#### Data munging


```python
incidents_df = incidents_df[incidents_df['key'] == 'Type of area affected'].rename(columns={'value': 'area_type'}).reset_index()
```


```python
columns = [
    'id', 
    'date', 
    'latitude', 
    'longitude', 
    'location', 
    'area_type', 
    'description'
]
```


```python
incidents_df = incidents_df[columns]
```


```python
incidents_df[["latitude", "longitude"]] = incidents_df[["latitude", "longitude"]].apply(pd.to_numeric)
```


```python
incidents_df['date'] = pd.to_datetime(incidents_df['date'])
```

#### Exploring the data


```python
incidents_df.head(2)
```




<div style="overflow-x:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>date</th>
      <th>latitude</th>
      <th>longitude</th>
      <th>location</th>
      <th>area_type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CIV0001</td>
      <td>2022-02-24</td>
      <td>49.850050</td>
      <td>36.659031</td>
      <td>Chuhuiv, south of Kharkiv</td>
      <td>Residential</td>
      <td>Apartment block hit. Crater is very large, pos...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CIV0002</td>
      <td>2022-02-24</td>
      <td>48.748564</td>
      <td>30.218515</td>
      <td>Uman</td>
      <td>Commercial</td>
      <td>Civillians hit by what appears to have been ar...</td>
    </tr>
  </tbody>
</table>
</div>




```python
incidents_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 456 entries, 0 to 455
    Data columns (total 7 columns):
     #   Column       Non-Null Count  Dtype         
    ---  ------       --------------  -----         
     0   id           456 non-null    object        
     1   date         456 non-null    datetime64[ns]
     2   latitude     456 non-null    float64       
     3   longitude    456 non-null    float64       
     4   location     456 non-null    object        
     5   area_type    456 non-null    object        
     6   description  456 non-null    object        
    dtypes: datetime64[ns](1), float64(2), object(4)
    memory usage: 25.1+ KB


## Statistical analysis

#### Analysing civilian harm by type of affected area


```python
incidents_by_type = incidents_df.groupby('area_type').size()
```


```python
incidents_by_type = incidents_by_type.to_frame(name='n_events').reset_index()
```


```python
incidents_by_type.sort_values(by='n_events', ascending=False)
```




<div style="overflow-x:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>area_type</th>
      <th>n_events</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7</th>
      <td>Residential</td>
      <td>200</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Commercial</td>
      <td>52</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Undefined</td>
      <td>49</td>
    </tr>
    <tr>
      <th>8</th>
      <td>School or childcare</td>
      <td>43</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Industrial</td>
      <td>35</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Healthcare</td>
      <td>32</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Administrative</td>
      <td>20</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Religious</td>
      <td>17</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Cultural</td>
      <td>7</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Military</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
fig = px.pie(incidents_by_type, values='n_events', names='area_type', title='Civilian harm by type of affected area', 
             hover_data=['n_events'], labels={'n_events':'Number of incidents'})

fig.update_traces(textposition='inside', textinfo='percent+label')
fig.update_layout(uniformtext_minsize=12, uniformtext_mode='hide', width=800, height=600)

fig.show()
```
![Civilian harm by type of affected area](/images/projects/output_25_1.png)

#### Analysing civilian harm by date


```python
incidents_by_day = incidents_df.groupby('date').size().to_frame(name='n_events').reset_index()
```


```python
fig = px.line(incidents_by_day, x='date', y='n_events', title='Number of incidents per day', labels={'n_events':'Number of incidents'})

fig.show()
```

![Number of incidents per day](/images/projects/output_28_0.png)

```python
fig = px.bar(incidents_by_day, x='date', y='n_events', color='n_events')

fig.show()
```

![Number of incidents per day - bar](/images/projects/output_29_0.png)

## Geospatial dimension

#### Converting to a geospatial dataset


```python
geo_incidents_df = gpd.GeoDataFrame(incidents_df, geometry=gpd.points_from_xy(incidents_df['longitude'], incidents_df['latitude']), crs="EPSG:4326")
```


```python
geo_incidents_df.to_crs(epsg=3857, inplace=True)
```


```python
ax = geo_incidents_df.plot(figsize=(20,10))
cx.add_basemap(ax)
```


    
![Map with points](/images/projects/output_34_0.png)
    


From the map above, we can define that few points are outside Ukraine.

#### Combining with regions of Ukraine

I downloaded the publicly available regions reference from humdata.org ([Ukraine - Subnational Administrative Boundaries](https://data.humdata.org/dataset/cod-ab-ukr?force_layout=desktop)), and added the Shapefile with the borders to the project repo: `data/ukr-adm-sspe-20220131-zip-1/ukr_admbnda_adm1_sspe_20220114.shp`.


```python
regions = gpd.read_file(r'../data/ukr-adm-sspe-20220131-zip-1/ukr_admbnda_adm1_sspe_20220114.shp')
```


```python
regions.head(3)
```




<div style="overflow-x:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Shape_Leng</th>
      <th>Shape_Area</th>
      <th>ADM1_EN</th>
      <th>ADM1_UA</th>
      <th>ADM1_RU</th>
      <th>ADM1_PCODE</th>
      <th>ADM1_REF</th>
      <th>ADM1ALT1EN</th>
      <th>ADM1ALT2EN</th>
      <th>ADM1ALT1UA</th>
      <th>...</th>
      <th>ADM1ALT1RU</th>
      <th>ADM1ALT2RU</th>
      <th>ADM0_EN</th>
      <th>ADM0_UA</th>
      <th>ADM0_RU</th>
      <th>ADM0_PCODE</th>
      <th>date</th>
      <th>validOn</th>
      <th>validTo</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>25.522335</td>
      <td>2.931510</td>
      <td>Avtonomna Respublika Krym</td>
      <td>Автономна Республіка Крим</td>
      <td>Автономная Республика Крым</td>
      <td>UA01</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>Ukraine</td>
      <td>Україна</td>
      <td>Украина</td>
      <td>UA</td>
      <td>2021-11-09</td>
      <td>2022-01-14</td>
      <td>None</td>
      <td>MULTIPOLYGON (((35.37597 45.26085, 35.37507 45...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>12.326361</td>
      <td>3.250424</td>
      <td>Vinnytska</td>
      <td>Вінницька</td>
      <td>Винницкая</td>
      <td>UA05</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>Ukraine</td>
      <td>Україна</td>
      <td>Украина</td>
      <td>UA</td>
      <td>2021-11-09</td>
      <td>2022-01-14</td>
      <td>None</td>
      <td>POLYGON ((28.87952 49.88847, 28.88087 49.88828...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>12.448772</td>
      <td>2.590782</td>
      <td>Volynska</td>
      <td>Волинська</td>
      <td>Волынская</td>
      <td>UA07</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
      <td>...</td>
      <td>None</td>
      <td>None</td>
      <td>Ukraine</td>
      <td>Україна</td>
      <td>Украина</td>
      <td>UA</td>
      <td>2021-11-09</td>
      <td>2022-01-14</td>
      <td>None</td>
      <td>POLYGON ((25.22584 51.96091, 25.22584 51.96091...</td>
    </tr>
  </tbody>
</table>
<p>3 rows × 21 columns</p>
</div>




```python
regions.to_crs(epsg=3857, inplace=True)
```


```python
ax = regions.plot(figsize=(20,10))
cx.add_basemap(ax)
```


    
![Map with regions](/images/projects/output_40_0.png)
    



```python
geo_incidents_df.crs == regions.crs
```




    True




```python
combined_geo_incidents_df = gpd.sjoin(geo_incidents_df, regions[['ADM1_EN', 'geometry']], predicate='within').drop(columns=['index_right'])
```


```python
combined_geo_incidents_df.head(3)
```




<div style="overflow-x:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>date</th>
      <th>latitude</th>
      <th>longitude</th>
      <th>location</th>
      <th>area_type</th>
      <th>description</th>
      <th>geometry</th>
      <th>ADM1_EN</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CIV0001</td>
      <td>2022-02-24</td>
      <td>49.850050</td>
      <td>36.659031</td>
      <td>Chuhuiv, south of Kharkiv</td>
      <td>Residential</td>
      <td>Apartment block hit. Crater is very large, pos...</td>
      <td>POINT (4080864.664 6420347.527)</td>
      <td>Kharkivska</td>
    </tr>
    <tr>
      <th>12</th>
      <td>CIV0018</td>
      <td>2022-02-25</td>
      <td>49.987116</td>
      <td>36.261098</td>
      <td>Kharkiv</td>
      <td>Residential</td>
      <td>Rocket motor lodged in a street at zebra cross...</td>
      <td>POINT (4036566.965 6444044.858)</td>
      <td>Kharkivska</td>
    </tr>
    <tr>
      <th>13</th>
      <td>CIV0019</td>
      <td>2022-02-25</td>
      <td>49.990482</td>
      <td>36.267443</td>
      <td>Kharkiv</td>
      <td>Residential</td>
      <td>Another weapon remnant (also possibly from a B...</td>
      <td>POINT (4037273.287 6444627.654)</td>
      <td>Kharkivska</td>
    </tr>
  </tbody>
</table>
</div>



#### Heatmap visualization


```python
m = folium.Map(location=[49.107892273527504, 31.444630060047018], tiles = 'stamentoner', zoom_start=6, control_scale=True)

heat_data = list(zip(combined_geo_incidents_df["latitude"], combined_geo_incidents_df["longitude"]))

HeatMap(heat_data).add_to(m)

m
```

<iframe src="/assets/heatmap.html" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="800" scrolling="auto" allow="geolocation"></iframe>

#### Analysing civilian harm by regions


```python
incidents_by_region = combined_geo_incidents_df.groupby('ADM1_EN').size().to_frame(name='n_events').reset_index()
```


```python
incidents_by_region.head(2)
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ADM1_EN</th>
      <th>n_events</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Cherkaska</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Chernihivska</td>
      <td>14</td>
    </tr>
  </tbody>
</table>
</div>




```python
fig = px.pie(incidents_by_region, values='n_events', names='ADM1_EN', title='Civilian harm by region', 
             hover_data=['n_events'], labels={'n_events':'Number of incidents', 'ADM1_EN': 'Region'})

fig.update_traces(textposition='inside', textinfo='percent+label')
fig.update_layout(uniformtext_minsize=12, uniformtext_mode='hide', width=800, height=600)

fig.show()
```

![Civilian harm by region](/images/projects/output_49_0.png)

#### Choropleth classification


```python
regions_incidents = pd.merge(regions[['ADM1_EN', 'geometry']], incidents_by_region, how='left', on='ADM1_EN')
```


```python
regions_incidents['n_events'] = regions_incidents['n_events'].fillna(0)
```


```python
regions_incidents.head(3)
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ADM1_EN</th>
      <th>geometry</th>
      <th>n_events</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Avtonomna Respublika Krym</td>
      <td>MULTIPOLYGON (((3938035.422 5662681.206, 39379...</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Vinnytska</td>
      <td>POLYGON ((3214853.149 6426982.914, 3215003.413...</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Volynska</td>
      <td>POLYGON ((2808127.132 6793060.793, 2808127.175...</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
regions_incidents['geoid'] = regions_incidents.index.astype(str)
```


```python
m = folium.Map(location=[49.107892273527504, 31.444630060047018], tiles='cartodbpositron', zoom_start=6, control_scale=True)

folium.Choropleth(geo_data=regions_incidents, 
                  data=regions_incidents,
                  name='Choropleth Map',
                  columns=['geoid','n_events'], 
                  key_on='feature.id',
                  bins=8,
                  fill_color='YlOrRd', 
                  line_color='white',
                  line_weight=0,
                  legend_name='Number of incidents').add_to(m)

folium.features.GeoJson(regions_incidents, name='Labels',
               style_function=lambda x: {'color':'transparent','fillColor':'transparent','weight':0},
                tooltip=folium.features.GeoJsonTooltip(fields=['ADM1_EN', 'n_events'],
                                              aliases = ['Region', 'Number of incidents'],
                                              labels=True,
                                              sticky=True)).add_to(m)

folium.LayerControl().add_to(m)

m
```

<iframe src="/assets/choropleth.html" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="800" scrolling="auto" allow="geolocation"></iframe>