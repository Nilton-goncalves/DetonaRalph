const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.getElementById('life'),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        lifeTotal: 3,
    },
    actions: {
        countDownTimerId: setInterval (countDown, 1000),
        timerId : setInterval(randomSquare, 1000),
    }
};

//Função para diminuir o número de vidas
function lifeDown() {
    state.values.lifeTotal--;
    state.view.life.textContent = state.values.lifeTotal;
}

//Função para continuar o jogo
function initializeGame() {
    state.values.currentTime = 15;
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }

// Função que altera o tempo no jogo
function countDown(){
    state.values.currentTime --;
    state.view.timeLeft.textContent = state.values.currentTime;
    
     // Verifica se o contador chegou a zero
    if (state.values.currentTime <= 0){
        clearInterval (state.actions.countDownTimerId);
        lifeDown()
        initializeGame()
        if (state.values.lifeTotal <0){
            playSound ("game_over")
            clearInterval (state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            
            alert ("Game over! O seu resultado foi: " + state.values.result);
        }
    } 
}

//Função para pegar as músicas escolhendo apenas o nome
function playSound (audioName) {
    let audio = new Audio (`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play ();
}

// Função para gerar quadrados aleatórios
function randomSquare () { 
    state.view.squares.forEach((square)=> {
        square.classList.remove ("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares [randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id; 
}

// Adiciona evento de clique nos quadrados
function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown",()=> {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound ("glass");
        }
    });     
    });
    
}

// Inicializa o jogo
function initialize() {
    addListenerHitBox();
}

//Chama a função de inicialização
initialize();