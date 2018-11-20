var counter;
var moves = 0;
var m = 0; 
var s = 0;

function timer() {
    s += 1;
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

// Reset button actions
$('.reset-button').on("click", function () {
    s = -1;
    m = -1;
    moves = 0;
    $('.moves').html('0');
    clearInterval(counter);
    counter = setInterval(timer, 1000);
});

// Incrementar movimentos
$('.card').click(function (e) { 
    e.preventDefault();
    moves += 1;
    $('.moves').html(moves);
});