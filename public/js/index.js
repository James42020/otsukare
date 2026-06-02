
function setTitle(){
    var title = document.getElementsByTagName("title")[0]
    var defaultTitle = title.innerText
}
setTitle()

if(localStorage.getItem("DarkMode") == undefined){
    $(':root').css('color-scheme', 'light')
    localStorage.setItem("DarkMode","0")
} else{
    if(localStorage.getItem("DarkMode") == "0"){
        $(':root').css('color-scheme', 'light')
    } else {
        $(':root').css('color-scheme', 'dark')
    }
}
function flip(){
    if(localStorage.getItem("DarkMode") == "0"){
        $(':root').css('color-scheme', 'dark')
        localStorage.setItem("DarkMode","1")
    } else {
        $(':root').css('color-scheme', 'light')
        localStorage.setItem("DarkMode","0")
    }
}


$(document).on("click",".navbar-toggle",function(){
    if(!$('#nav-target').hasClass('in')&&$('.navbar-toggle').hasClass('collapsed')){
        localStorage.setItem("nav-dropdown","0")
    } else {
        localStorage.setItem("nav-dropdown","1")
    }
    // $('#nav-target').addClass('in');
    // $('.navbar-toggle').removeClass('collapsed');
})

$(document).on("DOMContentLoaded",function(){

    function navDrop(){
        $('#nav-target').addClass('in');
        $('.navbar-toggle').removeClass('collapsed');
    }
    function navUp(){
        $('#nav-target').removeClass('in');
        $('.navbar-toggle').addClass('collapsed');
    }
    
    if(localStorage.getItem("nav-dropdown") == undefined){
        navUp()
        localStorage.setItem("nav-dropdown","0")
    } else{
        if(localStorage.getItem("nav-dropdown") == "0"){
            navUp()
        } else {
            navDrop()
        }
    }
})
