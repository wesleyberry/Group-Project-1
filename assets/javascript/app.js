$(document).ready(function () {


    //Age Gate
    function checkAge(ageInput) {
        var ageModal = $("#ageModal");
        var ageInput = $("#bday").val();
        var ageObject = new Date(ageInput);
        var currentAge = moment().diff(ageObject, "years");
        if (currentAge >= 21) {
            ageModal.css("display", "none");
        } else {
            $(".modal-content").empty();
            var tooYoung = $("<h3>");
            tooYoung.text("You must be at least 21 years of age to enter site.");
            $(".modal-content").append(tooYoung);
        }
    };

    $("#submit-age").on("click", function (event) {
        checkAge();
    });
    $(window).scroll(function () {
        $("#forTitle").css("opacity", 1 - $(window).scrollTop() / 500);
    });


    //organizes api results into cards
    function makeDrinkCards1(drinkResults) {
        for (var i = 0; i < 8; i++) {
            var drink = drinkResults[i];
            var firstDiv = $("<div>").addClass("small-6 medium-3 large-3 columns");
            if ((i == 3) || (i == 5) || (i == 7) || (i == 1)) {
                firstDiv.addClass("end");
            }
            var secondDiv = $("<div>").addClass("card cardFont");
            var overlayDiv = $("<div>").addClass("overlay").attr("id", "instructions");
            var ingDiv = $("<p>");
            var thirdDiv = $("<div>").addClass("card-divider");
            var firstHeader = $("<h3>").attr("id", "name").text(drink.strDrink).addClass("cardFont");
            var fourthDiv = $("<div>").addClass("card-section").attr("id", "photo");
            var newImg = $("<img>").attr("src", drink.strDrinkThumb);
            var fifthDiv = $("<div>").addClass("card-section");
            var sixthDiv = $("<div>").attr("id", "ingredients");
            var secondHeader = $("<h4>").text("Ingredients: ").addClass("cardFont");
            var newUl = $("<ul>");
            var newButton = $("<button>").addClass("button").attr("type", "button");
            newButton.attr("data-toggle", "example-dropdown-top-center" + (i + 1)).text("Instructions");
            var seventhDiv = $("<div>").addClass("dropdown-pane").attr("data-position", "top");
            seventhDiv.attr("data-alignment", "center").attr("id", "example-dropdown-top-center" + (i + 1));
            seventhDiv.attr("data-dropdown", "").attr("data-auto-focus", "true");
            var newOl = $("<ol>");

            var headInst = $("<h3>").text("Instructions: ").addClass("instStyle");
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
            var more = $("<button>");
            more.addClass("more buttonStyle");
            more.text("More");
            more.data('drink', drink);


            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];




            more.on("click", function () {
                var buttonDrink = $(this).data('drink');
                var buttonIngredients = $(this).data('ingredientList');
                showModal(buttonDrink, buttonIngredients);

            })



            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            newOl.append(instructions);
            thirdDiv.append(firstHeader);
            fourthDiv.append(newImg);
            sixthDiv.append(secondHeader);
            sixthDiv.append(newUl);
            fifthDiv.append(sixthDiv);
            fifthDiv.append(seventhDiv);
            secondDiv.append(thirdDiv);
            secondDiv.append(fourthDiv);
            secondDiv.append(fifthDiv);
            overlayDiv.append(ingDiv);
            overlayDiv.append(instructions);
            overlayDiv.prepend(headInst);
            secondDiv.append(overlayDiv);
            firstDiv.append(secondDiv);
            if ((i == 0) || (i == 1) || (i == 2) || (i == 3)) {
                $(".row.forDivThree").append(firstDiv);
            } else {
                $(".row.forDivThree1").append(firstDiv);
            }
        }
    }
    // Randomizes the cards so not the same 8 appear every time.
    function shuffleCards(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    //drink search function
    $("#buttonSearchDrink").on("click", function (event) {
        event.preventDefault();
        $(".behindCards").css({
            "background-size": "contain"
        });
        $(".row.forDivThree").empty();
        $(".row.forDivThree1").empty();
        var drinkQuery = $("#search-drink").val().trim();
        var queryDrinkURL = "https://www.thecocktaildb.com/api/json/v2/2345454/search.php?s=" + drinkQuery;
        $.ajax({
                url: queryDrinkURL,
                method: "GET"
            })
            .then(function (response) {
                var drinkResults = response;
                console.log(drinkResults);
                //IF NO SEARCH RESULTS
                if (response.drinks != null) {
                    makeDrinkCards1(drinkResults.drinks);
                } else {
                    var noResults = $("<h3>");
                    noResults.text("No results found.");
                    $(".row.forDivThree").append(noResults);
                }

                shuffleCards(drinkResults.drinks);
                

            });
        console.log(queryDrinkURL);
    });


    // organize ingredients into lists
    var userIngredients = [];
    $("#buttonAddIngredient").on("click", function (event) {
        event.preventDefault();
        var ingredient = $("#add-ingredient").val().trim();
        console.log(ingredient);
        userIngredients.push(ingredient);
        var newP = $("<p>").addClass("pClass");
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
        console.log(userIngredients);
    });

    // Search button for add ingredients (rename "addIngredientSearch")
    var ingredientQuery = userIngredients;
    $("#buttonSearchIngredient").on("click", function (event) {
        event.preventDefault();
        $(".behindCards").css({
            "background-size": "contain"
        });
        $(".row.forDivThree").empty();
        $(".row.forDivThree1").empty();
        console.log(userIngredients);
        console.log(ingredientQuery);
        var queryIngredientURL = "https://www.thecocktaildb.com/api/json/v2/2345454/filter.php?i=" + ingredientQuery;
        console.log(queryIngredientURL);
        $.ajax({
                url: queryIngredientURL,
                method: "GET"
            })
            .then(function (response) {
                var multiIngredientResults = response;
                shuffleCards(multiIngredientResults.drinks);
                console.log(multiIngredientResults.drinks);
                var multiIngredientResults = response;
                //Creates 8 cards maximum, but if there are less than 8 results, shows results.
                if (multiIngredientResults.drinks.length > 8) {
                    var numOfCards = 8;
                } else {
                    var numOfCards = multiIngredientResults.drinks.length;
                }
                for (var i = 0; i < numOfCards; i++) {
                    var queryIdURL = "https://www.thecocktaildb.com/api/json/v2/2345454/lookup.php?i=" + multiIngredientResults.drinks[i].idDrink;
                    $.ajax({
                            url: queryIdURL,
                            method: "GET"
                        })
                        .then(function (response) {
                            var idResults = response.drinks;
                            makeDrinkCards1(idResults);
                        })
                }

            })
    })


})