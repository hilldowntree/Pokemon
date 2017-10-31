# Pokemon

A pokemon "game" I created. I wanted to make something using a couple of different APIs and have them work together. 

How to use site:
-Time of day and weather (only in Toronto, would need to add geolocated to find where user is to get their weather) are registered when the site is first accessed which determines the background colour and the icon which shows up in the gameboy screen
-Click "A" on the gameboy to catch the pokemon
-Depending on the time and weather, different types of pokemon can be caught, the actual pokemon within that type is randomized
-If the user clicks "A" again a message appears saying that only 1 pokemon can be caught per day 
-If the user clicks "B" a message appears saying what type of pokemon they caught is and the parameters for catching the pokemon
-If the user clicks on the picture of Professor Oak in the right hand corner, a modal appears where the user can override any of the settings (time, weather) or reset everything so they can catch another pokemon


Things to add:
-Pokedex! 
  -If user selects the pokedex (maybe by clicking the control pad) the gameboy would be replaced by a pokedex. 
  -I think you could store pokemon names, pictures and date caught on local storage. Could then access the info without having to create a username or database
    -I did make a couple of attempts at doing this but had some issues. I was able to store the pokemon name and date caught onto local storage, but couldn't get the url for the pokemon image to store - instead had to use the API again to access it. This wouldn't be feasible as it would require too many API requests and the loading time was way too long. To be revisited
-speed. Pokemon API is really slow, loading way more info than I actually need
-usability. Not user friendly at all, I don't think anyone would intuatively know they need to press the "A" or "B" buttons on the gameboy, or click on Professor Oak
-would like to limit the number of pokemon to 1st generation (not as easy as I would have expected using this API)
