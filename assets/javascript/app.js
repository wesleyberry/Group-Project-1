$(document).ready(function () {

    function makeDrinkCards(drinkResults) {   
        for (var i = 0; i < drinkResults.length; i++) {

            var drink = drinkResults[i];
            var drinkCard = $("<div>");
            drinkCard.addClass("drinkCard");
            $(".row.forDivThree").append(drinkCard);
            var drinkName = $("<h3>").text(drink.strDrink);
            drinkCard.append(drinkName);
            var drinkImg = $("<img>").attr("src", drink.strDrinkThumb);
            drinkCard.append(drinkImg);
<<<<<<< HEAD

            for (var ingIndex = 1; ingIndex <= 15; ingIndex++) {
                var ingredientProperty = "strIngredient" + ingIndex;
                var ingredient = drink[ingredientProperty];
                var measureProperty = "strMeasure" + ingIndex;
                var measure = drink[measureProperty];

                if (ingredient != "" && ingredient != null) {
                    var item = $("<li>");
                    item.text(measure + " " + ingredient);
                    drinkCard.append(item);
                }

            }

            var instructions = $("<p>");
            var instructionsId = "inst" + drink.idDrink;
            instructions.attr('id', instructionsId);
            instructions.text(drink.strInstructions);
            instructions.css("display", "none");
            instructions.appendTo(drinkCard);

            var expandButton = $("<button>");
            expandButton.addClass("expand");
            expandButton.text("Expand");
            expandButton.attr('data-id', instructionsId);
            expandButton.attr('data-expand', 'expand');
            drinkCard.append(expandButton);

            $(".expand").on("click", function (event) {
                var paragraphId= "#" + $(this).attr("data-id");
                if ( $(this).attr("data-expand") === "Expand") {
                    $(paragraphId).css("display", "inline");
                    $(this).text("collapse");
                    $(this).attr("data-expand", "collapse");
                } else {
                    $(paragraphId).css('display', 'none');
                    $(this).text("Expand");
                    $(this).attr("data-expand", "Expand");
                }
            })

        }
    }

    function makeDrinkCardsIngredients(drinkResults) {
        for (var i = 0; i < drinkResults.length; i++) {
            var drink = drinkResults[i];
            var drinkCard = $("<div>");
            drinkCard.addClass("drinkCard");
            $(".row.forDivThree").append(drinkCard);
            var drinkName = $("<h3>").text(drink.strDrink);
            drinkCard.append(drinkName);
            var drinkImg = $("<img>").attr("src", drink.strDrinkThumb);
            drinkCard.append(drinkImg);

            var expandButton = $("<button>");
            expandButton.addClass("expand");
            expandButton.text("expand");
            expandButton.attr("data-expand", "expand");
            drinkCard.append(expandButton);

            $(".expand").on( "click", function(event) {
                
            })
            
        }
    };



=======
            $(".grid-container").append(drinkCard);        
        }
    }
>>>>>>> master
    $("#buttonSearchDrink").on("click", function (event) {
        event.preventDefault();
        $(".row.forDivThree").empty();
        var drinkQuery = $("#search-drink").val().trim();
        var queryDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkQuery;
        $.ajax({
                url: queryDrinkURL,
                method: "GET"
            })
            .then(function (response) {
                var drinkResults = response;
                makeDrinkCards(drinkResults.drinks);
            });
<<<<<<< HEAD



    });

=======
        });
>>>>>>> master
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
<<<<<<< HEAD
        $(".row.forDivThree").empty();
        var ingredientQuery = $("#search-ingredient").val().trim();
        var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredientQuery;
        $.ajax({
                url: queryIngredientURL,
                method: "GET"
            })
            .then(function (response) {
                var drinkResults = response;
                makeDrinkCardsIngredients(drinkResults.drinks);
            })
        

=======
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
>>>>>>> master
    });
})