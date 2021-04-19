console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    // on click of add joke button -> send joke to server
    $('#addJokeButton').on('click', addJoke);
    // on page load -> display jokes from server
    getJokes();
}

function addJoke(){
    // object joke captures inputs of new joke
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    }
 
    // ajax sends object to server to add to jokes array
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    })
        // After posting information to server, console log on client side to confirm
        .then(function(response){
            console.log('adding new joke', newJoke);
            getJokes();
            clearInputs();
        })
        // if post fails, alert user.
        .catch(function( error ) {
            console.log('error from server:', error);
            alert('Sorry, could not complete task. Try again L8R!');
        })
}

// gets jokes array from server to use on the DOM
function getJokes(){
    // Ajax sends a get request to server for information on /jokes
    $.ajax({
        method: 'GET',
        url: '/jokes',
    })
        // after getting request, show information on the DOM
        .then(function(response){
            console.log('response from server:', response)
            render(response);
        })
        // if request fails, display alert on DOM
        .catch(function (error){
            console.log('error from server:', error);
            alert('sorry, could not get answer. Try again L8R!');
        })
}

function render(response) {
    // empty history to display only current array
    $('#outputDiv').empty();
    // loop thru the jokes array and append each joke to the DOM
    for(let index of response){
        $('#outputDiv').append(`
        <p><b>Whose Joke:</b> ${index.whoseJoke} 
        <b>Question:</b> ${index.jokeQuestion} 
        <b>Punchline:</b> ${index.punchLine}</p>
        `)
    }
}

function clearInputs(){
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}