const canvas = document.querySelector('#canvas');
// canvas 에 그림을 그릴수 있는 도구(context) 의 참조값 얻어오기
const context = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const startText = {
    x: canvas.width/2,
    y: canvas.height/2,
    draw() {
        let text = '게임을 시작하려면 스페이바를 누르세요!'
        context.fillStyle = 'green'
        context.textAlign = 'center'
        context.font = '20px serif';
        context.fillText(text, this.x, this.y);
    }
}
startText.draw();

//캔버스에 이미지 지정 실시    		
// var imgSrc = "images/backimg.png";    		
// var img = new Image();
// img.onload = function(){
//     context.drawImage(img, 20, 20, canvas.width, canvas.height); //이미지, x좌표, y좌표, 가로크기, 세로크기 
// }
// img.src = imgSrc;


//임시캐릭터 hero
const hero = {
    x: 20,
    y: 300,
    width: 50,
    height: 50,
    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

//장애물 Object
class Object {
    constructor() {
        this.x = canvas.width;
        this.y = 300;
        this.width = 50
        this.height = 50
        // this.width = 50 + getRandomInt(-20, 20);
        // this.height = 50 + getRandomInt(-20, 20);
        // this.x = 500;
        // this.y = 250 - this.height;
    }
    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

let jumpTimer = 0;
let timer = 0;
let objectmain = [];
function objectAnimation() {
    requestAnimationFrame (objectAnimation);
    timer++;
    
    context.clearRect(0,0, canvas.width, canvas.height);

    if(timer % 200 === 0){      
        let object = new Object();
        objectmain.push(object);
    }

    objectmain.forEach((a, i , o) =>{
        //a.x-=2; 오브젝트 거리 계산
        //a.x--;
        if(a.x < 0){
            o.splice(i, 1)
        }
        a.x-=2;
        a.draw();
    })
    if (jumpState == true) {
        hero.y--;
        jumpTimer++;
    }
    if (jumpState == false){
        if(hero.y < 300){
            hero.y++;
        }
    }
    if (jumpTimer > 100){
        jumpState = false
        jumpTimer = 0;
    }
    hero.draw();
}

let jumpState = false;
let gameState = 0;


document.addEventListener('keydown', (e)=>{
    if(e.code == 'Space'){
        if (gameState == 0){
            gameState =1;
            objectAnimation();
        } 
        else if(gameState == 1){
            jumpState = true
        }
    }
})

//장애물 랜덤 크기
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
// };

// //타이머
// // let timer = 0;

// //애니메이션 적용
// function frameAction() {
//     requestAnimationFrame(frameAction);

//     //애니메이션 초기화 (물체를 초기화)
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     object.x--;

//     if ( timer % 80 === 0 ){
//         const object = new Object();
//         object.draw();

//          //캐릭터, 장애물
//     // object.draw();
    
//     }
//     hero.draw();
//     //바닥선
//     // context.beginPath();
//     // context.moveTo(0, 250); //선의 시작점
//     // context.lineTo(600, 250); //선의 끝점
//     // context.stroke();

   
// }

// //frameAction();

// document.addEventListener('keydown', (e)=>{
//     if(e.code == 'Space'){
//         frameAction();
//     }
// })



