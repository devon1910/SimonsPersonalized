let buttonsCol= ['green','red','yellow','blue'];
let randomChoosenColor='';
let gamePattern=[];
let userClickedPattern=[];
let isStarted= false;
let level=0;






function nextSequence(){
    let randNumber= Math.floor(Math.random() * 4);
    randomChoosenColor=buttonsCol[randNumber];
    animatePress(randomChoosenColor)
    playSound(randomChoosenColor);
    gamePattern.push(randomChoosenColor);
    console.log("gamePattern: ",gamePattern)
    userClickedPattern=[];
    $('#level-title')[0].innerHTML='level '+level;
    level++;
   // console.log("gamePattern: ",gamePattern);
    /*$('.btn').click(function(){
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
    });*/
    
}

$('.btn').click(function(){

    if(isStarted){
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        console.log("userClickedPattern: ",userClickedPattern)
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer();
    }
    
});

function checkAnswer(){
   
    if(equalsCheck(userClickedPattern,gamePattern)){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
                userClickedPattern=[];
                }, 1500)
        }
       
    }else{
        $('#level-title')[0].innerHTML='Game Over, Press Any Key to Restart';
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
            }, 500);
         playSound('wrong');        
         gamePattern=[];
         userClickedPattern=[];
         isStarted=false;
         level=0;
    }
}


$(document).keypress(function(){
    if(!isStarted){
        nextSequence();
        isStarted=true;
        $('#level-title')[0].innerHTML='level '+ level ;
    }
    
    /*else{
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
            }, 200);
         playSound('wrong');  
    }  */ 
});

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}
function animatePress(currentColour){
   $('.'+currentColour).addClass('pressed');

   setTimeout(function () {
    $('.'+currentColour).removeClass('pressed');
    }, 200)
}

function equalsCheck(userArray, gameArray){
    for(var i =0;i<userArray.length;i++){
        if(userArray[i]!==gameArray[i]){
            return false;
        }
    }
    return true;

} 