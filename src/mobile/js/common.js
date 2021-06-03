$(function () {
    $('header .btn-menu-all').click(function(){
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    moreMenu('#gnb .more-dep1 .dep1');

    // design selectbox
    $(this).find('.nice-select').niceSelect();

    // tab
    uiTab();
    uiRadioTab();
    buttonTab();

    // dropdown
    uiDropdown('.ui-dropdown');

    // accordion
    accordion('.accordion-wrap');
    accordion('.qna-accordion-wrap');
});

// header event
function headerScroll() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('header').outerHeight();

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').addClass('scroll');
        } else if (st > 50) {
            $('header').addClass('scroll');
        } else if (st + $(window).height() < $(document).height() && st < 100) {
            $('header').removeClass('scroll');
        }

        lastScrollTop = st;
    }
}

function gnbSubdepthClick(btn) {
    $(btn).click(function(){
        $('header').addClass('open');
    });
}

function moreMenu(btn) {
    $(btn).click(function(e) {
        var prtLi = $(this).parent('li'),
            openLi = $(this).siblings('.more-dep2');

        e.preventDefault();

        if (prtLi.hasClass('open')) {
            prtLi.removeClass('open');
            openLi.slideUp();
        } else {
            prtLi.addClass('open');
            openLi.slideDown();
        }
    });
}

function gnbOpen() {
    var gnb = $('#gnb .sub-depth'),
        menuBtn = $('header .btn-menu-all');

    setTimeout(function () {
        gnb.addClass('open');
        menuBtn.addClass('open');
    }, 100);
    scrollPrevent(true);
}

function gnbClose() {
    var gnb = $('header .sub-depth'),
        menuBtn = $('header .btn-menu-all');

    gnb.removeClass('open');
    menuBtn.removeClass('open');
    // $('header').find('.mob-dim').remove();
    scrollPrevent(false);
}

function scrollPrevent(prop) {
    if ( prop == true ) {
        $('body').css({'overflow':'hidden'});
    } else {
        $('body').css({'overflow':'initial'});
    }
}

// to top
function toTop(obj) {
    var $btn = $(obj)

    $(window).scroll(function(){
        if ( $(this).scrollTop() > 200 ) {
            $btn.fadeIn(200);
        } else {
            $btn.fadeOut(200);
        }
    });

    $btn.click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
}

// checkbox all check
function allChecker(input) {
    var $input = $(input),
        name = $input.attr('name');

    $input.on('change', function () {
        var $this = $(this);
        if ($this.prop("checked")) {
            $('input[name=' + name + ']').prop("checked", true);
        } else {
            $('input[name=' + name + ']').prop("checked", false);
        }
    });

    $('input[name=' + name + ']').each(function () {
        var $this = $(this);

        $this.on('change', function () {
            var total = $('input[name=' + name + ']').length;
            var chked = $('input[name=' + name + ']:checked').not($input).length + 1;
            if (chked == total) {
                $input.prop("checked", true);
            } else {
                $input.prop("checked", false);
            }
        });
    });
}

// tab
function uiTab() {
    var tab = '[data-evt="tab"]';
    $(document).on('click', tab + ' a', function (e) {
        e.preventDefault();

        var $this = $(this),
            id = $this.attr('href'),
            $target = $('[data-id=' + id + ']'),
            $siblings = $this.parents('li').siblings('').find('a');

        $siblings.each(function () {
            var id = $(this).attr('href');
            $(this).parents('li').removeClass('active');
            $('[data-id=' + id + ']').hide();
        });
        $this.parents('li').addClass('active');
        $target.show();

        return false;
    });
}
function uiRadioTab() {
    var tab = '[data-evt="radio-tab"]';
    $(document).on('click', tab + ' .rdo-wrap', function (e) {
        var $this = $(this),
            input = $(this).find('input'),
            id = $this.attr('id'),
            $target = $('[data-id=' + id + ']'),
            $siblings = $this.parents('li').siblings('').find('.rdo-wrap');

        $siblings.each(function () {
            var id = $(this).attr('id');
            $('[data-id=' + id + ']').hide();
            $(this).find('input').prop('checked', false);
        });
        input.prop('checked', true);
        $target.show();

        return false;
    });
}
function buttonTab() {
    var tab = '[data-evt="button-tab"]';
    $(tab).each(function(){
        var $tab = $(this),
            btn = $tab.find('a');

        btn.on('click', function(e){
            e.preventDefault();

            var $btn = $(this),
                $li = $btn.parent('li'),
                lis = $li.siblings();
            
            lis.removeClass('active');
            $li.addClass('active');
        });
    });
}

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width);
    });
}

