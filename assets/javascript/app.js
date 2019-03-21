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
    function makeDrinkCards1(drinkResults) {
        for (var i = 0; i < 4; i++) { 
            var drink = drinkResults[i];
            var firstDiv = $("<div>").addClass("small-6 medium-3 large-3 columns");
            var secondDiv = $("<div>").addClass("card");
            var thirdDiv = $("<div>").addClass("card-divider");
            var firstHeader = $("<h3>").attr("id", "name").text(drink.strDrink);
            var fourthDiv = $("<div>").addClass("card-section").attr("id", "photo");
            var newImg = $("<img>").attr("src", drink.strDrinkThumb);
            var fifthDiv = $("<div>").addClass("card-section");
            var sixthDiv = $("<div>").attr("id", "ingredients");
            var secondHeader = $("<h4>").text("Ingredients: ");
            var newUl = $("<ul>");
            var newButton = $("<button>").addClass("button").attr("type", "button");
            newButton.attr("data-toggle", "example-dropdown-top-center" + (i+1)).text("Instructions");
            var seventhDiv = $("<div>").addClass("dropdown-pane").attr("data-position", "top");
            seventhDiv.attr("data-alignment", "center").attr("id", "example-dropdown-top-center" + (i+1));
            seventhDiv.attr("data-dropdown", "").attr("data-auto-focus", "true");
            var eighthDiv = $("<div>").attr("id", "instructions");
            var newOl = $("<ol>");
            // var newP = $("<p>").text(drink.strInstructions);
            var instructions = $("<li>").text(drink.strInstructions);

            for (var ingIndex = 1; ingIndex <= 15; ingIndex++) {
                var ingredientProperty = "strIngredient" + ingIndex;
                var ingredient = drink[ingredientProperty];
                var measureProperty = "strMeasure" + ingIndex;
                var measure = drink[measureProperty];

                if (ingredient != "" && ingredient != null) {
                    var item = $("<li>");
                    item.text(measure + " " + ingredient);
                    newUl.append(item);
                }
            }
            newOl.append(instructions);
            thirdDiv.append(firstHeader);
            fourthDiv.append(newImg);
            eighthDiv.append(newOl);
            seventhDiv.append(eighthDiv);
            sixthDiv.append(secondHeader);
            sixthDiv.append(newUl);
            fifthDiv.append(sixthDiv);
            fifthDiv.append(newButton);
            fifthDiv.append(seventhDiv);
            secondDiv.append(thirdDiv);
            secondDiv.append(fourthDiv);
            secondDiv.append(fifthDiv);
            firstDiv.append(secondDiv);
            $(".row.forDivThree").append(firstDiv);
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
                // makeDrinkCards(drinkResults.drinks);
                makeDrinkCards1(drinkResults.drinks);
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
    // $("#buttonAddIngredient").on("click", function(event) {
    //     event.preventDefault();
    //     $(".row.forDivThree").empty();
    //     var ingredientQuery = $("#search-ingredient").val().trim();
    //     var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredientQuery;
    //     $.ajax({
    //             url: queryIngredientURL,
    //             method: "GET"
    //         })
    //         .then(function (response) {
    //             var drinkResults = response;
    //             makeDrinkCardsIngredients(drinkResults.drinks);
    //         })
        

    // });
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