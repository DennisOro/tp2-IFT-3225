var nbLignes;
var nbColonnes;
var sourceImg;
var img;    // image sur le puzzle
var etatDeJeu;
var afficheNumeros;
var champDeplace;
var nbDeplacements = 1;
var parts = [];
var victoire = true;

function startGame(){
    nbDeplacements = 1;
    champDeplace = document.getElementById("nbDeplacements");
    champDeplace.textContent=0;
    etatDeJeu = "onJeu";
    window.addEventListener("keydown", flecheTouchee, false);  // Pour utiliser les flêches
    brasser();
}

function afficheImage(){
    sourceImg = document.getElementById("imgUrl").value;
    nbLignes = document.getElementById("nbLignes").value;
    nbColonnes = document.getElementById("nbColonnes").value;

    // petite validation des entrées du formulaire
    if (nbLignes < 2 || nbLignes > 6 || nbColonnes < 2 || nbColonnes > 6)
        alert('Svp choisissez un nombre entre 2 et 6 inclus');
    if(sourceImg == "")
        alert ('svp choisissez une image valide');


     // Si il y a encore du contenu dans la zone de jeu, on l'efface pour recommencer
    var puzzle = document.getElementById("puzzle");
    if(puzzle.hasChildNodes()){
        while(puzzle.hasChildNodes()){
            puzzle.removeChild(puzzle.firstChild);
        }
    }
    // Image qui sera dans le puzzle
    img = document.createElement("img");
    img.setAttribute("src",sourceImg);
    var width_size = Math.floor(img.width/nbColonnes);
    var height_size = Math.floor(img.height/nbLignes);
    console.log('width : '+width_size);
    console.log('height : '+height_size);
    // Creation d'une table qui contiendra le puzzle
    var table = document.createElement("table");
    table.setAttribute("align","center");
    table.setAttribute("id","table");
    console.log('width : '+img.width);
    console.log('height : '+ img.height);
    var valueCell = 1;
    for (var i = 0; i < nbLignes; i++){
        tr = document.createElement("tr");
        tr.setAttribute("id",""+i);
        for(var j = 0; j < nbColonnes; j++){
            td = document.createElement("td");
            td.setAttribute("id","("+i+","+j+")");
            console.log('width td : ' + td.style.width);
            console.log('height td ' + td.style.height);
            if (i+1 == nbLignes && j+1 == nbColonnes)
            {
            // on ne met pas de valeur sur la case inferieur droite
                td.style.backgroundColor = "gray";
            } else {
                td.style.width = width_size + 'px';
                td.style.height = height_size + 'px';
                td.style.backgroundImage = 'url(' + sourceImg + ')';
                td.style.backgroundPosition = -j * width_size +"px "+ -i * height_size+"px";
                span = document.createElement("span");
                span.setAttribute("class","numbers");
                span.textContent = valueCell++;
                td.appendChild(span);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    puzzle.appendChild(table);
}

function brasser(){
    var tab = [];
    var randomi, randomj, choisi, ancienGrise, lastPos, currentGreyId;
    var count = nbLignes * nbColonnes;

    currentGreyId = ""+"("+ (nbLignes - 1) +","+ (nbColonnes - 1) +")";
    for (var i = 0; i < count; i++){
        if(choisi != null)
            choisi.remove();
        if(ancienGrise != null)
            ancienGrise.remove();
        randomi = Math.floor(Math.random() * (nbLignes - 1) );
        randomj = Math.floor(Math.random() * (nbColonnes - 1) );
        choisi = document.getElementById("("+randomi+","+randomj+")");

        if(choisi.style.backgroundColor == "gray")
        {
            //console.log('choisi is grey');
        } else {
            lastPos = choisi.style.backgroundPosition;  // backgroundPosition de choisi
            choisi.removeAttribute("backgroundPosition");
            choisi.removeAttribute("backgroundImage");
            console.log('attr removed'+ choisi.style.backgroundPosition);
            choisi.style.backgroundColor = "gray";

            ancienGrise = document.getElementById(''+currentGreyId);  //la case grise

            choisi.setAttribute ("id", ''+currentGreyId);
            console.log('new attr : '+ choisi.id);

            ancienGrise.removeAttribute("id");
            ancienGrise.setAttribute ("id", ''+"("+randomi+","+randomj+")");  // changer le id de la case grise
            ancienGrise.style.backgroundImage = 'url(' + sourceImg + ')';
            ancienGrise.style.backgroundPosition = ''+lastPos;
            currentGreyId = ""+"("+ randomi +","+ randomj +")";

        }

    }
}

function placeHasard(){
    var celluleID = "("+Math.floor(Math.random()*(nbLignes))+","+Math.floor(Math.random()*(nbColonnes))+")";
    var cellule = document.getElementById(""+celluleID);
}

function creeCellule(cellule, valeur){
    cellule.textContent = valeur;
    cellule.style.backgroundColor = "red";
}
// Fonction pour controler les mouvements des flêches
function flecheTouchee(key){
    if (key.keyCode === 38){
        champDeplace.textContent= nbDeplacements++;
		haut();
		checkVictoire();
	}
	if (key.keyCode === 40){
	    champDeplace.textContent= nbDeplacements++;
		bas();
		checkVictoire();
	}
	if (key.keyCode === 37){
		champDeplace.textContent= nbDeplacements++;
		gauche();
		checkVictoire();
	}
	if (key.keyCode === 39){
		champDeplace.textContent= nbDeplacements++;
		droite();
		checkVictoire();
	}
}

function checkVictoire(){ //En cas de victoire on affiche le message gagnant
    console.log("salut");
    var tab = document.getElementById("table");
    for (var i=0; i< nbLignes;i++){
        var t = document.getElementById(""+i);  // get the first row from the table
        for(var j=0; j<nbColonnes;j++){
            if (t.childNodes[j].id == "("+i+","+j+")"){
                continue;
            } else {
                victoire = false;
                //console.log('valeur victoire'+ victoire);
            }
        }
        var div = document.getElementById("victoire");
        var nbDeplacementsVic = document.getElementById("nbDeplacementsVic");
        nbDeplacementsVic.textContent=""+0;
        if(victoire){
            alert('Bravo Champion !!');
            nbDeplacementsVic.textContent+=" " + champDeplace.textContent;
            div.style.visibility="visible";
            window.removeEventListener("keydown", flecheTouchee, false); // Annuler l'utilisation des flêches
            break;
        }
    }
}

function haut(){

}

function bas(){
}

function gauche(){}
function droite(){}
//Fonction pour afficher les numeros des images
function montreNumeros(checkbox){
    var elements = document.getElementsByClassName("numbers");
    if (checkbox.checked)
    {
        for (var i=0; i<elements.length;i++){
            elements[i].style.visibility="visible";
        }
    } else {
        for (var i=0; i<elements.length;i++){
                elements[i].style.visibility="hidden";
        }
    }
}