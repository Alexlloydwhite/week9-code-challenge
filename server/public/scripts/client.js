console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    // $('#addJokeButton').on('click', addJoke);
    getJokes();
}

// function addJoke(){
//     let whoseJoke = $('#whoseJokeIn').val();
//     let question = $('#questionIn').val();
//     let punchline = $('#punchlineIn').val();

// }

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
        <li>${index.whoseJoke} ${index.jokeQuestion} ${index.puncLine}</li>
        `)
    }
}