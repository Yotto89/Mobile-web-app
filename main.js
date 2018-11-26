var app = new Vue({

	el: "#app",

	data: {
		url: "https://api.jsonbin.io/b/5bf2cbd1ff655a2fcbad9761",
		info: [],
		links: { //variables que identifican cada una de las divs que se muestran y se esconden on:click v-show//
			"index": true,
			"leaderboard": false,
			"matches": false,
			"standings": false,
			"fields": false,
			"chat": false,
			"contact": false,
			"navbar": false,
		},

		"logina": true,
		"logouta": false,


		goals: 0,
		redcard: 0,
		yellowcard: 0,
		faults: 0
	},









	methods: {

		getData: function () {
			fetch(this.url, {
					method: "GET",
				})
				.then(function (data) {
					return data.json();
				})
				.then(function (myData) {
					app.info = myData.teams;
					app.goals;
				})
		},
		/* >------------------ A P P    F U N C T I O N S ------------------------>*/

		hideandshow: function (clicklinks) { //funcion para ver o no mis links (estan en divs) y asignarles un valor verdadero o falso cuando se hace click//
			for (var key in this.links) {
				this.links[key] = false;
			}
			this.links[clicklinks] = true; // cambia los valores a true //
			this.links["navbar"] = !this.links["index"];
		},

		stats: function () { //funcion para ver la cantidad de goles anotados por cada equipos/

			for (var i = 0; i < this.info.length; i++) {
				var goals = 0;
				var redCard = 0;
				var yellowCard = 0;
				var faults = 0;
				for (var j = 0; j < this.info[i].players.length; j++) {
					goals += this.info[i].players[j].goals;
					redCard += this.info[i].players[j].redcard;
					yellowCard += this.info[i].players[j].yellowcard;
					faults += this.info[i].players[j].faults;
					name += this.info[i].players[j].name;



				}
				this.info[i].totalgoals = goals;
				this.info[i].redcards = redCard;
				this.info[i].yellowcards = yellowCard;
				this.info[i].faults = faults;

			}

		},
		standings: function () { //funcion para ver la cantidad de goles / tarjetas / faltas de cada jugador //
			for (var i = 0; i < this.info[0].length; i++) {
				var goals = 0;
				var redCard = 0;
				var yellowCard = 0;
				var faults = 0;
				for (var j = 0; j < this.info.players[i].length; j++)
					goals = this.goals.info.players[i].goals;
			}
			this.info[i].goals = goals;
			this.info[i].redcards = redCard;
			this.info[i].yellowcards = yellowCard;
			this.info[i].faults = faults;
		},




		// <-------------------- C H A T ---------------------->


		login: function () { // funcion log in , cuando hacemos click en login, se muestra chat , send y logut 
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider);
			this.logina = false;
			this.logouta = true;
			console.log("login");

		},
		logout: function () { // funcion logout, cuando hacemos click en logout. se oculta chat send y logout
			firebase.auth().signOut();
			this.logouta = false;
			this.logina = true;
			console.log("logout");
		},
		writeNewPost: function () {
			var textinput = document.getElementById("textInput").value;
			console.log(textinput);
			var userName = firebase.auth().currentUser.displayName;
			var message = {
				messageText: textinput,
				name: userName
			};
			// textinput = document.getElementById("texinput").value = "";


			firebase.database().ref('SecondChat').push(message);
			this.Scrollbottom();
			console.log("write");

		},
		getPosts: function () {

			firebase.database().ref('SecondChat').on('value', function (data) {
				var posts = document.getElementById("posts");
				posts.innerHTML = "";

				var messages = data.val();

				for (var key in messages) {
					var text = document.createElement("div");
					text.className = "classchat";
					var element = messages[key];

					text.append(element.messageText);
					posts.append(text);
				}

			})
			this.Scrollbottom();
			console.log("getting posts");

		},
		Scrollbottom: function () {
			var posts = document.getElementById("posts")
			posts.scrollTop = posts.scrollHeight;
		}


	},


	computed: {


	},



	created: function () {
		this.getData();
		this.getPosts();
	},
	updated: function () {
		this.Scrollbottom();
	}




})
