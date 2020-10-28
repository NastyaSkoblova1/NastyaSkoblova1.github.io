{assign var="menu_item_style" value=""}
{if $a.menu_textcolor<>""}{assign var="menu_item_style" value=`$menu_item_style`color:`$a.menu_textcolor`;}{/if}
{if $a.menu_fontsize<>""}{assign var="menu_item_style" value=`$menu_item_style`font-size:`$a.menu_fontsize`;}{/if}
{if $a.menu_lineheight<>""}{assign var="menu_item_style" value=`$menu_item_style`line-height:`$a.menu_lineheight`;}{/if}
{if $a.menu_fontweight<>""}{assign var="menu_item_style" value=`$menu_item_style`font-weight:`$a.menu_fontweight`;}{/if}
{if $a.menu_letterspacing<>""}{assign var="menu_item_style" value=`$menu_item_style`letter-spacing:`$a.menu_letterspacing`;}{/if}
{if $a.menu_fontfamily<>""}{assign var="menu_item_style" value=`$menu_item_style`font-family:&apos;`$a.menu_fontfamily`&apos;;}{/if}
{if $a.menu_uppercase=="on"}{assign var="menu_item_style" value=`$menu_item_style`text-transform:uppercase;}{/if}
{if $a.menu_spacing<>"" and $a.menu_hover_textunderlineheight=="" and $a.menu_hover_textstrike=="" and $a.menu_active_textunderlineheight=="" and $a.menu_active_textstrike==""}{assign var="menu_item_style" value="`$menu_item_style`padding:0 `$a.menu_spacing/2`px;"}{/if}

{assign var="menusub_item_style" value=""}
{if $a.menusub_textcolor<>""}{assign var="menusub_item_style" value=`$menusub_item_style`color:`$a.menusub_textcolor`;}{/if}
{if $a.menusub_fontsize<>""}{assign var="menusub_item_style" value=`$menusub_item_style`font-size:`$a.menusub_fontsize`;}{/if}
{if $a.menusub_fontweight<>""}{assign var="menusub_item_style" value=`$menusub_item_style`font-weight:`$a.menusub_fontweight`;}{/if}
{if $a.menusub_letterspacing<>""}{assign var="menusub_item_style" value=`$menusub_item_style`letter-spacing:`$a.menusub_letterspacing`;}{/if}
{if $a.menusub_fontfamily<>""}{assign var="menusub_item_style" value=`$menusub_item_style`font-family:&apos;`$a.menusub_fontfamily`&apos;;}{/if}
{if $a.menusub_uppercase=="on"}{assign var="menusub_item_style" value=`$menusub_item_style`text-transform:uppercase;}{/if}

{assign var="hasunderline" value=false}
{if $a.menu_spacing<>"" and ($a.menu_hover_textunderlineheight<>"" or $a.menu_hover_textstrike<>"" or $a.menu_active_textunderlineheight<>"" or $a.menu_active_textstrike<>"")}
{assign var="hasunderline" value=true}
{/if}

{assign var="title_style" value=""}
{if $a.title_color<>""}{assign var="title_style" value=`$title_style`color:`$a.title_color`;}{/if}
{if $a.title_fontsize<>""}{assign var="title_style" value=`$title_style`font-size:`$a.title_fontsize`;}{/if}
{if $a.title_lineheight<>""}{assign var="title_style" value=`$title_style`line-height:`$a.title_lineheight`;}{/if}
{if $a.title_fontweight<>""}{assign var="title_style" value=`$title_style`font-weight:`$a.title_fontweight`;}{/if}
{if $a.title_letterspacing<>""}{assign var="title_style" value=`$title_style`letter-spacing:`$a.title_letterspacing`;}{/if}
{if $a.title_fontfamily<>""}{assign var="title_style" value=`$title_style`font-family:&apos;`$a.title_fontfamily`&apos;;}{/if}
{if $a.title_margintop<>""}{assign var="title_style" value=`$title_style`margin-top:`$a.title_margintop`;}{/if}
{if $a.title_marginbottom<>""}{assign var="title_style" value=`$title_style`margin-bottom:`$a.title_marginbottom`;}{/if}
{if $a.title_uppercase=="on"}{assign var="title_style" value=`$title_style`text-transform:uppercase;}{/if}

{assign var="descr_style" value=""}
{if $a.descr_color<>""}{assign var="descr_style" value=`$descr_style`color:`$a.descr_color`;}{/if}
{if $a.descr_fontsize<>""}{assign var="descr_style" value=`$descr_style`font-size:`$a.descr_fontsize`;}{/if}
{if $a.descr_lineheight<>""}{assign var="descr_style" value=`$descr_style`line-height:`$a.descr_lineheight`;}{/if}
{if $a.descr_fontweight<>""}{assign var="descr_style" value=`$descr_style`font-weight:`$a.descr_fontweight`;}{/if}
{if $a.descr_fontfamily<>""}{assign var="descr_style" value=`$descr_style`font-family:&apos;`$a.descr_fontfamily`&apos;;}{/if}
{if $a.descr_margintop<>""}{assign var="descr_style" value=`$descr_style`margin-top:`$a.descr_margintop`;}{/if}
{if $a.descr_marginbottom<>""}{assign var="descr_style" value=`$descr_style`margin-bottom:`$a.descr_marginbottom`;}{/if}
{if $a.descr_uppercase=="on"}{assign var="descr_style" value=`$descr_style`text-transform:uppercase;}{/if}

{assign var="menu_lang_style" value=""}
{if $a.menu_textcolor<>""}{assign var="menu_lang_style" value=`$menu_lang_style`color:`$a.menu_textcolor`;}{/if}
{if $a.menu_fontsize<>""}{assign var="menu_lang_style" value=`$menu_lang_style`font-size:`$a.menu_fontsize`;}{/if}
{if $a.menu_lineheight<>""}{assign var="menu_lang_style" value=`$menu_lang_style`line-height:`$a.menu_lineheight`;}{/if}
{if $a.menu_fontweight<>""}{assign var="menu_lang_style" value=`$menu_lang_style`font-weight:`$a.menu_fontweight`;}{/if}
{if $a.menu_letterspacing<>""}{assign var="menu_lang_style" value=`$menu_lang_style`letter-spacing:`$a.menu_letterspacing`;}{/if}
{if $a.menu_fontfamily<>""}{assign var="menu_lang_style" value=`$menu_lang_style`font-family:&apos;`$a.menu_fontfamily`&apos;;}{/if}
{if $a.menu_uppercase=="on"}{assign var="menu_lang_style" value=`$menu_lang_style`text-transform:uppercase;}{/if}

