let termineExistieren = false
let flash = false

function getButton(text) {
	let button = document.getElementsByTagName("button");
	for (var i = 0; i < button.length; i++) {
		if (button[i].innerText.toLowerCase().includes(text.toLowerCase())) {
			return button[i]
		}
	}
}

function clickButton(text) {
	let button = getButton(text)
	if (button) {
		console.log("Clicking button", button)
		button.click();
	}
}

function checkTermine() {
	if (!termineExistieren) {
		console.log("Checking...")
		clickButton("termine suchen");
		setTimeout(() => clickButton("abbrechen"), 5000)
	}
}

function flashBackground() {
	function toggleBg() {
		flash = !flash
		document.body.style.backgroundColor = flash ? "pink" : "blue"
	}
	toggleBg()
	setInterval(() => toggleBg(), 1000)
}

((() => {
	const origOpen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function () {
		console.log('request started!');
		this.addEventListener('error', function () {
			location.reload();
		})
		this.addEventListener('load', function () {
			try {
				let termine = JSON.parse(this?.responseText)?.termine
				console.log("Termine", termine)
				if (termine?.length > 0) {
					termineExistieren = true;
					flashBackground();

				}
			} catch (error) {
				console.log("Error, reloading", error)
				setTimeout(() => location.reload(), 2000);

			}
		});
		origOpen.apply(this, arguments);
	};
}))();

checkTermine()
setInterval(() => checkTermine(), 25000)