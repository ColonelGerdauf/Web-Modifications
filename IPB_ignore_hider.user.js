// ==UserScript==
// @name         IPB Ignored Post Hider
// @namespace    https://github.com/ColonelGerdauf
// @version      1.12
// @author       Colonel_Gerdauf
// @description  Provides the option of hiding the posts made by members in your ignore list, replacing the short prompt, within the open threads. It also displays the original post of a thread, even if the author is ignored.
// @match        *://*/topic/*
// @match        *://*/*/topic/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @updateURL    https://github.com/ColonelGerdauf/Web-Modifications/raw/master/IPB_ignore_hider.user.js
// @downloadURL  https://github.com/ColonelGerdauf/Web-Modifications/raw/master/IPB_ignore_hider.user.js
// @supportURL   https://github.com/ColonelGerdauf/Web-Modifications/issues
// ==/UserScript==

var $jq = jQuery.noConflict();

if ($jq('#user_navigation').hasClass('logged_in') || $jq('#branding-user > .ipsList_inline.right').children('#nav-user').length)
{
    var bin = GM_getValue('lgnore_switch', false);

    $jq('.maintitle.clear.clearfix')
    .append($jq('<span>', {id:'ips-ignore', class:'ipsType_small', style:'float: right;'})
            .append($jq('<a>', {href:'javascript:void(0);', class:'ips-ignore-data', style:'padding-left: 5px;'})
                    .text(binaryFeedback(bin))));

    var ignoredPosts = $jq(".post_ignore").closest(".paper-card");
    
    if ($jq('.post_block').first().find('a[itemprop="replyToUrl"]').text().trim() === "#1")
    { //If the first post is on this page, we want to make sure we don't hide it
        ignoredPosts = $jq('.post_block:not(:eq(0)) .post_ignore').closest('.paper-card');
        
        var firstPost = $jq('.post_block').first();        
        
        firstPost.find('.post_ignore').replaceWith("<!--ignore.firstpost-->");
        firstPost.find('.post_wrap').show();
        firstPost.find('.post_wrap').css('overflow', 'visible');
        firstPost.find('a[itemprop="replyToUrl"]').text("Ignored Original Poster - #1");
    }

    if (bin)
    {
        ignoredPosts.hide('fast');
    }

    $jq('.ips-ignore-data').click(function(){
        bin = !bin;
        GM_setValue('lgnore_switch', bin);
        if(bin) ignoredPosts.hide('fast');
        else ignoredPosts.show('fast');
        $jq(this).text(binaryFeedback(bin));
    });
}
else if ($jq('#user_navigation').hasClass('not_logged_in') || $jq('#branding-user').children('#nav-guest').length)
{
    $jq('.maintitle.clear.clearfix')
    .append($jq('<span>', {class:'ipsType_small', style:'float: right; padding-left: 5px;'})
            .text("FUNCTION DISABLED : NOT LOGGED IN"));
}

function binaryFeedback($bin)
{
    return bin ? "Show Ignored" : "Hide Ignored";
}
