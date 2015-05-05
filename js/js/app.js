function dropDown(id, url, width, index, doFunction){
	
    var source = {
        datatype: "json",
        datafields: [
            { name: 'text' },
            { name: 'value' }
        ],
        url: url,
    };
    
    var dataAdapter = new $.jqx.dataAdapter(source);
    
	$(id).jqxDropDownList({ source: dataAdapter, 
		                    displayMember: "text", 
		                    valueMember: "value", 
		                    selectedIndex: index, 
		                    width: width,
		                    autoDropDownHeight: true,
		                    height: '25px'
		                    	});
	
	$(id).on('bindingComplete', function (event) {
		if(doFunction) {
			doFunction();
		}
	});
}

function tooltip(id){
		id.on('focus', function(){
		    $(this).tooltip('show');
		    setTimeout(function(){ id.tooltip('hide'); },5000);
		});
		id.on('focusout', function(){
		    $(this).tooltip('hide');
		});
		id.on('mouseover', function(){
		    $(this).tooltip('show');
		    setTimeout(function(){ id.tooltip('hide'); },5000);
		});
		id.on('mouseout', function(){
		    $(this).tooltip('hide');
		});
		id.on('onclick', function(){
		    $(this).tooltip('show');
		    setTimeout(function(){ id.tooltip('hide'); },5000);
		});
	}

function dropDownCheckboxes(id, url, width, indices){
	
    var source = {
        datatype: "json",
        datafields: [
            { name: 'text' },
            { name: 'value' }
        ],
        url: url,
        async: false
    };
    
    var dataAdapter = new $.jqx.dataAdapter(source);
    
	$(id).jqxDropDownList({ source: dataAdapter, 
		                    displayMember: "text", 
		                    valueMember: "value",
		                    width: width, 
		                    height: '25px',
		                    autoDropDownHeight: true,
		                    checkboxes:	true});	

}

$(document).ready(function(){
	initAppJS();
});


function initAppJS() {
	$("input").each(function(){
		if($(this).attr("disabled") == "disabled"){
			$(this).jqxInput({height: "25px", width: "100%", minLength: 1, disabled:true});
		}
		if($(this).attr("type") == "text" || $(this).attr("type") == "password"){
			$(this).jqxInput({height: "25px", width: "100%", minLength: 1});
		}
	});
	
	 $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
	        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
	
}

$(document).on('change', '.btn-file :file', function() {
	var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});