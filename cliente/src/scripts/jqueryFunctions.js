import $ from 'jquery'


const typyngInputListener =(id,func,doneTypingInterval)=>{
    let typingTimer;                
    $("#"+id).keyup(function(){
        clearTimeout(typingTimer);
        if ($("#"+id).val()) {
            typingTimer = setTimeout(func, doneTypingInterval);
        }
    });
}

const scrollingChat = (id,scrollInterval) =>{
    $().ready(function () {
        $("#"+id).animate({ scrollTop: 1000 }, scrollInterval);
      });
}

const moveDivFarEnd = (id, justify, align)=>{

  $("#"+id).animate({[align]: "2px",[justify]: "2px"});
 
}
export {typyngInputListener,scrollingChat,moveDivFarEnd}


