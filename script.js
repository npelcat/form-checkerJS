//0. Déclarer les variables :
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
//Pointer la progress-bar :
const progressBar = document.getElementById("progress-bar");
//Pour envoyer le formulaire :
const form = document.querySelector("form");

//5.Créer des variables pour stocker les données tapées dans les inputs :
let pseudo, email, password, confirmPass;

//4. Créer une Fonction qui gère l'affichage de tous les messages d'erreurs : elle prend trois paramètres.
const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag +"-container");
    //Sélectionne le span que tu as en enfant (>):
    const span = document.querySelector("." + tag + "-container > span");
//Si ce n'est pas valide :
    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = message;
    }
}

//2.Créer 4 fonctions sur les 4 inputs :
// Leur passer en paramètre la valeur de ce qui est tapé dans l'input (value)
const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        //Appeler la fonction en charge des messages d'erreur et modifier ses paramètres :
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        pseudo = null;

    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caractères spéciaux");
        pseudo = null;

    } else {
        errorDisplay("pseudo", "",true);
        pseudo = value;
    }
};

///////////////////////////////////////////////////
    //OPTION : Fonction IF ELSE qui fonctionne, mais à répéter pour chaque input ! Donc code à améliorer en créant une FONCTION UNIQUE qui marcherait pour tous les inputs :

//Si ce qui est tapé dans l'input pseudo est supérieur à 0 ET inférieur à 3 OU supérieur à 20, alors injecter la classe CSS error (alerte en rouge)
//Et injecter du texte au span désigné par errorDisplay  :
            //if (value.length > 0 && (value.length < 3 || value.length > 20)) {
            //pseudoContainer.classList.add('error');
            //errorDisplay.textContent = "Le pseudo doit faire en 3 et 20 caractères";
//Et si : le match de ta valeur est différent (!) de tous ces caractères (regex) :
            //} else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
            //pseudoContainer.classList.add("error");
            //errorDisplay.textContent = "Le pseudo ne doit pas contenir de caractères spéciaux";
            //} else {
//Sinon : retirer la classe CSS et vider le texte
            //pseudoContainer.classList.remove("error");
            //errorDisplay.textContent = "";
            //}
///////////////////////////////////////////////////

const emailChecker = (value) => {
    //REGEX pour checker l'e-mail
    if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Le mail n'est pas valide.");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

const passwordChecker = (value) => {
    //A chaque fois que cette fonction est jouée, on enlève toutes les classes qui ont pu s'accumulées dans la progress-bar.
    progressBar.classList = "";

//REGEX pour checker le MdP
    if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
        errorDisplay("password", "8 caractères minimum, 1 majuscule, 1 chiffre et 1 caractère spécial");
        progressBar.classList.add("progressRed");
        password = null;

    } else if (value.lenght < 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay("password", "", true);
        password = value;
    } else {
        progressBar.classList.add("progressGreen");
        errorDisplay("password", "", true);
        password = value;
    }
    //Si jamais il y a quelque chose dans confirmPass, alors lance la fonction confirmChecker ! (pour éviter les erreurs lorsque l'utilisateur modifie le MdP initial aprés avoir confirmé celui-ci)
    if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPass = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPass = true;
    }
};



//1.Ajouter un évènement input sur tous les inputs (forEach) :
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
    //3.Créer la logique de contrôle avec un switch :
    //e.target.id cible ce qui est tapé dans l'input avec son ID :
        switch (e.target.id) {
            case "pseudo" :
            //Je te passe en paramètres ce qui est tapé dans l'input pseudo (e.target.value)
                pseudoChecker(e.target.value)
            break;
            case "email" :
                emailChecker(e.target.value)
            break;
            case "password" :
                passwordChecker(e.target.value)
            break;
            case "confirm" :
                confirmChecker(e.target.value)
            break;
            default:
                null;
        }
    })
})

//Envoyer le formulaire :
form.addEventListener("submit", (e) => {
    //Prévenir le changement de page par défaut :
    e.preventDefault();

    //En appelant les variables (ex:pseudo), le navigateur comprend : si pseudo === true.
    if (pseudo && email && password && confirmPass) {
        //Avant d'envoyer les données, on les regroupe dans un objet :
        const data = {
            pseudo,
            email,
            password,
        };
        console.log(data);
//Vider les inputs après avoir envoyer un formulaire valide :
        inputs.forEach((input) => (input.value = ""));
//Retirer la progress-bar : 
        progressBar.classList = "";
//Pour éviter que l'utilisateur envoie une deuxième fois le formulaire :
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        alert("Inscription validée !");

    } else {
        alert("Veuillez remplir tous les champs !")
    }
});