{if $a.sharestyle=="black-white"}
{assign var="type" value="t228__black-white"}
{elseif $a.sharestyle=="transp-white"}
{assign var="type" value="t228__transp-white"}
{elseif $a.sharestyle=="transp-black"}
{assign var="type" value="t228__transp-black"}
{elseif $a.sharestyle=="white-black"}
{assign var="type" value="t228__white-black"}
{else}
{assign var="type" value=""}
{/if}



<!-- T228 -->
<div id="nav{$a.id}marker"></div>
{if $a.checkbox1<>""}
  <div class="t228__mobile{if $a.checkbox6<>"" && $a.checkbox1<>""} t228__positionfixed{/if}" {if $previewmode==""}style="position:static"{/if}>
    <div class="t228__mobile_container">
      <div class="t228__mobile_text t-name t-name_md" field="text">{if $a.text<>""}{$a.text}{else}&nbsp;{/if}</div> 
      <div class="t228__burger">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>  
    </div>
  </div>
{/if}
<div id="nav{$a.id}" class="t228 {if $a.checkbox1<>""}t228__hidden{/if} {if $a.menu_position=="static" or $a.menu_position=="fixed" or $a.menu_position=="absolute"}t228__position{$a.menu_position}{/if} {if $previewmode=="yes" and $a.menu_appearoffset<>"" and $a.menu_position=="fixed"}t228__beforeready{/if}" style="{if $a.menu_bgcolor<>""}background-color: rgba({$a.menu_bgcolor_rgb},{if $a.menu_bgopacity<>"100" and $a.menu_bgopacity<>""}0.{$a.menu_bgopacity}{else}1{/if});{/if} {if $a.menu_height<>""}height:{$a.menu_height};{/if} {if $previewmode==""}position:static;{/if}{if $a.menu_shadow<>"" and $a.menu_bgopacity<>"0"}box-shadow: 0px 1px 3px rgba(0,0,0,{if $a.menu_shadow=="100"}1{else}0.{$a.menu_shadow}{/if});{/if}" data-bgcolor-hex="{$a.menu_bgcolor}" data-bgcolor-rgba="{if $a.menu_bgcolor<>""}rgba({$a.menu_bgcolor_rgb},{if $a.menu_bgopacity<>"100" and $a.menu_bgopacity<>""}0.{$a.menu_bgopacity}{else}1{/if}){/if}" data-navmarker="nav{$a.id}marker" data-appearoffset="{$a.menu_appearoffset}" data-bgopacity-two="{$a.menu_bgopacity2}" data-menushadow="{$a.menu_shadow}" data-bgopacity="{if $a.menu_bgopacity<>"100" and $a.menu_bgopacity<>""}0.{$a.menu_bgopacity}{else}1{/if}" {if $a.menu_bgopacity1<>""}data-bgopacity="{if $a.menu_bgopacity<>"100"}0.{$a.menu_bgopacity}{else}1{/if}"{/if} {if $a.menu_bgopacity2<>""}data-bgcolor-rgba-afterscroll="{if $a.menu_bgcolor<>""}rgba({$a.menu_bgcolor_rgb},{if $a.menu_bgopacity2<>"100" and $a.menu_bgopacity2<>""}0.{$a.menu_bgopacity2}{else}1{/if}){/if}"{/if} data-menu-items-align="{$a.menu_align}" data-menu="yes">
    <div class="t228__maincontainer {if $a.menu_container=="12"}t228__c12collumns{/if}" style="{if $a.menu_height<>""}height:{$a.menu_height};{/if}">
          <div class="t228__padding40px"></div>
          
          <div class="t228__leftside">
            {if $a.title<>"" or $a.img<>""}
            <div class="t228__leftcontainer">    
                {if $a.link<>""}<a href="{$a.link}" {if $a.linktarget=="_blank"}target="_blank"{/if} style="{$title_style}">{/if}{if $a.img<>""}<img src="{$a.img}" class="t228__imglogo {if $a.imgwidth}t228__imglogomobile{/if}" imgfield="img" {if $a.imgwidth}style="max-width: {$a.imgwidth};width: {$a.imgwidth}; height: auto; display: block;"{else}style="max-height: 80px"{/if} alt="{$a.title|strip_tags|escape}">{else}<div class="t228__logo t-title" field="title" style="{$title_style}">{$a.title}</div>{/if}{if $a.link<>""}</a>{/if}
            </div>
            {/if}
          </div>

          <div class="t228__centerside {if $a.menu_align=="left" or $a.menu_align=="right"}t228__menualign_{$a.menu_align}{/if}">
            {if $a.menuitems|@count>0 or ($a.pageslist|@count>0 && $a.pageslist[0]|@count>1)}
            <div class="t228__centercontainer">
            <ul class="t228__list {if $a.menu_align=="center"}t228__list_hidden{/if}">
            {assign var="itemscounter" value="0"}
            {section name=i loop=$a.menuitems}
			{assign var="itemscounter" value=$itemscounter+1}
            <li class="t228__list_item"{if $hasunderline==true} style="padding:0 {$a.menu_spacing/2+15}px;"{/if}><a class="t-menu__link-item" href="{if !(count($a.menuitems[i].sub) > 0)}{$a.menuitems[i].link}{/if}" data-menu-submenu-hook="{if count($a.menuitems[i].sub) > 0}link_sub{$itemscounter}_{$a.id}{/if}" {if $a.menuitems[i].linktarget=="_blank"}target="_blank"{/if} style="{$menu_item_style}" data-menu-item-number="{$smarty.section.i.index+1}">{$a.menuitems[i].title}</a>
            {include file="tpl_menusub.tpl"}
            </li>
            {/section}        
            {section name=i loop=$a.pageslist}
             <li class="t228__list_item"{if $hasunderline==true} style="padding:0 {$a.menu_spacing/2+15}px;"{/if}><a class="t-menu__link-item" href="{if $publishmode<>"yes"}?pageid={$a.pageslist[i].id}{elseif $a.pageslist[i].customlink<>""}{$a.pageslist[i].customlink}{elseif $a.pageslist[i].url<>"/"}/{$a.pageslist[i].url}{else}/{/if}" id="t228linktopage{$a.pageslist[i].id}" {if $a.pageslist[i].linktarget=="_blank"}target="_blank"{/if}  style="{$menu_item_style}">{if $a.pageslist[i].shorttitle<>""}{$a.pageslist[i].shorttitle}{else}{$a.pageslist[i].title}{/if}</a></li>
            {/section}
            </ul>
            </div>
            {/if}
          </div>

          <div class="t228__rightside">
             {if $a.descr<>"" or $a.sharefacebook=="on" or $a.sharetwitter=="on" or $a.sharevk=="on" or $a.buttontitle<>"" or $a.buttontitle2<>"" or $a.lang<>"" or $a.lang2<>"" or $a.facebooklink<>"" or $a.twitterlink<>"" or $a.vklink<>"" or $a.behancelink<>"" or $a.vimeolink<>"" or $a.youtubelink<>"" or $a.instagramlink<>"" or $a.pinterestlink<>"" or $a.linkedinlink<>"" or $a.telegramlink<>""}
             <div class="t228__rightcontainer">
                {if $a.descr<>""}
                <div class="t228__right_descr" style="{$descr_style}">{$a.descr}</div>
                {/if}
                {if $a.sharefacebook=="on" or $a.sharetwitter=="on" or $a.sharevk=="on"}
                    <div class="t228__right_share_buttons {$type}">
                      <script type="text/javascript" src="https://static.tildacdn.com/js/ya-share.js" charset="utf-8"></script>
                      <div class="ya-share2" data-access-token:facebook="{if $a.project.json.fbapptoken<>""}{$a.project.json.fbapptoken}{else}{$a.descr2}{/if}" data-yashareL10n="en" data-services="{if $a.sharefacebook=="on"}facebook,{/if}{if $a.sharevk=="on"}vkontakte,{/if}{if $a.shareok=="on"}odnoklassniki,{/if}{if $a.sharetwitter=="on"}twitter{/if}" data-counter=""></div>        
                    </div>
                {/if}
                {if $a.facebooklink<>"" or $a.oklink<>"" or $a.twitterlink<>"" or $a.vklink<>"" or $a.behancelink<>"" or $a.vimeolink<>"" or $a.youtubelink<>"" or $a.instagramlink<>"" or $a.pinterestlink<>"" or $a.linkedinlink<>"" or $a.soundcloudlink<>"" or $a.telegramlink<>""}
                    {assign var="icosize" value="30px"}
                    <div class="t228__right_social_links">
                      <div class="t228__right_social_links_wrap">

