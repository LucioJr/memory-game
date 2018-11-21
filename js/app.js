$(function () {
    var counter;
    var moves = 0;
    var m = 0; 
    var s = 0;
    var numStars = 3;
    var tempoTotal = 0;
    counter = setInterval(timer, 1000);
    
    function timer() {
        s += 1;
        tempoTotal += 1;
        if (s % 60 == 0) {
            s = 0;
            m += 1;        
        }
        $('.timer').html(ajustaTempo(m)+":"+ajustaTempo(s));    
    }
    
    function ajustaTempo(t) {
        if(t < 10){
            t = "0" + t;
            return t;
        } else{
            return ""+t;
        }
    }

    function restartGame() {
        s = -1;
        m = -1;
        numStars = 3;
        $('.moves').html('0');
        $('.stars li').css('visibility','visible');
        $('.card').removeClass('fliped matched');
        clearInterval(counter);
        counter = setInterval(timer, 1000);
        moves = 0;
        tempoTotal = 0;
    }
    
    // Reset button actions
    $('.reset-button').on("click", restartGame);
    
    // Incrementar movimentos e decrementar estrelas
    $('.card').click(function (e) { 
        e.preventDefault();
        moves += 1;
        $(this).addClass('fliped');
        $('.moves').html(moves);
        if (moves > 32 && tempoTotal > 240) {
            $('.stars li:nth-child(2)').css('visibility','hidden');
        } else if (moves > 16 && tempoTotal > 120) {
            $('.stars li:last-child').css('visibility','hidden');
        }
    });

    

}); // end of global function