// iscroll (2dpeth tab)
function dep2tabScroll(obj) {
    $(window).on('load', function(){
        var $obj = $(obj),
            tabs = $obj.find('.tabs'),
            bp = $(window).outerWidth(true);

        if ( $(obj).length <= 0 ) {
            return
        } else {
            tabs.each(function(){
                var $tabs = $(this),
                    wraps = $tabs.parent('.dep2-scroll'),
                    child = $tabs.children(),
                    childLength = child.length,
                    width = 0,
                    minWidth = childLength * 195;
        
                child.each(function(){
                    width += $(this).outerWidth(true);
                });
                $tabs.css('width', width);

                $(window).resize(function(){
                    var winOw = $(this).outerWidth(true),
                        newWidth = wraps.outerWidth();

                    if ( winOw < 1024 ) { // tablet
                        calcWidth(tabs);
                    } else { // pc
                        if (width < newWidth) {
                            $tabs.width(newWidth);
                        } else {
                            if (minWidth < newWidth) {
                                $tabs.width(newWidth);
                            } else {
                                $tabs.width(minWidth);
                            }
                        }
                    }
                });
            });

            new IScroll(obj , {
                scrollX : true,
                scrollY : false,
                mouseWheel : true
            });
        }
    });
}

// iscroll
function xScroll(obj) {
    $(window).on('load', function(){
        var $obj = $(obj),
            tabs = $obj.find('.tabs');

        if ( $(obj).length <= 0 ) {
            return
        } else {
            calcWidth(tabs);
            $(window).resize(function(){
                calcWidth(tabs);
            });

            $(document).ready(function(){
                new IScroll(obj , {
                    scrollX : true,
                    scrollY : false,
                    mouseWheel : true,
                    autoCenterScroll : true,
                    bounce : false
                });
            });
        }
    });
}

// iScroll (modal vertical scroll)
function verticalScroll(obj) {
    $(window).on('load', function(){
        var $obj = $(obj);

        if ( $(obj).length <= 0 ) {
            return
        } else {
            new IScroll(obj , {
                mouseWheel: true,
                scrollbars: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
		        fadeScrollbars: true
            });
        }
    });
}

// dropdown
function uiDropdown(obj) { 
    function classToggle(target) {
        if ( target.hasClass('open') ) {
            target.removeClass('open');
        } else {
            target.addClass('open');
        }
    }
    // function determineDropDirection(target){
    //     var $target = $(target);
    //     $target.css({
    //         visibility: "hidden",
    //         display: "block"
    //     });
    //     $target.parent().removeClass("dropup");
    
    //     if ($target.offset().top + $target.outerHeight() > $(window).innerHeight() + $(window).scrollTop()){
    //         $target.parent().addClass("dropup");
    //     }
    //     $target.removeAttr("style");
    // }

    var wrap = $(obj),
        ul = wrap.find('ul.lists');
    // ul.each(function(){
    //     var self = $(this);
    //     determineDropDirection(self);
    //     $(window).scroll(function(){
    //         determineDropDirection(self);
    //     });
    // });

    wrap.each(function(){
        var $wrap = $(this);
            btns = $wrap.find('.btn-toggle'),
            lists = $wrap.find('.lists');

        btns.click(function(e){
            e.stopPropagation();
            e.preventDefault();

            classToggle($wrap);
        });
        lists.click(function(e){
            classToggle($wrap);
        });
        $('html').click(function(e){
            if ( !$(e.target).is($wrap) ) {
                $wrap.removeClass('open');
            }
        });
    });

}

