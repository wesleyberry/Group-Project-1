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

            $(".expand").on("click", function (event) {

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
                makeDrinkCards(drinkResults.drinks);
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
    $("#buttonAddIngredient").on("click", function (event) {
        event.preventDefault();
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


    });

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



})