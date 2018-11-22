document.addEventListener("DOMContentLoaded", function(event) {
    // Initialize variables after document is loaded
    var counter;
    var moves = 0;
    var m = 0; 
    var s = 0;
    var numStars = 3;
    var tempoTotal;
    var pairs = 0;
    var flipedCards = [];
    counter = setInterval(timer, 1000); //Starts timer
    createNewDeck(); // Prepare board
   
    // Shuffle cards (given by Udacity)
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
    
    // Create deck of shuffled cards
    function createNewDeck() {
        var cardsList = ["fab fa-android","fab fa-android","fab fa-mailchimp","fab fa-mailchimp","fas fa-code","fas fa-code","fas fa-dragon","fas fa-dragon","fas fa-drum","fas fa-drum","fas fa-feather","fas fa-feather","fas fa-gamepad","fas fa-gamepad","fas fa-lightbulb","fas fa-lightbulb"];

        var newDeck = shuffle(cardsList);
        
        for(var i = 0; i < newDeck.length; i++){
            document.querySelectorAll('.card')[i].innerHTML = "<i class='"+ newDeck[i] +"'></i>";
        }    
    }

    // Create counter function
    function timer() {
        s += 1;
        if (s % 60 == 0) {
            s = 0;
            m += 1;        
        }
        document.getElementsByClassName('timer')[0].innerHTML = ajustaTempo(m)+":"+ajustaTempo(s);
    }
    
    // Auxiliary function to add an extra digit to seconds and minutes when they have a single digit
    function ajustaTempo(t) {
        if(t < 10){
            t = "0" + t;
            return t;
        } else{
            return ""+t;
        }
    }

    // Restart game function
    function restartGame() {
        s = -1;
        m = -1;
        numStars = 3;
        document.getElementsByClassName('moves')[0].innerHTML = 0;
        $('.stars li').css('visibility','visible');
        $('.card').removeClass('fliped matched unmatched');
        clearInterval(counter); // Stop timer
        createNewDeck(); // Redistribute deck
        counter = setInterval(timer, 1000); // Restart timer
        moves = 0;
        pairs = 0;
    }
    
    // Compare 2 fliped cards
    function comparaCards(array) {
        if(array[0] == array[1]){
            pairs += 1;
            $('.fliped').addClass('matched'); //if they match
            $('.matched').removeClass('fliped');
        } else {
            $('.fliped').addClass('unmatched'); //if they don't match
            setTimeout(function () {
                $('.fliped').removeClass('fliped unmatched');
            }, 500);
            
        };
    }

    // End game function
    function endGame() {
        clearInterval(counter);
        tempoTotal = document.getElementsByClassName('timer')[0].innerHTML;
        document.getElementById('total-time').innerHTML = tempoTotal;
        document.getElementById('stars').innerHTML = numStars;
        document.getElementById('moves').innerHTML = moves;
        setTimeout(function () {
            $('.modal').css('display','block');
        }, 500);
    }

    // Add event listener to restart button
    document.getElementsByClassName('reset-button')[0].addEventListener("click", restartGame);

    // Modal event listeners
    $('.close').click(function (e) { 
        e.preventDefault();
        $('.modal').css('display','none');
    });
    $('.yes').click(function (e) { 
        e.preventDefault();
        $('.modal').css('display','none');
        restartGame();
    });
    $('.no').click(function (e) { 
        e.preventDefault();
        $('.modal').css('display','none');
    });
    
    // Main event listeners
    $('.card').click(function (e) { 
        e.preventDefault();
        moves += 1; // Increment number of moves
        $(this).addClass('fliped'); // Add 'fliped' class to each clicked card
        // Update moves counter
        document.getElementsByClassName('moves')[0].innerHTML = moves;

        flipedCards.push(this.firstElementChild.className);
        console.log(flipedCards);
        if(flipedCards.length == 2) {
            comparaCards(flipedCards);
            flipedCards = [];
        };
        // Change star-rating according to number of moves
        if (moves > 48) {
            $('.stars li:nth-child(2)').css('visibility','hidden');
            numStars = 1;
        } else if (moves > 24) {
            $('.stars li:last-child').css('visibility','hidden');
            numStars = 2;
        }
        // Calls endGame function when number of pairs is 8
        if(pairs == 8) {
            endGame();
        }
    });
}); // end of global function