// file upload
function fileUpload(obj) {
    var wrap = $(obj),
        fileTarget = wrap.find('input[type=file]');

    fileTarget.on('change', function(){
        if(window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('.file-name').find('input[type=text]').val(filename);
    });
}

// accordion
function accordion(obj) {
    var wrap = $(obj),
        list = wrap.find('li'),
        title = wrap.find('.accord-title');

    // 접근성 대응
    list.each(function(){
        var $btn = $(this).find('.accord-title .tit'),
            $content = $(this).find('.accord-cont'),
            id = $(this).index();

        $btn.attr({
            'id' : 'accord-toggle' + id,
            'aria-controls' : 'accord-cont' + id
        });
        $content.attr({
            'id' : 'accord-cont' + id,
            'role' : 'region',
            'aria-labelledby' : 'accord-toggle' + id
        })
    });

    title.click(function(){
        var li = $(this).parent('li'),
            cont = $(this).siblings('.accord-cont'),
            button = $(this).find('.toggle-btn'),
            openTxt = button.data('open-text'),
            closeTxt = button.data('close-text');

        if (li.hasClass('open')) {
            $(this).attr('aria-expanded', 'false');
            cont.slideUp();
            li.removeClass('open');
            button.find('.toggle-text').text(openTxt);
        } else {
            $(this).attr('aria-expanded', 'true');
            cont.slideDown();
            li.addClass('open');
            button.find('.toggle-text').text(closeTxt);
        }
    });
}

// data sorting
function dataSorting() {
    var tab = '[data-type="sortingTab"]',
        $tab = $(tab),
        btn = $tab.find('a');

    var listWrap = '[data-type="sortingTarget"]',
        $wrap = $(listWrap),
        listAll = $wrap.find('li');

    if($tab.length <= 0) return;

    btn.click(function(e){
        var num = $(this).data('category-num'),
            $target = $('[data-category-id='+num+']');

        e.preventDefault();
        $(this).parent('li').siblings().find('a').removeClass('active');
        $(this).addClass('active');
        listAll.hide();

        var empty = '<li class="empty"><p class="nodata">게시글이 없습니다.</p></li>',
            uls = $wrap.find('.lists');

        if (num === 'all') {
            uls.find('li.empty').remove();
            listAll.show();
        } else {
            if ($target.length <= 0) {
                uls.append(empty);
            } else {
                uls.find('li.empty').remove();
                $target.show();
            }
        }
    });
}

// video modal 
function videoModal(obj) {
    var obj = '[data-control="modal"]',
        $obj = $(obj),
        $target = $('#video'),
        $tit = $target.find('.tit'),
        $desc = $target.find('.desc'),
        $date = $target.find('.date'),
        $src = $target.find('iframe'),
        dim = '<div class="common-dim" aria-hidden="true">&nbsp;</div>';

    $obj.on('click', function(e){
        e.preventDefault();
        var infos = $(this).parents('.items').find('.info'),
            tit = infos.find('.tit').text(),
            desc = infos.find('.desc').text(),
            date = infos.find('.date').html();
            src = infos.find('.src').text();
            option = '?controls=0';

        $tit.text(tit);
        $desc.text(desc);
        $date.html(date);
        $src.attr('src', src+option);

        $target.before(dim);
        $target.show();
    });

    var close = $target.find('.btn-close');

    close.on('click', function(){
        $target.hide();
        $('body').find('.common-dim').remove();

        $tit.text(' ');
        $desc.text(' ');
        $date.html(' ');
        $src.attr('src', ' ');
    });
}

function popupOpen(url, name) {
    var options;
    window.open(url, name, options);
}