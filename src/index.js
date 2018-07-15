import "./css/index.scss";
import "./sprite/sprite.css";

$(function(){
  $("#click-me").on("click", function(e){
    e.preventDefault();
    $("#show-me").slideToggle();
  })
});