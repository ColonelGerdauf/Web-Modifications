// ==UserScript==
// @name         LTT Ignored Post Hider
// @namespace    https://github.com/ColonelGerdauf
// @version      1.02
// @author       Colonel_Gerdauf
// @description  Provides the option of hiding the posts made by members in your ignore list, replacing the short prompt, within the open threads. It also displays the original post of a thread, even if the author is ignored.
// @match        *://linustechtips.com/main/topic/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @updateURL    https://github.com/ColonelGerdauf/Web-Modifications/raw/master/LTT_ignore_hider.user.js
// @downloadURL  https://github.com/ColonelGerdauf/Web-Modifications/raw/master/LTT_ignore_hider.user.js
// ==/UserScript==

var $jq = jQuery.noConflict();

if ($jq(".main_width").children(".logged_in").length)
{
    var bin = GM_getValue("lgnore_switch", true);

    $jq(".topic.hfeed.clear.clearfix > .maintitle")
    .append($jq("<span>", {id:"lttn-ignore", style:'font-size: 13px; float: right;'})
            .append($jq("<a>", {href:'#', style:'padding-left: 5px;', id:'lttn-ignore-data'})
                    .text(binaryFeedback(bin))));

    if ($jq('.post_block').first().find('a[itemprop="replyToUrl"]').text().trim() === "#1")
    {
        if ($jq('.post_block').first().children(".post_ignore").length)
        {
            var pid = $jq('.post_block').first().attr('id').replace("post_id_","");
            $jq(".post_ignore").first().replaceWith("<!--ignore.firstpost:"+pid+"-->");
            $jq(".post_wrap").first().css("display", "");
            $jq(".post_wrap").first().css("overflow", "visible");
            $jq('a[itemprop="replyToUrl"]').first().text("Ignored Original Poster - #1");
        }
    }

    if (bin)
    {
        $jq(".post_ignore").each(function(){
            $jq(this).parent().parent().replaceWith("<!--ignore.enabled-->");
        });
    }

    $jq("#lttn-ignore-data").click(function(event) {
        event.preventDefault();
        GM_setValue("lgnore_switch", !bin);
        $jq(this).text(binaryFeedback(!bin));
        location.reload();
    });

    function binaryFeedback($bin)
    {
        return bin ? "Show Ingored" : "Hide Ignored";
    }
}
