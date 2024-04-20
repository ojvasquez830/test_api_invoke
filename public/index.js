var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      callback(status, xhr.response);
    };
    xhr.send();
};

var localServer = "http://localhost:3000/";

function setCocktailHtml(drink)
{
    document.getElementById('cocktailTitle').innerText = drink.strDrink;
    document.getElementById('cocktailDesc').innerText = drink.strInstructions;
    var ul = document.getElementById("ingredients");
    for (let i = 1; i <= 15; i++)
    {
        if (drink[`strIngredient${i}`])
        {
            var li = document.createElement("li");
            var meassure = (Object.hasOwn(drink, `strMeasure${i}`) && drink[`strMeasure${i}`]) ? drink[`strMeasure${i}`] + " " : "";
            li.appendChild(document.createTextNode(meassure + drink[`strIngredient${i}`]));
            ul.appendChild(li);
        }
    }
    document.getElementById('cocktailContainer').classList.add('backgroundContainer');
}

function cleanCocktailHtml()
{
    document.getElementById('cocktailTitle').innerText = "";
    document.getElementById('cocktailDesc').innerText = "";
    document.getElementById("ingredients").innerHTML = "";
    document.getElementById('cocktailContainer').classList.remove('backgroundContainer');
}

function setCocktail(name, name1, name2, name3) {
    getJSON(`${localServer}search?cocktailName=${name}&name1=${name1}&name2=${name2}&name3=${name3}`, (status, response) => {
        if (status == 200)
        {
            if (response)
            {
                setCocktailHtml(response);
            }
            else
            {
                cleanCocktailHtml();
            }
        }
        else
        {
            cleanCocktailHtml();
        }
    } );
}

function setRandomCocktail() {
    getJSON(`${localServer}random`, (status, response) => {
        if (status == 200)
        {
            if (response)
            {
                setCocktailHtml(response);
            }
            else
            {
                cleanCocktailHtml();
            }
        }
        else
        {
            cleanCocktailHtml();
        }
    } );
}