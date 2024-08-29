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
				document.getElementById("entryForm").submit();
		}
	})
});
console.log("End");