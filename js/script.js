class Users {
    constructor(name){
        this.player = {
            name:  name,
            role: ''
        };
        
    }

    get get() {
        return this.player;
    }
}

class Game {
    constructor() {
        this.players = [];
    }

    random() {
        const randomItems = (items) => {
            items = this.players;
            this.elementRandom = items[Math.floor(Math.random()*items.length)];
        };
        randomItems();        
    }

    add(name) {
        const player = new Users(name);
        const newPlayer = player.get;

        this.players.push({id: this.players.length, ...newPlayer});
    } 
}

class GameApp extends Game {
    constructor() {
        super();
    }

    display() {
        const form = document.createElement('form');        
        form.id = 'inputForm';
        form.innerHTML = `
            <input id="inputName" type="text" class="" placeholder="Enter your name">
            <div class="button-conteiner">
                <button id="playerAdd" type="submit" class="button">Add player</button>                
            </div>
            <div class="button-conteiner">
                <button id="playButton" type="button" class="button-start">Start play</button>                
            </div>
        `;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const name = event.currentTarget[0].value;
            event.currentTarget[0].value = '';

            if (name.length === 0) {
                return;
            }
            this.add(name);
        });

        const playBtn = form.querySelector('.button-start');
        playBtn.addEventListener('click', event => {
            const searchInput = document.getElementById('inputName');
            const searchBtn = document.getElementById('playerAdd');
            searchInput.classList.add('display-none');
            searchBtn.classList.add('display-none');
            form.setAttribute('style', 'display: none');
            if(this.players.length >= 2) {
                this.displayPlayers ();
            }
            this.random();
        });

        document.body.appendChild(form);
        
    }
    
    displayPlayers () {
        const playTable = document.createElement('div');
        const h2 = document.createElement('h2');
        let count = 0;

        playTable.setAttribute('id', 'playerContainer');
        playTable.setAttribute('class', 'play-container');
        h2.innerHTML = "Player list";

        document.body.appendChild(playTable);
        playTable.appendChild(h2);

        for(let i = 0; i < this.players.length; i++) {
            const block = document.createElement('div');
            block.setAttribute('class', 'play-container');
            block.setAttribute('style', 'background-color: grey');
            block.id = i;
            playTable.appendChild(block); 

            block.addEventListener('click', event => {             
                count++;
                if(block.id == this.elementRandom.id) {
                    if(count === this.players.length - 1 ) {
                        alert('Mafia win!!!!!');
                        location.reload();
                        this.display();
                        debugger
                    } else {
                        block.setAttribute('style', 'background-color: green');
                        alert('You win!' + this.elementRandom.name + ' is mafia');
                        location.reload();
                        this.display();
                    }
                } else {
                    block.setAttribute('style', 'background-color: red');
                    alert(`it's not mafia!`);
                } // возвращает айди элемента на который нажимаем               
            });       
        }
    }
}

let game = new GameApp();
game.display();
