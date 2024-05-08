# SPA Routing

![alt text](https://i.imgur.com/v4eq2ia.png)

This is a Single Page Application (SPA) project built with TypeScript. It utilizes a routing system to load data from [jsonplaceholder](https://jsonplaceholder.typicode.com). The project includes the following pages:

-  **Home Page**: Displays a list of users.
-  **User Albums Page**: Displays the albums of a specific user.
-  **Album Photos Page**: Displays the photos of a specific album.
-  **404 Page**: Error page displayed when a route is not found.

## Usage

1) `git clone https://github.com/Aliph0th/spa-routing.git`
2) `cd spa-routing`
3) `npm i`
4) `npm run dev`

## Features

-  **Routing**: The project uses a hash(`#`) routing mechanism to navigate between different pages without refreshing the whole page.
-  **Data Loading**: Data is fetched from the [jsonplaceholder](https://jsonplaceholder.typicode.com) API to populate the pages with users, albums, and photos.
-  **Breadcrumbs**: Breadcrumbs are implemented to provide navigation hierarchy and help users understand their current location within the application.
-  **Infinite Scroll**: The album photos page utilizes infinite scroll to load additional photos as the user scrolls down the page.
