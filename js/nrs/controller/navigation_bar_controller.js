var navigation_bar_controller = Unified_Delivery_Tracking_System.controller("navigation_bar_controller", function($scope){
	
});


function addEquation(equationContainer, isAfter, value1, value2, value3, isBefore) {
		var insertedEquation = $(defaultEquation);
		var insertedOperation = $(defaultAndOr);
		
		if(isAfter) {
			equationContainer.after(insertedEquation);
			equationContainer.after(insertedOperation);
		}
		else if(isBefore){
			equationContainer.before(insertedEquation);
			if(equationContainer.children().length > 1 || equationContainer.next())
				equationContainer.before(insertedOperation);
		}
		else
			equationContainer.append(insertedEquation);
		
		insertedEquation.find(".equation").css("border", "1px solid black");
		insertedEquation.find(".equation").css("padding", "2px");
		insertedEquation.find("#equation-button").css("width", "200px");
		insertedEquation.find("#equation-button").jqxMenu({width:'35px', autoOpen: false, autoCloseOnClick: true, animationHideDelay: 0, animationHideDuration: 50});
		insertedEquation.find("#equation-button").css('visibility', 'visible');
		insertedEquation.find(".equation .formula-right-value").jqxDropDownList({source:defaultDropDownSource, width:"100%", autoDropDownHeight: true});
		insertedEquation.find(".equation .formula-condition-value").jqxDropDownList({ source:["equal to", "not equal to", "greater than", "greater than or equal to", "lesser than", "lesser than or equal to"], width:"100%", selectedIndex:0, autoDropDownHeight: true});
		insertedEquation.find(".equation .formula-left-value").jqxDropDownList({source:defaultDropDownSource, width:"100%", autoDropDownHeight: true});
		insertedEquation.find(".equation .formula-right-value").jqxDropDownList({placeHolder:"Select Value . ."});
		insertedEquation.find(".equation .formula-left-value").jqxDropDownList({placeHolder:"Select Value . ."});
		insertedEquation.find(".equation .formula-right-value").on('change', modalDropDownChange);
		insertedEquation.find(".equation .formula-left-value").on('change', modalDropDownChange);
		if(isAfter || isBefore) {
			insertedOperation.find(".equation-operation").jqxDropDownList({source:["And", "Or"], width:"100px", autoDropDownHeight: true, selectedIndex:0});
		}
		
		
		if(value1) {
			insertedEquation.find(".equation .formula-right-value").jqxDropDownList({source: value1, selectedIndex:-1});
			if($.inArray('(Formula)', value1) == 1) insertedEquation.find(".equation .formula-right-value").jqxDropDownList({selectedIndex:0});
		}
		if(value2) {
			insertedEquation.find(".equation .formula-condition-value").jqxDropDownList('val', value2);
		}
		if(value3) {
			insertedEquation.find(".equation .formula-left-value").jqxDropDownList({source: value3, selectedIndex:-1});
			if($.inArray('(Formula)', value3) == 1) insertedEquation.find(".equation .formula-left-value").jqxDropDownList({selectedIndex:0});
		}
		
		insertedEquation.find("#equation-button").on('itemclick', function (event) {
			var thisEquation = $(this);
			var clickMenu = $(event.target).text().toLowerCase();
			while(!thisEquation.hasClass("full-equation")) {
				thisEquation = $(thisEquation.context.parentElement);
			}
			
			switch(clickMenu) {
				case "add":
					addEquation(thisEquation, true);
					break;
				case "indent right":
					var value1 = thisEquation.find(".equation .formula-right-value").jqxDropDownList('source');
					var value2 = thisEquation.find(".equation .formula-condition-value").jqxDropDownList('val');
					var value3 = thisEquation.find(".equation .formula-left-value").jqxDropDownList('source');
					
					thisEquation.find(".equation").html("");
					addEquation(thisEquation.find(".equation"), false, value1, value2, value3);
					break;
				case "indent left":
					if(thisEquation.parents(".full-equation").length == 0) return;
					var value1 = thisEquation.find(".equation .formula-right-value").jqxDropDownList('source');
					var value2 = thisEquation.find(".equation .formula-condition-value").jqxDropDownList('val');
					var value3 = thisEquation.find(".equation .formula-left-value").jqxDropDownList('source');
					
					var currentEquation = $(thisEquation.parents(".full-equation")[0]);
					addEquation(currentEquation, false, value1, value2, value3, true);
					if(thisEquation.next() != 0) {
						thisEquation.next().remove();
						if(thisEquation.prev().length != 0) thisEquation.prev().remove();  
					}
					else {
						thisEquation.prev().remove();
					}
					thisEquation.remove();
					
					if(currentEquation.find(".full-equation").length < 1) {
						if(currentEquation.next()) {
							currentEquation.next().remove();
						}
						currentEquation.remove();
					} 
					break;
				case "delete":
					if($(thisEquation.next()).hasClass("operation-to-next-equation")) {
						thisEquation.next().remove();
					}
					else if($(thisEquation.prev()).hasClass("operation-to-next-equation")) {
						thisEquation.prev().remove();
					}
					thisEquation.remove();
					if($("#equation-string").children().length == 0) addEquation($("#equation-string"));
					break;
			}
			
		});
	}