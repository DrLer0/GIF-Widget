var topics = [];

function displayTopicGif() {
    var topic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=DyNR5qoIQ82OcsP649xZanQX7Bhh9VPL&limit=10&rating=g";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(response);
        for (var i = 0; i < results.length; i += 2) {
            var stillUrl = results[i].images.fixed_height_still.url;
            var imageUrl = results[i].images.fixed_height.url;
            var gif = `<div class="row">
                        <div class="col">
                        <p>Rating: ${results[i].rating}</p>
                        <img class="gif" src=${results[i].images.fixed_height_still.url} data-state="still" 
                        data-animate=${results[i].images.fixed_height.url}
                        data-still=${results[i].images.fixed_height_still.url}>
                        </div>
                        <div class="col">
                        <p>Rating: ${results[i + 1].rating}</p>
                        <img class="gif" src=${results[i + 1].images.fixed_height_still.url} data-state="still" 
                        data-animate=${results[i + 1].images.fixed_height.url}
                        data-still=${results[i + 1].images.fixed_height_still.url}>
                        </div>
                        </div>`;
            $("#displayGifs").prepend(gif);
        }
    });
}

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonTopics").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i]);

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("topic-btn");
        // Adding a data-attribute
        a.attr("data-topic", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttonTopics").append(a);
    }
}

$("#addTopic").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#inputTopic").val().trim();

    // Adding movie from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$("#gif").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    alert("clicked gif!");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".topic-btn", displayTopicGif);
renderButtons();