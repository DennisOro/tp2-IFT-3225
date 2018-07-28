var nbLignes;
var nbColonnes;
var sourceImg;
var img;    // image sur le puzzle
var etatDeJeu;
var afficheNumeros;
var champDeplace;
var nbDeplacements = 1;
var victoire = true;
var jeuActuel, count, currentGreyId, com;

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
    // Creation d'une table qui contiendra le puzzle
    var table = document.createElement("table");
    table.setAttribute("align","center");
    table.setAttribute("id","table");
    var valueCell = 1;
    for (var i = 0; i < nbLignes; i++){
        tr = document.createElement("tr");
        tr.setAttribute("id",""+i);
        for(var j = 0; j < nbColonnes; j++){
            td = document.createElement("td");
            td.setAttribute("id","("+i+","+j+")");
            if (i+1 == nbLignes && j+1 == nbColonnes)
            {
                td.style.backgroundColor = "gray";
                span = document.createElement("span");
                span.setAttribute("class","numbers");
                span.textContent = nbLignes*nbColonnes;
                td.appendChild(span);
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
    var randomi, randomj, newGray, lastGray, lastPos, valueCell;
    count = nbLignes * nbColonnes;

    currentGreyId = ""+"("+ (nbLignes - 1) +","+ (nbColonnes - 1) +")";
    for (var i = 0; i < nbLignes; i++){
        for(var j = 0; j < nbColonnes; j++){
            randomi = Math.floor(Math.random() * (nbLignes) );
            randomj = Math.floor(Math.random() * (nbColonnes) );
    
            if(randomi == 2 && randomj == 2)
            {
                // pour omettre la case grise
            } else {
                newGray = document.getElementById("("+randomi+","+randomj+")");
                valueCell = newGray.firstChild.innerHTML;   // recupère la valeur d'indice de la case
                lastPos = newGray.style.backgroundPosition;  // backgroundPosition de last grey
                newGray.style.backgroundPosition = null;    //removeAttribute("backgroundPosition");
                newGray.style.backgroundImage = null;       //("backgroundImage");
                newGray.style.backgroundColor = "gray";
                newGray.firstChild.textContent = ""+count;  // change la valeur de l'indice de la nouvelle case grise
    
                lastGray = document.getElementById("("+ (nbLignes - 1) +","+ (nbColonnes - 1) +")");  //la case grise
    
                newGray.setAttribute ("id", ''+currentGreyId);
                lastGray.setAttribute ("id", ''+"("+randomi+","+randomj+")");    // changer le id de la case grise
    
                lastGray.style.backgroundImage = 'url(' + sourceImg + ')';
                lastGray.style.backgroundPosition = ''+lastPos;
                lastGray.firstChild.textContent = valueCell;
                lastGray.style.backgroundColor = null;
            }
        }
    }
    fillJeuActuel();
}

function fillJeuActuel(){
    // Initialise le tableau de jeu courant
    jeuActuel = [];
    for (var i = 0 ; i < nbLignes; i++) {
        jeuActuel[i] = [];
    }
    var iter = document.getElementById("table");
    for (var i=0; i< nbLignes;i++){
        var t = document.getElementById(""+i);  // get the first row from the table
        for(var j=0; j<nbColonnes;j++){
             jeuActuel[i][j] = t.childNodes[j].id;
        }
    }
}
// Fonction pour controler les mouvements des flêches
function flecheTouchee(key){
    if (key.keyCode === 38){
		haut();
		checkVictoire();
	}
	if (key.keyCode === 40){
		bas();
		checkVictoire();
	}
	if (key.keyCode === 37){
		gauche();
		checkVictoire();
	}
	if (key.keyCode === 39){
		droite();
		checkVictoire();
	}
}

function checkVictoire(){ //En cas de victoire on affiche le message gagnant
    var tab = document.getElementById("table");
    com = 1;
    for (var i=0; i < nbLignes; i++){
        var t = document.getElementById(""+i);  // get the first row from the table
        for(var j=0; j < nbColonnes; j++){
            if (t.childNodes[j].id == "("+i+","+j+")"){
                continue;
            } else {
                victoire = false;
                console.log('voictoire '+ victoire + com);
                com++;
                break;
            }
        }
    }
    var div = document.getElementById("victoire");
    var nbDeplacementsVic = document.getElementById("nbDeplacementsVic");
    if(victoire){
        alert('Bravo Champion !!');
        nbDeplacementsVic.textContent =" En " + champDeplace.textContent + " Déplacement(s)";
        div.style.visibility="visible";
        window.removeEventListener("keydown", flecheTouchee, false); // Annuler l'utilisation des flêches
    }
    victoire = true;
}

function haut(){
    // retourne les coordonnées de la case grise dans le jeu.
    var greyCoordonates = getGreyCoordonates();
    if(greyCoordonates[0] == 0){
    } else {
        champDeplace.textContent= nbDeplacements++;
        var idNeighbour = jeuActuel[greyCoordonates[0]-1][greyCoordonates[1]];
        switchPieces(idNeighbour, greyCoordonates);
    }
}

function bas(){
    // retourne les coordonnées de la case grise dans le jeu.
    var greyCoordonates = getGreyCoordonates();
    if(greyCoordonates[0] == nbLignes-1){
    } else {
        champDeplace.textContent= nbDeplacements++;
        var idNeighbour = jeuActuel[greyCoordonates[0]+1][greyCoordonates[1]];
        switchPieces(idNeighbour, greyCoordonates);
    }
}

function gauche(){
    // retourne les coordonnées de la case grise dans le jeu.
    var greyCoordonates = getGreyCoordonates();
    if(greyCoordonates[1] == 0){
    } else {
        champDeplace.textContent= nbDeplacements++;
        var idNeighbour = jeuActuel[greyCoordonates[0]][greyCoordonates[1]-1];
        switchPieces(idNeighbour, greyCoordonates);
    }
}

function droite(){
    // retourne les coordonnées de la case grise dans le jeu.
    var greyCoordonates = getGreyCoordonates();
    if(greyCoordonates[1] == nbColonnes-1){
    } else {
        champDeplace.textContent= nbDeplacements++;
        var idNeighbour = jeuActuel[greyCoordonates[0]][greyCoordonates[1]+1];
        switchPieces(idNeighbour, greyCoordonates);
    }
}

function switchPieces(idNeighbour, greyCoordonates){
    var neighbourCoordonates = [];
    var neighbour = document.getElementById(idNeighbour);
    var valueCell = neighbour.firstChild.innerHTML;
    var lastPos = neighbour.style.backgroundPosition;
    neighbour.style.backgroundPosition = null;
    neighbour.style.backgroundImage = null;
    neighbour.style.backgroundColor = "gray";
    neighbour.firstChild.textContent = count;  // change la valeur de l'id de la nouvelle case grise

    var grey = document.getElementById(currentGreyId);

    neighbour.setAttribute ("id",currentGreyId);
    grey.setAttribute ("id", idNeighbour);    // changer le id de la case grise
    grey.style.backgroundImage = 'url(' + sourceImg + ')';
    grey.style.backgroundPosition = lastPos;
    grey.firstChild.textContent = valueCell;
    grey.style.backgroundColor = null;

    // met a jour le jeuActuel
    fillJeuActuel();
}

// Retourne les coordonnées de la piece grise dans le jeu actuel
function getGreyCoordonates(){
    var  idPiece, td;
    var grayCoordonates = [];
    for(var i = 0; i < nbLignes; i++){
        for(var j = 0; j < nbColonnes; j++){
        idPiece = jeuActuel[i][j];
        td = document.getElementById(''+idPiece);
            if(td.style.backgroundColor == "gray")
            {
               grayCoordonates[0] = i;
               grayCoordonates[1] = j;
               return grayCoordonates;
            }
        }
    }
}

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

function recommencer(){
    var div = document.getElementById("victoire");
    var nbDeplacementsVic = document.getElementById("nbDeplacementsVic");
    document.getElementById('nbDeplacements').textContent = "";
    nbDeplacements = 1;
    nbDeplacementsVic.textContent =""+0;
    div.style.visibility="hidden";
    afficheImage();
}