/* 
 * Jeu de taquin utilisant jquery et javascript 
 */

$(document).ready(function($) {
   
    var jeuCommence = 0;    // Variable pour identifier le chargement d'une image'
    var source = $('#imgUrl').val();
    
     
    // Fonction qui charge le première image pour donner l'aperçu de comment elle sera affiché dans le rectangle
    $("#chargeImg").click(function() {
     if(jeuCommence == 0 && ! (source.localeCompare($('#imgUrl').val()))){ // return 0 si match exact
            var img = $('<img />', { 
            id: 'imgInit',
            src: $('#imgUrl').val(),
            alt: 'Svp placez une URL valide dans le champ Adresse URL de votre image'
         });
     img.appendTo($('#aireJeu'));
     jeuCommence = 1;
     } else if (source.localeCompare($('#imgUrl').val()) != 0){
            $('#imgInit').remove();
            var img = $('<img />', { 
            id: 'imgInit',
            src: $('#imgUrl').val(),
            alt: 'image initiale'
            });
        img.appendTo($('#aireJeu'));
        jeuCommence = 1;
         }
     
     });
     
     $("#brasse").click(function() {
        if (! $('#nbColonnes').val() || ! $('#nbLignes').val() ){
            alert('svp selectionnez les nombres des lignes et de colonnes');
        }
        $("img").remove();
        jeuCommence = 0;
        var lignes =  $('#nbLignes').val();
        var colonnes = $('#nbColonnes').val();
        var tab = [lignes][colonnes];
        for (var i=0; i < lignes; i++){
            for (var j=0; j < colonnes; j++){
                var img = $('<img />', { 
                id: 'i'+i,
                src: $('#imgUrl').val().splitImg(),
                alt: 'image initiale'
                });
                var div = $('<div /> ',{
                class : "div_int"
                });
                div.appendTo('#aireJeu');
                img.appendTo($('.div_int'));
            }
        }
        
        //$('#imgInit').splitImage({steps : 2});

    });
    
});


