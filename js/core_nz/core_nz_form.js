function nz_init_modalForm(modalID, formViewTitle, fields, saveFunction) {
	var closeButtonID = "closebutton-" + modalID;
	var saveButtonID = "savebutton-" + modalID;
	var modalItemClasses = "items-" + modalID;
	var theModal = $('<div class="modal fade in" id="' + modalID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block; padding-right: 17px;"><div class="modal-backdrop fade in" style="height: 100%;"></div>' + 
		'<div class="modal-dialog">'+
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<button type="button" class="close ' + closeButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<h4 class="modal-title" id="myModalLabel">' + formViewTitle + '</h4>' +
		'</div>' +
		'<div class="modal-body"></div>' +
		'<div class="modal-footer">' +
		'<button  id="' + saveButtonID + '" type="button" class="btn btn-primary">Save</button>' +
		'<button type="button" class="btn btn-default ' + closeButtonID + '">Cancel</button>' +
		'</div>' +
		'</div></div></div>');

	$('html').append(theModal[0].outerHTML);

	function dataToTag(value) {
		var tag = null
		if(!value.field_type || value.field_type.toUpperCase() == "TEXTBOX" || value.field_type.trim() == "") {
			tag = $('<input id="' + modalID + value.col_name + '" name="'  + value.col_name + '" min="' + value.min_char + '" maxLength="' + value.max_char + '" placeholder="' + value.field_name + '" type="text" class="form-control"/>');
			tag.css("width", "100%");
			// tag.attr("field_validation", value.field_validation);
		}
		return tag;
	}

	theModal = $("#"+modalID);
	for(var i=0; i< fields.length; i+=2) {
		var value1 = fields[i];
		var value2 = fields[i+1];
		var form = '<div class="panel-body"><div class="form-inline"><div class="row"><div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
							'<label id="label1" class="item"></label>' +
						'</div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">' +
							'<div class="input1"></div>' +
						'</div></div><div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
							'<label id="label2" class="item" style="text-align: left"></label>' +
						'</div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">' +
							'<div class="input2"></div>' +
						'</div></div></div></div></div>';

		form = $(form);

		if(!value1.field_name) value1.field_name = value1.col_name;
		if(value2 && !value2.field_name) value2.field_name = value2.col_name;
		form.find('.input1').replaceWith(dataToTag(value1));
		form.find('label#label1').text(value1.field_name);
		if(value2) {
			form.find('.input2').replaceWith(dataToTag(value2));
			form.find('label#label2').text(value2.field_name);
		}
		theModal.find(".modal-body").append(form);
			
			
			// var validation;
			// var field_validation = value.field_validation.toLowerCase().trim();
			// switch(field_validation) {
			// 	case "alphanumericnospace": 
			// 	validation = /^[a-zA-Z0-9_!@#$%^&*()-_=+{}\[\]]+$/; 
			// 	break;
			// 	case "alphanumericnospecial": 
			// 	validation = /^[a-zA-Z0-9_ ]+$/; 
			// 	break;
			// 	case "alphanumericnospacenospecial": 
			// 	validation = /^[a-zA-Z0-9_]+$/; 
			// 	break;
			// 	case "alphabet": 
			// 	validation = /^[a-zA-Z., ]+$/; 
			// 	break;
			// 	case "alphabetnospace": 
			// 	validation = /^[a-zA-Z.,]+$/; 
			// 	break;
			// 	case "numeric": 
			// 	validation = /^[0-9]+$/; 
			// 	break;
			// 	default: 
			// 	validation = /^[a-zA-Z0-9_ !@#$%^&*()-_=+{}\[\]]+$/; 
			// 	break;
			// }
			// theModal.find("#" + modalID + value.col_name).nz_jqxTooltip((value.is_mandatory ? "Required value</br>":"") +  value.field_validation + (value.is_keycol ? "</br>Unique value</br>":"</br>") + " No whitespace</br>minimum of " + value.min_char + " characters</br>maximum of " + value.max_char + " characters" , "hover");
			// theModal.find("#" + modalID + value.col_name).nz_jqxTooltip((value.is_mandatory ? "Required value</br>":"") +  value.field_validation + (value.is_keycol ? "</br>Unique value</br>":"</br>") + " No whitespace</br>minimum of " + value.min_char + " characters</br>maximum of " + value.max_char + " characters" , "click");
			
			// theModal.find("#" + modalID + value.col_name).nz_formValidate({
			// 	onKeypress: { Minmaxlength: [value.min_char,value.max_char], Regex: validation},
			// 	onBlur: { Required: value.is_mandatory, Regex: validation},
			// 	onSubmit: { Required: value.is_mandatory, Regex: validation},
			// }, '#' + saveButtonID);
		//}
	}
	
	// on click cancel button
	theModal.find('.' + closeButtonID).on('click', function(){
		nz_init_confirmMessage("Are you sure you want to cancel add value?", function(){
			$('#' + modalID).remove();
		});
	});
	
	// on click save button
	theModal.find('#' + saveButtonID).on('click', function(){
		// if (!isFormValid()) return;
		
		var stopOperation = false;
		for(var i=0; i< fields.length; i++) {
			var value = fields[i];
			var index = i;
			var formFields = theModal.find( "div.modal-body input" ).serializeArray();
			
			// iterate through all fields
			$.each(formFields, function(index, value){
				if(value.name == fields[i].col_name) {
					if(fields[i].is_mandatory && value.value.trim() == "") {
						theModal.find( "div.modal-body input" ).each(function(){
							validateEmpty($(this), "");
						});
						stopOperation = true;
					}
				}
			});
			if(stopOperation) return;
		}
		
		nz_init_confirmMessage("Are you sure you want to save value?", function(){
			$('#' + modalID).remove();
			var theValues = {};
			$.each(theModal.find( "div.modal-body input" ).serializeArray(), function(index, value){
				theValues[value.name] = value.value;
			});
			saveFunction(theValues, theModal);
		});
	});

	theModal.find('.modal-content').draggable();
	theModal.find('.modal-dialog').css("min-width", "350px");
	theModal.find('.modal-dialog').css("width", "50%");
	theModal.find('.modal-footer').css("clear", "left");
	theModal.find('.' + modalItemClasses)
	.css( "float", "left" )
	.css( "width", "280px" )
	.css( "height", "50px" )
	.css( "margin", "5px" );
}

