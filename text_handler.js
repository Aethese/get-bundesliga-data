/*
	sorry for the mess. this script handles changing text
	based on user input, showing text after user selects their
	team, and handles all of the table changes :p
*/

// change for 'Your selected team is'
document.getElementById('selectTeam')
.addEventListener('change', function () {
	'use scrict';
	// first change the 'your selected team' text to match
	// what team they picked. after that show the text that
	// allows them to pick their team
	let sel = document.getElementById('selectTeam');
	let value = sel.options[sel.selectedIndex].text;
	let text = 'Your selected team is: ' + value;

	document.getElementById('selectedT').textContent = text;

	// show the 'your selected game' text
	document.getElementById('selectGameText').classList.remove('hidden'); // text
	document.getElementById('selectedG').classList.remove('hidden');      // info text

});

// change for 'Your selected game is'
document.getElementById('selectGame')
.addEventListener('change', function () {
	'use scrict';
	// Order:
	//	First: Update 'selected game is' text
	//	Second: Update the table by calling updateTable() in get_data
	let sel = document.getElementById('selectGame');
	let value = sel.options[sel.selectedIndex].text;
	let text = 'Your selected game is: ' + value;

	document.getElementById('selectedG').textContent = text;

	// update the table
	let table = document.getElementById('dataTable');
	table.classList.add('hidden');
	let tableText = document.getElementById('tableText');
	tableText.classList.add('hidden');

	let selectTeam = document.getElementById('selectTeam');
	let team = selectTeam.options[selectTeam.selectedIndex].text;
	let game = parseInt(value);
	updateTable(team, game);
});