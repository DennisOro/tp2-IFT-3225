var nbLignes;
var nbColonnes;
var sourceImg;
var img;
var etatDeJeu;
var afficheNumeros;
var champDeplace;
var nbDeplacements = 1;
var imgAffiche = false;
var imgvue;
var ounissa= true;

function startGame(){
    nbDeplacements = 1;
    champDeplace = document.getElementById("nbDeplacements");
    champDeplace.textContent=0;
    etatDeJeu = "onJeu";
    demarrer();
}

function demarrer(){
    // crée l'image a montrer lorsque l'utilisateur clique Afficher l'image
    imgAffiche = false;
    sourceImg = document.getElementById("imgUrl").value;
    imgvue = document.createElement("img");
    imgvue.setAttribute("src",sourceImg);
    imgvue.setAttribute("id","imgOrigin");
    imgvue.style.width = "100%";
    imgvue.style.height = "100%";
    var div = document.getElementById("imgOriginal");
    div.appendChild(imgvue);

    nbLignes = document.getElementById("nbLignes").value;
    nbColonnes = document.getElementById("nbColonnes").value;

    // petite validation des entrées du formulaire
    if (nbLignes < 2 || nbLignes > 6 || nbColonnes < 2 || nbColonnes > 6)
        alert('Svp choisissez un nombre entre 2 et 6 inclus');
    if(sourceImg == "")
        alert ('svp choisissez une image valide');

    window.addEventListener("keydown", flecheTouchee, false);  // Pour utiliser les flêches
     // Si il y a encore du contenu dans la zone de jeu, on l'efface pour recommencer
    var puzzle = document.getElementById("puzzle");
    if(puzzle.hasChildNodes()){
        while(puzzle.hasChildNodes()){
            puzzle.removeChild(puzzle.firstChild);
        }
    }

    // Creation d'une table qui contiendra le puzzle
    var table = document.createElement("table");
    table.setAttribute("align","center");
    table.setAttribute("id","table");
    var valueCell = 1;
    for (var i = 0; i < nbLignes; i++){
        tr = document.createElement("tr");
        for(var j = 0; j < nbColonnes; j++){
            td = document.createElement("td");
            td.setAttribute("id","("+i+","+j+")");
            span = document.createElement("span");
            span.setAttribute("class","numbers");
            span.textContent = valueCell++;
            td.style.backgroundImage = 'url(' + sourceImg + ')';
            td.style.backgroundPosition = - j*150 +'px' + - i* 150 +'px';
            td.appendChild(span);
            if (i+1 == nbLignes && j+1 == nbColonnes)
            {
            // on ne met pas de valeur sur la case inferieur droite
                td.style.backgroundColor = "gray";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    puzzle.appendChild(table);
    prepareImgs();
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
var winboard= document.getElementById("winningBoard");
   if(state=="winning"){
           nbDeplacementsVic.textContent+=" " + champDeplace.textContent; //affiche le score du gagnant
           victoire.style.visibility="visible";//rend le message gagnant visible
           window.removeEventListener("keydown", checkKeyPress, false); //empeche le joueur d'utiliser les fleches une fois le jeu finit
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

function afficheImg(){
    if (! imgAffiche)
    {
        document.getElementById("imgOriginal").style.visibility = "visible";
        imgAffiche = true;
    }
}

function effaceImg(){
    imgAffiche = false;
    document.getElementById("imgOriginal").style.visibility = "hidden";
}

// Fonction pour dividir l'image en sous images
function prepareImgs(){
    var canvas = document.createElement('canvas'), // In memory canvas
    ctx    = canvas.getContext("2d"),
    parts  = [],                               // to store base64 strings
    img    = new Image();

    img.onload = split_img;
    img.src = sourceImg;
    function split_img(){
      var w2 = Math.floor(600  / nbColonnes),
          h2 = Math.floor(600/ nbLignes);
      canvas.width  = w2;
      canvas.height = h2;
      var long = nbLignes * nbColonnes;
      for(var i = 0; i < long; i++){
        var x = (i % nbColonnes )* -w2,//(-w2*i) % (w2 * nbColonnes),
            y = Math.floor(i / nbColonnes) * -h2;//(h2*i) <= h2 ? 0 : -h2 ;
        ctx.drawImage(this, x, y, w2 , h2 ); // img, x, y, w, h
        parts.push( canvas.toDataURL() );     // ("image/jpeg") for jpeg
        // ---------- JUST TO TEST
        var slicedImage = document.createElement("img");
        slicedImage.src = parts[i];
        var div = document.getElementById("test");
        div.appendChild( slicedImage );

        // ----------
      }
      console.log( parts );
    };
}