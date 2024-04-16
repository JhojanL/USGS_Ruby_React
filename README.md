# Seismic Data Application

## Intruduction

This application uses Ruby on Rails in API mode for the backend and React for the frontend. It fetches and persists seismic data from the USGS (earthquake.usgs.gov) and exposes three API endpoints for an external client to consume. A simple web page developed in React is used to interact with these endpoints.

## Backend Development

The backend is a Ruby on Rails application that fetches and delivers seismic data. It includes a task for fetching and persisting data and three endpoints that are consumed by an external client.

### Data Fetching and Persistence

A task fetches seismic data from the USGS site and persists it in a database. The data is fetched from the USGS FDSN Event Web Service (https://earthquake.usgs.gov/fdsnws/event/1/) using the following query parameters:

- `format=geojson`: This specifies that the data should be returned in GeoJSON format.
- `starttime=#{start_date.strftime('%F')}`: This specifies the start date for the data. The `start_date` is formatted as a string in the format 'YYYY-MM-DD'.
- `endtime=#{Date.today.strftime('%F')}`: This specifies the end date for the data, which is the current date.

The full URL used to fetch the data is: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=#{start_date.strftime('%F')}&endtime=#{Date.today.strftime('%F')}"

The fetched data includes the following fields: `id`, `properties.mag`, `properties.place`, `properties.time`, `properties.url`, `properties.tsunami`, `properties.magType`, `properties.title`, `geometry.coordinates[0]` (longitude), and `geometry.coordinates[1]` (latitude).

### Images
![image](https://drive.google.com/uc?id=1iZIxbIxnD65ZU-wsjZIDraMmnSndPHzi)

### API Endpoints

The application exposes three API endpoints:

1. GET list of features: This endpoint returns a list of features in the following format:

    ```json
    {
    "data": [
        {
        "id": Integer,
        "type": "feature",
        "attributes": {
            "external_id": String,
            "magnitude": Decimal,
            "place": String,
            "time": Datetime,
            "tsunami": Boolean,
            "mag_type": String,
            "title": String,
            "coordinates": {
            "longitude": Decimal,
            "latitude": Decimal
            }
        },
        "links": {
            "external_url": String
        }
        }
    ],
    "pagination": {
        "current_page": Integer,
        "total": Integer,
        "per_page": Integer
    }
    }
    ```
2. GET list of comments associated with a feature: This endpoint returns a list of comments associated with a specific feature. The feature is identified by its `feature_id`.

    Here is an example of how to use this endpoint:

    ```bash
    curl -X GET \
    '127.0.0.1:3000/api/features/1/comments' \
    -H 'Content-Type: application/vnd.api+json' \
    -H 'cache-control: no-cache'
    ```

3. POST create a comment associated with a feature: This endpoint receives a payload that includes a `feature_id` and a `body` for the comment. The `body` of the comment is validated to ensure it is not empty.
    
    Here is an example of how to use this endpoint:

    ```bash
    curl --request POST \
    --url 127.0.0.1:3000/api/features/1/comments \
    --header 'content-type: application/json' \
    --data '{"body": "This is a comment" }'
    ```

    This will create a new comment associated with the feature with id 1.

## Frontend Development

The frontend is a simple web page developed in React that interacts with the three API endpoints:

1. GET list of features
2. GET list of comments associated with a feature
3. POST create a comment associated with a feature

### Images
![image](https://drive.google.com/uc?id=1mlX2DBLB5OcyJV0NYaQtyJw5U11Q9zPU)

![image](https://drive.google.com/uc?id=18lHGG-tlaTx8gSeM8H6KCIzT6pcjDSvb)

## How to Run

### Backend

1. Navigate to the backend directory: `cd /USGS_Ruby_React`
2. Install Ruby dependencies: `bundle install`
3. Create and configure the database: `rails db:create db:migrate`
4. Start the Rails server: `rails s`
5. The Rails server will run on port 3000.

### Frontend

1. Navigate to the frontend directory: `cd /USGS_Ruby_React/client`
2. Install Node.js dependencies: `npm install`
3. Start the React application: `npm run start`
4. The React application will run on port 3001.

## Author
Jhojan Lerma