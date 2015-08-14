var boardArray = [[null, null, null],[null, null, null], [null, null, null]];

var board = document.querySelector('#board');

var playerOneTurn = true;

var resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', function() {
	clearBoard();
	getBoard();
});

var clearBoard = function() {
	boardArray = [[null, null, null],[null, null, null], [null, null, null]];
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			var row = document.querySelector('.box');
			row.parentNode.removeChild(row);
		}
	}
}

var getBoard = function() {

	// Create board rows
	for (var x=0; x<3; x++) {
		var row = document.createElement('div');
		row.id = "row" + x;
		board.appendChild(row);
	}

	// Create board boxes
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			
			var box = document.createElement('div');
			box.className = "box";
			box.id = "box" + i + j;
			box.addEventListener('click', function() {
				if (playerOneTurn) {
					moveP1(this.id);
				} else {
					moveP2(this.id);
				}
				checkWinner();
			});

			var rowID = "#row" + i;
			var row = document.querySelector(rowID);
			row.appendChild(box);
		}
	}
};

var moveP1 = function(id) {
	var boxSelected = id;
	var box = document.querySelector('#' + boxSelected);
	box.style.backgroundColor = "black";
	boardArray[boxSelected[3]][boxSelected[4]] = "1";
	playerOneTurn = false;
}

var moveP2 = function(id) {
	var boxSelected = id;
	var box = document.querySelector('#' + boxSelected);
	box.style.backgroundColor = "gray";
	boardArray[boxSelected[3]][boxSelected[4]] = "2";
	playerOneTurn = true;
}

var checkWinner = function() {
	var a = boardArray[0][0];
	var b = boardArray[0][1];
	var c = boardArray[0][2];
	var d = boardArray[1][0];
	var e = boardArray[1][1];
	var f = boardArray[1][2];
	var g = boardArray[2][0];
	var h = boardArray[2][1];
	var i = boardArray[2][2];

	var winArray = [[a,b,c],[d,e,f],[g,h,i],[a,d,g],[b,e,f],[c,f,i],[a,e,i],[c,e,g]];

		console.log(winArray[0][0]);
		console.log(winArray[0][1]);
		console.log(winArray[0][2]);

	for (var x=0; x<winArray.length; x++) {
		if ((winArray[x][0] != null) && (winArray[x][0] === winArray[x][1]) && (winArray[x][1] === winArray[x][2])) {
			if (!playerOneTurn){
				console.log("Player 1 wins!");
			} else {
				console.log("Player 2 wins!");
			}
		}
	}

}


getBoard();