{if $a.facebooklink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.facebooklink}" target="_blank">
<svg {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
<path d="M47.761,24c0,13.121-10.638,23.76-23.758,23.76C10.877,47.76,0.239,37.121,0.239,24c0-13.124,10.638-23.76,23.764-23.76
C37.123,0.24,47.761,10.876,47.761,24 M20.033,38.85H26.2V24.01h4.163l0.539-5.242H26.2v-3.083c0-1.156,0.769-1.427,1.308-1.427
h3.318V9.168L26.258,9.15c-5.072,0-6.225,3.796-6.225,6.224v3.394H17.1v5.242h2.933V38.85z"/>
</svg>
</a>
</div>
{/if}
{if $a.twitterlink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.twitterlink}" target="_blank">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M47.762,24c0,13.121-10.639,23.76-23.761,23.76S0.24,37.121,0.24,24c0-13.124,10.639-23.76,23.761-23.76
S47.762,10.876,47.762,24 M38.031,12.375c-1.177,0.7-2.481,1.208-3.87,1.481c-1.11-1.186-2.694-1.926-4.447-1.926
c-3.364,0-6.093,2.729-6.093,6.095c0,0.478,0.054,0.941,0.156,1.388c-5.063-0.255-9.554-2.68-12.559-6.367
c-0.524,0.898-0.825,1.947-0.825,3.064c0,2.113,1.076,3.978,2.711,5.07c-0.998-0.031-1.939-0.306-2.761-0.762v0.077
c0,2.951,2.1,5.414,4.889,5.975c-0.512,0.14-1.05,0.215-1.606,0.215c-0.393,0-0.775-0.039-1.146-0.109
c0.777,2.42,3.026,4.182,5.692,4.232c-2.086,1.634-4.712,2.607-7.567,2.607c-0.492,0-0.977-0.027-1.453-0.084
c2.696,1.729,5.899,2.736,9.34,2.736c11.209,0,17.337-9.283,17.337-17.337c0-0.263-0.004-0.527-0.017-0.789
c1.19-0.858,2.224-1.932,3.039-3.152c-1.091,0.485-2.266,0.811-3.498,0.958C36.609,14.994,37.576,13.8,38.031,12.375"/>
</svg>      
</a>
</div>
{/if}
{if $a.vklink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.vklink}" target="_blank">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M47.761,24c0,13.121-10.639,23.76-23.76,23.76C10.878,47.76,0.239,37.121,0.239,24c0-13.123,10.639-23.76,23.762-23.76
C37.122,0.24,47.761,10.877,47.761,24 M35.259,28.999c-2.621-2.433-2.271-2.041,0.89-6.25c1.923-2.562,2.696-4.126,2.45-4.796
c-0.227-0.639-1.64-0.469-1.64-0.469l-4.71,0.029c0,0-0.351-0.048-0.609,0.106c-0.249,0.151-0.414,0.505-0.414,0.505
s-0.742,1.982-1.734,3.669c-2.094,3.559-2.935,3.747-3.277,3.524c-0.796-0.516-0.597-2.068-0.597-3.171
c0-3.449,0.522-4.887-1.02-5.259c-0.511-0.124-0.887-0.205-2.195-0.219c-1.678-0.016-3.101,0.007-3.904,0.398
c-0.536,0.263-0.949,0.847-0.697,0.88c0.31,0.041,1.016,0.192,1.388,0.699c0.484,0.656,0.464,2.131,0.464,2.131
s0.282,4.056-0.646,4.561c-0.632,0.347-1.503-0.36-3.37-3.588c-0.958-1.652-1.68-3.481-1.68-3.481s-0.14-0.344-0.392-0.527
c-0.299-0.222-0.722-0.298-0.722-0.298l-4.469,0.018c0,0-0.674-0.003-0.919,0.289c-0.219,0.259-0.018,0.752-0.018,0.752
s3.499,8.104,7.463,12.23c3.638,3.784,7.764,3.36,7.764,3.36h1.867c0,0,0.566,0.113,0.854-0.189
c0.265-0.288,0.256-0.646,0.256-0.646s-0.034-2.512,1.129-2.883c1.15-0.36,2.624,2.429,4.188,3.497
c1.182,0.812,2.079,0.633,2.079,0.633l4.181-0.056c0,0,2.186-0.136,1.149-1.858C38.281,32.451,37.763,31.321,35.259,28.999"/>
</svg>      
</a>
</div>
{/if}  

{if $a.oklink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.oklink}" target="_blank">

<svg width="{$icosize}" height="{$icosize}" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<path fill="{if $a.sociallinks_color<>""}{$a.sociallinks_color}{else}#000{/if}" d="M29.702,14.85 C29.702,23.051 23.053,29.7 14.853,29.7 C6.649,29.7 0,23.051 0,14.85 C0,6.647 6.649,0 14.853,0 C23.052,-3.60822483e-16 29.702,6.647 29.702,14.85 L29.702,14.85 Z M14.851,8.391 C15.942,8.391 16.829,9.279 16.829,10.369 C16.829,11.461 15.942,12.348 14.851,12.348 C13.759,12.348 12.872,11.461 12.872,10.369 C12.872,9.277 13.759,8.391 14.851,8.391 L14.851,8.391 Z M14.851,15.148 C17.488,15.148 19.63,13.005 19.63,10.369 C19.63,7.733 17.488,5.588 14.851,5.588 C12.214,5.588 10.07,7.733 10.07,10.369 C10.07,13.005 12.214,15.148 14.851,15.148 L14.851,15.148 Z M16.784,19.048 C17.758,18.824 18.696,18.442 19.56,17.899 C20.215,17.486 20.413,16.621 20.001,15.967 C19.587,15.312 18.725,15.114 18.069,15.526 C16.109,16.758 13.589,16.758 11.631,15.526 C10.976,15.115 10.11,15.312 9.7,15.967 C9.287,16.62 9.485,17.486 10.138,17.899 C11.002,18.441 11.941,18.827 12.914,19.048 L10.241,21.72 C9.695,22.267 9.695,23.156 10.241,23.701 C10.513,23.973 10.872,24.111 11.231,24.111 C11.59,24.111 11.949,23.973 12.222,23.701 L14.847,21.075 L17.474,23.702 C18.021,24.248 18.908,24.248 19.453,23.702 C20.002,23.155 20.002,22.266 19.453,21.722 L16.784,19.048 L16.784,19.048 Z"></path>
</g>
</svg>
</a>
</div>
{/if}

{if $a.behancelink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.behancelink}" target="_blank">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="-455 257 48 48" enable-background="new -455 257 48 48" xml:space="preserve">
<g>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-421.541,278.608c-3.095,0-3.526,3.09-3.526,3.09h6.581C-418.486,281.697-418.444,278.608-421.541,278.608z"/>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-436.472,281.697h-5.834v5.356h5.165c0.088,0,0.219,0.002,0.374,0c0.831-0.02,2.406-0.261,2.406-2.604
C-434.362,281.669-436.472,281.697-436.472,281.697z"/>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-430.984,257C-444.248,257-455,267.75-455,281.014c0,13.263,10.752,24.016,24.016,24.016
c13.262,0,24.014-10.752,24.014-24.016C-406.971,267.751-417.724,257-430.984,257z M-425.93,271.756h8.267v2.467h-8.267V271.756z
M-430.109,284.699c0,6.116-6.364,5.914-6.364,5.914h-5.834h-0.171h-4.423v-20.038h4.423h0.171h5.834
c3.168,0,5.668,1.75,5.668,5.335s-3.057,3.813-3.057,3.813C-429.831,279.723-430.109,284.699-430.109,284.699z M-414.643,284.371
h-10.384c0,3.722,3.526,3.487,3.526,3.487c3.329,0,3.213-2.156,3.213-2.156h3.527c0,5.722-6.859,5.33-6.859,5.33
c-8.227,0-7.698-7.661-7.698-7.661s-0.008-7.698,7.698-7.698C-413.508,275.674-414.643,284.371-414.643,284.371z"/>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-435.055,276.221c0-2.084-1.417-2.084-1.417-2.084h-0.751h-5.083v4.471h5.472
C-435.89,278.608-435.055,278.304-435.055,276.221z"/>
</g>
</svg>  
</a>
</div>
{/if}    
{if $a.vimeolink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.vimeolink}" target="_blank">    
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="-455 257 48 48" enable-background="new -455 257 48 48" xml:space="preserve">
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-431,256.971c13.267,0,24.023,10.755,24.023,24.023s-10.755,24.023-24.023,24.023s-24.023-10.755-24.023-24.023
S-444.267,256.971-431,256.971z M-443.262,276.117l0.996,1.306c0,0,2.054-1.619,2.739-0.81c0.685,0.81,3.299,10.584,4.171,12.387
c0.761,1.581,2.862,3.672,5.166,2.179c2.302-1.493,9.959-8.03,11.329-15.749c1.369-7.717-9.213-6.1-10.335,0.623
c2.802-1.682,4.297,0.683,2.863,3.362c-1.431,2.676-2.739,4.421-3.424,4.421c-0.683,0-1.209-1.791-1.992-4.92
c-0.81-3.236-0.804-9.064-4.17-8.403C-439.09,271.136-443.262,276.117-443.262,276.117L-443.262,276.117z"/>
</svg>
</a>
</div>
{/if}  
{if $a.youtubelink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.youtubelink}" target="_blank">    
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="-455 257 48 48" enable-background="new -455 257 48 48" xml:space="preserve">
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-431,257.013c13.248,0,23.987,10.74,23.987,23.987s-10.74,23.987-23.987,23.987s-23.987-10.74-23.987-23.987
S-444.248,257.013-431,257.013z M-419.185,275.093c-0.25-1.337-1.363-2.335-2.642-2.458c-3.054-0.196-6.119-0.355-9.178-0.357
c-3.059-0.002-6.113,0.154-9.167,0.347c-1.284,0.124-2.397,1.117-2.646,2.459c-0.284,1.933-0.426,3.885-0.426,5.836
s0.142,3.903,0.426,5.836c0.249,1.342,1.362,2.454,2.646,2.577c3.055,0.193,6.107,0.39,9.167,0.39c3.058,0,6.126-0.172,9.178-0.37
c1.279-0.124,2.392-1.269,2.642-2.606c0.286-1.93,0.429-3.879,0.429-5.828C-418.756,278.971-418.899,277.023-419.185,275.093z
M-433.776,284.435v-7.115l6.627,3.558L-433.776,284.435z"/>
</svg>
</a>
</div>
{/if}      
{if $a.instagramlink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.instagramlink}" target="_blank">    
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="0 0 30 30" xml:space="preserve">
<desc>Instagram</desc>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M15,11.014 C12.801,11.014 11.015,12.797 11.015,15 C11.015,17.202 12.802,18.987 15,18.987 C17.199,18.987 18.987,17.202 18.987,15 C18.987,12.797 17.199,11.014 15,11.014 L15,11.014 Z M15,17.606 C13.556,17.606 12.393,16.439 12.393,15 C12.393,13.561 13.556,12.394 15,12.394 C16.429,12.394 17.607,13.561 17.607,15 C17.607,16.439 16.444,17.606 15,17.606 L15,17.606 Z"></path>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M19.385,9.556 C18.872,9.556 18.465,9.964 18.465,10.477 C18.465,10.989 18.872,11.396 19.385,11.396 C19.898,11.396 20.306,10.989 20.306,10.477 C20.306,9.964 19.897,9.556 19.385,9.556 L19.385,9.556 Z"></path>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M15.002,0.15 C6.798,0.15 0.149,6.797 0.149,15 C0.149,23.201 6.798,29.85 15.002,29.85 C23.201,29.85 29.852,23.202 29.852,15 C29.852,6.797 23.201,0.15 15.002,0.15 L15.002,0.15 Z M22.666,18.265 C22.666,20.688 20.687,22.666 18.25,22.666 L11.75,22.666 C9.312,22.666 7.333,20.687 7.333,18.28 L7.333,11.734 C7.333,9.312 9.311,7.334 11.75,7.334 L18.25,7.334 C20.688,7.334 22.666,9.312 22.666,11.734 L22.666,18.265 L22.666,18.265 Z"></path>
</svg>
</a>
</div>
{/if}  
{if $a.pinterestlink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.pinterestlink}" target="_blank">    
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="-455 257 48 48" enable-background="new -455 257 48 48" xml:space="preserve">
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-407,281c0,13.254-10.746,24-23.999,24c-13.257,0-24.003-10.746-24.003-24c0-13.256,10.746-24,24.003-24
C-417.746,257-407,267.744-407,281z M-437.628,295.811c0.027,0.205,0.29,0.254,0.409,0.1c0.17-0.223,2.365-2.932,3.111-5.639
c0.211-0.768,1.212-4.738,1.212-4.738c0.599,1.145,2.349,2.148,4.21,2.148c5.539,0,9.297-5.049,9.297-11.809
c0-5.111-4.329-9.873-10.909-9.873c-8.186,0-12.314,5.871-12.314,10.766c0,2.963,1.122,5.6,3.527,6.582
c0.395,0.162,0.749,0.006,0.863-0.43c0.08-0.303,0.268-1.065,0.353-1.385c0.114-0.432,0.07-0.582-0.248-0.959
c-0.694-0.818-1.138-1.879-1.138-3.381c0-4.353,3.259-8.252,8.484-8.252c4.627,0,7.169,2.828,7.169,6.603
c0,4.969-2.198,9.162-5.461,9.162c-1.804,0-3.153-1.49-2.722-3.32c0.518-2.182,1.522-4.537,1.522-6.113
c0-1.41-0.758-2.588-2.324-2.588c-1.843,0-3.323,1.908-3.323,4.461c0,1.627,0.55,2.727,0.55,2.727s-1.886,7.99-2.217,9.391
C-438.234,292.051-437.676,295.467-437.628,295.811z"/>
</svg>
</a>
</div>
{/if}  
{if $a.linkedinlink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.linkedinlink}" target="_blank">        
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="{$icosize}" height="{$icosize}" viewBox="-615 1477 48 48" enable-background="new -615 1477 48 48" xml:space="preserve">
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M-566.999,1501c0,13.256-10.746,24-24,24c-13.256,0-24.002-10.744-24.002-24c0-13.254,10.746-24,24.002-24
C-577.745,1477-566.999,1487.746-566.999,1501z M-605.506,1514.975h6.22v-20.004h-6.22V1514.975z M-602.396,1492.236
c1.987,0,3.602-1.615,3.602-3.606c0-1.99-1.615-3.605-3.602-3.605c-1.993,0-3.604,1.615-3.604,3.605
C-606,1490.621-604.389,1492.236-602.396,1492.236z M-576,1504.002c0-5.387-1.163-9.529-7.454-9.529
c-3.023,0-5.054,1.658-5.884,3.231h-0.085v-2.733h-5.964v20.004h6.216v-9.896c0-2.609,0.493-5.137,3.729-5.137
c3.186,0,3.232,2.984,3.232,5.305v9.729H-576V1504.002z"/>
</svg>
</a>
</div>      
{/if}
{if $a.soundcloudlink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.soundcloudlink}" target="_blank">        
<svg width="{$icosize}" height="{$icosize}" viewBox="0 0 48 48">
<defs>
<path id="path-1" d="M0,0 L48,0 L48,48 L0,48 L0,0 Z"></path>
</defs>
<g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="Page-1" sketch:type="MSLayerGroup">
<mask id="mask-2" fill="white">
<use xlink:href="#path-1"></use>
</mask>
<g id="Clip-2"></g>
<path {if $a.sociallinks_color<>""}style="fill:{$a.sociallinks_color};"{/if} d="M38.2055852,22.1710074 C37.5706222,22.1710074 36.9645481,22.2997481 36.4126963,22.5308593 C36.0441037,18.3542667 32.5417333,15.0776741 28.2689926,15.0776741 C27.2235111,15.0776741 26.2044,15.2831556 25.3044,15.6314519 C24.9544741,15.7670074 24.8617333,15.9058222 24.8581778,16.176637 L24.8581778,30.8856741 C24.8620296,31.1693778 25.0821778,31.3899704 25.3587704,31.4173778 C25.3707704,31.4187111 38.2055852,31.4173778 38.2055852,31.4173778 C40.7651407,31.4173778 42.8396593,29.3656741 42.8396593,26.8058222 C42.8396593,24.2458222 40.7651407,22.1710074 38.2055852,22.1710074 L38.2055852,22.1710074 Z M24.1706222,16.2367852 C24.0941778,16.190563 24.0055852,16.1633037 23.9107704,16.1633037 C23.7892889,16.1633037 23.6771407,16.2073037 23.5889926,16.2800444 C23.4756593,16.3733778 23.4023259,16.5147111 23.4002519,16.6724889 L23.3992148,16.7252296 L23.1909185,27.1127852 L23.297437,29.0332296 L23.4002519,30.9019704 C23.4039556,31.178563 23.6328444,31.4070074 23.9107704,31.4070074 C24.1879556,31.4070074 24.4171407,31.178563 24.4208444,30.8979704 L24.4208444,30.9024148 L24.4208444,30.902563 L24.6481037,27.1127852 L24.4208444,16.6717481 C24.4184741,16.4874519 24.3178815,16.3259704 24.1706222,16.2367852 L24.1706222,16.2367852 Z M22.8066222,30.9572296 L22.8066222,30.9560444 L22.8066222,30.9573778 L22.8066222,30.9554519 L22.8066222,30.954563 L22.8066222,30.9547111 L22.8066222,30.9560444 L22.8066222,30.9572296 Z M22.5924,17.1444889 C22.5165481,17.0930815 22.4255852,17.0630074 22.3284,17.0630074 C22.2337333,17.0630074 22.1452889,17.0914519 22.0706222,17.1404889 C21.9405481,17.2255259 21.8526963,17.3724889 21.8503259,17.5396 L21.8485481,17.6298222 L21.6695852,27.1090815 C21.6695852,27.1148593 21.8503259,30.9569333 21.8503259,30.9569333 C21.8503259,30.9624148 21.8510667,30.9678963 21.8512148,30.9732296 C21.8568444,31.080637 21.8972889,31.1796 21.9626222,31.2575259 C22.0506222,31.3628593 22.1824741,31.4307111 22.3284,31.4307111 C22.4578815,31.4307111 22.5764,31.3772296 22.6629185,31.2908593 C22.749437,31.2049333 22.8042519,31.0858222 22.8066222,30.9547111 L22.8264741,30.574563 L23.0081037,27.1121926 L22.8066222,17.5394519 C22.8039556,17.3751556 22.7190667,17.2301185 22.5924,17.1444889 L22.5924,17.1444889 Z M20.7389185,18.6227111 C20.4935852,18.6227111 20.2977333,18.8181185 20.2926963,19.0670074 L20.0935852,27.1110074 L20.2928444,30.9815259 C20.2977333,31.2280444 20.4935852,31.4227111 20.7389185,31.4227111 C20.9835111,31.4227111 21.1795111,31.2280444 21.1848444,30.9787111 L21.1848444,30.9819704 L21.4082519,27.1113037 L21.1848444,19.0662667 C21.1795111,18.8178222 20.9835111,18.6227111 20.7389185,18.6227111 L20.7389185,18.6227111 Z M19.1617333,18.3499704 C18.9347704,18.3499704 18.7529926,18.5310074 18.7475111,18.7618222 L18.5289926,27.110563 L18.7476593,31.0055259 C18.7529926,31.2342667 18.9347704,31.4154519 19.1617333,31.4154519 C19.3876593,31.4154519 19.5692889,31.2342667 19.575363,31.0037481 L19.575363,31.0062667 L19.8209926,27.110563 L19.575363,18.7612296 C19.5692889,18.5307111 19.3876593,18.3499704 19.1617333,18.3499704 L19.1617333,18.3499704 Z M17.9777333,31.042563 L17.9780296,31.0407852 L17.9780296,31.0404889 L17.9777333,31.042563 Z M17.9780296,18.5424148 C17.971363,18.3295259 17.8038074,18.1628593 17.5964,18.1628593 C17.3884,18.1628593 17.2206963,18.3296741 17.2146222,18.542563 L16.9771407,27.1096741 L17.2147704,31.0424148 C17.2206963,31.2529333 17.3884,31.4194519 17.5964,31.4194519 C17.8036593,31.4194519 17.9712148,31.2530815 17.9780296,31.0407852 L18.2455852,27.1099704 L17.9780296,18.5424148 Z M16.043363,18.4739704 C15.8537333,18.4739704 15.7002519,18.6267111 15.693437,18.8213778 C15.693437,18.8215259 15.4371407,27.1092296 15.4371407,27.1092296 L15.6937333,31.0664148 C15.7002519,31.2593037 15.8537333,31.4116 16.043363,31.4116 C16.2316593,31.4116 16.3849926,31.2597481 16.3929926,31.0649333 L16.3928444,31.0674519 L16.6823259,27.1092296 L16.3929926,18.8210815 C16.3849926,18.6264148 16.2316593,18.4739704 16.043363,18.4739704 L16.043363,18.4739704 Z M14.4790667,19.1650815 C14.3081037,19.1650815 14.1688444,19.3034519 14.1612889,19.4797481 C14.1612889,19.4801926 13.8860296,27.1293778 13.8860296,27.1293778 L14.1617333,31.1278963 C14.1688444,31.3028593 14.3081037,31.4409333 14.4790667,31.4409333 C14.6489926,31.4409333 14.7884,31.3028593 14.7962519,31.1264148 L14.7961037,31.1284889 L15.1079556,27.1293778 L14.7962519,19.4797481 C14.7884,19.3034519 14.6489926,19.1650815 14.4790667,19.1650815 L14.4790667,19.1650815 Z M12.9738815,20.5996 C12.8215852,20.5996 12.6962519,20.7236 12.6885481,20.8818222 C12.6885481,20.8821185 12.3938815,27.1077481 12.3938815,27.1077481 L12.6885481,31.1310074 C12.6962519,31.2881926 12.8215852,31.4121926 12.9738815,31.4121926 C13.1248444,31.4121926 13.2501778,31.2881926 13.2589185,31.1302667 L13.2589185,31.1314519 L13.5922519,27.1077481 L13.2589185,20.8816741 C13.2501778,20.7234519 13.1248444,20.5996 12.9738815,20.5996 L12.9738815,20.5996 Z M11.7101778,23.2779704 C11.7005481,23.1369333 11.5915111,23.0295259 11.4569926,23.0295259 C11.3212889,23.0295259 11.2124,23.1370815 11.2039556,23.2794519 L10.8903259,27.1061185 L11.2039556,31.1298222 C11.2124,31.2716 11.3212889,31.3791556 11.4569926,31.3791556 C11.591363,31.3791556 11.7001037,31.2716 11.7101778,31.1296741 L12.0655852,27.1061185 L11.7101778,23.2779704 Z M11.7101778,31.1293778 L11.7101778,31.1296741 L11.7101778,31.1302667 L11.7101778,31.1293778 Z M9.9526963,22.7633037 C9.83595556,22.7633037 9.7406963,22.8567852 9.73151111,22.9804889 L9.39906667,27.1058222 L9.73151111,31.0967852 C9.7406963,31.2201926 9.83595556,31.3133778 9.9526963,31.3133778 C10.0679556,31.3133778 10.1629185,31.2201926 10.173437,31.0967852 L10.5510667,27.1058222 L10.173437,22.9797481 C10.1629185,22.856637 10.0679556,22.7633037 9.9526963,22.7633037 L9.9526963,22.7633037 Z M8.46025185,22.9052296 C8.36054815,22.9052296 8.28128889,22.9830074 8.27136296,23.0901185 C8.27136296,23.0904148 7.91980741,27.1050815 7.91980741,27.1050815 L8.27136296,30.9730815 C8.28128889,31.0807852 8.36054815,31.1584148 8.46025185,31.1584148 C8.55788148,31.1584148 8.63728889,31.0807852 8.6486963,30.9738222 L9.04825185,27.1050815 L8.64914074,23.0899704 C8.63728889,22.9828593 8.55788148,22.9052296 8.46025185,22.9052296 L8.46025185,22.9052296 Z M5.58691852,24.864637 C5.5084,24.864637 5.44617778,24.9255259 5.43580741,25.0120444 L5.1604,27.104637 L5.43580741,29.1615259 C5.44617778,29.2480444 5.5084,29.3087852 5.58691852,29.3087852 C5.66351111,29.3087852 5.72528889,29.2484889 5.73773333,29.1622667 L6.06395556,27.104637 L5.73773333,25.0111556 C5.72528889,24.9249333 5.66351111,24.864637 5.58691852,24.864637 L5.58691852,24.864637 Z M6.97995556,23.568637 C6.89995556,23.568637 6.83402963,23.632637 6.82321481,23.7207852 C6.82321481,23.7213778 6.45254815,27.104637 6.45254815,27.104637 L6.82321481,30.4136741 C6.83402963,30.5022667 6.89995556,30.5662667 6.97995556,30.5662667 C7.05936296,30.5662667 7.12365926,30.5037481 7.13625185,30.4144148 L7.55802963,27.104637 L7.1364,23.7207852 C7.12365926,23.6308593 7.05936296,23.568637 6.97995556,23.568637 L6.97995556,23.568637 Z M47.9999556,24.0000444 C47.9999556,37.2547111 37.2547704,48.0000444 23.9999556,48.0000444 C10.7452889,48.0000444 -4.44444445e-05,37.2547111 -4.44444445e-05,24.0000444 C-4.44444445e-05,10.7452296 10.7452889,4.44444444e-05 23.9999556,4.44444444e-05 C37.2547704,4.44444444e-05 47.9999556,10.7452296 47.9999556,24.0000444 L47.9999556,24.0000444 Z" id="Fill-1" fill="#00151D" sketch:type="MSShapeGroup" mask="url(#mask-2)"></path>
</g>
</g>
</svg>
</a>
</div>      
{/if}
{if $a.telegramlink<>""}
<div class="t228__right_social_links_item">
<a href="{$a.telegramlink}" target="_blank">        
{svgicon type='te' color=$a.sociallinks_color class='t-sociallinks__svg' size=$icosize}
</a>
</div>      
{/if}	
</div>
</div>
{/if}            
{if $a.buttontitle<>"" or $a.buttontitle2<>""}
<div class="t228__right_buttons">
<div class="t228__right_buttons_wrap">
{if $a.buttontitle<>""}<div class="t228__right_buttons_but"><a href="{$a.buttonlink}" target="{$a.buttonlinktarget}" class="t-btn {if $a.buttonstat>''}js-click-stat{/if}" {if $a.buttonstat>''}data-tilda-event-name="{if $a.buttonstat=='on'}/tilda/click/rec{$a.id}/button1{else}{$a.buttonstat}{/if}"{/if} style="{btnstyle f='btn' r=$a}"><table style="width:100%; height:100%;"><tr><td>{$a.buttontitle}</td></tr></table></a></div>{/if}
{if $a.buttontitle2<>""}<div class="t228__right_buttons_but"><a href="{$a.buttonlink2}" target="{$a.buttonlinktarget2}" class="t-btn {if $a.buttonstat2>''}js-click-stat{/if}" {if $a.buttonstat2>''}data-tilda-event-name="{if $a.buttonstat2=='on'}/tilda/click/rec{$a.id}/button2{else}{$a.buttonstat2}{/if}"{/if} style="{btnstyle f='btn2' r=$a}"><table style="width:100%; height:100%;"><tr><td>{$a.buttontitle2}</td></tr></table></a></div>{/if}    
</div>
</div>
{/if}
{if $a.lang<>"" or $a.lang2<>""}
<div class="t228__right_langs">
<div class="t228__right_buttons_wrap">
{if $a.lang<>""}<div class="t228__right_langs_lang"><a style="{$menu_lang_style}{if $a.langlink==""}opacity: 0.5;{/if}" href="{$a.langlink}">{$a.lang}</a></div>{/if}
{if $a.lang2<>""}<div class="t228__right_langs_lang"><a style="{$menu_lang_style}{if $a.lang2link==""}opacity: 0.5;{/if}" href="{$a.lang2link}">{$a.lang2}</a></div>{/if}
</div>
</div>
{/if}

             </div>
             {/if}
          </div>
          
          <div class="t228__padding40px"></div>    
  </div>
</div>

{literal}
<style>
@media screen and (max-width: 980px) {
{/literal}{if $a.imgwidth<>""}{literal}
    #rec{/literal}{$a.id}{literal} .t228__leftcontainer {
        padding: 20px;
    }
    #rec{/literal}{$a.id}{literal} .t228__imglogo {
        padding: 20px 0;
    }
{/literal}{/if}{literal}
{/literal}{if $a.color3<>""}{literal}
    #rec{/literal}{$a.id}{literal} .t228__burger span {
        background-color: {/literal}{$a.color3}{literal};
    }
{/literal}{/if}{literal}
{/literal}{if $a.bgcolor3<>""}{literal}
    #rec{/literal}{$a.id}{literal} .t228__mobile {
        background-color: {/literal}{$a.bgcolor3}{literal};
    }
{/literal}{/if}{literal}
{/literal}{if $a.checkbox5<>""}{literal}
    #rec{/literal}{$a.id}{literal} .t228__burger {
        left: 20px;
        right: unset;
    }
    #rec{/literal}{$a.id}{literal} .t228__mobile_text {
        text-align: right;
        right: 20px;
        left: unset;
    }
{/literal}{/if}{literal}
#rec{/literal}{$a.id}{literal} .t228 {
{/literal}{if $a.checkbox6==""}{literal}
    position: static;
{/literal}{else}{literal}
    position: fixed;
    {/literal}{if $a.checkbox1<>""}{literal}
    top: 64px;
    {/literal}{/if}{literal}
{/literal}{/if}{literal}
}
}
</style>

