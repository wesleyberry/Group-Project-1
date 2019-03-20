$(document).ready(function () {

    function makeDrinkCards(drinkResults) {
                
        for (var i = 0; i < drinkResults.length; i++) {
            var drinkCard = $("<div>");
            var drinkName = $("<h3>").text(drinkResults[i].strDrink);
            var drinkImg = drinkResults[i].strDrinkThumb;
            
            drinkCard.append(drinkName);
            drinkCard.append(drinkImg);
            $(".grid-container").append(drinkCard);        
        }
    }
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
                makeDrinkCards(drinkResults.drinks);
            });
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
    $("#buttonAddIngredient").on("click", function(event) {
        event.preventDefault();
        var ingredient = $("#add-ingredient").val().trim();
        console.log(ingredient);
        var newP = $("<p>");
        $(newP).text(ingredient);
        var newDivCallout = $("<div class=callout data-closable>");
        // newDivCallout.addClass("callout");
        newDivCallout.attr("data-closable");
        var newButton = $("<button data-close>");
        $(newButton).addClass("close-button");
        $(newButton).attr("aria-label", "Close alert").attr("type", "button");
        $(newButton).append("<span aria-hidden='true'>&times;</span>");
        $(newDivCallout).append(newButton);
        $(newDivCallout).append(newP);
        $("#displayIngredients").append(newDivCallout);
    });
})