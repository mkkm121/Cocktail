import AllCocktails from "views/AllCocktails.js";
import RandomCocktail from "views/RandomCocktail.js";
import BarMap from "./views/BarMap.js";
import UserPage from "./views/User.js";
import CocktailDetails from "./views/CocktailDetails";
import IngredientDetail from "./views/IngredientDetail";
import SearchByIngredient from "./views/SearchByIngredient";
import SupportUs from "./views/SupportUs";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Payment from "./views/Payment"
import LiveChat from "./views/LiveChat"

var routes = [
    {
        path: "/Cocktail/allcocktails",
        name: "All Cocktails",
        icon: "nc-icon nc-bullet-list-67" ,
        component: AllCocktails,
        layout: "",
        sidebar: true
    },
    {
        path: "/Cocktail/randomcocktail",
        name: "Random Cocktail",
        icon: "nc-icon nc-refresh-69",
        component: RandomCocktail,
        layout: "",
        sidebar: true
    },
    {
        path: "/Cocktail/cocktail/:name",
        name: "Cocktail Details",
        icon: "nc-icon nc-pin-3",
        component: CocktailDetails,
        layout: "",
    },
    {
        path: "/Cocktail/ingredient/:name",
        name: "Ingredient Details",
        icon: "nc-icon nc-pin-3",
        component: IngredientDetail,
        layout: "",
    },
    {
        path: "/Cocktail/byIngredient",
        name: "Search by Ingredients",
        icon: "nc-icon nc-zoom-split",
        component: SearchByIngredient,
        layout: "",
        sidebar: true
    },
    {
        path: "/Cocktail/map",
        name: "Map",
        icon: "nc-icon nc-map-big",
        component: BarMap,
        layout: "",
        sidebar: true
    },
    {
        path: "/Cocktail/support",
        name: "Support Us",
        icon: "nc-icon nc-money-coins",
        component: SupportUs,
        layout: "",
        sidebar: true
    },
    {
        path: "/Cocktail/livechat",
        name: "Live Chat",
        icon: "nc-icon nc-pin-3",
        component: LiveChat,
        layout: ""
    },
    {
        path: "/Cocktail/user",
        name: "User Profile",
        icon: "nc-icon nc-pin-3",
        component: UserPage,
        layout: "",
    },
    {
        path: "/Cocktail/login",
        name: "Login",
        icon: "nc-icon nc-pin-3",
        component: Login,
        layout: "",
    },
    {
        path: "/Cocktail/signup",
        name: "Sign Up",
        icon: "nc-icon nc-pin-3",
        component: SignUp,
        layout: "",
    },
    {
        path: "/Cocktail/checkout",
        name: "Checkout",
        icon: "nc-icon nc-pin-3",
        component: Payment,
        layout: "",
    }
];
export default routes;