<script>
{/literal}{if $a.menu_align=="" or $a.menu_align=="center"}{literal}
    $(window).load(function() {
        if (typeof t228_setWidth !== "undefined") {
            t228_setWidth('{/literal}{$a.id}{literal}');
        }
    });
{/literal}{/if}{literal}

$(window).resize(function() {
{/literal}{if $a.menu_align=="" or $a.menu_align=="center"}{literal}
    t228_setWidth('{/literal}{$a.id}{literal}');
{/literal}{/if}{literal}
    t228_setBg('{/literal}{$a.id}{literal}');
});

$(document).ready(function() {
{/literal}{if $previewmode=="yes"}{literal}
    t228_highlight();
    {/literal}{if $a.menu_position=="fixed" or $a.menu_position==""}{literal}
        t228_checkAnchorLinks('{/literal}{$a.id}{literal}');
    {/literal}{/if}{literal}
{/literal}{/if}{literal}

    t228__init('{/literal}{$a.id}{literal}');
    t228_setBg('{/literal}{$a.id}{literal}');
    
{/literal}{if $a.menu_align=="" or $a.menu_align=="center"}{literal}
    t228_setWidth('{/literal}{$a.id}{literal}');
{/literal}{/if}{literal}

{/literal}{if $previewmode=="yes" and $a.menu_bgopacity2<>"" and $a.menu_position=="fixed"}{literal}
    t228_changebgopacitymenu('{/literal}{$a.id}{literal}');
    $(window).bind('scroll', t_throttle(function(){t228_changebgopacitymenu('{/literal}{$a.id}{literal}')}));
{/literal}{/if}{literal}

{/literal}{if $previewmode=="yes" and $a.menu_appearoffset<>"" and $a.menu_position=="fixed"}{literal}
    $('#rec{/literal}{$a.id}{literal} .t228').removeClass('t228__beforeready');
    t228_appearMenu('{/literal}{$a.id}{literal}');
    $(window).bind('scroll', t_throttle(function(){t228_appearMenu('{/literal}{$a.id}{literal}')}));
{/literal}{/if}{literal}

{/literal}{if $a.checkbox1<>""}{literal}
    t228_createMobileMenu('{/literal}{$a.id}{literal}');
{/literal}{/if}{literal}
});
</script>

{/literal}{if $a.menu_bgcolor!=""}{literal}
<!--[if IE 8]>
<style>
#rec{/literal}{$a.id}{literal} .t228 {
    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#D9{/literal}{$a.menu_bgcolor|substr:1}{literal}', endColorstr='#D9{/literal}{$a.menu_bgcolor|substr:1}{literal}');
}
</style>
<![endif]-->
{/literal}{/if}{literal}

{/literal}

{include file="tpl_buttons_style.tpl"}
{include file="tpl_menu_style.tpl"}
{include file="tpl_menusub_second_style.tpl"}
