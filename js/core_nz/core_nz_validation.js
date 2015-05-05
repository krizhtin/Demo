function nz_validation(scope, validations) {
    function showError(jObj, errorType) {
        if(!($(jObj).next().length > 0 && $(jObj).next().hasClass("error-icon"))) {
            $(jObj).after('<span class="error-icon" style="display: none;"><img src="images/erroricon-01.png"/></span>');
        }
        var children = $(jObj).parent().children();
        $(children[1]).css('display', 'block');
        $(jObj).addClass('error');
        if (errorType === 'Invalid Input') {
            $(jObj).nz_jqxTooltip("Invalid Character.", "error");
        } else if (errorType === 'Required') {
            $(jObj).nz_jqxTooltip("Required Field must be filled up.", "error");
        } else if (errorType === 'Invalid') {
            $(jObj).nz_jqxTooltip("Invalid field value provided.", "error");
        } else if (errorType === 'Common') {
            $(jObj).nz_jqxTooltip("Already taken", "error");
        } else if (errorType === 'Length') {
            $(jObj).nz_jqxTooltip("The input length doesn't fit the required length", "error");
        }
    }

    function hideError(jObj) {
        var children = $(jObj).parent().children();
        $(children[1]).css('display', 'none');
        if ($(jObj).hasClass('error')) {
            $(jObj).removeClass('error');
        }
        if($(jObj).next().length > 0 && $(jObj).next().hasClass("error-icon")) {
            //$(jObj).next().remove();
        }
    }

    var validationListFunc = [];
    var validationUniqueListFunc = [];
    $.each(validations, function(idx, value) {
        if(value.conditions.hasOwnProperty('onKeypress') && value.conditions.onKeypress) {
            if(value.id) $("#"+value.id).on('keypress', function(e, a, b, c) {
                if(value.conditions.onKeypress.Disabled || value.conditions.onKeypress.Disabled && e.which == 8) {
                    console.log("sadasd");
                    e.preventDefault();
                }

                if(e.which == 8 || e.which == 9 || e.which == 0)   {
                    return true;
                }

                var currentKeyPressed = String.fromCharCode(!e.charCode ? e.which : e.charCode);

                if (value.conditions.onKeypress.Regex && !value.conditions.onKeypress.Regex.test(currentKeyPressed)) {
                    showError($("#"+value.id), "Invalid Input")
                    return false;
                }
                else if(value.conditions.onKeypress.Regex && value.hasOwnProperty('minlength') && value.minlength && $("#"+value.id).val().length < value.minlength) {
                    showError($("#"+value.id), "Length")
                }
                else {
                    hideError($("#"+value.id));
                }
            });
        }

        if(value.hasOwnProperty('maxlength') && value.maxlength) {
            if(value.id) $("#"+value.id).attr('maxlength',''+value.maxlength);
        }

        if(value.conditions.hasOwnProperty('onSubmit') && value.conditions.onSubmit) {
            if(value.conditions.onSubmit.hasOwnProperty('Required') && value.conditions.onSubmit.Required) {
                validationListFunc.push( function() {
                     if(value.conditions.onSubmit.hasOwnProperty('Required') && value.conditions.onSubmit.Required) {
                        if(value.conditions.onSubmit.Select) {
                            var keys = value.model.split(".").reverse();
                            var model = scope;
                            while(keys.length > 0) {
                                model = model[keys.pop()];
                            }

                            if(model && typeof model == "object" && (value.conditions.onSubmit.Select.min && model.length < value.conditions.onSubmit.Select.min || model.length < 1)) {
                                showError($("#"+value.id), "Length");
                                return false;
                            }
                            else if(!model || (""+model).trim() == "") {
                                showError($("#"+value.id), "Required");
                                return false;
                            }
                            else {
                                hideError($("#"+value.id));
                                return true;
                            }
                        }
                        else if($("#"+value.id).val().trim().length > value.maxlength) {
                            showError($("#"+value.id), "Length");
                            return false;
                        }
                        else if(value.conditions.onSubmit.hasOwnProperty('Regex') && value.conditions.onSubmit.Regex && !value.conditions.onSubmit.Regex.test($("#"+value.id).val())) {
                            showError($("#"+value.id), "Invalid");
                            return false;
                        }
                        else if($("#"+value.id).val().trim().length <= 0) {
                            showError($("#"+value.id), "Required");
                            return false;
                        }
                        else {
                            hideError($("#"+value.id));
                            return true;
                        }
                    }
                });
            }

            if(value.conditions.onSubmit.hasOwnProperty('Unique') && value.conditions.onSubmit.Unique) {
                if(value.conditions.onSubmit.Unique.hasOwnProperty('Service') && value.conditions.onSubmit.Unique.Service) {
                    // validationUniqueListFunc.push(function(func) {
                    //     value.conditions.onSubmit.Unique.Service($("#"+value.id).val()  , function(result){
                    //         if(result.length > 0 ){
                    //             showError($("#"+value.id), "Common");
                    //         }
                    //         else {
                    //             hideError($("#"+value.id));
                    //             func();
                    //         }
                    //     });
                    // });
                }
            }
        }

        if(value.conditions.hasOwnProperty('onBlur') && value.conditions.onBlur) {
            $("#"+value.id).on('blur', function(e) {
                if(value.conditions.onBlur.hasOwnProperty('Required') && value.conditions.onBlur.Required) {
                    if(value.conditions.onBlur.Select) {
                        var keys = value.model.split(".").reverse();
                        var model = scope;
                        while(keys.length > 0) {
                            model = model[keys.pop()];
                        }

                        if(model && typeof model == "object" && (value.conditions.onBlur.Select.min && model.length < value.conditions.onBlur.Select.min || model.length < 1)) {
                            showError($("#"+value.id), "Length");
                            return false;
                        }
                        else if(!model || (""+model).trim() == "") {
                            showError($("#"+value.id), "Required");
                            return false;
                        }
                        else {
                            hideError($("#"+value.id));
                            return true;
                        }
                    }
                    else if($("#"+value.id).val().trim().length > value.maxlength) {
                        showError($("#"+value.id), "Length");
                    }
                    else if(value.conditions.onBlur.hasOwnProperty('Regex') && value.conditions.onBlur.Regex && !value.conditions.onBlur.Regex.test($("#"+value.id).val())) {
                        showError($("#"+value.id), "Invalid");
                    }
                    else if($("#"+value.id).val().trim().length <= 0) {
                        showError($("#"+value.id), "Required");
                    }
                    else {
                        hideError($("#"+value.id));
                    }
                }

                // if(value.conditions.onBlur.hasOwnProperty('Unique') && value.conditions.onBlur.Unique) {
                //     if(value.conditions.onBlur.Unique.hasOwnProperty('Service') && value.conditions.onBlur.Unique.Service) {
                //         // value.conditions.onBlur.Unique.Service($("#"+value.id).val(), function(result){
                //         //     if(result.length > 0 ){
                //         //         showError($("#"+value.id), "Common");
                //         //     }
                //         //     else {
                //         //         hideError($("#"+value.id));
                //         //     }
                //         // });
                //     }
                // }
            });
        }

        if(value.conditions.hasOwnProperty('onChange') && value.conditions.onChange) {
            if(value.conditions.onChange.Date) {
                scope.$watch(value.model, function(n, o){
                    var newDate = new Date(n);
                    if(newDate.getDate() >= value.conditions.onChange.Date.minDate.getDate() && newDate.getDate() <= value.conditions.onChange.Date.maxDate) {
                    }
                    else if(newDate.getDate() < value.conditions.onChange.Date.minDate.getDate()) {
                        $("#"+value.id).datetimepicker('setDate', value.conditions.onChange.Date.minDate);
                        $("#"+value.id).val(dateReformatter(value.conditions.onChange.Date.minDate));
                    }
                    else if(newDate.getDate() > value.conditions.onChange.Date.maxDate){
                        $("#"+value.id).datetimepicker('setDate', value.conditions.onChange.Date.maxDate);
                        $("#"+value.id).val(dateReformatter(value.conditions.onChange.Date.maxDate));
                    }
                });

                // $("#"+value.id).on('blur', function(e) {
                //     if($("#"+value.id).val().trim() == "") {
                //         $("#"+value.id).datetimepicker('setDate', new Date());
                //         $("#"+value.id).val(dateReformatter(new Date()));
                //     }
                // });
            }
        }
});

return function(func) {
    function execution() {
        var execute = true;
        $.each(validationListFunc, function(idx, value){
            if(!value()) execute = false;
        });

        if(execute) func();
    }

    if(validationUniqueListFunc.length > 0) {
        console.log("With Unique!");
        var count = validationUniqueListFunc.length;
        $.each(validationUniqueListFunc, function(idx, value){
            value(function() {
                if(--count < 1) {
                    execution();
                }
            });
        }); 
    }
    else {
        console.log("No Unique!");
        execution();
    }
}
}