new Vue({
	el: '#app',
	data: {
		playerPoints: 100,
		opponentPoints: 100,
		gameStarted: false,
		messages: []
	},
	updated: function() {
		this.scrollMessages();
	},
	methods: {
		startGame: function() {
			this.playerPoints = 100;
			this.opponentPoints = 100;
			this.messages = [];
			this.gameStarted = true;
		},
		showTurnMessages: function(playerReduce, opponentReduce) {
			this.messages.push({
				message: "You reduced opponent's points by " + playerReduce,
				type: 'player'
			});
			this.messages.push({
				message: 'Opponent reduced your points by ' + opponentReduce,
				type: 'opponent'
			});
		},
		scrollMessages: function() {
			messagesContainer = document.querySelector('.messages-container');
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		},
		endGame: function(message) {
			this.messages.push(message);
			this.scrollMessages();
			this.gameStarted = false;
			alert(message.message);
		},
		updatePoints: function(playerReduce, opponentReduce) {
			this.opponentPoints -= playerReduce;
			if (this.gameOver) {
				this.endGame({
					message: 'You won! Congrats!',
					type: 'player'
				});
				return;
			}
			if (this.playerPoints - opponentReduce <= 100) {
				this.playerPoints -= opponentReduce;
				if (this.gameOver) {
					this.endGame({
						message: 'You lost. Try again.',
						type: 'opponent'
					});
					return;
				}
			} else {
				this.playerPoints = 100;
			}
		},
		normalReduce: function() {
			playerReduce = Math.round(Math.random() * 10);
			opponentReduce = Math.round(Math.random() * 10);

			this.updatePoints(playerReduce, opponentReduce);
			if (!this.gameOver) {
				this.showTurnMessages(playerReduce, opponentReduce);
			}
		},
		specialReduce: function() {
			playerReduce = Math.round(Math.random() * 15);
			opponentReduce = Math.round(Math.random() * 15);

			this.updatePoints(playerReduce, opponentReduce);
			if (!this.gameOver) {
				this.showTurnMessages(playerReduce, opponentReduce);
			}
		},
		gainPoints: function() {
			playerReduce = 0;
			opponentReduce = Math.round(Math.random() * 10) - 10;

			this.updatePoints(playerReduce, opponentReduce);

			this.showTurnMessages(playerReduce, opponentReduce);
		},
		resign: function() {
			this.gameStarted = false;
			this.playerPoints = 100;
			this.opponentPoints = 100;
			this.messages.push({
				message: 'You resigned. Opponent wins.',
				type: 'opponent'
			});
		}
	},
	computed: {
		playerPointsWidth: function() {
			return {
				width: this.playerPoints + '%'
			};
		},
		opponentPointsWidth: function() {
			return {
				width: this.opponentPoints + '%'
			};
		},
		gameOver: function() {
			return this.playerPoints <= 0 || this.opponentPoints <= 0;
		}
	}
});
