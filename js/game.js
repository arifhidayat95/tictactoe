$(document).ready(function() {
    let count = 0;
    let turn = 'x';
    let gameStat = {'x' : 0, 'o' : 0, 't' : 0};

    $('#game li').click(function () {
        if($(this).hasClass('disable')){
            alert('Already selected');
        }else{
            columnClick(this);

            const url = new URL(window.location.href);
            const playerType = url.searchParams.get('type');
            if(playerType === 'vsc'){
                const data = document.querySelectorAll('.square:not(.disable)');
                const selected = Math.floor(Math.random()*data.length);
                columnClick(data[selected]);
            }
        }
    });

    $("#reset").click(function () {
        reset();
    });

    function reset() {
        $("#game li").text("+").removeClass('disable o x btn-primary btn-info');
        count = 0;
    }

    function setStatistic() {
        $('#o_win').text(gameStat.o);
        $('#x_win').text(gameStat.x);
        $('#tie').text(gameStat.t);
    }

    function columnClick(element) {
        const btnColour = turn === "x" ? 'btn-info' : 'btn-primary';
        $(element).addClass(`disable ${btnColour}`).text(turn);

        const board = [$('#one').text(), $('#two').text(), $('#three').text(), $('#four').text(), $('#five').text(), $('#six').text(), $('#seven').text(), $('#eight').text(), $('#nine').text()];
        count++;

        const condition = result(board, count);

        if(condition !== '+' && condition !== null){
            if(condition === 'x' ||condition === 'o'){
                alert(`${condition.toUpperCase()} has won the game. Start a new game`);
            }else{
                alert('Its a tie. It will restart.');
            }

            gameStat[condition] += 1;

            setStatistic();
            reset();
        }

        turn = turn !== 'x' ? 'x' : 'o';
        $('#game_turn').text(turn.toUpperCase());
    }

    function result(board, filled) {
        for(let x = 0;x < 3;x++){

            if(board[3*x] !== '+' && board[3*x] === board[3*x+1] && board[3*x+1] === board[3*x+2]){
                return board[3*x];
            }

            if(board[x] !== '+' && board[x] === board[x+3] && board[x+3] === board[x+6]){
                return board[x];
            }
        }

        if(board[0] !== '+' && board[0] === board[4] && board[4] === board[8]){
            return board[0];
        }

        if(board[2] !== '+' && board[2] === board[4] && board[4] === board[6]){
            return board[2];
        }

        if(filled === 9){
            return 't';
        }

        return null;
    }
});