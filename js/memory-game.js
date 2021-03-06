const memory_game = {
    board: new Array(36),
    cards: new Array(36),
    move1: 0,
    move2: 0,
    flipped: 0,
    score: 0,
    errors: 0,
    best: 0,
    container_element: null,
    new_game: 'Novo Jogo',
    msg: '',
    info: '',

    init: function(container) {
        this.container_element = container;
    },

    make_play: function(position) {
        if(this.board[position] === 'back.jpg') {
            this.board[position] = this.cards[position] + '.png';
            switch(this.flipped) {
                case 0:
                    this.move1 = position;
                    this.flipped++;
                    this.info = '';
                    break;
                case 1:
                    this.move2 = position;
                    this.flipped++;
                    if(this.board[this.move1] === this.board[this.move2]) {
                        this.score++;
                        this.info = 'Boa!';
                    } else {
                        this.errors++;
                        this.info = 'Errou!';
                    }
                    break;
                default:
                    if(this.board[this.move1] !== this.board[this.move2]) {
                        this.board[this.move1] = 'back.jpg';
                        this.board[this.move2] = 'back.jpg';
                    }
                    this.move1 = position;
                    this.flipped = 1;
                    this.info = '';
            }

            if(this.score === 18) {
                this.game_over();
            }
            this.draw();
        }
    },

    game_over: function() {
        if(this.best === 0 || this.errors < this.best) {
            this.best = this.errors;
            this.msg = 'Melhor Jogo!';
        } else {
            this.msg = 'Bom Jogo!';
        }
    },

    start: function() {
        this.board.fill('back.jpg');
        this.cards.fill('');
        this.score = 0;
        this.errors = 0;
        this.msg = '';
        this.info = '';
        this.shuffle_cards();
        this.flipped = 0;
        this.draw();
    },

    shuffle_cards: function() {
        let card = 1;
        let position;
        let rest = 36;

        while(rest > 0) {
            position = Math.floor(Math.random() * rest);
            this.insert_card(card, position);
            rest--;

            position = Math.floor(Math.random() * rest);
            this.insert_card(card, position);
            rest--;

            card++;
        }
    },

    insert_card: function(card, position) {
        let index = 0;
        let place = -1;

        while(place < position) {
            if(this.cards[index] === '') {
                place++;
            }
            index++;
        }

        this.cards[index - 1] = card;
    },

    best_msg: function() {
        if(this.best === 0) {
            return 'Melhor: -';
        } else {
            return 'Melhor: ' + this.best;
        }
    },

    draw: function() {
        let content = '';

        for (i in this.board) {
            content += '<div><img src="resources/' +
                this.board[i] +
                '" onclick="memory_game.make_play(' + i + ')"></div>';
        }

        // Panel
        content += '<div class="panel" onclick="memory_game.start()">' + this.new_game + '</div>';
        content += '<div class="panel">' + this.info + '</div>';
        content += '<div class="panel">' + this.msg + '</div>';
        content += '<div class="panel">' + this.best_msg() + '</div>';
        content += '<div class="panel">Erros: ' + this.errors + '</div>';
        content += '<div class="panel">Pares: ' + this.score + '/18</div>';
        
        this.container_element.innerHTML = content;
    }
};