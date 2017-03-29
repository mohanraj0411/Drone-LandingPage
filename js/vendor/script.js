$ = jQuery;
var ua = navigator.userAgent;
var elemWidth = document.documentElement.clientWidth;
var elemHeight = document.documentElement.clientHeight;
var agent = navigator.userAgent.toLowerCase();
var mobileOS = typeof orientation != 'undefined' ? true : false;
var touchOS = ('ontouchstart' in document.documentElement) ? true : false;
var otherBrowser = (agent.indexOf("series60") != -1) || (agent.indexOf("symbian") != -1) || (agent.indexOf("windows ce") != -1) || (agent.indexOf("blackberry") != -1);
var iOS = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) ? true : false;
var isiPad = navigator.userAgent.match(/iPad/i);
var isMobile = navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|BB10|IEMobile|Opera Mini/i);
var isAndroidBased = (agent.indexOf("android") != -1) || (!iOS && !otherBrowser && touchOS && mobileOS) ? true : false;
var isAndroid = /android/.test(ua);
var isAndroidDefault = isAndroid && !(/chrome/i).test(ua);
var scrWidth = screen.width;
var scrHeight = screen.height;
var winHeight = $(window).outerHeight();
var isWindowsPhone = navigator.userAgent.match(/Windows Phone/i);
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
var is_OldBrowser = false;
var player;
var aboveFoldView;
var aboveFoldViewMobi;

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function browserCheckInit() {
    var FF = !(window.mozInnerScreenX == null);
    if (/Edge\/12./i.test(navigator.userAgent)) {
        $('html').addClass('ieEdge');
    }
    if (getInternetExplorerVersion() === 11) {
        $('html').addClass('ie11');
    } else if (getInternetExplorerVersion() === 10) {
        $('html').addClass('ie10');
    } else if (getInternetExplorerVersion() === 9) {
        $('html').addClass('ie9');
    } else if (getInternetExplorerVersion() === 8) {
        $('html').addClass('ie8');
        modalInit('browser');
        is_OldBrowser = true;
    } else if (getInternetExplorerVersion() === 7) {
        $('html').addClass('ie7');
        modalInit('browser');
        is_OldBrowser = true;
    } else if (FF) {
        $('html').addClass('firefox');
    } else if (is_Opera) {
        $('html').addClass('opera');
    } else if (is_safari) {
        $('html').addClass('safari');
    }
}

function smoothy() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
}

$(window).load(function() {
    $('#page-loader').addClass('hidden');
});