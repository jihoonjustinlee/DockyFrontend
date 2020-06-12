$(document).ready(function(){
			
	// Adds table title row under table-users class.
	$(".table-users").append(`<div class="tableHeader">${tableTitle}</div>`).append(`<table cellspacing="0"></table>`);

	// Maps through tableContent.
	tableContent.map((obj, index)=>{

		// For each row, sets a <tr> tag (table row).
		$("table").append(`<tr></tr>`);

		// If it is a header row.
		if (index === 0) {

			// Map through the table row to access each colomn item on that row.
			tableContent[index].map((rowItem, rowIndex)=>{

				// Adds each colomn item to the targeted table row.
				$(`tr:eq(${index})`).append(`<th>${rowItem}</th>`);

			});

		// It is a content row. Comments see above.
		} else{
			tableContent[index].map((rowItem, rowIndex)=>{$(`tr:eq(${index})`).append(`<td>${rowItem}</td>`);});
		}
	});
});