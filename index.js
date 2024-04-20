import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, ()=> { 
    console.log(`listening in ${port}`);
});

app.get("/", async (req, res) => {
    return res.render("index.ejs");
});

function hasIngredient(drink, ingredient)
{
    for (let i = 1; i <= 15; i++)
    {
        if (drink && (drink[`strIngredient${i}`]) && (drink[`strIngredient${i}`].toLowerCase().includes(ingredient.toLowerCase())))
        {
            return true;
        }
    }

    return false;
}

app.get("/random", async (req, res) => {
    const fetchCocktail = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);

    if (fetchCocktail.data.drinks && fetchCocktail.data.drinks.length > 0)
    {
        res.send(fetchCocktail.data.drinks[0]);
        return;
    }
    else
    {
        res.sendStatus(404);
    }  
});

app.get("/search", async (req, res) => {
    if (req.query.cocktailName && (req.query.cocktailName.length > 0))
    {
        const fetchCocktail = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.query.cocktailName}`);

        if (fetchCocktail.data.drinks && fetchCocktail.data.drinks.length > 0)
        {
            res.send(fetchCocktail.data.drinks[0]);
            return;
        }
        else
        {
            res.sendStatus(404);
        }   
    }
    else
    {
        var list1 = undefined;
        if (req.query.name1 && (req.query.name1.length > 0))
        {
            const fetchCocktail = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${req.query.name1}`);
            list1 = fetchCocktail.data["drinks"];
        }
        
        if (list1 == undefined)
        {
            res.sendStatus(404);
            return;
        }

        for (let i = 0; (i < list1.length); i++)
        {
            var drink = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${list1[i].idDrink}`);
            drink = drink.data.drinks[0];
            
            if (req.query.name2 && (req.query.name2.length > 0))
            {
                if (hasIngredient(drink, req.query.name2))
                {
                    if (req.query.name3 && (req.query.name3.length > 0))
                    {
                        if (hasIngredient(drink, req.query.name3))
                        {
                            res.send(drink);
                            return;
                        }
                    }
                    else
                    {
                        res.send(drink);
                        return;
                    }
                }
            }
            else
            {
                res.send(drink);
                return;
            }
        }
        
        res.sendStatus(404);
    }
});

app.get("/searchIngredients", async (req, res) => {

    
    if (!req.query.cocktailName || (req.query.cocktailName.length == 0))
    {
        res.sendStatus(404);
    }
    else
    {
        
    }
});