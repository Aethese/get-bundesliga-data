let YEAR = '2023';
let API_URL = 'https://api.openligadb.de/getmatchdata/bl1/' + YEAR;

async function getBLTable(team)
{
	/**
	 * @description Gets details about overall performance for a team
	 * NOTE: the data is ALWAYS up-to-date!
	 * 
	 * @param {String} team The team we're looking up
	 * 
	 * @returns {Array} Returns a list containing GUV, tore,
	 * diff, punkte, platz
	 */

	// the shortName in data is just 'BVB' for 'dortmund'
	if (team === 'Dortmund')
	{
		team = 'BVB';
	}

	const URL = 'https://api.openligadb.de/getbltable/bl1/' + YEAR;
	const response = await fetch(URL, {
		headers: {
			'Accept': 'application/json'
		}
	});
	let data = await response.json();

	let finalData;
	let platz;
	for (let i = 0; i < data.length; i++)
	{
		if (data[i]['shortName'] === team)
		{
			finalData = data[i];
			platz = i + 1;
			break;
		}
	}

	let wins = finalData['won'];
	let ties = finalData['draw'];
	let losses = finalData['lost'];
	let GUV = wins+' | '+ties+' | '+losses;

	let scored = finalData['goals'];
	let scoredOn = finalData['opponentGoals'];
	let tore = scored+'-'+scoredOn;

	let diff = finalData['goalDiff'];
	if (diff >= 0)
	{
		diff = '+'+diff;
	}

	let punkte = finalData['points'];

	gatheredData = [
		GUV, tore, diff, punkte, platz
	];
	return gatheredData;
}

async function getData(team, game)
{
	/**
	 * @description gets all of the data needed in updateTable()
	 * 
	 * @param {String}  team The team we're looking up
	 * @param {Integer} game What game we're going to look up
	 * 
	 * @returns {Array} array full data that we're working with
	 */

	const URL = API_URL + '/' + team;
	const response = await fetch(URL, {
		headers: {
			'Accept': 'application/json'
		}
	});
	let data = await response.json();

	// order is the same as it is on the table

	// only get the simplified date
	let date = data[game-1]['matchDateTime'].substring(0, 10);

	let team1 = true; // if we're team 1
	let enemyTeamName = data[game-1]['team2']['shortName'];
	if (enemyTeamName === team) // if first team is diff then what we're looking for
	{
		team1 = false;
		enemyTeamName = data[game-1]['team1']['shortName'];
	}

	if (enemyTeamName === 'BVB')
	{
		enemyTeamName = 'Dortmund';
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

	let BLTable = await getBLTable(team);

	finalInfo = [
		game, date, enemyTeamName, score,
		BLTable[0], BLTable[1], BLTable[2],
		BLTable[3], BLTable[4],
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

	let table     = document.getElementById('dataTable');
	let tableText = document.getElementById('tableText');

	// don't know a better way to do this at this
	// moment in time :)
	let spielt   = document.getElementById('spielt');
	let datum    = document.getElementById('datum');
	let gegner   = document.getElementById('gegner');
	let ergebnis = document.getElementById('ergebnis');
	let guv      = document.getElementById('guv');
	let tore     = document.getElementById('tore');
	let diff     = document.getElementById('diff');
	let punkte   = document.getElementById('punkte');
	let platz    = document.getElementById('platz');

	let itemList = [
		spielt, datum, gegner, ergebnis,
		guv, tore, diff, punkte, platz
	];

	let data = await getData(team, game);

	for (let i = 0; i < itemList.length; i++)
	{
		itemList[i].textContent = String(data[i]);
	}

	table.classList.remove('hidden');
	tableText.classList.remove('hidden');
	return 0;
}
