$('#userLogin').click(() => {
    $('#userLogin').attr('class', 'active');
    $('#adminLogin').attr('class', 'inactive');
    $('.user').show();
    $('.admin').hide();
});


$('#adminLogin').click(() => {
    $('#adminLogin').attr('class', 'active');
    $('#userLogin').attr('class', 'inactive');
    $('.admin').show();
    $('.user').hide();
});


// $('.user').submit(() => {
//     console.log('01')
//     return false;
// });