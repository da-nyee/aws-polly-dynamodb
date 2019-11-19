var API_ENDPOINT = "https://4lv2cgz140.execute-api.us-east-1.amazonaws.com/Production"

document.getElementById("convert").onclick = function(){
    var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="ID: " + response;
	      },
	      error: function () {
	          alert("error");
	      }
	  });
}


document.getElementById("search").onclick = function(){
	var postId = $('#postId').val();

	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
}