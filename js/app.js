$(function () {
    // Inicializa todas as variáveis para o início do jogo após carregamento da página
    var counter;
    var moves = 0;
    var m = 0; 
    var s = 0;
    var numStars = 3;
    var tempoTotal;
    var pairs = 0;
    var flipedCards = [];
    counter = setInterval(timer, 1000); //Inicia a contagem do tempo
    createNewDeck(); // Distribui as cartas
   
    // Função para embaralhar (fornecida pela udacity)
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
    
    // Função para distribuir as cartas embaralhadas
    function createNewDeck() {
        var cardsList = ["fab fa-android","fab fa-android","fab fa-mailchimp","fab fa-mailchimp","fas fa-code","fas fa-code","fas fa-dragon","fas fa-dragon","fas fa-drum","fas fa-drum","fas fa-feather","fas fa-feather","fas fa-gamepad","fas fa-gamepad","fas fa-lightbulb","fas fa-lightbulb"];

        var newDeck = shuffle(cardsList);
        
        for(var i = 0; i < newDeck.length; i++){
            document.querySelectorAll('.card')[i].innerHTML = "<i class='"+ newDeck[i] +"'></i>";
        }
        
    }

    // Função para criar o contador de tempo
    function timer() {
        s += 1;
        if (s % 60 == 0) {
            s = 0;
            m += 1;        
        }
        $('.timer').html(ajustaTempo(m)+":"+ajustaTempo(s));    
    }
    
    // Função auxiliar da função timer para adicionar o '0' quando o tempo tiver 1 digito
    function ajustaTempo(t) {
        if(t < 10){
            t = "0" + t;
            return t;
        } else{
            return ""+t;
        }
    }

    // Função para reiniciar o jogo a qualquer momento
    function restartGame() {
        s = -1;
        m = -1;
        numStars = 3;
        $('.moves').html('0');
        $('.stars li').css('visibility','visible');
        $('.card').removeClass('fliped matched unmatched');
        clearInterval(counter); // Zera a contagem de tempo
        createNewDeck(); // Redistribui as cartas
        counter = setInterval(timer, 1000); // Reinicia a contagem de tempo
        moves = 0;
        pairs = 0;
    }
    
    // Função para comparar 2 cards
    function comparaCards(array) {
        if(array[0] == array[1]){
            pairs += 1;
            $('.fliped').addClass('matched');
            $('.matched').removeClass('fliped');
        } else {
            // Falta só adicionar o timeout para desvirar os cards !!!
            $('.fliped').addClass('unmatched');
            setTimeout(function () {
                $('.fliped').removeClass('fliped unmatched');
            }, 500);
            
        };
    }

    // Função para terminar o jogo
    function endGame() {
        clearInterval(counter);
        tempoTotal = $('.timer').html();
        $('#total-time').html(tempoTotal);
        $('#stars').html(numStars);
        $('#moves').html(moves);
        setTimeout(function () {
            $('.modal').css('display','block');
        }, 500);
    }

    // Adiciona o event listener para o botão de reiniciar o jogo
    $('.reset-button').on("click", restartGame);

    // Adiciona event listeners da modal
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
    
    
    // Função principal do jogo / adiciona o event listener para os cards
    $('.card').click(function (e) { 
        e.preventDefault();
        moves += 1; // Incrementa o contador de movimentos a cada card clicado
        $(this).addClass('fliped'); // Adiciona a classe fliped a cada card clicado
        $('.moves').html(moves); // Atualiza o contador de movimentos
        
        flipedCards.push(this.firstElementChild.className);
        console.log(flipedCards);
        if(flipedCards.length == 2) {
            comparaCards(flipedCards);
            flipedCards = [];
        };
        // Decrementa o star rating de acordo com o numero de movimentos
        if (moves > 48) {
            $('.stars li:nth-child(2)').css('visibility','hidden');
            numStars = 1;
        } else if (moves > 24) {
            $('.stars li:last-child').css('visibility','hidden');
            numStars = 2;
        }
        // Se o numero de pares for 8, ou seja, o jogo terminou, chama a função de terminar o jogo
        if(pairs == 8) {
            endGame();
        }
    });
}); // end of global function
