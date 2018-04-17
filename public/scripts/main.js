$(document).ready(function() {
	$(".form").on("submit", function(e) {
		e.preventDefault();
		var textEntry = $(".textbox").val();
		$("#listItems").prepend($("<li>").html(textEntry + "</li>"));
		$(".textbox").val('');
	});

	$("ul").on("dblclick", "li", function(event) {
		event.preventDefault();
		$(this).remove();
		});
});
