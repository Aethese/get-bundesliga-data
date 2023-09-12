// https://api.openligadb.de/getmatchdata/bl1/2023/1
let YEAR = '2023'
let API_URL = 'https://api.openligadb.de/getmatchdata/bl1/' + YEAR

function updateTable(team, game) {
	/**
	 * @description updates the table. gets the data from getData()
	 * 
	 * @param {String}  team The team we're looking up
	 * @param {Integer} game What game we're going to look up
	 */
	let data = getData(team, game);
	let table = document.getElementById('dataTable');

	return 0;
};

function getData(team, game) {
	/**
	 * @description gets all of the data needed in updateTable()
	 * 
	 * @param {String}  team The team we're looking up
	 * @param {Integer} game What game we're going to look up
	 * 
	 * @returns {Dictionary} data full data that we're working with
	 */

	return 0;
};