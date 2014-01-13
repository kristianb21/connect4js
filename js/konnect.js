(function (){

window.onload = function() {
//player interface
var connect = function(name,playerNumber){ // START connect()
	return {
		name : name,
		num : playerNumber,
		//game chip/coin
		coin : function(){
			if(this.num==1){
				var playerCoin = "player-one-coin";
			} else {
				var playerCoin = "player-two-coin";
			}
			return playerCoin;
		},
		score : 0,
		wins : 0,
		totalWins : function(){return this.wins;}
	};

} //close connect()

var connectPlay = { //START Game Methods

	board : document.getElementById("game-board"),

	rows : function(){
		var rowNodes = this.board.getElementsByTagName("tr"),
			rows = [];

		for(var i = 0; i<rowNodes.length; i++){
			rows.push(rowNodes[i]);
		}
		return rows;
		},//close this.rows()

	//returns available empty slot in given column
	availableSlot : function(rowNum){
		var allRows = this.rows(),
		//span class for empty slots
			empty = "empty-slot";

		//looking for empty slot to drop coin
		for (var i = allRows.length - 1; i > 0; i--) {
			
			var slotEmpty = allRows[i].getElementsByTagName("td")[rowNum].firstChild;
			
			if(slotEmpty.getAttribute("class")==empty){
				return slotEmpty;
			}
		}},//close this.availableSlot()

	slot : document.getElementsByTagName("td"),
	slotDrop : document.getElementById("row-header").getElementsByTagName("th"),

	//player initiates a move
	go : function(){
		for(var i = 0;i<this.slotDrop.length;i++){	
			var playersTurn = this.playersTurn;
			//clicking slot to insert player coin
			this.slotDrop[i].onclick = function(){

				var indexCol = this.getAttribute("rel"),
					emptySlot = connectPlay.availableSlot(indexCol);
				
				//check if any slot available
				if(!emptySlot){return false;}
				//Player One 
				if(playersTurn%2==1){
					var chip = pOne.coin();
					emptySlot.setAttribute("class",chip);

					if(connectPlay.checkScore(indexCol,this)){
						connectPlay.winnerMsg.innerHTML="Player One Wins!";
						return false;
					};
				}
				//Player Two	
				else{
					var chip = pTwo.coin();
					emptySlot.setAttribute("class",chip);
					
					if(connectPlay.checkScore(indexCol,this)){
						connectPlay.winnerMsg.innerHTML="Player Two Wins!";
						return false;
					};
				}
				playersTurn+=1;
			
			};
	}},//close this.go()

	//restarts game and clears the board 
	newGame : function(){
		this.playersTurn = 1;
		for(var i = 0;i<this.slot.length;i++){
			this.slot[i].firstChild.setAttribute("class","empty-slot");
		}
		this.winnerMsg.innerHTML="";
		},//close newGame()

	startBtn : document.getElementById("initiate-game"),
	playersTurn:1,
	startGame : function(){
		//clean game board
		this.startBtn.onclick = function(){
		connectPlay.newGame();
		connectPlay.go();
		}
	}, //close this.startGame
	//checking game score and validating the WIN!
	checkScore : function(indexCol,slot){
		var allRows = this.rows(),
			empty = "empty-slot",
			playerOne = "player-one-coin",
			playerTwo = "player-two-coin",
			pOneCount = 0,
			pTwoCount = 0,
			rowIndex = 1,
		 	rowCount = 1;


		//check for right slant connect fours
		while(rowIndex<=(allRows.length*2-2)){
			pOneCount=0;
			pTwoCount=0;

			if(allRows.length<rowIndex){
				var count=0; 
			}else{
				var count = allRows.length-rowIndex;	
			}
			//start moving upward in rows
			if(count==0){
				var i = allRows.length - rowCount;
				rowCount++;
			}else{
				var i = allRows.length - 1;
			}
			while(count<allRows.length){
				//check board boundaries
				if(!allRows[i].getElementsByTagName("td")[count]){break;}
					var slot = allRows[i].getElementsByTagName("td")[count].firstChild,
						coin = slot.getAttribute("class");
					//console.log(slot);
				if(coin==playerOne){
					pOneCount++;
					pTwoCount=0;
					if(pOneCount==4){
						console.log("Player One Wins!");
						return true;
					}
				} else if (coin==playerTwo){
					pTwoCount++;
					pOneCount=0;
					if(pTwoCount==4){
						console.log("Player Two Wins!");
						return true;
				}}
				i--;
				count++;
			}//close while loop
			rowIndex++;
		}//close right slant check

		//check for left slant connect fours
		//reset needed vars
		rowIndex=0;
		rowCount=1;

		while(rowIndex<=(allRows.length*2-2)){
			//reset player coin count
			pOneCount=0;
			pTwoCount=0;

			if(rowIndex > allRows.length){
				count = allRows.length-1;
			}else{
				count=allRows.length-rowIndex;	
			}
			//start moving upward in rows
			if(rowIndex > allRows.length){
				var i = allRows.length - rowCount;
				rowCount++;
			}else{
				var i = allRows.length - 1;
			}
			while(count<allRows.length){
				//check board boundaries
				if(!allRows[i].getElementsByTagName("td")[count]){break;}
					var slot = allRows[i].getElementsByTagName("td")[count].firstChild,
						coin = slot.getAttribute("class");
					//console.log(slot);
				if(coin==playerOne){
					pOneCount++;
					pTwoCount=0;
					if(pOneCount==4){
						console.log("Player One Wins!");
						return true;
					}
				} else if (coin==playerTwo){
					pTwoCount++;
					pOneCount=0;
					if(pTwoCount==4){
						console.log("Player Two Wins!")	;
						return true;
				}}
				i--;
				count--;
			}//close while loop
			rowIndex++;
		}//close left slant check

		//reset needed vars
		rowIndex=allRows.length-1;
		pOneCount=0;
		pTwoCount=0;
		//check for horizontal connect fours
		while(rowIndex>0){
			for (var i = allRows.length - 1; i >= 0; i--) {
				var slot = allRows[rowIndex].getElementsByTagName("td")[i].firstChild,
					coin = slot.getAttribute("class");
				//console.log(slot);
				if(coin==playerOne){
					pOneCount++;
					pTwoCount=0;
				if(pOneCount==4){
					console.log("Player One Wins!");
					return true;
				}} else if (coin==playerTwo){
					pTwoCount++;
					pOneCount=0;
				if(pTwoCount==4){
					console.log("Player Two Wins!");
					return true;
				}} 
			}
			rowIndex--;	
		}//close horizontal check

		//check for vertical connect fours
		//reset needed vars
		pOneCount=0;
		pTwoCount=0;
		for (var i = allRows.length - 1; i > 0; i--) {
			var slot = allRows[i].getElementsByTagName("td")[indexCol].firstChild,
				coin = slot.getAttribute("class");
			
			if(coin==playerOne){
				pOneCount++;
				pTwoCount=0;
				if(pOneCount==4){
					console.log("Player One Wins!");
					return true;
				}
			} else if (coin==playerTwo){
				pTwoCount++;
				pOneCount=0;
				if(pTwoCount==4){
					console.log("Player Two Wins!");
					return true;
			}} 
		}//close vertical check
		
		return false;
	},
	winnerMsg: document.getElementById("winner") //close checkScore() 

} //close connectPlay() 

var pOne = connect("Player One",1),
	pTwo = connect("Player Two",2);

connectPlay.startGame();

// //Animation Effects
// var slotBtn = document.getElementsByClassName("slot-btn"),
// 	slotHover = document.getElementsByClassName("slot-hover");

// for(var i=0;i<slotBtn.length;i++)
// 	slotBtn[i].onmouseover = function(){
// 		console.log(slotBtn[0]);
// 		//slotBtn[i].style.marginTop = "-6px";
// 		console.log("Testing number "+i);
// 	};


} //close window.onload 



})();

//TODO: Animation effects on Coin Dropping down to slot.

// function addLoadEvent(func) {
//   var oldonload = window.onload;
//   if (typeof window.onload != 'function') {
//     window.onload = func;
//   } else {
//     window.onload = function() {
//       oldonload();
//       func();
//     }
//   }
// }
// var slotBtn = document.getElementsByClassName("slot-btn"),
// 	slotHover = document.getElementsByClassName("slot-hover");
// var aniCoin = function (){
// for(var i=0;i<slotHover.length;i++)
// 	slotBtn[i].onmouseover = function (){	
// 		var riseCoin = function (this){
// 			this.previousSibling.style.marginTop = "-16px";			
// 		}
// 		riseCoin(this);
// 		hoverSlow = setTimeout("riseCoin",2000);
// 		this.onmouseout = function (){
// 		this.previousSibling.style.marginTop = "0px";
// 		}
// 	}		
// }



