let audio = document.querySelector("#audio");
let audioSource = document.querySelector("#audioSource");
let title = document.querySelector("#title");
let artist = document.querySelector("#artist");
let cover = document.querySelector("#cover");
let main = document.querySelector("main");
let container = document.querySelector("#container");
let musicRange = document.querySelector("#musicRange");
let timeStart = document.querySelector("#timeStart");
let timeEnd = document.querySelector("#timeEnd");
let sound = document.querySelector("#sound");
let soundRange = document.querySelector("#soundRange");

// Array de objetos com as músicas utilizadas.

let tracks = [{
    
    song: "4th Dimension",
    singer: "Kids See Ghosts",
    photo: "./img/kids2.jpg",
    file: "./music/4th Dimension.mp3",
    bg: "./img/ghost.svg",
    color: "#EA6D29"

},

{

    song: "Industry Baby",
    singer: "Lil Nas X",
    photo: "./img/nas.jfif",
    file: "./music/INDUSTRY_BABY.mp3",
    bg: "./img/montero.svg",
    color: "#CB2763"
},

{
    song: "Vida Loka, Pt. 1",
    singer: "Racionais MC's",
    photo: "./img/racionais.svg",
    file: "./music/Vida_Loka.mp3",
    bg: "./img/favela.svg",
    color: "#235E72"
},

{
    song: "Alive (It Feels Like)",
    singer: "Alok",
    photo: "./img/alok.jpg",
    file: "./music/Alive.mp3",
    bg: "./img/festival.svg",
    color: "#881E8E"
},

{
    song: "Futuros Amantes",
    singer: "Chico Buarque",
    photo: "./img/paratodos2.jpg",
    file: "./music/CHICO BUARQUE FUTUROS AMANTES.mp3",
    bg: "./img/chico.svg",
    color: "#a9a758"
}
];

// Função para carregar e controlar as músicas.

let index = 0;

function player(index){
    title.innerText = tracks[index].song;
    artist.innerText = tracks[index].singer;
    audioSource.src = tracks[index].file;
    cover.src = tracks[index].photo;
    container.style.backgroundColor = tracks[index].color;
    main.style.backgroundImage = 'url("'+ tracks[index].bg +'")';

    audio.load();

}

player(index);  // Executar função player.

let playing = false;  // Verifica se áudio está ativo ou não.

// Play, pause, avançar e retrodecer músicas, além de retornar para o ínicio da faixa e avançar 5 segundos. Também avança para próxima faixa automaticamente ao final da música.

function play() {

    if (playing == false){
        audio.play();
        playPause.setAttribute("src", "./assets/pause.png");
        return playing = true;
    } else {
        audio.pause()
        playPause.setAttribute("src", "./assets/play.png");
        return playing = false;
    }
}

function back(){
    if (index == 0){
        index = tracks.length;
        player(index);
        playing = false;
        play();
    
    }else{
          index--;
          player(index);
          playing = false;
          play();
    }
}

function next(){
    if (index == tracks.length){
        index = 0;
        player(index);
        playing = false;
        play();    
    } else {
        index++;
        player(index);
        playing = false;   
        play();
    }
}

function backwards(){
    audio.currentTime -= 5;
}

function forward (){
    audio.currentTime += 5;
}

function changeSong(){

    let totalTime = audio.duration;
    let currentTime = audio.currentTime;

    if (currentTime == totalTime){
        next();
    }
}

// Controle de tempo das músicas.

musicRange.addEventListener("input", time);

function time(){

    audio.currentTime = musicRange.value;

}

// Controle de tempo da música e valor total de tempo que a faixa possui.

function timing(){
    
    musicRange.max = audio.duration;
    musicRange.value = audio.currentTime;

    let minutes = Math.floor(audio.currentTime/60);
    let seconds = Math.round(audio.currentTime % 60);
    let minutesTotal = Math.floor(audio.duration / 60);
    let secondsTotal = Math.round(audio.duration % 60);

    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    if (minutesTotal < 10){
        minutesTotal = "0" + minutesTotal;
    }
    if (secondsTotal < 10){
        secondsTotal = "0" + secondsTotal;
    }

    timeStart.innerText = minutes + ":" + seconds;
    timeEnd.innerText = minutesTotal + ":" + secondsTotal;


    changeSong(); 
}

setInterval(timing, 1000) 

// Controle de som e volume.

let mutedSound = false;

function soundControl(){
    
    if (mutedSound == false){
        audio.volume = 0;
        sound.setAttribute("src", "./assets/mute.png");
        return mutedSound = true;
        
    } else {
        audio.volume = soundRange.value/100;
        sound.setAttribute("src", "./assets/sound.png");
        return mutedSound = false;
    }
    
}

let volumeStatus;
soundRange.addEventListener("input", volumeChange);


function volumeChange(){

    volumeStatus = soundRange.value/100;

    audio.volume = volumeStatus;

    if (volumeStatus == 0){
        sound.setAttribute("src", "./assets/mute.png");
        return mutedSound = true;
    } else {
        sound.setAttribute("src", "./assets/sound.png");
        return mutedSound = false;
    }

}


function mute(){
    if(audio.muted == true){
        audio.muted =false;
        sound.setAttribute("src", "./assets/sound.png");
    }else{
    audio.muted = true;
    sound.setAttribute("src", "./assets/mute.png")
}
}
