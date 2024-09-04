console.log("Start");
const textAreas = document.querySelectorAll('textarea');
textAreas.forEach((tArea, index) => {
	tArea.addEventListener("keydown", function (event) {
		if (event.key == "Enter") {
			event.preventDefault();
			const nextTextArea = textAreas[index + 1];
			if (nextTextArea != null)
				nextTextArea.focus();
			else
				trySubmit();
		}
	})
});

function trySubmit() {
	console.log("tried Submit");
	if (textAreas[0].value == "") {
		alert("User Id must not be empty.");
		return false;
	}
	if (onlyNumbers(textAreas[0].value) == false || onlyNumbers(textAreas[1].value) == false) {
		alert("Ids should only have numbers.");
		return false;
	}
	document.getElementById("entryForm").submit();
}

function onlyNumbers(string) {
	console.log("tried onlyNumber " + string);
	for (let i = 0; i < string.length; i++) {
		if (isnbr(string[i]) == false)
			return (false);
	}
	return (true);
}

function isnbr(char) {
	if (char < '0' || char > '9')
		return (false);
	return (true);
}

console.log("End");