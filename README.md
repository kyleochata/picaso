# Picaso: Machine Learning Drawing App

Picaso is a Machine Learning drawing application that is to entertain my neice while exploring the topics of AI and Machine Learning. This project utilizes HTML, Vanilla JavaScript, CSS. As the user draws, Picaso will use previous data sets to try to guess the image that the user is drawing while displaying the heat map for its reasoning. This particular algorithm utilizes the k-nearest neighbor to process the data points while the user is drawing to guess at the image. 

Complete Data Set with Heat Map for distribution of data.
![Data Set with associated location in heat map](<images/Screenshot 2026-01-27 at 2.33.49 PM.png>)

Heat map showing "reasoning" while the user is drawing.
![Live guessing utilizing k-nearest neighbor while user is drawing on canvas](<images/Screenshot 2026-01-27 at 2.35.20 PM.png>)

## Usage

Download the project set from Github.

`npm i` to download all the node modules/dependencies.

To play with Picaso:

Right click `web/viewer.html` and launch with liver server.

To bring up the canvas board to draw, click the Toggle Input button at the top right of the screen and begin to draw while Picaso guesses!


