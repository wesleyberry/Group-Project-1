$(document).ready(function () {


    $("#buttonSearchDrink").on("click", function (event) {
        event.preventDefault();
        $(".grid-container").empty();
        var drinkQuery = $("#search-drink").val().trim();
        var queryDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkQuery;
        $.ajax({
                url: queryDrinkURL,
                method: "GET"
            })
            .then(function (response) {
                var drinkResults = response;
                console.log(drinkResults);
            })
        
    });

    $("#buttonSearchIngredient").on("click", function (event) {
        event.preventDefault();
        $(".grid-container").empty();
        var ingredientQuery = $("#search-ingredient").val().trim();
        var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredientQuery;
        $.ajax({
                url: queryIngredientURL,
                method: "GET"
            })
            .then(function (response) {
                var ingredientResults = response;
                console.log(ingredientResults);
            })
        
    });

    function makeDrinkCards() {
        var drinkName = drinkResults.strDrink;
        var photo = drinkResults.strDrinkThumb;
        

    }
})