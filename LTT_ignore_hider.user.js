// ==UserScript==
// @name         LTT Ignored Post Hider
// @version      1.01
// @author       Colonel_Gerdauf
// @description  Hides the posts made by members in your ignore list instead of displaying a short prompt, within the open threads.
// @include      /^https?:\/\/(?:[^\.]+\.)?linustechtips\.com\/main\/topic\/.*$/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @updateURL    https://github.com/ColonelGerdauf/Web-Modifications/raw/master/LTT_ignore_hider.user.js
// @downloadURL  https://github.com/ColonelGerdauf/Web-Modifications/raw/master/LTT_ignore_hider.user.js
// ==/UserScript==

var $jq = jQuery.noConflict();
var bin = GM_getValue("lgnore_switch", true);

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

if (bin === true)
{
    $jq(".post_block").each(function(){
        if ($jq(this).children(".post_ignore").length)
        {
            $jq(this).parent().replaceWith("<!--ignore.enabled-->");
        }
    });
}

$jq(".topic.hfeed.clear.clearfix > .maintitle")
.append($jq("<span>", {id:"lttn-ignore", style:'font-size: 13px; float: right;'})
.append($jq("<a>", {href:'#', style:'padding-left: 5px;', id:'lttn-ignore-data'}).text(binaryFeedback(bin))));

$jq("#lttn-ignore-data").click(function(event) {
    event.preventDefault();
    bin = !bin;
    GM_setValue("lgnore_switch", bin);
    location.reload();
    $jq(this).text(binaryFeedback(bin));
});

function binaryFeedback($bin)
{
    if (bin === false) {
        return "Hide Ingored";
    }
    else {
        return "Show Ignored";
    }
}
