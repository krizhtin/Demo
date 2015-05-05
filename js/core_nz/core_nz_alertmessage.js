function nz_init_errorMessage(message) {
	nz_init_modalPopUp("Error Message", message);
}

function nz_init_warnMessage(message) {
	nz_init_modalPopUp("Warning Message", message);
}

function nz_init_successMessage(message, onCloseClick) {
	if(!onCloseClick) onCloseClick = null;
	nz_init_modalPopUp("Success Message", message, onCloseClick);
}

function nz_init_confirmMessage(message, onYesClick) {
	if(!onYesClick) onYesClick = null;
	nz_init_modalPopUp("Confirmation Message", message, onYesClick);
}

function nz_init_modalPopUp(headerTitle, bodyMessage, onClick) {
	var modalID = "core_nz_alertmessage-" + Math.round(new Date().getTime() + (Math.random() * 100));
	var closeButtonID = "closebutton-" + modalID;
	var saveButtonID = "savebutton-" + modalID;
	var footerButtons = "";
	var iconImage = "";
	var errorBody = "";
	
	if(headerTitle == "Error Message") {
		headerXButtons = '<button type="button" class="close ' + closeButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		footerButtons = '<button type="button" class="btn btn-primary ' + closeButtonID + '">Close</button>';
		iconImage = '<img src="images/error-image.png" style="width:70px;height:70px">' ;

		var errorMessage = bodyMessage;
		bodyMessage = "An error has occured.";
		errorBody = '<div class="panel" style="border: 1px dashed grey">' +
			            '<div class="panel-heading">' +
			                '<h4 class="panel-title">' +
			                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Click For Error Details</a>' +
			                '</h4>' +
			            '</div>' +
			            '<div id="collapseOne" class="panel-collapse collapse">' +
			                '<div class="panel-body">' +
			                    '<label>' + errorMessage + '</label>' +
			                '</div>' +
			            '</div>' +
			        '</div>';
	}
	else if(headerTitle == "Information Message") {
		headerXButtons = '<button type="button" class="close ' + saveButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		footerButtons = '<button type="button" class="btn btn-primary ' + saveButtonID + '">Close</button>';
		iconImage = '<img src="images/information-image.png" style="width:70px;height:70px">' ;

	}
	else if(headerTitle == "Confirmation Message") {
		headerXButtons = '<button type="button" class="close ' + closeButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		footerButtons = '<button type="button" class="btn btn-primary ' + saveButtonID + '">Yes</button>' + '<button  type="button" class="btn btn-primary ' + closeButtonID + '">No</button>';

		iconImage = '<img src="images/confirmation-image.png" style="width:70px;height:70px">' ;

	}
	else if(headerTitle == "Warning Message") {
		headerXButtons = '<button type="button" class="close ' + closeButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		footerButtons = '<button type="button" class="btn btn-primary ' + closeButtonID + '">Close</button>';

		iconImage = '<img src="images/warning-image.png" style="width:70px;height:70px">' ;
	}
	else if(headerTitle == "Success Message") {
		headerXButtons = '<button type="button" class="close ' + saveButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		footerButtons = '<button type="button" class="btn btn-primary ' + saveButtonID + '">Close</button>';
		iconImage = '<img src="images/success-image.png" style="width:70px;height:70px">' ;

	}
	
	var theModal = $('<div class="modal-popupmessage modal fade in" id="' + modalID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block; padding-right: 17px;"><div class="modal-backdrop fade in" style="height: 100%;"></div>' + 
			'<div class="modal-dialog">'+
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						headerXButtons +
						'<h4 class="modal-title" id="myModalLabel">' + headerTitle + '</h4>' +
					'</div>' +
				'<div class="modal-body">' +
					'<div class="bootbox-body">' +
						'<div class="row" style="word-wrap: break-word; overflow: hidden; ">' +
							'<div class="col-md-12">' +
								'<div id="panel-left" class="col-lg-2 col-md-2 col-sm-2 col-xs-2">' +
								iconImage +
								'</div>' +
								'<div id="panel-left" class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' +
									'<h4 class="col-md-12 control-label">' + bodyMessage + '</h4> ' +
								'</div>' +
							'</div>' +
							'<div class="col-md-12">' +
								errorBody +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="modal-footer">' +
					footerButtons +
				'</div>' +
			'</div></div></div>');

	$('html').append(theModal[0].outerHTML);
	theModal = $("#"+modalID);
	
	theModal.find('.modal-content').draggable();
	theModal.find('.modal-dialog').css("min-width", "200px");
	theModal.find('.modal-dialog').css("width", "27%");
	theModal.find('.modal-footer').css("clear", "left");
	
	theModal.find('.' + closeButtonID).on('click', function(){
		$('#' + modalID).remove();
	});
	
	theModal.find('.' + saveButtonID).on('click', function(){
		$('#' + modalID).remove();
		if(onClick) onClick();
	});
}