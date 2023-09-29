// add amount of available games to the selectGame list
let min = 0;
let max = 34;
let element = document.getElementById('selectGame');

for (let i = min; i <= max; i++)
{
	let option = document.createElement('option');
	option.value = i;
	option.text = i;
	element.appendChild(option);
}
