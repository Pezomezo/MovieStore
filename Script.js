/**
 * This is the JSON file
 * containing the movie Titels and Trailer URLs
 **/
const movies = [
    {
        "Title":"Paranormal Activity",
        "Trailer":"https://www.youtube.com/watch?v=F_UxLEqd074"
    },
    {
        "Title":"Exists",
        "Trailer":"https://www.youtube.com/watch?v=vNKqNBey9MQ"
    },
    {
        "Title":"The Ritual",
        "Trailer":"https://www.youtube.com/watch?v=Vfugwq2uoa0"
    },
    {
        "Title":"Get Out",
        "Trailer":"https://www.youtube.com/watch?v=ZKXYnRuwhWI"
    },
    {
        "Title":"Alien",
        "Trailer":"https://www.youtube.com/watch?v=OK1JjUNKcqY"
    }
];

/**
 * This is an object
 * It contains two methods getIdFromUrl and generateEmbedUrl
 * These methods are necessary to play the trailers on youtube embedded into the website**/
let youtube = {
    //Takes in URL/ID of video returns ID
    getIdFromUrl: function (VideoIdOrUrl) {
        if (VideoIdOrUrl.indexOf('http') === 0){
            return VideoIdOrUrl.split('v=')[1];
        }
        else {
            return VideoIdOrUrl;
        }
    },
    // generates a URL (with the help of the previous method) that allows the video to be embedded
    generateEmbedUrl: function (VideoIdOrUrl) {
        return 'https://www.youtube.com/embed/' + youtube.getIdFromUrl(VideoIdOrUrl);
    }
}
//This is the root element, I am appending the list items to it
let body = document.getElementById("movieList");

//Going though each element of the movies JSON file
movies.forEach(movie => {
    // fetching all the movies inside the JSON file with the help of the amdbapi
   fetch("https://www.omdbapi.com/?t=" + movie.Title + "&apikey=c836e7e")

       .then(response => {return response.json() }// We declare that we get the JSON format from the API
       )
       // data is the response from the previous then block
       .then(data => {

           let innerDiv = document.createElement("div") // creat a div element
           innerDiv.setAttribute("class", "monster") // assign a class attribute to it with the name monster
           //The above two lines of code will result in the following html code: <div class="monster"></div>

           let h1 = document.createElement("h1"); // create h1 element
           h1.setAttribute("class", "title")
           // We assign the Title of the movie returned by the API to the h1 element
           h1.textContent = data.Title;

           let paragraph = document.createElement("p"); // create p element
           paragraph.setAttribute("class", "plot");
           paragraph.textContent = data.Plot;

           let imbd = document.createElement("a") // create a element
           imbd.setAttribute("class", "imdbRating");
           imbd.textContent = "IMBD: " + data.imdbRating;

           let age = document.createElement("p"); // create p element
           age.setAttribute("class", "age");
           // Calling the calculateAge method and passing the release date of the movie
           age.textContent = "This movie is " + calculateAge(data.Released) + " years old";

           //This div element will hold the previous elements filled with data
           let openingDiv = document.createElement("div");
           openingDiv.setAttribute("class", "trapDoor");
           openingDiv.setAttribute("onClick", "playTrailer(this)")

           // Building up the div that will show the data about each movie
           openingDiv.appendChild(h1);
           openingDiv.appendChild(paragraph);
           openingDiv.appendChild(imbd);
           openingDiv.appendChild(age);

           // Placing the div that will show the data inside another div
           // This is necessary for the animations to work so the data will display over the innerDiv and hide its content
           innerDiv.appendChild(openingDiv);

           // Adding each movie to the screen
           body.appendChild(innerDiv);
       });


});

//Calculates the age of the movie
function calculateAge(age){
    var d = new Date();
    year = age.split(" ")[2];
    age = d.getFullYear() - parseInt(year);
    return age;
}

/**
 * This function operates the trailer to be played
 * It is assigned to each openingDiv's onCLick attribute
 * @item: The div that the function is attached to **/
function playTrailer(item){
    //Selecting the text of the h1 element inside the div
    let title = item.childNodes[0].innerText;
    /** Searched for the selected movie inside the JSON file
     * sets the source (src) of the iframe to the trailer with the help of the youtube object
     * **/
    movies.forEach(movie => {
        if (movie.Title === title){
            //iframe is used here to embed the youtube video
            let iframe = document.getElementById("youtubeVid");
            iframe.src = youtube.generateEmbedUrl(movie.Trailer)
            //The youtube video will overlay the page
            document.getElementById("overlay").style.display = "block";
        }
    })

}

//Turns the overlay off
function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}
