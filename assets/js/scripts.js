// A $( document ).ready() block.
$(document).ready(function () {
  // DropCap.js
  var dropcaps = document.querySelectorAll(".dropcap");
  window.Dropcap.layout(dropcaps, 2);

  // Responsive-Nav
  var nav = responsiveNav(".nav-collapse");

  // Round Reading Time
  $(".time").text(function (index, value) {
    return Math.round(parseFloat(value));
  });

  // copyright year
  $("#rightYear").text(function () {
    return "2015 - " + new Date().getFullYear();
  });
});
