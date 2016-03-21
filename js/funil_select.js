$(function() {
  $('.progress').on('click', 'li', function() {
    $('.progress .active').removeClass('active');
    $(this).addClass('active');
  });
});
