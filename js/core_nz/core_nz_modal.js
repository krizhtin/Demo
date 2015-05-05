
function basicModal(title, body, footer) {
	var modal = $('#modal').children('.modal-dialog').children('.modal-content');
	
	modal.children('.modal-header').children('.modal-title').html(title);
	modal.children('.modal-body').html(body);
	modal.children('.modal-footer').html(footer);
	
	$('#modal').modal({backdrop: 'static'});
	
	$("button").click(function(){
		setTimeout("$('body').find('.error:first').focus()",500);
	});
}

function basicModal2(title, body, footer) {
	var modal2 = $('#modal2').children('.modal-dialog').children('.modal-content');
	
	modal2.children('.modal-header').children('.modal-title').html(title);
	modal2.children('.modal-body').html(body);
	modal2.children('.modal-footer').html(footer);
	
	$('#modal2').modal("toggle");
	
	$("button").click(function(){
		setTimeout("$('body').find('.error:first').focus()",500);
	});
}

        