// ==UserScript==
// @name         Steam Game Evaluation System (BETA)
// @namespace    https://github.com/ColonelGerdauf
// @version      0.13
// @author       Colonel_Gerdauf
// @description  
// @match        *://store.steampowered.com/search/*
// @run-at       document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @updateURL    https://github.com/ColonelGerdauf/Web-Modifications/raw/master/Steam_Game_Evaluation_System.user.js
// @downloadURL  https://github.com/ColonelGerdauf/Web-Modifications/raw/master/Steam_Game_Evaluation_System.user.js
// @supportURL   https://github.com/ColonelGerdauf/Web-Modifications/issues
// ==/UserScript==

var $jq = jQuery.noConflict();

$jq('.search_result_row').each(function(){

    var $this = $jq(this);
    var color = [0,0,0]; // default is black

    if ($this.find('.search_review_summary').length)
    {
        var reference = $this.find('.search_review_summary').attr('data-store-tooltip');
        var score = parseInt(reference.substring(reference.indexOf("<br>")+4,reference.indexOf("%")));
        var votes = parseInt(reference.substring(reference.indexOf("the")+4, reference.indexOf("user reviews")-1).replace(/\D/g,""));
        /*
        var discount = 0;

        if ($this.find('.search_discount').length > 0)
        {
            reference = $this.find('.search_discount span').text();
            discount = paresInt(reference.substring(reference.indexOf("-"),reference.indexOf("%")));
        }*/
        
        color = ratingDividend(score, votes);
        $this.css('background-color', ['rgba(', color[0], ',', color[1], ',', color[2], ',0.2)'].join(''));
    }
});

function ratingDividend(sc, vt)
{
    // The colour spectrum from red to yellow to blue per percentage point.
    // An extra value is added in case of server-side errors.
    var ratingArray =
        [[255,0,0],     [255,5,0],     [255,10,0],    [255,15,0],    [255,20,0],    [255,26,0],
         [255,31,0],    [255,36,0],    [255,41,0],    [255,46,0],    [255,51,0],    [255,56,0],
         [255,61,0],    [255,66,0],    [255,71,0],    [255,77,0],    [255,82,0],    [255,87,0],
         [255,92,0],    [255,97,0],    [255,102,0],   [255,107,0],   [255,112,0],   [255,117,0],
         [255,122,0],   [255,128,0],   [255,133,0],   [255,138,0],   [255,143,0],   [255,148,0],
         [255,153,0],   [255,158,0],   [255,163,0],   [255,168,0],   [255,173,0],   [255,179,0],
         [255,184,0],   [255,189,0],   [255,194,0],   [255,199,0],   [255,204,0],   [255,209,0],
         [255,214,0],   [255,219,0],   [255,224,0],   [255,230,0],   [255,235,0],   [255,240,0],
         [255,245,0],   [255,250,0],   [255,255,0],   [240,255,0],   [224,255,0],   [209,255,0],
         [194,255,0],   [179,255,0],   [163,255,0],   [148,255,0],   [133,255,0],   [117,255,0],
         [102,255,0],   [87,255,0],    [71,255,0],    [56,255,0],    [41,255,0],    [25,255,0],
         [10,255,0],    [0,255,5],     [0,255,20],    [0,255,36],    [0,255,51],    [0,255,66],
         [0,255,82],    [0,255,97],    [0,255,112],   [0,255,128],   [0,255,143],   [0,255,158],
         [0,255,173],   [0,255,189],   [0,255,204],   [0,255,219],   [0,255,235],   [0,255,250],
         [0,245,255],   [0,230,255],   [0,214,255],   [0,199,255],   [0,184,255],   [0,168,255], 
         [0,153,255],   [0,138,255],   [0,122,255],   [0,107,255],   [0,92,255],    [0,76,255], 
         [0,61,255],    [0,46,255],    [0,31,255],    [0,15,255],    [0,0,255],     [128,0,255]]; 

    // catch faulty values
    if (sc < 0 || sc > 100)
    {
        return ratingArray[101];
    }
    
    // the score is first weighed based on preceived value
    var calc = 10 * (10 - (Math.sqrt(100 - sc));

    // now we add in the voting total
    //    var voteMedian = Math.pow(10,4);
    // calc *= (-1/((vt+voteMedian)/voteMedian)+1):

    return ratingArray[Math.round(calc)];
}
