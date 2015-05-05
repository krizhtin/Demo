//-------------------CORE DATE FORMAT
var final_dateWithTimeStringFormat = "yyyy/MM/dd hh:mm:ss";
var final_dateStringFormat = "yyyy/m/d";
var count = 0;

try{
	console.log("ajax init!");
	//-----------------------------ON AJAX, ADD A LOADING QUEUE
	$.ajaxSetup({
			cache:false,
			beforeSend: function(){
				addLoadingQueue();
			},
			complete: function(){
				removeLoadingQueue();
			}
		});
	console.log("core_nz_operation.js loaded!");
}
catch(err){
	console = {};
	console.log = function(message) {
	};
}

function serializeObject(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function stringEquationToLinkedEquation(stringEquation) {
	var valueHolder = "";
	var currentValueType = "OPERATOR";
	var isHugeValue = false;
	var tokens = [];
	var currentLinked = new linkedEquation("", "");
	for(var i=0; i<stringEquation.length; i++) {
		var value = ""+stringEquation[i];
		value = value.trim();
		
		if(value == "") {}
		else if(/^[+-/*%=<>!&|()]*$/.test(value)) {
			if(/^[(]*$/.test(value)) {
				if(currentValueType == "VALUE") {
					isHugeValue = true;
					valueHolder += value;
				}
				else {
					// add operator, go to Child
					currentLinked.operation = valueHolder.trim();
					var newLinkedEquation = new linkedEquation("", "");
					currentLinked.addChildEquation(newLinkedEquation);
					currentLinked = newLinkedEquation;
					valueHolder = "";
				}
			}
			else if(/^[)]*$/.test(value)) {
				if(isHugeValue) {
					isHugeValue = false;
					valueHolder += value;
					// ---- add value function
					currentLinked.expression = valueHolder.trim();
					//----------------
				}
				else {
					//----------------go to parent then Next node
					currentLinked.expression = valueHolder.trim();
					console.log("see if parent:   :", currentLinked);
					while(!currentLinked.parent) {
						currentLinked = currentLinked.previous;
					}
					currentLinked = currentLinked.parent;
					//----------------
					valueHolder = "";
				}
			}
			else {
				if(currentValueType == "VALUE") {
					if(!isHugeValue) {
						currentValueType = "OPERATOR";
						//----------------add value
						currentLinked.expression = valueHolder.trim();
						var newLinkedEquation = new linkedEquation("", "");
						currentLinked.addNextEquation(newLinkedEquation);
						currentLinked = newLinkedEquation;
						//----------------
						valueHolder = "";
					}
				}
				valueHolder += value;
			}
		}
		else {			
			if(currentValueType == "OPERATOR") {
				currentValueType = "VALUE";
				//----------------add operator
				currentLinked.operation = valueHolder.trim();
				//----------------
				valueHolder = "";
			}
			valueHolder += value;
		}
	}
	currentLinked.expression = valueHolder.trim();
	
	while(currentLinked.parent || currentLinked.previous) {
		if(currentLinked.previous) {
			currentLinked = currentLinked.previous;
		}
		else if(currentLinked.parent){
			currentLinked = currentLinked.parent; 
		}
	}
	return currentLinked;
}

function dateHardReformatter(notFormatedDate) {
	notFormatedDate = (""+notFormatedDate).trim();
	var theDate = notFormatedDate;
	
	var arrayDateStringsLength = theDate.split(" ").length;
	
	if(arrayDateStringsLength >= 6) {
		try {
			var arrayDate = theDate.split(" ");
			var arrayTime = arrayDate[4].split(":");
			
			for(var i=0; i<arrayTime.length; i++) arrayTime[i] = parseInt(arrayTime[i]);

			if(arrayTime[0] < 10) arrayTime[0] = "0" + arrayTime[0];
			if(arrayTime[1] < 10) arrayTime[1] = "0" + arrayTime[1];
			if(arrayTime[2] < 10) arrayTime[2] = "0" + arrayTime[2];
			
			//---------------------------------------------------------------------DATE #1
			var month = arrayDate[1];
			var day = parseInt(arrayDate[2]);
			var year = arrayDate[3];
			
			if(convertMonthWordToNumber(month) != false) {
				month = convertMonthWordToNumber(month);
			}
			
			if(day < 10) day = "0" + day;
			if(month < 10) month = "0" + month;
			
			return '' + year + "/" + month + "/" + day + " " + arrayTime[0] + ":" + arrayTime[1] + ":" + arrayTime[2];
		}
		catch(err){}
	}
	else if(arrayDateStringsLength == 2) {
		try{
			var arrayDate1 = theDate.split(" ");
			var arrayDate2 = arrayDate1[0].split("-");
			var arrayDate3 = arrayDate1[1].split(":");
			var apmpm = "";
			
			var year = parseInt(arrayDate2[0]);
			var month = parseInt(arrayDate2[1]);
			var day = parseInt(arrayDate2[2]);
			var hour = parseInt(arrayDate3[0]);
			var minutes = parseInt(arrayDate3[1]);
			var seconds = parseInt(arrayDate3[2]);
			
			if(hour < 10) hour = "0" + hour;
			if(minutes < 10) minutes = "0" + minutes;
			if(seconds < 10) seconds = "0" + seconds;
			if(month < 10) month = "0" + month;
			if(day < 10) day = "0" + day;
			
			//---------------------------------------------------------------------DATE #2
			return '' + year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + seconds;
		}
		catch(err){}
	}
	return '';
}

function dateReformatter(date) {
	if(date instanceof Date) {
		return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
	}
	else {
		return ""+date;
	}
}

function dateWithTimeReformatter(date) {
	if(date instanceof Date) {
		return "" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}
	else {
		return ""+date;
	}
}

function convertMonthNumberToWord(monthNumber){
	monthNumber = parseInt(monthNumber);
	
	if(isNaN(monthNumber)) return false;
	else if(monthNumber > 12) return false;
	
	switch(monthNumber){
		case 1:
			return "Jan";
		case 2:
			return "Feb";
		case 3:
			return "Mar";
		case 4:
			return "Apr";
		case 5:
			return "May";
		case 6:
			return "Jun";
		case 7:
			return "Jul";
		case 8:
			return "Aug";
		case 9:
			return "Sep";
		case 10:
			return "Oct";
		case 11:
			return "Nov";
		case 12:
			return "Dec";
	}
}

function convertMonthWordToNumber(monthWord){
	if((""+monthWord).length < 3) return false;
	monthWord = monthWord.substring(0, 3).toLowerCase();
	switch(monthWord){
		case "jan":
			return 1;
		case "feb":
			return 2;
		case "mar":
			return 3;
		case "apr":
			return 4;
		case "may":
			return 5;
		case "jun":
			return 6;
		case "jul":
			return 7;
		case "aug":
			return 8;
		case "sep":
			return 9;
		case "oct":
			return 10;
		case "nov":
			return 11;
		case "dec":
			return 12;
		default:
			return false;
	}
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//------------------------------------------CUSTOM OBJECT
function linkedEquation(operation, expression) {
	var thisEquation = this;
	this.previous = null;
	this.next = null;
	this.parent = null;
	this.child = null;
	
	if(operation) this.operation = operation;
	else this.operation = "";
	if(expression) this.expression = expression;
	else this.expression = "";
	
	this.addNextEquation = function(newLinkedEquation){
		newLinkedEquation.previous = thisEquation;
		thisEquation.next = newLinkedEquation;
	}
	
	this.addChildEquation = function(newLinkedEquation){
		newLinkedEquation.parent = thisEquation;
		thisEquation.child = newLinkedEquation;
	}
	

	this.indentRight = function(){
		if(thisEquation.previews && thisEquation.previews.child) {
			var current = thisEquation.previews.child;
			while(current.next) {
				current = current.next;
			}
			current.next = thisEquation;
			thisEquation.previous = current;
			thisEquation.next = null;
		}
		else {
			thisEquation.child = new linkedEquation(thisEquation.operation, thisEquation.expression);
			thisEquation.child.parent = thisEquation; 
			thisEquation.operation = "&&";
			thisEquation.expression = "";
		}
	}
	
	this.indentLeft = function(){
		if(thisEquation.parent) {
			if(thisEquation.previous) {
				thisEquation.previous.next = null;
			}
			else if(thisEquation.next && thisEquation.parent){
				thisEquation.next.parent = thisEquation.parent;
				thisEquation.parent = null;
			}
			
			if(thisEquation.next) {
					thisEquation.next.previous = null;
			}
			
			if(thisEquation.next && thisEquation.previous) {
				thisEquation.next.previous = thisEquation.previous;
				thisEquation.previous.next = thisEquation.next;
			}
		}
	}
	
	this.toString = function() {
		var fullString = "";
		var level = 0;
		
		goToNode(thisEquation);
		
		function goToNode(node){
			for(var i=0; i<level; i++) fullString += "   ";
			fullString += "[" + node.operation + "][" + node.expression + "]";
			
			if(node.child) {
				fullString += "\n";
				level++;
				goToNode(node.child);
				level--;
			}
			if(node.next) {
				fullString += "\n";
				goToNode(node.next);
			}
		}
		return fullString;
	}
}