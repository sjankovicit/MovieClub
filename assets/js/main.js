$(document).ready(function(){
    showMovies();
    showCategories();

    $("#sort").click(onSortMovies);
    $("#search").keyup(onSearchMovies);
});

function showCategories(){
    $.ajax({
        url: "assets/data/categories.json",
        method: "GET",
        success: function(data){
            printCategories(data);
        },
        error: function(err){
            alert(err);
        }
    });
}

function onSortMovies(e){
    e.preventDefault();

    let sortData = $(this).data('sortby');
    let orderData = $('#sort').attr('data-order');

    ajaxMovies(function(movies){
        sortMovies(movies, sortData, orderData);
        printMovies(movies);
    });

    const sortValue = orderData == 'desc' ? 'asc' : 'desc';

     $('#sort').attr('data-order', sortValue);
     $('#sort').html(`Sort Price ${sortValue}`);
    
}

function sortMovies(movies, sortData, orderData){
    movies.sort(function(a,b){
        let valueA = (sortData=='price')? a.price.new : a.name;
        let valueB = (sortData=='price')? b.price.new : b.name;
        if(valueA > valueB)
            return orderData=='asc' ? 1 : -1;
        else if(valueA < valueB)
            return orderData=='desc' ? 1 : -1;
        else 
            return 0;
    });
}

function onSearchMovies(){
    let typing = this.value;
    
    ajaxMovies(function(movie){
        movies = searchMovies(movie, typing);
        printMovies(movies);
    });
    
}

function searchMovies(movie, typing){
       let search = movie.filter(el => {
        if (el.name.toLowerCase().indexOf(typing.toLowerCase()) !== -1) {
          return true;
        }
      });
      
      return search;
}

function printCategories(data){
    let html = "";
    for(let el of data){
        html += `<a href="#" class="d-flex dropdown-item" data-id="${el.id}">${el.title}</a>`;
    }
    document.querySelector("#category").innerHTML = html;

    $('.dropdown-item').click(onFilterByCategory);
}

function onFilterByCategory(e){
    e.preventDefault();

    let catId = $(this).data('id');

    ajaxMovies(function(movie){
        movies = filterByCategory(movie, catId);
        printMovies(movies);
    });
    
}

function filterByCategory(movie, catId){
    let filtered = movie.filter(x => x.categories.id == catId)
    return filtered;
}


function ajaxMovies(callbackSuccess, callbackError){
    $.ajax({
        url: "assets/data/movies.json",
        method: "GET",
        success: callbackSuccess,
        error: callbackError
    });
}

function showMovies(){
    const fnOnError = function(error){
        console.log(error);
    }
    const fnOnSuccess = function(movies){
        printMovies(movies);
    }
    ajaxMovies(fnOnSuccess, fnOnError);

}

function generatePrice(){
        ajaxMovies(function(movie){
        priceFn(movie);
    });
}

function printMovies(movies){
    let html = "";
    if(movies.length > 0){
        for(let movie of movies){
            html += printsingleMovies(movie);
        }
    }else{
        html += "<h3 class='block-4 text-center'>No products!</h3>";
    }
    document.querySelector("#div-products").innerHTML = html;
    bindCartEvents();
}

function printsingleMovies(element){
        return`
        <div class="col-md-4 product-men mt-5">
        <div class="men-pro-item simpleCart_shelfItem">
            <div class="men-thumb-item text-center">
                <img src="${element.image.src}" alt="${element.image.src}" class="img-fluid">
                <div class="men-cart-pro">
                    <div class="inner-men-cart-pro">
                        <a href="${element.link}" class="link-product-add-cart">Quick View</a>
                    </div>
                </div>
            </div>
            <div class="item-info-product text-center border-top mt-4">
                <h4 class="pt-1">
                    <a href="${element.link}">${element.name}</a>
                </h4>
                <div class="info-product-price my-2">
                    <span class="item_price">${element.price.new}$</span>
                    <del>${element.price.old}$</del>
                </div>
                <h4 class="pt-1">
                    <p>${element.text}</p>
                </h4>
                <div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                    <input type="button" value="Add to cart" class="button btn add-to-cart" data-id="${element.id}"/>
                </div>
            </div>
        </div>
    </div>
        `;    
}

function priceFn(movies){
    console.log(movies);
}

function bindCartEvents() {
    $(".add-to-cart").click(addToCart);
}

function moviesInCart() {
    return JSON.parse(localStorage.getItem("movies"));
}

function addToCart(){
    
    let id = $(this).data("id");

    var movies = moviesInCart();

    if(movies) {
        if(movieIsAlreadyInCart()){
            updateQuantity();
        }else{
            addToLocalStorage()
        }
    }else{
        addFirstItemToLocalStorage();
    }
    alert("Cart updated!");

    function movieIsAlreadyInCart() {
        return movies.filter(p => p.id == id).length;
    }

    function addToLocalStorage() {
        let movies = moviesInCart();
        movies.push({
            id : id,
            quantity : 1
        });
        localStorage.setItem("movies", JSON.stringify(movies));
    }
    
    function updateQuantity() {
        let movies = moviesInCart();
        for(let i in movies)
        {
            if(movies[i].id == id) {
                movies[i].quantity++;
                break;
            }      
        }

        localStorage.setItem("movies", JSON.stringify(movies));
    }

    function addFirstItemToLocalStorage() {
        let movies = [];
        movies[0] = {
            id : id,
            quantity : 1
        };
        localStorage.setItem("movies", JSON.stringify(movies));
    }
}

function clearCart() {
    localStorage.removeItem("movies");
}