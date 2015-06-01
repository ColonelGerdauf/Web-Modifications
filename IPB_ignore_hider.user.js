// ==UserScript==
// @name         IPB Ignored Post Hider
// @namespace    https://github.com/ColonelGerdauf
// @version      1.2.1
// @author       Colonel_Gerdauf
// @contributor  StormDrive
// @description  Provides the option of hiding the posts made by members in your ignore list, replacing the short prompt, within the open threads. It also displays the original post of a thread, even if the author is ignored.
// @match        *://*/topic/*
// @match        *://*/*/topic/*
// @exclude      https://forums.geforce.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @updateURL    https://github.com/ColonelGerdauf/Web-Modifications/raw/master/IPB_ignore_hider.user.js
// @downloadURL  https://github.com/ColonelGerdauf/Web-Modifications/raw/master/IPB_ignore_hider.user.js
// @supportURL   https://github.com/ColonelGerdauf/Web-Modifications/issues
// ==/UserScript==


var $jq = jQuery.noConflict();

var domainStr = ["lgnore_switch_domain", document.domain].join(":");

if ($jq('#user_navigation').hasClass('logged_in') || $jq('#branding-user > .ipsList_inline.right').children('#nav-user').length)
{
    var bin = GM_getValue(domainStr, false);

    $jq('.maintitle.clear.clearfix')
    .append($jq('<span>', {id:'ips-ignore', class:'ipsType_small', style:'float: right;'})
            .append($jq('<a>', {href:'javascript:void(0);', class:'ips-ignore-data', style:'padding-left: 5px;'})
                    .text(binaryFeedback(bin))));

    var firstPost = $jq('.post_block').first(); 

    if (firstPost.find('a[itemprop="replyToUrl"]').text().trim() === "#1")
    { //If the first post is on this page, we want to make sure we don't hide it
        if (firstPost.children('.post_ignore').length) 
        {
            firstPost.find('.post_ignore').replaceWith("<!--ignore.post.start-->");
            firstPost.find('.post_wrap').removeAttr('style');
            firstPost.find('a[itemprop="replyToUrl"]').text("Ignored Original Poster - #1");
        }
    }

    var ignoredPosts = $jq(".post_ignore").closest(".paper-card");

    if (bin)
    {
        ignoredPosts.hide('fast');
    }

    $jq('.ips-ignore-data').click(function(){
        bin = !bin;
        GM_setValue(domainStr, bin);
        if(bin) ignoredPosts.hide('fast');
        else ignoredPosts.show('fast');
        $jq(this).text(binaryFeedback(bin));
    });
}
else if ($jq('#elUserNav').hasClass('cSignedIn'))
{    
    var bin = GM_getValue(domainStr, false);

    $jq('.ipsType_sectionTitle')
    .append($jq('<span>', {id:'ips-ignore', style:'float: right;'})
            .append($jq('<a>', {href:'javascript:void(0)', class:'ips-ignore-data', style:'padding-left: 5px;'})
                    .text(binaryFeedback(bin))));



    if ($jq('li.ipsPagination_page.ipsPagination_active').find('a').attr('data-page') === "1")
    { //If the first post is on this page, we want to make sure we don't hide it    
        var firstPost = $jq('.cPost.ipsComment').first(); 
        if (firstPost.hasClass('ipsHide')) 
        {
            $jq('.ipsComment.ipsComment_ignored').first().replaceWith("<!--ignore.post.start-->");
            firstPost.removeClass('ipsHide');
            firstPost.find('.ipsType_reset:not(.ipsType_blendLinks)')
            .append($jq('<span>', {style:' float: right; padding-left: 5px;'})
                    .text("Ignored Original Poster"));
        }

    }

    var ignoredPosts = $jq(".ipsComment_ignored");

    if (bin)
    {
        ignoredPosts.hide('fast');
    }

    $jq('.ips-ignore-data').click(function(){
        bin = !bin;
        GM_setValue(domainStr, bin);
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
else if ($jq('#elUserNav').hasClass('cSignedOut'))
{
    $jq('.ipsType_sectionTitle')
    .append($jq('<span>', {style:'float: right; padding-left: 5px;'})
            .text("FUNCTION DISABLED : NOT LOGGED IN")); 
}

function binaryFeedback($bin)
{
    return bin ? "Show Ignored" : "Hide Ignored";
}
