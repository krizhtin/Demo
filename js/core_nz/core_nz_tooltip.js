$.fn.nz_jqxTooltip = function (message, trigger, delay, position){
   $(this).jqxTooltip('destroy');
   var defaultTooltipSettings = {trigger:'none', content: message, autoHideDelay: 3000, position:'top', name:"tooltip"+Math.round(new Date().getTime() + (Math.random() * 100))};
   
   if(delay) {
       defaultTooltipSettings['autoHideDelay'] = delay;
   }
   if(position) {
       defaultTooltipSettings['position'] = position;
   }
   
   if(trigger && trigger == "click") {
       defaultTooltipSettings['trigger'] = trigger;
       $(this).on('click', function(){
           var that = this;
           defaultTooltipSettings.autoHideDelay = 2000;
           $(this).jqxTooltip(defaultTooltipSettings);
           $(this).jqxTooltip('open');
           $(that).on('change', function () {
               $(that).jqxTooltip('destroy');
           });
           $(that).on('blur', function () {
               $(that).jqxTooltip('destroy');
           });
           $(this).on('mouseleave', function(){
               $(that).jqxTooltip('destroy');
           });
       });
   }
   else if(trigger && trigger == "hover") {
     var that = this;
       $(this).on('mouseenter', function(){
           $(that).jqxTooltip(defaultTooltipSettings);
           $(that).jqxTooltip('open');
       });
       $(this).on('mouseleave', function(){
           $(that).jqxTooltip('destroy');
       });
   }
   else if(trigger && trigger == "error") {
       $(this).addClass("error");
       $(this).jqxTooltip(defaultTooltipSettings);
   }
   else {
       if(trigger && trigger == "mouse"){
           defaultTooltipSettings['position'] = 'mouse';
       }
       $(this).jqxTooltip(defaultTooltipSettings);
   }
   
   if(!trigger || trigger.trim() == "" || trigger == "error") {
       defaultTooltipSettings.autoHideDelay = 1000
       $(this).jqxTooltip(defaultTooltipSettings);
       $(this).jqxTooltip('open');
   }
          
   
   $(this).bind('close', function () {
       //$(this).removeClass("error");
       //if (trigger !== 'error') $(this).jqxTooltip('destroy');
//         $(this).jqxTooltip('destroy');
   }); 
}

try{
    console.log("core_nz_tooltip.js loaded!");
}catch(err){}