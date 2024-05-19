# AnimeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

# Anime Repository Application
The application serves as a repository for anime series, both ongoing and completed. For each anime, users can view detailed information. There are different pages with various access levels for managing the site:

## General View Page
This page is open to any user visiting the site. It displays a list of all animes stored on the platform and allows users to search by name if they are looking for a specific anime. If the search yields no results, a message will inform the user. Each item in the list is displayed as a card, and clicking on the card takes the user to the detailed information page for that anime.

## Detail Page
This page is also open to any user and provides a detailed view of the anime's information, including its image, titles, synopsis, and other details. Some animes have a trailer loaded from YouTube, and the interface adjusts accordingly if a trailer is available.

## Favorites Page
This page is restricted to users who have registered as clients on the site. It has an interface similar to the homepage, displaying a list of animes marked as favorites by the user. To mark an anime as a favorite, users need to log in, explore the animes, and on the detail page of any anime, a button will be available to add to or remove from favorites.

## Anime Management Page
This page is restricted to admin users. It displays a list of registered animes with options to view details (which navigates to the anime's detail page), edit information, or delete the anime. There is also a button to add a new anime to the list. 
The anime information form is blank for new entries or pre-filled for editing existing ones. The site ensures that at least the English title and synopsis are provided. For the image, there is a drag-and-drop area for uploading, or users can click to open a file selector.

# General Notes
The system uses guards to protect pages with authentication, so credentials are required to access these functionalities.

## Registration and Login
In the top right corner of the site, there are menu options for logging in or registering. Logging in requires a username and password. Registration has two modes (one for each user type): 
The basic form requires a username and password, creating credentials for a client user. There is a checkbox for registering an admin user, which will prompt for an admin key, a private system password that restricts admin registration to those who know the key.

## Incorporation of AI in Development
AI (ChatGPT) was used for research and exploring alternatives for creating the software. Additionally, it was used mainly for styling simple pages like the loading screen, login screen, button styles, and very specific functionalities. It positively impacted production time and helped create a user-friendly interface, such as the drag-and-drop image upload feature developed entirely by ChatGPT due to the lack of event references and knowledge. AI also played a crucial role in creating directives to validate numerical data and prevent errors in data entry.
