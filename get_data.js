let YEAR = '2023'
let API_URL = 'https://api.openligadb.de/getmatchdata/bl1/' + YEAR

async function callAPI(team)
{
	/**
	 * @description gets all of the data needed in updateTable()
	 * 
	 * @param {String}  team The team we're looking up
	 * 
	 * @returns {Array} data full data that we're working with
	 */

	let URL = API_URL + '/' + team;
	const response = await fetch(URL, {
		headers: {
			'Accept': 'application/json'
		}
	});
	let data = await response.json();
	return data;
}

async function updateTable(team, game)
{
	/**
	 * @description updates the table. gets the data from getData()
	 * 
	 * @param {String}  team The team we're looking up
	 * @param {Integer} game What game we're going to look up
	 */
	let data = await callAPI(team);
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
	};

	return 0;
}

function getData(team)
{
	/**
	 * @description gets all of the data needed in updateTable()
	 * 
	 * @param {String}  team The team we're looking up
	 * @param {Integer} game What game we're going to look up
	 * 
	 * @returns {Array} data full data that we're working with
	 */
	let URL = API_URL + '/' + team;
	let jsonData;

	fetch(URL, {
		headers: {
			'Accept': 'application/json'
		}
	}).then(response => response.json())
	  .then(data => {
		jsonData = data;
	});
	return jsonData;
	/* end here
	if (data[game-1]['team1']['teamName'] === team)
	{
		console.log('Our team')
	} else {
		console.log('Not our team')
	}*/
}
