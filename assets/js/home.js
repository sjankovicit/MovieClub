$(document).ready(function(){
    showMenu();
});

function showMenu(){
    $.ajax({
        url: "assets/data/menu.json",
        method: "GET",
        type: "json",
        success: function(data){
            printMenu(data);
        },
        error: function(err){
            alert(err);
        }
     });
}
    


function printMenu(links){
    let url = location.href.split("/");
    let currentRoute = url[3].split(".")[0];
    
    let print = `<ul class="navbar-nav">`;
	for(var link of links){
		if(link.route == currentRoute){
			print += `<li class="nav-item active">
            <a class="nav-link" href="${link.href}">${link.name}<span class="sr-only">(current)</span></a>
          </li>`
		} else {
			print += `<li class="nav-item">
            <a class="nav-link" href="${link.href}">${link.name}</a>
          </li>`;
		}
    }
    print += "</ul>";
	document.querySelector("#navbarNavDropdown").innerHTML = print;

}