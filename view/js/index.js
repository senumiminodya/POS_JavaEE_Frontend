$('#header').css({display:'block'});
$('#customer-section').css({display:'none'});
$('#item-section').css({display: 'none'});
$('#order-section').css({display:'none'});
$('#login-section').css({display:'block'});
$('#sign-up-section').css({display:'none'});

/* Sign up btn click */
$('#signUp-btn').on('click', function(event){
   event.preventDefault();
   $('#header').css({display:'block'});
   $('#login-section').css({display:'none'});
   $('#sign-up-section').css({display:'block'});
   $('#customer-section').css({display:'none'});
   $('#item-section').css({display: 'none'});
   $('#order-section').css({display:'none'});
});

/* Log In btn click */
$('#logIn').on('click', function(event){
   event.preventDefault();
   $('#header').css({display:'block'});
   $('#login-section').css({display:'block'});
   $('#sign-up-section').css({display:'none'});
   $('#customer-section').css({display:'none'});
   $('#item-section').css({display: 'none'});
   $('#order-section').css({display:'none'});
});

/* customer click */
$('#nav-customer').on('click', ()=>{
   $('#customer-section').css({display:'block'});
   $('#item-section').css({display:'none'});
   $('#order-section').css({display:'none'});
});

/* item click */
$('#nav-item').on('click', ()=>{
   $('#item-section').css({display:'block'});
   $('#customer-section').css({display:'none'});
   $('#order-section').css({display:'none'});
});

/* order click */
$('#nav-order').on('click', ()=>{
   $('#order-section').css({display:'block'});
   $('#customer-section').css({display:'none'});
   $('#item-section').css({display:'none'});
});