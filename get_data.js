let YEAR = '2023'
let API_URL = 'https://api.openligadb.de/getmatchdata/bl1/' + YEAR

async function getTeamData(team)
{
	/**
	 * @descriptions gets data about a specific team
	 * 
	 * @param {String} team The team we're looking up
	 * 
	 * @returns {Array} Array full of data we need
	 */

	return 0;
}

async function getData(team, game)
{
	/**
	 * @description gets all of the data needed in updateTable()
	 * 
	 * @param {String}  team  The team we're looking up
	 * @param {Integer} game  What game we're going to look up
	 * 
	 * @returns {Array} data full data that we're working with
	 */

	const URL = API_URL + '/' + team;
	const response = await fetch(URL, {
		headers: {
			'Accept': 'application/json'
		}
	});
	let data = await response.json();

	// order is the same as it is on the table

	let date = data[game-1]['matchDateTime'].substring(0, 10);

	let team1 = true; // if we're team 1
	let Team = data[game-1]['team1']['shortName'];
	if (Team !== team) // if first team is diff then what we're looking for
	{
		team1 = false;
		Team = data[game-1]['team2']['shortName'];
	}

	let matchResults = data[game-1]['matchResults'][1];
	let score;
	let score1 = matchResults['pointsTeam1'];
	let score2 = matchResults['pointsTeam2'];
	if (team1) // if we're team 1
	{
		score = score1+'-'+score2;
	} else {
		score = score2+'-'+score1;
	}

	/*
	The rest of the data we need to gather can't be gathered
	from openligadb.de i need a new source to get specific
	info on teams from
	*/

	finalInfo = [
		game, date, Team, score
	];
	return finalInfo;
}

async function updateTable(team, game)
{
	/**
	 * @description updates the table. gets the data from getData()
	 * 
	 * @param {String}  team  The team we're looking up
	 * @param {Integer} game  What game we're going to look up
	 */
	let data = await getData(team, game);
	console.log(data);
	let table = document.getElementById('dataTable');
	table.classList.remove('hidden');

	// don't know a better way to do this at this
	// moment in time :)
	let spielt    = document.getElementById('spielt');
	let datum     = document.getElementById('datum');
	let gegner    = document.getElementById('gegner');
	let eregebnis = document.getElementById('eregebnis');
	let guv       = document.getElementById('guv');
	let tore      = document.getElementById('tore');
	let diff      = document.getElementById('diff');
	let punkte    = document.getElementById('punkte');
	let platz     = document.getElementById('platz');
	let itemList  = [
		spielt, datum, gegner, eregebnis,
		guv, tore, diff, punkte, platz
	];

	for (let i = 0; i <= itemList.length; i++)
	{
		//
	}

	return 0;
}
