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

            var ingredientList = [];
            for (var ingIndex = 1; ingIndex <= 15; ingIndex++) {
                var ingredientProperty = "strIngredient" + ingIndex;
                var ingredient = drink[ingredientProperty];
                var measureProperty = "strMeasure" + ingIndex;
                var measure = drink[measureProperty];

                if (ingredient != "" && ingredient != null) {
                    var item = $("<li>");
                    var combined = measure + " " + ingredient;
                    item.text(combined);
                    drinkCard.append(item);
                    ingredientList.push(combined);
                }

            }

            var instructions = $("<p>");
            var instructionsId = "inst" + drink.idDrink;
            instructions.attr('id', instructionsId);
            instructions.text(drink.strInstructions);
            instructions.css("display", "none");
            instructions.appendTo(drinkCard);

            var more = $("<button>");
            more.addClass("more");
            more.text("more");
            more.appendTo(drinkCard);
            more.data('drink', drink);
            more.data('ingredientList', ingredientList);

            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];


            // $(".drinkInfo").append(drinkImg);
            //$(".drinkInfo").append(instructions);

            more.on("click", function () {
                var buttonDrink = $(this).data('drink');
                var buttonIngredients = $(this).data('ingredientList');
                showModal(buttonDrink, buttonIngredients);

            })

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        }
    }
    function makeDrinkCards1(drinkResults) {
        for (var i = 0; i < 4; i++) { 
            var drink = drinkResults[i];
            var firstDiv = $("<div>").addClass("small-6 medium-3 large-3 columns");
            var secondDiv = $("<div>").addClass("card cardFont");
            var thirdDiv = $("<div>").addClass("card-divider");
            var firstHeader = $("<h3>").attr("id", "name").text(drink.strDrink).addClass("cardFont");
            var fourthDiv = $("<div>").addClass("card-section").attr("id", "photo");
            var newImg = $("<img>").attr("src", drink.strDrinkThumb);
            var fifthDiv = $("<div>").addClass("card-section");
            var sixthDiv = $("<div>").attr("id", "ingredients");
            var secondHeader = $("<h4>").text("Ingredients: ").addClass("cardFont");
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

            var ingredientList = [];
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
            var more = $("<button>");
            more.addClass("more buttonStyle");
            more.text("More");
            more.data('drink', drink);
            more.data('ingredientList', ingredientList);

            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];


            // $(".drinkInfo").append(drinkImg);
            //$(".drinkInfo").append(instructions);

            more.on("click", function () {
                var buttonDrink = $(this).data('drink');
                var buttonIngredients = $(this).data('ingredientList');
                showModal(buttonDrink, buttonIngredients);

            })

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
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
            more.appendTo(fifthDiv);
            // fifthDiv.append(newButton);
            fifthDiv.append(seventhDiv);
            secondDiv.append(thirdDiv);
            secondDiv.append(fourthDiv);
            secondDiv.append(fifthDiv);
            firstDiv.append(secondDiv);
            $(".row.forDivThree").append(firstDiv);
        }
    }
    // function makeDrinkCardsIngredients(drinkResults) {
    //     for (var i = 0; i < drinkResults.length; i++) {
    //         var drink = drinkResults[i];
    //         var drinkCard = $("<div>");
    //         drinkCard.addClass("drinkCard");
    //         $(".row.forDivThree").append(drinkCard);
    //         var drinkName = $("<h3>").text(drink.strDrink);
    //         drinkCard.append(drinkName);
    //         var drinkImg = $("<img>").attr("src", drink.strDrinkThumb);
    //         drinkCard.append(drinkImg);
    //         var expandButton = $("<button>");
    //         expandButton.addClass("expand");
    //         expandButton.text("expand");
    //         expandButton.attr("data-expand", "expand");
    //         drinkCard.append(expandButton);
    //         $(".expand").on("click", function (event) {
    //         })
    //     }
    // };
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
        $(".row.forDivThree").empty();
        var ingredientQuery = $("#search-ingredient").val().trim();
        var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredientQuery;
        $.ajax({
                url: queryIngredientURL,
                method: "GET"
            })
            .then(function (response) {
                var ingredientResults = response;
                for (var i = 0; i < ingredientResults.drinks.length; i++) {
                    var queryIdURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ingredientResults.drinks[i].idDrink;
                    $.ajax({
                            url: queryIdURL,
                            method: "GET"
                        })
                        .then(function (response) {
                            var idResults = response.drinks;
                            makeDrinkCards(idResults);
                        })
                }

            })
    });
    // $("#buttonAddIngredient").on("click", function (event) {
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
    function showModal(drink, ingredientList) {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        $('#modalDrinkName').text(drink.strDrink);
        $('#modalDrinkImg').attr("src", drink.strDrinkThumb);
        $("#modalDrinkIngredients").empty();
        for (var i = 0; i < ingredientList.length; i++) {
            
                var item = $("<li>");
                item.text(ingredientList[i]);
                $("#modalDrinkIngredients").append(item);
            
        }
        $('#modalDrinkInstructions').text(drink.strInstructions);
        modal.style.display = "block";
    }
    $("#buttonAddIngredient").on("click", function(event) {
        event.preventDefault();
        var ingredient = $("#add-ingredient").val().trim();
        console.log(ingredient);
        var newP = $("<p>");
        $(newP).text(ingredient);
        var newDivCallout = $("<div class=callout data-closable>");
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