function nz_modalForm_new(formViewTitle, fields, saveFunction) {
	var modalID = "modal-" + Math.round(new Date().getTime() + (Math.random() * 100));
	formViewTitle = "New " + formViewTitle;
	nz_init_modalForm(modalID, formViewTitle, fields, saveFunction);
}

function nz_modalForm_edit(formViewTitle, fields, values, saveFunction) {
	var modalID = "modal-" + Math.round(new Date().getTime() + (Math.random() * 100));
	formViewTitle = "Edit " + formViewTitle;
	nz_init_modalForm(modalID, formViewTitle, fields, saveFunction);
	
	
	
	$.each(values, function(index, value){
		$("#" + modalID + index).val(value);
	});
}

function nz_init_modalFileUploadForm(url, uploadFunction, changeFunction, extraAttr) {
	var modalID = "modal-" + Math.round(new Date().getTime() + (Math.random() * 100));
	var closeButtonID = "closebutton-" + modalID;
	var uploadButtonID = "uploadbutton-" + modalID;
	var formButtonID = "formbutton-" + modalID;
	var theFileID = "thefilebutton-" + modalID;
	var selectedFile = null;
	
	var theModal = $('<div class="modal fade in" id="' + modalID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block; padding-right: 17px;"><div class="modal-backdrop fade in" style="height: 100%;"></div>' + 
		'<div class="modal-dialog">'+
		'<div class="modal-content">' +
		'<iframe id="iframe-server-result" name="iframe-name" style="width:0px; height:0px; border:0px; display:none;"></iframe>' +
		'<div class="modal-header">' +
		'<button type="button" class="close ' + closeButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<h4 class="modal-title" id="myModalLabel">Upload File</h4>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form action="form/import" method="POST" id="' + formButtonID + '" target="iframe-name" enctype="multipart/form-data" style="font-size:16px">' +
		'<input type="file" accept=".txt" name="file" id="' + theFileID + '" class="btn btn-default"/>' +
		'<input value="' + extraAttr.value + '" name="' + extraAttr.name + '" type="hidden"/>' +
		'</form>' +
		'</div>' +
		'<div class="modal-footer">' +
		'<button  id="' + uploadButtonID + '" type="button" class="btn btn-primary">Upload</button>' +
		'<button type="button" class="btn btn-default ' + closeButtonID + '">Cancel</button>' +
		'</div>' +
		'</div></div></div>');

$('html').append(theModal[0].outerHTML);
theModal = $("#"+modalID);
theModal.find('.' + closeButtonID).on('click', function(){
	$('#' + modalID).remove();
});

$("#iframe-server-result").unbind("load");
$("#iframe-server-result").load(changeFunction);

theModal.find('#' + uploadButtonID).on('click', function(e){
	e.preventDefault();
	uploadFunction($('#'+theFileID), $('#'+formButtonID), $('#' + modalID));
});

theModal.find('.modal-dialog').css("min-width", "200px");
theModal.find('.modal-dialog').css("width", "350px");
theModal.find('.modal-footer').css("clear", "left");
}


