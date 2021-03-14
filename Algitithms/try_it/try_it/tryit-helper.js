/**
 * Helper functions for tyrit
 */

var module  = {};

function setNext([next,prev,back]) {
	prev = prev.replace('.try', '.html');
	next = next.replace('.try', '.html');
	let footer = document.querySelector('.page-footer');
	let aDiv = document.createElement('div');
	footer.appendChild(aDiv);
	let htmlStr = `<a href="${back}">Back</a>&nbsp;<a href="${prev}">${prev}</a>&nbsp;<a href="${next}">${next}</a>`;
	aDiv.innerHTML = htmlStr;
}

function addBackButton(link) {
  var n = document.querySelector('.click_me');
  var b = document.createElement('div');
  b.innerHTML = `<a class="ui labeled icon button large blue  back-button " href="${link}"><i class="left arrow icon"></i>Back</button>`;
  n.parentNode.insertBefore(b,n);
}