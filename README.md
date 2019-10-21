# Design Gallery

A website built on top of node.js and embeddedJS. This website is built to connect developers to a UI Design Kit so that developers will be able to gain inspirations from available widgets. There are several search filters available in the gallery, allowing developers to obtain a greater relevancy in the widget they are searching for. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Node.js v9.11.1
2. npm v5.6.0 

### Installing

A step by step series of examples that tell you have to get a development env running

1. Clone the repository.

    ```
    git clone https://github.com/u6063820/Design_Gallery.git
    ```

2. Install required libraries with npm

    ```
    npm install
    ```

3. Run server. Website will be available at http://localhost:3000/

    ```
    npm start
    ```

**Note**. It is recommended to use nodemon as changes will be made dynamically.
  
    ```
    nodemon npm start
    ``` 


## Deployment

Deployment is done via Google Cloud Storage and Heroku. Due to the fact that Google does not support node.js deployment using App Engine (requires the use of Flexible Environment that might incur huge charges), we decided to implement the app on Heroku instead which is free.

Obtain a heroku account and deploy the entire app onto heroku by following instructions on Heroku itself. 

There is also a requirement for a database to be setup. We use the free [MongoDB host](http://mlab.com/). You should be able to get a MongoDB API link which will be added into Heroku under `Settings > Config Vars` with the values `MLAB_API_LINK=mongodb://USER:PW@XXX.mlab.com`.

The data stored in MongoDB is within the `widgets` collection with the following item structure:

```json
{ 
    "_id" : ObjectId("5ac23b7e27bc4099fb9fb172"), 
    "id":0,
    "name":"Button-0",
    "widget_class":"CheckBox",
    "color":{
        "Blue":0.0,
        "Yellow":0.0,
        "Green":0.0,
        "Cyan":0.0,
        "Black":1.0,
        "White":0.0,
        "Magenta":0.0,
        "Red":0.0,
        "Lime":0.0
    },
    "coordinates":{
        "to":[728,220],
        "from":[685,177]
    },
    
    "dimensions":{
        "width":43,
        "height":43
    },
    "text":"Hello",
    "font":"Bosis Pro Light",
    "sims":["CheckBox-66844","CheckBox-27801","CheckBox-40382"],
    "screenshot":"a2dp.Vol-0.png",
    "Developer":"JimRoal",
    "url":"https://play.google.com/store/apps/details?id=a2dp.Vol",
    "application_name":"A2DP Volume",
    "package_name":"a2dp.Vol",
    "category":"TRANSPORTATION",
    "date":"2015-01-01",
    "downloads":"100,000 - 500,000"
}
```

Widgets are stored on Google Cloud Storage with the following directory structure.

    .
    ├── widgets
    └── screenshot
    

## Authorship

This project is contributed by [Sidong Feng](https://github.com/u6063820).

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)