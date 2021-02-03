$(document).ready(function(){
    let movies = moviesInCart();
    if(!movies || !movies.length)
        showEmptyCart();
    else
        displayCartData();

});

function displayCartData(){
    let movies = moviesInCart();
    $.ajax({
        url : "assets/data/movies.json",
        success : function(data){
            if(!movies || !movies.length)
             return showEmptyCart();

            data = data.filter(p => {
                for(let mov of movies)
                {
                    if(p.id == mov.id) {
                        p.quantity = mov.quantity;
                        return true;
                    }
                }
                return false;
            });
            generateTable(data);
        }
    });
}


function generateTable(movies) {
    let html = `
            <table class="timetable_sub">
				<thead>
					<tr>
						<th>ID No.</th>
						<th>Product</th>
						<th>Product Name</th>
                        <th>Base Price</th>
                        <th>Quantity</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>`;
                
    for(let m of movies) {
        html += generateTr(m);
    }

    html +=`    </tbody>
            </table>`;

    $("#cart").html(html);

    function generateTr(m) {
       return  `<tr class="rem1">
        <td class="invert"><strong>${m.id}</strong></td>
        <td class="invert-image">
            <a href="${m.link}">
                <img src="${m.image.src}" style='height:300px' alt="${m.image.alt}" class="img-responsive">
            </a>
        </td>
        <td class="invert"><strong>${m.name}</strong></td>
        <td class="invert"><strong>$${m.price.new}</strong></td>
        <td class="invert"><strong>${m.quantity}</strong></td>
        <td class="invert"><strong>$${m.price.new * m.quantity}</strong></td>
        <td class="invert">
            <div class="rem">
                <div class=""><button class="btn btn-danger" onclick='removeFromCart(${m.id})'>Remove</button> </div>
            </div>
        </td>
    </tr>`
    }
}

function showEmptyCart() {
    $("#cart").html("<h1>Your cart is empty!</h1>")
}

function moviesInCart() {
    return JSON.parse(localStorage.getItem("movies"));
}



function removeFromCart(id) {
    let movies = moviesInCart();
    let filtered = movies.filter(m => m.id != id);

    localStorage.setItem("movies", JSON.stringify(filtered));
    
    displayCartData();
}