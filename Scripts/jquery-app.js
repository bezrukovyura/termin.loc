function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

$(document).ready(function(){
  $('body').on('click', '.month-table td', function(){
    var attr = $(this).attr('data-date');
    if (typeof attr !== typeof undefined && attr !== false) {
      if ($(this).index() <= 4) {
        if (!$(this).hasClass('date--selected')) {
          dates.push($(this).attr('data-date'));
          $(this).addClass('date--selected');
          $('#dates').val(JSON.stringify(dates));
        } else {
          removeA(dates, $(this).attr('data-date'));
          $(this).removeClass('date--selected');
        }
        console.log(dates);
      } else {
        console.log('it`s already dayoff');
      }
    }
  });

  $('body').on('click', '#save-dates', function(e){
    e.preventDefault();
    var fd = new FormData;
    fd.append('dates', $('#dates').val());
  
    $.ajax({
      url: 'ajax.php',
      data: fd,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function (response) {            
        if (response === '1') {
          $('#place_order').click();
        } else {
          alert(response);
        }
      }
    });
  });

  $('body').on("DOMNodeInserted", function(){
    var today = new Date();
    $('.md-calendar-date').each(function(){
      var timestamp = $(this).attr("data-timestamp");
      if (timestamp >= today.getTime()) {
        var d = new Date(parseInt(timestamp));
        var month = (((d.getMonth() + 1) < 10 ) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1) );
        var day = (((d.getDate()) < 10 ) ? "0" + (d.getDate()) : (d.getDate()) );
        var date = d.getFullYear() + "-" + month + "-" + day;
        if (dates.includes(date)) $(this).addClass("date--selected");
      }
    });
  });
});