function nz_init_modalFileUploadForm2(url, uploadFunction, changeFunction, extraAttr) {
	var modalID = "modal-" + Math.round(new Date().getTime() + (Math.random() * 100));
	var closeButtonID = "closebutton-" + modalID;
	var uploadButtonID = "uploadbutton-" + modalID;
	var formButtonID = "formbutton-" + modalID;
	var theFileID = "thefilebutton-" + modalID;
	var selectedFile = null;
	
	var theModal = $('<div class="modal fade in" id="' + modalID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block; padding-right: 17px;"><div class="modal-backdrop fade in" style="height: 100%;"></div>' + 
		'<div class="modal-dialog">'+
		'<div class="modal-content">' +
		'<iframe id="iframe-server-result" name="iframe-name" style="width:0px; height:0px; border:0px; display:none;"></iframe>' +
		'<iframe id="framesave" name="framesave" style="width:0px; height:0px; border:0px; display:none;"></iframe>' +

		'<div class="modal-header">' +
		'<button type="button" class="close ' + closeButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<h4 class="modal-title" id="myModalLabel">Upload File</h4>' +
		'</div>' +
		'<div class="modal-body">' +
		'<form action="'+url+'" method="POST" id="' + formButtonID + '" target="iframe-name" enctype="multipart/form-data" style="font-size:16px">' +
		'<input type="file" accept=".txt" name="file" id="' + theFileID + '" class="btn btn-default"/>' +
		'</form>' +
		'</div>' +
		'<div class="modal-footer">' +
		'<button  id="' + uploadButtonID + '" type="button" class="btn btn-primary">Upload</button>' +
		'<button type="button" class="btn btn-default ' + closeButtonID + '">Cancel</button>' +
		'</div>' +
		'</div></div></div>');

$('html').append(theModal[0].outerHTML);
theModal = $("#"+modalID);
theModal.find('.' + closeButtonID).on('click', function(){
	$('#' + modalID).remove();
});

$("#iframe-server-result").unbind("load");
$("#iframe-server-result").load(changeFunction);

theModal.find('#' + uploadButtonID).on('click', function(e){
	e.preventDefault();
	uploadFunction($('#'+theFileID), $('#'+formButtonID), $('#' + modalID));
});

theModal.find('.modal-dialog').css("min-width", "200px");
theModal.find('.modal-dialog').css("width", "350px");
theModal.find('.modal-footer').css("clear", "left");
}

function nz_init_modalFormCustom(title, HTMLbody, HTMLfooter, renderedFunction, onCloseFunction, width) {
	var modalID = "modal-" + Math.round(new Date().getTime() + (Math.random() * 100));
	var defaultCloseButtonID = "closebutton-" + modalID;
	
	var theModal = $('<div class="modal fade in" id="' + modalID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block; padding-right: 17px;"><div class="modal-backdrop fade in" style="height: 100%;"></div>' + 
		'<div class="modal-dialog">'+
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<button type="button" id="' + defaultCloseButtonID + '" class="close ' + defaultCloseButtonID + '" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
		'<h4 class="modal-title" id="myModalLabel">' + title + '</h4>' +
		'</div>' +
		'<div class="modal-body">' + HTMLbody + '</div>' +
		'<div class="modal-footer">' +
		HTMLfooter +
		'</div>' +
		'</div></div></div>');
	
	$('html').append(theModal[0].outerHTML);
	
	theModal = $("#"+modalID);
	
	theModal.find('#' + defaultCloseButtonID).on('click', function(){
		theModal.remove();
		if(onCloseFunction) onCloseFunction();
	});
	
	theModal.ready(function(){
		if(renderedFunction) renderedFunction(theModal);
	});

	theModal.find('.modal-content').draggable();
	theModal.find('.modal-dialog').css("min-width", "350px");
	if(width) theModal.find('.modal-dialog').css("width", width);
	else theModal.find('.modal-dialog').css("width", "50%");
	theModal.find('.modal-footer').css("clear", "left");
	return theModal;
}

function nz_init_Form(properties) {
	var theModal = '<div id="responsive" class="modal hide fade" tabindex="-1" data-width="760">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
	'<h3>Responsive</h3>' +
	'</div>' +
	'<div class="modal-body">' +
	'<div class="row-fluid">' +
	'<div class="span6">' +
	'<h4>Some Input</h4>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'</div>' +
	'<div class="span6">' +
	'<h4>Some More Input</h4>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'<p><input type="text" class="span12"></p>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'<div class="modal-footer">' +
	'<button type="button" data-dismiss="modal" class="btn">Close</button>' +
	'<button type="button" class="btn btn-primary">Save changes</button>' +
	'</div>' +
	'</div>';

	$('body').append(theModal	);
	alert("see it!?");
}