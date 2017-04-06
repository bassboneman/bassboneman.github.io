/*!
 * Bootstrap-select v1.6.3 (http://silviomoreto.github.io/bootstrap-select/)
 *
 * Copyright 2013-2014 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
!function(a){"use strict";function b(a,b){return a.toUpperCase().indexOf(b.toUpperCase())>-1}function c(b){var c=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];return a.each(c,function(){b=b.replace(this.re,this.ch)}),b}function d(a){var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c="(?:"+Object.keys(b).join("|")+")",d=new RegExp(c),e=new RegExp(c,"g"),f=null==a?"":""+a;return d.test(f)?f.replace(e,function(a){return b[a]}):f}function e(b,c){var d=arguments,e=b,b=d[0],c=d[1];[].shift.apply(d),"undefined"==typeof b&&(b=e);var g,h=this.each(function(){var e=a(this);if(e.is("select")){var h=e.data("selectpicker"),i="object"==typeof b&&b;if(h){if(i)for(var j in i)i.hasOwnProperty(j)&&(h.options[j]=i[j])}else{var k=a.extend({},f.DEFAULTS,a.fn.selectpicker.defaults||{},e.data(),i);e.data("selectpicker",h=new f(this,k,c))}"string"==typeof b&&(g=h[b]instanceof Function?h[b].apply(h,d):h.options[b])}});return"undefined"!=typeof g?g:h}a.expr[":"].icontains=function(c,d,e){return b(a(c).text(),e[3])},a.expr[":"].aicontains=function(c,d,e){return b(a(c).data("normalizedText")||a(c).text(),e[3])};var f=function(b,c,d){d&&(d.stopPropagation(),d.preventDefault()),this.$element=a(b),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=c,null===this.options.title&&(this.options.title=this.$element.attr("title")),this.val=f.prototype.val,this.render=f.prototype.render,this.refresh=f.prototype.refresh,this.setStyle=f.prototype.setStyle,this.selectAll=f.prototype.selectAll,this.deselectAll=f.prototype.deselectAll,this.destroy=f.prototype.remove,this.remove=f.prototype.remove,this.show=f.prototype.show,this.hide=f.prototype.hide,this.init()};f.VERSION="1.6.3",f.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results match",countSelectedText:function(a){return 1==a?"{0} item selected":"{0} items selected"},maxOptionsText:function(a,b){var c=[];return c[0]=1==a?"Limit reached ({n} item max)":"Limit reached ({n} items max)",c[1]=1==b?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)",c},selectAllText:"Select All",deselectAllText:"Deselect All",multipleSeparator:", ",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyphicon-ok",maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1,searchAccentInsensitive:!1},f.prototype={constructor:f,init:function(){var b=this,c=this.$element.attr("id");this.$element.hide(),this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement),this.$menu=this.$newElement.find("> .dropdown-menu"),this.$button=this.$newElement.find("> button"),this.$searchbox=this.$newElement.find("input"),this.options.dropdownAlignRight&&this.$menu.addClass("dropdown-menu-right"),"undefined"!=typeof c&&(this.$button.attr("data-id",c),a('label[for="'+c+'"]').click(function(a){a.preventDefault(),b.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.liHeight(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile()},createDropdown:function(){var b=this.multiple?" show-tick":"",c=this.$element.parent().hasClass("input-group")?" input-group-btn":"",d=this.autofocus?" autofocus":"",e=this.$element.parents().hasClass("form-group-lg")?" btn-lg":this.$element.parents().hasClass("form-group-sm")?" btn-sm":"",f=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",g=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>':"",h=this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">'+this.options.selectAllText+'</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">'+this.options.deselectAllText+"</button></div></div>":"",i='<div class="btn-group bootstrap-select'+b+c+'"><button type="button" class="btn dropdown-toggle selectpicker'+e+'" data-toggle="dropdown"'+d+'><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">'+f+g+h+'<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';return a(i)},createView:function(){var a=this.createDropdown(),b=this.createLi();return a.find("ul").append(b),a},reloadLi:function(){this.destroyLi();var a=this.createLi();this.$menu.find("ul").append(a)},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var b=this,e=[],f=0,g=function(a,b,c){return"<li"+("undefined"!=typeof c?' class="'+c+'"':"")+("undefined"!=typeof b|null===b?' data-original-index="'+b+'"':"")+">"+a+"</li>"},h=function(a,e,f,g){var h=c(d(a));return'<a tabindex="0"'+("undefined"!=typeof e?' class="'+e+'"':"")+("undefined"!=typeof f?' style="'+f+'"':"")+("undefined"!=typeof g?'data-optgroup="'+g+'"':"")+' data-normalized-text="'+h+'">'+a+'<span class="'+b.options.iconBase+" "+b.options.tickIcon+' check-mark"></span></a>'};return this.$element.find("option").each(function(){var c=a(this),d=c.attr("class")||"",i=c.attr("style"),j=c.data("content")?c.data("content"):c.html(),k="undefined"!=typeof c.data("subtext")?'<small class="muted text-muted">'+c.data("subtext")+"</small>":"",l="undefined"!=typeof c.data("icon")?'<span class="'+b.options.iconBase+" "+c.data("icon")+'"></span> ':"",m=c.is(":disabled")||c.parent().is(":disabled"),n=c[0].index;if(""!==l&&m&&(l="<span>"+l+"</span>"),c.data("content")||(j=l+'<span class="text">'+j+k+"</span>"),!b.options.hideDisabled||!m)if(c.parent().is("optgroup")&&c.data("divider")!==!0){if(0===c.index()){f+=1;var o=c.parent().attr("label"),p="undefined"!=typeof c.parent().data("subtext")?'<small class="muted text-muted">'+c.parent().data("subtext")+"</small>":"",q=c.parent().data("icon")?'<span class="'+b.options.iconBase+" "+c.parent().data("icon")+'"></span> ':"";o=q+'<span class="text">'+o+p+"</span>",0!==n&&e.length>0&&e.push(g("",null,"divider")),e.push(g(o,null,"dropdown-header"))}e.push(g(h(j,"opt "+d,i,f),n))}else e.push(c.data("divider")===!0?g("",n,"divider"):c.data("hidden")===!0?g(h(j,d,i),n,"hide is-hidden"):g(h(j,d,i),n))}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),a(e.join(""))},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(b){var c=this;b!==!1&&this.$element.find("option").each(function(b){c.setDisabled(b,a(this).is(":disabled")||a(this).parent().is(":disabled")),c.setSelected(b,a(this).is(":selected"))}),this.tabIndex();var e=this.options.hideDisabled?":not([disabled])":"",f=this.$element.find("option:selected"+e).map(function(){var b,d=a(this),e=d.data("icon")&&c.options.showIcon?'<i class="'+c.options.iconBase+" "+d.data("icon")+'"></i> ':"";return b=c.options.showSubtext&&d.attr("data-subtext")&&!c.multiple?' <small class="muted text-muted">'+d.data("subtext")+"</small>":"",d.data("content")&&c.options.showContent?d.data("content"):"undefined"!=typeof d.attr("title")?d.attr("title"):e+d.html()+b}).toArray(),g=this.multiple?f.join(this.options.multipleSeparator):f[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var h=this.options.selectedTextFormat.split(">");if(h.length>1&&f.length>h[1]||1==h.length&&f.length>=2){e=this.options.hideDisabled?", [disabled]":"";var i=this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]'+e).length,j="function"==typeof this.options.countSelectedText?this.options.countSelectedText(f.length,i):this.options.countSelectedText;g=j.replace("{0}",f.length.toString()).replace("{1}",i.toString())}}this.options.title=this.$element.attr("title"),"static"==this.options.selectedTextFormat&&(g=this.options.title),g||(g="undefined"!=typeof this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",d(g)),this.$newElement.find(".filter-option").html(g)},setStyle:function(a,b){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi,""));var c=a?a:this.options.style;"add"==b?this.$button.addClass(c):"remove"==b?this.$button.removeClass(c):(this.$button.removeClass(this.options.style),this.$button.addClass(c))},liHeight:function(){if(this.options.size!==!1){var a=this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus",!1).end().appendTo("body"),b=a.addClass("open").find("> .dropdown-menu"),c=b.find("li").not(".divider").not(".dropdown-header").filter(":visible").children("a").outerHeight(),d=this.options.header?b.find(".popover-title").outerHeight():0,e=this.options.liveSearch?b.find(".bs-searchbox").outerHeight():0,f=this.options.actionsBox?b.find(".bs-actionsbox").outerHeight():0;a.remove(),this.$newElement.data("liHeight",c).data("headerHeight",d).data("searchHeight",e).data("actionsHeight",f)}},setSize:function(){this.findLis();var b,c,d,e=this,f=this.$menu,g=f.find(".inner"),h=this.$newElement.outerHeight(),i=this.$newElement.data("liHeight"),j=this.$newElement.data("headerHeight"),k=this.$newElement.data("searchHeight"),l=this.$newElement.data("actionsHeight"),m=this.$lis.filter(".divider").outerHeight(!0),n=parseInt(f.css("padding-top"))+parseInt(f.css("padding-bottom"))+parseInt(f.css("border-top-width"))+parseInt(f.css("border-bottom-width")),o=this.options.hideDisabled?", .disabled":"",p=a(window),q=n+parseInt(f.css("margin-top"))+parseInt(f.css("margin-bottom"))+2,r=function(){c=e.$newElement.offset().top-p.scrollTop(),d=p.height()-c-h};if(r(),this.options.header&&f.css("padding-top",0),"auto"==this.options.size){var s=function(){var a,h=e.$lis.not(".hide");r(),b=d-q,e.options.dropupAuto&&e.$newElement.toggleClass("dropup",c>d&&b-q<f.height()),e.$newElement.hasClass("dropup")&&(b=c-q),a=h.length+h.filter(".dropdown-header").length>3?3*i+q-2:0,f.css({"max-height":b+"px",overflow:"hidden","min-height":a+j+k+l+"px"}),g.css({"max-height":b-j-k-l-n+"px","overflow-y":"auto","min-height":Math.max(a-n,0)+"px"})};s(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",s),a(window).off("resize.getSize").on("resize.getSize",s),a(window).off("scroll.getSize").on("scroll.getSize",s)}else if(this.options.size&&"auto"!=this.options.size&&f.find("li"+o).length>this.options.size){var t=this.$lis.not(".divider"+o).find(" > *").slice(0,this.options.size).last().parent().index(),u=this.$lis.slice(0,t+1).filter(".divider").length;b=i*this.options.size+u*m+n,e.options.dropupAuto&&this.$newElement.toggleClass("dropup",c>d&&b<f.height()),f.css({"max-height":b+j+k+l+"px",overflow:"hidden"}),g.css({"max-height":b-n+"px","overflow-y":"auto"})}},setWidth:function(){if("auto"==this.options.width){this.$menu.css("min-width","0");var a=this.$newElement.clone().appendTo("body"),b=a.find("> .dropdown-menu").css("width"),c=a.css("width","auto").find("> button").css("width");a.remove(),this.$newElement.css("width",Math.max(parseInt(b),parseInt(c))+"px")}else"fit"==this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){var b,c,d=this,e="<div />",f=a(e),g=function(a){f.addClass(a.attr("class").replace(/form-control/gi,"")).toggleClass("dropup",a.hasClass("dropup")),b=a.offset(),c=a.hasClass("dropup")?0:a[0].offsetHeight,f.css({top:b.top+c,left:b.left,width:a[0].offsetWidth,position:"absolute"})};this.$newElement.on("click",function(){d.isDisabled()||(g(a(this)),f.appendTo(d.options.container),f.toggleClass("open",!a(this).hasClass("open")),f.append(d.$menu))}),a(window).resize(function(){g(d.$newElement)}),a(window).on("scroll",function(){g(d.$newElement)}),a("html").on("click",function(b){a(b.target).closest(d.$newElement).length<1&&f.removeClass("open")})},setSelected:function(a,b){this.findLis(),this.$lis.filter('[data-original-index="'+a+'"]').toggleClass("selected",b)},setDisabled:function(a,b){this.findLis(),b?this.$lis.filter('[data-original-index="'+a+'"]').addClass("disabled").find("a").attr("href","#").attr("tabindex",-1):this.$lis.filter('[data-original-index="'+a+'"]').removeClass("disabled").find("a").removeAttr("href").attr("tabindex",0)},isDisabled:function(){return this.$element.is(":disabled")},checkDisabled:function(){var a=this;this.isDisabled()?this.$button.addClass("disabled").attr("tabindex",-1):(this.$button.hasClass("disabled")&&this.$button.removeClass("disabled"),-1==this.$button.attr("tabindex")&&(this.$element.data("tabindex")||this.$button.removeAttr("tabindex"))),this.$button.click(function(){return!a.isDisabled()})},tabIndex:function(){this.$element.is("[tabindex]")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex")))},clickListener:function(){var b=this;this.$newElement.on("touchstart.dropdown",".dropdown-menu",function(a){a.stopPropagation()}),this.$newElement.on("click",function(){b.setSize(),b.options.liveSearch||b.multiple||setTimeout(function(){b.$menu.find(".selected a").focus()},10)}),this.$menu.on("click","li a",function(c){var d=a(this),e=d.parent().data("originalIndex"),f=b.$element.val(),g=b.$element.prop("selectedIndex");if(b.multiple&&c.stopPropagation(),c.preventDefault(),!b.isDisabled()&&!d.parent().hasClass("disabled")){var h=b.$element.find("option"),i=h.eq(e),j=i.prop("selected"),k=i.parent("optgroup"),l=b.options.maxOptions,m=k.data("maxOptions")||!1;if(b.multiple){if(i.prop("selected",!j),b.setSelected(e,!j),d.blur(),l!==!1||m!==!1){var n=l<h.filter(":selected").length,o=m<k.find("option:selected").length;if(l&&n||m&&o)if(l&&1==l)h.prop("selected",!1),i.prop("selected",!0),b.$menu.find(".selected").removeClass("selected"),b.setSelected(e,!0);else if(m&&1==m){k.find("option:selected").prop("selected",!1),i.prop("selected",!0);var p=d.data("optgroup");b.$menu.find(".selected").has('a[data-optgroup="'+p+'"]').removeClass("selected"),b.setSelected(e,!0)}else{var q="function"==typeof b.options.maxOptionsText?b.options.maxOptionsText(l,m):b.options.maxOptionsText,r=q[0].replace("{n}",l),s=q[1].replace("{n}",m),t=a('<div class="notify"></div>');q[2]&&(r=r.replace("{var}",q[2][l>1?0:1]),s=s.replace("{var}",q[2][m>1?0:1])),i.prop("selected",!1),b.$menu.append(t),l&&n&&(t.append(a("<div>"+r+"</div>")),b.$element.trigger("maxReached.bs.select")),m&&o&&(t.append(a("<div>"+s+"</div>")),b.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){b.setSelected(e,!1)},10),t.delay(750).fadeOut(300,function(){a(this).remove()})}}}else h.prop("selected",!1),i.prop("selected",!0),b.$menu.find(".selected").removeClass("selected"),b.setSelected(e,!0);b.multiple?b.options.liveSearch&&b.$searchbox.focus():b.$button.focus(),(f!=b.$element.val()&&b.multiple||g!=b.$element.prop("selectedIndex")&&!b.multiple)&&b.$element.change()}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(a){a.target==this&&(a.preventDefault(),a.stopPropagation(),b.options.liveSearch?b.$searchbox.focus():b.$button.focus())}),this.$menu.on("click","li.divider, li.dropdown-header",function(a){a.preventDefault(),a.stopPropagation(),b.options.liveSearch?b.$searchbox.focus():b.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){b.$button.focus()}),this.$searchbox.on("click",function(a){a.stopPropagation()}),this.$menu.on("click",".actions-btn",function(c){b.options.liveSearch?b.$searchbox.focus():b.$button.focus(),c.preventDefault(),c.stopPropagation(),a(this).is(".bs-select-all")?b.selectAll():b.deselectAll(),b.$element.change()}),this.$element.change(function(){b.render(!1)})},liveSearchListener:function(){var b=this,e=a('<li class="no-results"></li>');this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api",function(){b.$menu.find(".active").removeClass("active"),b.$searchbox.val()&&(b.$searchbox.val(""),b.$lis.not(".is-hidden").removeClass("hide"),e.parent().length&&e.remove()),b.multiple||b.$menu.find(".selected").addClass("active"),setTimeout(function(){b.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api",function(a){a.stopPropagation()}),this.$searchbox.on("input propertychange",function(){b.$searchbox.val()?(b.options.searchAccentInsensitive?b.$lis.not(".is-hidden").removeClass("hide").find("a").not(":aicontains("+c(b.$searchbox.val())+")").parent().addClass("hide"):b.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains("+b.$searchbox.val()+")").parent().addClass("hide"),b.$menu.find("li").filter(":visible:not(.no-results)").length?e.parent().length&&e.remove():(e.parent().length&&e.remove(),e.html(b.options.noneResultsText+' "'+d(b.$searchbox.val())+'"').show(),b.$menu.find("li").last().after(e))):(b.$lis.not(".is-hidden").removeClass("hide"),e.parent().length&&e.remove()),b.$menu.find("li.active").removeClass("active"),b.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(),a(this).focus()})},val:function(a){return"undefined"!=typeof a?(this.$element.val(a),this.render(),this.$element):this.$element.val()},selectAll:function(){this.findLis(),this.$lis.not(".divider").not(".disabled").not(".selected").filter(":visible").find("a").click()},deselectAll:function(){this.findLis(),this.$lis.not(".divider").not(".disabled").filter(".selected").filter(":visible").find("a").click()},keydown:function(b){var d,e,f,g,h,i,j,k,l,m=a(this),n=m.is("input")?m.parent().parent():m.parent(),o=n.data("this"),p={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(o.options.liveSearch&&(n=m.parent().parent()),o.options.container&&(n=o.$menu),d=a("[role=menu] li a",n),l=o.$menu.parent().hasClass("open"),!l&&/([0-9]|[A-z])/.test(String.fromCharCode(b.keyCode))&&(o.options.container?o.$newElement.trigger("click"):(o.setSize(),o.$menu.parent().addClass("open"),l=!0),o.$searchbox.focus()),o.options.liveSearch&&(/(^9$|27)/.test(b.keyCode.toString(10))&&l&&0===o.$menu.find(".active").length&&(b.preventDefault(),o.$menu.parent().removeClass("open"),o.$button.focus()),d=a("[role=menu] li:not(.divider):not(.dropdown-header):visible",n),m.val()||/(38|40)/.test(b.keyCode.toString(10))||0===d.filter(".active").length&&(d=o.$newElement.find("li").filter(o.options.searchAccentInsensitive?":aicontains("+c(p[b.keyCode])+")":":icontains("+p[b.keyCode]+")"))),d.length){if(/(38|40)/.test(b.keyCode.toString(10)))e=d.index(d.filter(":focus")),g=d.parent(":not(.disabled):visible").first().index(),h=d.parent(":not(.disabled):visible").last().index(),f=d.eq(e).parent().nextAll(":not(.disabled):visible").eq(0).index(),i=d.eq(e).parent().prevAll(":not(.disabled):visible").eq(0).index(),j=d.eq(f).parent().prevAll(":not(.disabled):visible").eq(0).index(),o.options.liveSearch&&(d.each(function(b){a(this).is(":not(.disabled)")&&a(this).data("index",b)}),e=d.index(d.filter(".active")),g=d.filter(":not(.disabled):visible").first().data("index"),h=d.filter(":not(.disabled):visible").last().data("index"),f=d.eq(e).nextAll(":not(.disabled):visible").eq(0).data("index"),i=d.eq(e).prevAll(":not(.disabled):visible").eq(0).data("index"),j=d.eq(f).prevAll(":not(.disabled):visible").eq(0).data("index")),k=m.data("prevIndex"),38==b.keyCode&&(o.options.liveSearch&&(e-=1),e!=j&&e>i&&(e=i),g>e&&(e=g),e==k&&(e=h)),40==b.keyCode&&(o.options.liveSearch&&(e+=1),-1==e&&(e=0),e!=j&&f>e&&(e=f),e>h&&(e=h),e==k&&(e=g)),m.data("prevIndex",e),o.options.liveSearch?(b.preventDefault(),m.is(".dropdown-toggle")||(d.removeClass("active"),d.eq(e).addClass("active").find("a").focus(),m.focus())):d.eq(e).focus();else if(!m.is("input")){var q,r,s=[];d.each(function(){a(this).parent().is(":not(.disabled)")&&a.trim(a(this).text().toLowerCase()).substring(0,1)==p[b.keyCode]&&s.push(a(this).parent().index())}),q=a(document).data("keycount"),q++,a(document).data("keycount",q),r=a.trim(a(":focus").text().toLowerCase()).substring(0,1),r!=p[b.keyCode]?(q=1,a(document).data("keycount",q)):q>=s.length&&(a(document).data("keycount",0),q>s.length&&(q=1)),d.eq(s[q-1]).focus()}(/(13|32)/.test(b.keyCode.toString(10))||/(^9$)/.test(b.keyCode.toString(10))&&o.options.selectOnTab)&&l&&(/(32)/.test(b.keyCode.toString(10))||b.preventDefault(),o.options.liveSearch?/(32)/.test(b.keyCode.toString(10))||(o.$menu.find(".active a").click(),m.focus()):a(":focus").click(),a(document).data("keycount",0)),(/(^9$|27)/.test(b.keyCode.toString(10))&&l&&(o.multiple||o.options.liveSearch)||/(27)/.test(b.keyCode.toString(10))&&!l)&&(o.$menu.parent().removeClass("open"),o.$button.focus())}},mobile:function(){this.$element.addClass("mobile-device").appendTo(this.$newElement),this.options.container&&this.$menu.hide()},refresh:function(){this.$lis=null,this.reloadLi(),this.render(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},update:function(){this.reloadLi(),this.setWidth(),this.setStyle(),this.checkDisabled(),this.liHeight()},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()}};var g=a.fn.selectpicker;a.fn.selectpicker=e,a.fn.selectpicker.Constructor=f,a.fn.selectpicker.noConflict=function(){return a.fn.selectpicker=g,this},a(document).data("keycount",0).on("keydown",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input",f.prototype.keydown).on("focusin.modal",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input",function(a){a.stopPropagation()}),a(window).on("load.bs.select.data-api",function(){a(".selectpicker").each(function(){var b=a(this);e.call(b,b.data())})})}(jQuery);
/**
 * Autotab - jQuery plugin 1.9.2
 * https://github.com/Mathachew/jquery-autotab
 * 
 * Copyright (c) 2008, 2015 Matthew Miller
 * 
 * Licensed under the MIT licensing:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function(d){var u=navigator.platform,g=null,r="iPad"===u||"iPhone"===u||"iPod"===u,w="undefined"!==typeof InstallTrigger,x=!window.ActiveXObject&&"ActiveXObject"in window,h=function(a,f){if(null!==f&&"undefined"!==typeof f)for(var b in f)d(a).data("autotab-"+b,f[b])},l=function(a){var f={arrowKey:!1,format:"all",loaded:!1,disabled:!1,pattern:null,uppercase:!1,lowercase:!1,nospace:!1,maxlength:2147483647,target:null,previous:null,trigger:null,originalValue:"",changed:!1,editable:"text"===a.type||
"password"===a.type||"textarea"===a.type||"tel"===a.type||"number"===a.type||"email"===a.type||"search"===a.type||"url"===a.type,filterable:"text"===a.type||"password"===a.type||"textarea"===a.type,tabOnSelect:!1};if(!0===d.autotab.selectFilterByClass&&"undefined"===typeof d(a).data("autotab-format")){var b="all text alpha number numeric alphanumeric hex hexadecimal custom".split(" "),e;for(e in b)if(d(a).hasClass(b[e])){f.format=b[e];break}}for(e in f)"undefined"!==typeof d(a).data("autotab-"+e)&&
(f[e]=d(a).data("autotab-"+e));f.loaded||(null!==f.trigger&&"string"===typeof f.trigger&&(f.trigger=f.trigger.toString()),h(a,f));return f},p=function(a){return"undefined"!==typeof a&&("string"===typeof a||!(a instanceof jQuery))},y=function(a){var d=0,b=0,e=0;if("text"===a.type||"password"===a.type||"textarea"===a.type)"number"===typeof a.selectionStart&&"number"===typeof a.selectionEnd?(d=a.selectionStart,b=a.selectionEnd,e=1):document.selection&&document.selection.createRange&&(b=document.selection.createRange(),
d=a.createTextRange(),a=a.createTextRange(),e=b.getBookmark(),d.moveToBookmark(e),a.setEndPoint("EndToStart",d),d=a.text.length,b=d+b.text.length,e=2);return{start:d,end:b,selectionType:e}};d.autotab=function(a){"object"!==typeof a&&(a={});d(":input").autotab(a)};d.autotab.selectFilterByClass=!1;d.autotab.next=function(){var a=d(document.activeElement);a.length&&a.trigger("autotab-next")};d.autotab.previous=function(){var a=d(document.activeElement);a.length&&a.trigger("autotab-previous")};d.autotab.remove=
function(a){p(a)?d(a).autotab("remove"):d(":input").autotab("remove")};d.autotab.restore=function(a){p(a)?d(a).autotab("restore"):d(":input").autotab("restore")};d.autotab.refresh=function(a){p(a)?d(a).autotab("refresh"):d(":input").autotab("refresh")};d.fn.autotab=function(a,f){if(!this.length)return this;var b=d.grep(this,function(a,c){return"hidden"!=a.type});if("filter"==a){if("string"===typeof f||"function"===typeof f)f={format:f};for(var e=0,m=b.length;e<m;e++){var c=l(b[e]),k=f;k.target=c.target;
k.previous=c.previous;d.extend(c,k);c.loaded?h(b[e],c):(c.disabled=!0,t(b[e],k))}}else if("remove"==a||"destroy"==a||"disable"==a)for(e=0,m=b.length;e<m;e++)c=l(b[e]),c.disabled=!0,h(b[e],c);else if("restore"==a||"enable"==a)for(e=0,m=b.length;e<m;e++)c=l(b[e]),c.disabled=!1,h(b[e],c);else if("refresh"==a)for(e=0,m=b.length;e<m;e++){var c=l(b[e]),n=e+1,q=e-1,k=function(){c.target=0<e&&n<m?b[n]:0<e?null:b[n]},g=function(){c.previous=0<e&&n<m?b[q]:0<e?b[q]:null};if(null===c.target||""===c.target.selector)k();
else if("string"===typeof c.target||c.target.selector)c.target=d("string"===typeof c.target?c.target:c.target.selector),0===c.target.length&&k();if(null===c.previous||""===c.previous.selector)g();else if("string"===typeof c.previous||c.previous.selector)c.previous=d("string"===typeof c.previous?c.previous:c.previous.selector),0===c.previous.length&&g();c.loaded?(p(c.target)&&(c.target=d(c.target)),p(c.previous)&&(c.previous=d(c.previous)),h(b[e],c)):t(b[e],c)}else if(null===a||"undefined"===typeof a?
f={}:"string"===typeof a||"function"===typeof a?f={format:a}:"object"===typeof a&&(f=a),1<b.length)for(e=0,m=b.length;e<m;e++)n=e+1,q=e-1,k=f,0<e&&n<m?(k.target=b[n],k.previous=b[q]):0<e?(k.target=null,k.previous=b[q]):(k.target=b[n],k.previous=null),t(b[e],k);else t(b[0],f);return this};var v=function(a,d,b){if("function"===typeof b.format)return b.format(d,a);a=null;switch(b.format){case "text":a=RegExp("[0-9]+","g");break;case "alpha":a=RegExp("[^a-zA-Z]+","g");break;case "number":case "numeric":a=
RegExp("[^0-9]+","g");break;case "alphanumeric":a=RegExp("[^0-9a-zA-Z]+","g");break;case "hex":case "hexadecimal":a=RegExp("[^0-9A-Fa-f]+","g");break;case "custom":a=new RegExp(b.pattern,"g")}null!==a&&(d=d.replace(a,""));b.nospace&&(a=RegExp("[ ]+","g"),d=d.replace(a,""));b.uppercase&&(d=d.toUpperCase());b.lowercase&&(d=d.toLowerCase());return d},t=function(a,f){var b=l(a);b.disabled&&(b.disabled=!1,b.target=null,b.previous=null);d.extend(b,f);p(b.target)&&(b.target=d(b.target));p(b.previous)&&(b.previous=
d(b.previous));var e=a.maxLength;"undefined"===typeof a.maxLength&&"textarea"==a.type&&(e=a.maxLength=a.getAttribute("maxlength"));2147483647==b.maxlength&&2147483647!=e&&-1!=e?b.maxlength=e:0<b.maxlength?a.maxLength=b.maxlength:b.target=null;if(b.loaded)h(a,b);else{b.loaded=!0;h(a,b);if("select-one"==a.type)d(a).on("change",function(a){l(this).tabOnSelect&&d(this).trigger("autotab-next")});d(a).on("autotab-next",function(a,c){var d=this;setTimeout(function(){c||(c=l(d));var a=c.target;c.disabled||
!a.length||r||(a.prop("disabled")||a.prop("readonly")?a.trigger("autotab-next"):c.arrowKey?a.focus():a.focus().select(),g=new Date)},1)}).on("autotab-previous",function(a,c){var d=this;setTimeout(function(){c||(c=l(d));var a=c.previous;if(!c.disabled&&a.length){var b=a.val();a.prop("disabled")||a.prop("readonly")?a.trigger("autotab-previous"):b.length&&a.data("autotab-editable")&&!c.arrowKey?(x?a.val(b.substring(0,b.length-1)).focus():a.focus().val(b.substring(0,b.length-1)),h(a,{changed:!0})):(c.arrowKey&&
h(this,{arrowKey:!1}),x?a.val(b).focus():a.focus().val(b));g=null}},1)}).on("focus",function(){h(this,{originalValue:this.value})}).on("blur",function(){var a=l(this);a.changed&&this.value!=a.originalValue&&(h(this,{changed:!1}),d(this).change())}).on("keydown.autotab",function(a){var c=l(this);if(!c||c.disabled)return!0;var b=y(this),e=a.which||a.charCode;if(8==e){c.arrowKey=!1;if(!c.editable)return d(this).trigger("autotab-previous",c),!1;h(this,{changed:this.value!==c.originalValue});0===this.value.length&&
d(this).trigger("autotab-previous",c)}else if(9==e&&null!==g)if(a.shiftKey)g=null;else{if(800>(new Date).getTime()-g.getTime())return g=null,!1}else"range"!==this.type&&"select-one"!==this.type&&"select-multiple"!==this.type&&("tel"!==this.type&&"number"!==this.type||("tel"===this.type||"number"===this.type)&&0==this.value.length)&&(37!=e||c.editable&&0!=b.start?39!=e||c.editable&&c.filterable&&b.end!=this.value.length&&0!=this.value.length||(c.arrowKey=!0,d(this).trigger("autotab-next",c)):(c.arrowKey=
!0,d(this).trigger("autotab-previous",c)))}).on("keypress.autotab",function(a){var c=l(this),b=a.which||a.keyCode;if(!c||c.disabled||w&&0===a.charCode||a.ctrlKey||a.altKey||13==b||this.disabled)return!0;a=String.fromCharCode(b);if("text"!=this.type&&"password"!=this.type&&"textarea"!=this.type)return this.value.length+1>=c.maxlength&&(c.arrowKey=!1,d(this).trigger("autotab-next",c)),this.value.length!=c.maxlength;if(null!==c.trigger&&0<=c.trigger.indexOf(a))return null!==g&&800>(new Date).getTime()-
g.getTime()?g=null:(c.arrowKey=!1,d(this).trigger("autotab-next",c)),!1;g=null;b=document.selection&&document.selection.createRange?!0:0<b;a=v(this,a,c);if(b&&(null===a||""===a))return!1;if(b&&this.value.length<=this.maxLength){b=y(this);if(0===b.start&&b.end==this.value.length)this.value=a;else{if(this.value.length==this.maxLength&&b.start===b.end)return c.arrowKey=!1,d(this).trigger("autotab-next",c),!1;this.value=this.value.slice(0,b.start)+a+this.value.slice(b.end)}h(this,{changed:this.value!=
c.originalValue});this.value.length!=c.maxlength&&(b.start++,1==b.selectionType?this.selectionStart=this.selectionEnd=b.start:2==b.selectionType&&(a=this.createTextRange(),a.collapse(!0),a.moveEnd("character",b.start),a.moveStart("character",b.start),a.select()))}this.value.length==c.maxlength&&(c.arrowKey=!1,d(this).trigger("autotab-next",c));return!1}).on("drop paste",function(a){var b=l(this);if(!b)return!0;this.maxLength=2147483647;(function(a,e){setTimeout(function(){var f=-1,g=document.createElement("input");
g.type="hidden";g.value=a.value.toLowerCase();g.originalValue=a.value;a.value=v(a,a.value,e).substr(0,e.maxlength);var h=function(a,b){if(a){var c=l(a);if(d(a).prop("disabled")||d(a).prop("readonly")||!c.editable)d(a).trigger("autotab-next"),r||h(c.target[0],b);else{for(var e=0,k=b.length;e<k;e++)f=g.value.indexOf(b.charAt(e).toLowerCase(),f)+1;e=g.originalValue.substr(f);if(e=v(a,e,c).substr(0,c.maxlength))a.value=e,e.length==c.maxlength&&(c.arrowKey=!1,d(a).trigger("autotab-next",c),w&&setTimeout(function(){a.selectionStart=
a.value.length},1),r||h(c.target[0],e))}}};a.value.length==e.maxlength&&(b.arrowKey=!1,d(a).trigger("autotab-next",b),r||h(e.target[0],a.value.toLowerCase()));a.maxLength=e.maxlength},1)})(this,b)})}};d.fn.autotab_magic=function(a){return d(this).autotab()};d.fn.autotab_filter=function(a){var f={};"string"===typeof a||"function"===typeof a?f.format=a:d.extend(f,a);return d(this).autotab("filter",f)}})(jQuery);

/*!
 * v0.1.5
 * Copyright (c) 2014 First Opinion
 * formatter.js is open sourced under the MIT license.
 *
 * thanks to digitalBush/jquery.maskedinput for some of the trickier
 * keycode handling
 */ 

//
// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
//
// Similar to jqueryPlugin.js but also tries to
// work in a CommonJS environment.
// It is unlikely jQuery will run in a CommonJS
// environment. See jqueryPlugin.js if you do
// not want to add the extra CommonJS detection.
//
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jQuery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jQuery'));
  } else {
    // Browser globals
    factory(root.jQuery);
  }
}(this, function (jQuery) {


/*
 * pattern.js
 *
 * Utilities to parse str pattern and return info
 *
 */
var pattern = function () {
    // Define module
    var pattern = {};
    // Match information
    var DELIM_SIZE = 4;
    // Our regex used to parse
    var regexp = new RegExp('{{([^}]+)}}', 'g');
    //
    // Helper method to parse pattern str
    //
    var getMatches = function (pattern) {
      // Populate array of matches
      var matches = [], match;
      while (match = regexp.exec(pattern)) {
        matches.push(match);
      }
      return matches;
    };
    //
    // Create an object holding all formatted characters
    // with corresponding positions
    //
    pattern.parse = function (pattern) {
      // Our obj to populate
      var info = {
          inpts: {},
          chars: {}
        };
      // Pattern information
      var matches = getMatches(pattern), pLength = pattern.length;
      // Counters
      var mCount = 0, iCount = 0, i = 0;
      // Add inpts, move to end of match, and process
      var processMatch = function (val) {
        var valLength = val.length;
        for (var j = 0; j < valLength; j++) {
          info.inpts[iCount] = val.charAt(j);
          iCount++;
        }
        mCount++;
        i += val.length + DELIM_SIZE - 1;
      };
      // Process match or add chars
      for (i; i < pLength; i++) {
        if (mCount < matches.length && i === matches[mCount].index) {
          processMatch(matches[mCount][1]);
        } else {
          info.chars[i - mCount * DELIM_SIZE] = pattern.charAt(i);
        }
      }
      // Set mLength and return
      info.mLength = i - mCount * DELIM_SIZE;
      return info;
    };
    // Expose
    return pattern;
  }();
/*
 * utils.js
 *
 * Independent helper methods (cross browser, etc..)
 *
 */
var utils = function () {
    // Define module
    var utils = {};
    // Useragent info for keycode handling
    var uAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null;
    //
    // Shallow copy properties from n objects to destObj
    //
    utils.extend = function (destObj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          destObj[key] = arguments[i][key];
        }
      }
      return destObj;
    };
    //
    // Add a given character to a string at a defined pos
    //
    utils.addChars = function (str, chars, pos) {
      return str.substr(0, pos) + chars + str.substr(pos, str.length);
    };
    //
    // Remove a span of characters
    //
    utils.removeChars = function (str, start, end) {
      return str.substr(0, start) + str.substr(end, str.length);
    };
    //
    // Return true/false is num false between bounds
    //
    utils.isBetween = function (num, bounds) {
      bounds.sort(function (a, b) {
        return a - b;
      });
      return num > bounds[0] && num < bounds[1];
    };
    //
    // Helper method for cross browser event listeners
    //
    utils.addListener = function (el, evt, handler) {
      return typeof el.addEventListener !== 'undefined' ? el.addEventListener(evt, handler, false) : el.attachEvent('on' + evt, handler);
    };
    //
    // Helper method for cross browser implementation of preventDefault
    //
    utils.preventDefault = function (evt) {
      return evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
    };
    //
    // Helper method for cross browser implementation for grabbing
    // clipboard data
    //
    utils.getClip = function (evt) {
      if (evt.clipboardData) {
        return evt.clipboardData.getData('Text');
      }
      if (window.clipboardData) {
        return window.clipboardData.getData('Text');
      }
    };
    //
    // Loop over object and checking for matching properties
    //
    utils.getMatchingKey = function (which, keyCode, keys) {
      // Loop over and return if matched.
      for (var k in keys) {
        var key = keys[k];
        if (which === key.which && keyCode === key.keyCode) {
          return k;
        }
      }
    };
    //
    // Returns true/false if k is a del keyDown
    //
    utils.isDelKeyDown = function (which, keyCode) {
      var keys = {
          'backspace': {
            'which': 8,
            'keyCode': 8
          },
          'delete': {
            'which': 46,
            'keyCode': 46
          }
        };
      return utils.getMatchingKey(which, keyCode, keys);
    };
    //
    // Returns true/false if k is a del keyPress
    //
    utils.isDelKeyPress = function (which, keyCode) {
      var keys = {
          'backspace': {
            'which': 8,
            'keyCode': 8,
            'shiftKey': false
          },
          'delete': {
            'which': 0,
            'keyCode': 46
          }
        };
      return utils.getMatchingKey(which, keyCode, keys);
    };
    // //
    // // Determine if keydown relates to specialKey
    // //
    // utils.isSpecialKeyDown = function (which, keyCode) {
    //   var keys = {
    //     'tab': { 'which': 9, 'keyCode': 9 },
    //     'enter': { 'which': 13, 'keyCode': 13 },
    //     'end': { 'which': 35, 'keyCode': 35 },
    //     'home': { 'which': 36, 'keyCode': 36 },
    //     'leftarrow': { 'which': 37, 'keyCode': 37 },
    //     'uparrow': { 'which': 38, 'keyCode': 38 },
    //     'rightarrow': { 'which': 39, 'keyCode': 39 },
    //     'downarrow': { 'which': 40, 'keyCode': 40 },
    //     'F5': { 'which': 116, 'keyCode': 116 }
    //   };
    //   return utils.getMatchingKey(which, keyCode, keys);
    // };
    //
    // Determine if keypress relates to specialKey
    //
    utils.isSpecialKeyPress = function (which, keyCode) {
      var keys = {
          'tab': {
            'which': 0,
            'keyCode': 9
          },
          'enter': {
            'which': 13,
            'keyCode': 13
          },
          'end': {
            'which': 0,
            'keyCode': 35
          },
          'home': {
            'which': 0,
            'keyCode': 36
          },
          'leftarrow': {
            'which': 0,
            'keyCode': 37
          },
          'uparrow': {
            'which': 0,
            'keyCode': 38
          },
          'rightarrow': {
            'which': 0,
            'keyCode': 39
          },
          'downarrow': {
            'which': 0,
            'keyCode': 40
          },
          'F5': {
            'which': 116,
            'keyCode': 116
          }
        };
      return utils.getMatchingKey(which, keyCode, keys);
    };
    //
    // Returns true/false if modifier key is held down
    //
    utils.isModifier = function (evt) {
      return evt.ctrlKey || evt.altKey || evt.metaKey;
    };
    //
    // Iterates over each property of object or array.
    //
    utils.forEach = function (collection, callback, thisArg) {
      if (collection.hasOwnProperty('length')) {
        for (var index = 0, len = collection.length; index < len; index++) {
          if (callback.call(thisArg, collection[index], index, collection) === false) {
            break;
          }
        }
      } else {
        for (var key in collection) {
          if (collection.hasOwnProperty(key)) {
            if (callback.call(thisArg, collection[key], key, collection) === false) {
              break;
            }
          }
        }
      }
    };
    // Expose
    return utils;
  }();
/*
* pattern-matcher.js
*
* Parses a pattern specification and determines appropriate pattern for an
* input string
*
*/
var patternMatcher = function (pattern, utils) {
    //
    // Parse a matcher string into a RegExp. Accepts valid regular
    // expressions and the catchall '*'.
    // @private
    //
    var parseMatcher = function (matcher) {
      if (matcher === '*') {
        return /.*/;
      }
      return new RegExp(matcher);
    };
    //
    // Parse a pattern spec and return a function that returns a pattern
    // based on user input. The first matching pattern will be chosen.
    // Pattern spec format:
    // Array [
    //  Object: { Matcher(RegExp String) : Pattern(Pattern String) },
    //  ...
    // ]
    function patternMatcher(patternSpec) {
      var matchers = [], patterns = [];
      // Iterate over each pattern in order.
      utils.forEach(patternSpec, function (patternMatcher) {
        // Process single property object to obtain pattern and matcher.
        utils.forEach(patternMatcher, function (patternStr, matcherStr) {
          var parsedPattern = pattern.parse(patternStr), regExpMatcher = parseMatcher(matcherStr);
          matchers.push(regExpMatcher);
          patterns.push(parsedPattern);
          // Stop after one iteration.
          return false;
        });
      });
      var getPattern = function (input) {
        var matchedIndex;
        utils.forEach(matchers, function (matcher, index) {
          if (matcher.test(input)) {
            matchedIndex = index;
            return false;
          }
        });
        return matchedIndex === undefined ? null : patterns[matchedIndex];
      };
      return {
        getPattern: getPattern,
        patterns: patterns,
        matchers: matchers
      };
    }
    // Expose
    return patternMatcher;
  }(pattern, utils);
/*
 * inpt-sel.js
 *
 * Cross browser implementation to get and set input selections
 *
 */
var inptSel = function () {
    // Define module
    var inptSel = {};
    //
    // Get begin and end positions of selected input. Return 0's
    // if there is no selectiion data
    //
    inptSel.get = function (el) {
      // If normal browser return with result
      if (typeof el.selectionStart === 'number') {
        return {
          begin: el.selectionStart,
          end: el.selectionEnd
        };
      }
      // Uh-Oh. We must be IE. Fun with TextRange!!
      var range = document.selection.createRange();
      // Determine if there is a selection
      if (range && range.parentElement() === el) {
        var inputRange = el.createTextRange(), endRange = el.createTextRange(), length = el.value.length;
        // Create a working TextRange for the input selection
        inputRange.moveToBookmark(range.getBookmark());
        // Move endRange begin pos to end pos (hence endRange)
        endRange.collapse(false);
        // If we are at the very end of the input, begin and end
        // must both be the length of the el.value
        if (inputRange.compareEndPoints('StartToEnd', endRange) > -1) {
          return {
            begin: length,
            end: length
          };
        }
        // Note: moveStart usually returns the units moved, which 
        // one may think is -length, however, it will stop when it
        // gets to the begin of the range, thus giving us the
        // negative value of the pos.
        return {
          begin: -inputRange.moveStart('character', -length),
          end: -inputRange.moveEnd('character', -length)
        };
      }
      //Return 0's on no selection data
      return {
        begin: 0,
        end: 0
      };
    };
    //
    // Set the caret position at a specified location
    //
    inptSel.set = function (el, pos) {
      // Normalize pos
      if (typeof pos !== 'object') {
        pos = {
          begin: pos,
          end: pos
        };
      }
      // If normal browser
      if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(pos.begin, pos.end);
      } else if (el.createTextRange) {
        var range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos.end);
        range.moveStart('character', pos.begin);
        range.select();
      }
    };
    // Expose
    return inptSel;
  }();
/*
 * formatter.js
 *
 * Class used to format input based on passed pattern
 *
 */
var formatter = function (patternMatcher, inptSel, utils) {
    // Defaults
    var defaults = {
        persistent: false,
        repeat: false,
        placeholder: ' '
      };
    // Regexs for input validation
    var inptRegs = {
        '9': /[0-9]/,
        'a': /[A-Za-z]/,
        '*': /[A-Za-z0-9]/
      };
    //
    // Class Constructor - Called with new Formatter(el, opts)
    // Responsible for setting up required instance variables, and
    // attaching the event listener to the element.
    //
    function Formatter(el, opts) {
      // Cache this
      var self = this;
      // Make sure we have an element. Make accesible to instance
      self.el = el;
      if (!self.el) {
        throw new TypeError('Must provide an existing element');
      }
      // Merge opts with defaults
      self.opts = utils.extend({}, defaults, opts);
      // 1 pattern is special case
      if (typeof self.opts.pattern !== 'undefined') {
        self.opts.patterns = self._specFromSinglePattern(self.opts.pattern);
        delete self.opts.pattern;
      }
      // Make sure we have valid opts
      if (typeof self.opts.patterns === 'undefined') {
        throw new TypeError('Must provide a pattern or array of patterns');
      }
      self.patternMatcher = patternMatcher(self.opts.patterns);
      // Upate pattern with initial value
      self._updatePattern();
      // Init values
      self.hldrs = {};
      self.focus = 0;
      // Add Listeners
      utils.addListener(self.el, 'keydown', function (evt) {
        self._keyDown(evt);
      });
      utils.addListener(self.el, 'keypress', function (evt) {
        self._keyPress(evt);
      });
      utils.addListener(self.el, 'paste', function (evt) {
        self._paste(evt);
      });
      // Persistence
      if (self.opts.persistent) {
        // Format on start
        self._processKey('', false);
        self.el.blur();
        // Add Listeners
        utils.addListener(self.el, 'focus', function (evt) {
          self._focus(evt);
        });
        utils.addListener(self.el, 'click', function (evt) {
          self._focus(evt);
        });
        utils.addListener(self.el, 'touchstart', function (evt) {
          self._focus(evt);
        });
      }
    }
    //
    // @public
    // Add new char
    //
    Formatter.addInptType = function (chr, reg) {
      inptRegs[chr] = reg;
    };
    //
    // @public
    // Apply the given pattern to the current input without moving caret.
    //
    Formatter.prototype.resetPattern = function (str) {
      // Update opts to hold new pattern
      this.opts.patterns = str ? this._specFromSinglePattern(str) : this.opts.patterns;
      // Get current state
      this.sel = inptSel.get(this.el);
      this.val = this.el.value;
      // Init values
      this.delta = 0;
      // Remove all formatted chars from val
      this._removeChars();
      this.patternMatcher = patternMatcher(this.opts.patterns);
      // Update pattern
      var newPattern = this.patternMatcher.getPattern(this.val);
      this.mLength = newPattern.mLength;
      this.chars = newPattern.chars;
      this.inpts = newPattern.inpts;
      // Format on start
      this._processKey('', false, true);
    };
    //
    // @private
    // Determine correct format pattern based on input val
    //
    Formatter.prototype._updatePattern = function () {
      // Determine appropriate pattern
      var newPattern = this.patternMatcher.getPattern(this.val);
      // Only update the pattern if there is an appropriate pattern for the value.
      // Otherwise, leave the current pattern (and likely delete the latest character.)
      if (newPattern) {
        // Get info about the given pattern
        this.mLength = newPattern.mLength;
        this.chars = newPattern.chars;
        this.inpts = newPattern.inpts;
      }
    };
    //
    // @private
    // Handler called on all keyDown strokes. All keys trigger
    // this handler. Only process delete keys.
    //
    Formatter.prototype._keyDown = function (evt) {
      // The first thing we need is the character code
      var k = evt.which || evt.keyCode;
      // If delete key
      if (k && utils.isDelKeyDown(evt.which, evt.keyCode)) {
        // Process the keyCode and prevent default
        this._processKey(null, k);
        return utils.preventDefault(evt);
      }
    };
    //
    // @private
    // Handler called on all keyPress strokes. Only processes
    // character keys (as long as no modifier key is in use).
    //
    Formatter.prototype._keyPress = function (evt) {
      // The first thing we need is the character code
      var k, isSpecial;
      // Mozilla will trigger on special keys and assign the the value 0
      // We want to use that 0 rather than the keyCode it assigns.
      k = evt.which || evt.keyCode;
      isSpecial = utils.isSpecialKeyPress(evt.which, evt.keyCode);
      // Process the keyCode and prevent default
      if (!utils.isDelKeyPress(evt.which, evt.keyCode) && !isSpecial && !utils.isModifier(evt)) {
        this._processKey(String.fromCharCode(k), false);
        return utils.preventDefault(evt);
      }
    };
    //
    // @private
    // Handler called on paste event.
    //
    Formatter.prototype._paste = function (evt) {
      // Process the clipboard paste and prevent default
      this._processKey(utils.getClip(evt), false);
      return utils.preventDefault(evt);
    };
    //
    // @private
    // Handle called on focus event.
    //
    Formatter.prototype._focus = function () {
      // Wrapped in timeout so that we can grab input selection
      var self = this;
      setTimeout(function () {
        // Grab selection
        var selection = inptSel.get(self.el);
        // Char check
        var isAfterStart = selection.end > self.focus, isFirstChar = selection.end === 0;
        // If clicked in front of start, refocus to start
        if (isAfterStart || isFirstChar) {
          inptSel.set(self.el, self.focus);
        }
      }, 0);
    };
    //
    // @private
    // Using the provided key information, alter el value.
    //
    Formatter.prototype._processKey = function (chars, delKey, ignoreCaret) {
      // Get current state
      this.sel = inptSel.get(this.el);
      this.val = this.el.value;
      // Init values
      this.delta = 0;
      // If chars were highlighted, we need to remove them
      if (this.sel.begin !== this.sel.end) {
        this.delta = -1 * Math.abs(this.sel.begin - this.sel.end);
        this.val = utils.removeChars(this.val, this.sel.begin, this.sel.end);
      } else if (delKey && delKey === 46) {
        this._delete();
      } else if (delKey && this.sel.begin - 1 >= 0) {
        // Always have a delta of at least -1 for the character being deleted.
        this.val = utils.removeChars(this.val, this.sel.end - 1, this.sel.end);
        this.delta -= 1;
      } else if (delKey) {
        return true;
      }
      // If the key is not a del key, it should convert to a str
      if (!delKey) {
        // Add char at position and increment delta
        this.val = utils.addChars(this.val, chars, this.sel.begin);
        this.delta += chars.length;
      }
      // Format el.value (also handles updating caret position)
      this._formatValue(ignoreCaret);
    };
    //
    // @private
    // Deletes the character in front of it
    //
    Formatter.prototype._delete = function () {
      // Adjust focus to make sure its not on a formatted char
      while (this.chars[this.sel.begin]) {
        this._nextPos();
      }
      // As long as we are not at the end
      if (this.sel.begin < this.val.length) {
        // We will simulate a delete by moving the caret to the next char
        // and then deleting
        this._nextPos();
        this.val = utils.removeChars(this.val, this.sel.end - 1, this.sel.end);
        this.delta = -1;
      }
    };
    //
    // @private
    // Quick helper method to move the caret to the next pos
    //
    Formatter.prototype._nextPos = function () {
      this.sel.end++;
      this.sel.begin++;
    };
    //
    // @private
    // Alter element value to display characters matching the provided
    // instance pattern. Also responsible for updating
    //
    Formatter.prototype._formatValue = function (ignoreCaret) {
      // Set caret pos
      this.newPos = this.sel.end + this.delta;
      // Remove all formatted chars from val
      this._removeChars();
      // Switch to first matching pattern based on val
      this._updatePattern();
      // Validate inputs
      this._validateInpts();
      // Add formatted characters
      this._addChars();
      // Set value and adhere to maxLength
      this.el.value = this.val.substr(0, this.mLength);
      // Set new caret position
      if (typeof ignoreCaret === 'undefined' || ignoreCaret === false) {
        inptSel.set(this.el, this.newPos);
      }
    };
    //
    // @private
    // Remove all formatted before and after a specified pos
    //
    Formatter.prototype._removeChars = function () {
      // Delta shouldn't include placeholders
      if (this.sel.end > this.focus) {
        this.delta += this.sel.end - this.focus;
      }
      // Account for shifts during removal
      var shift = 0;
      // Loop through all possible char positions
      for (var i = 0; i <= this.mLength; i++) {
        // Get transformed position
        var curChar = this.chars[i], curHldr = this.hldrs[i], pos = i + shift, val;
        // If after selection we need to account for delta
        pos = i >= this.sel.begin ? pos + this.delta : pos;
        val = this.val.charAt(pos);
        // Remove char and account for shift
        if (curChar && curChar === val || curHldr && curHldr === val) {
          this.val = utils.removeChars(this.val, pos, pos + 1);
          shift--;
        }
      }
      // All hldrs should be removed now
      this.hldrs = {};
      // Set focus to last character
      this.focus = this.val.length;
    };
    //
    // @private
    // Make sure all inpts are valid, else remove and update delta
    //
    Formatter.prototype._validateInpts = function () {
      // Loop over each char and validate
      for (var i = 0; i < this.val.length; i++) {
        // Get char inpt type
        var inptType = this.inpts[i];
        // Checks
        var isBadType = !inptRegs[inptType], isInvalid = !isBadType && !inptRegs[inptType].test(this.val.charAt(i)), inBounds = this.inpts[i];
        // Remove if incorrect and inbounds
        if ((isBadType || isInvalid) && inBounds) {
          this.val = utils.removeChars(this.val, i, i + 1);
          this.focusStart--;
          this.newPos--;
          this.delta--;
          i--;
        }
      }
    };
    //
    // @private
    // Loop over val and add formatted chars as necessary
    //
    Formatter.prototype._addChars = function () {
      if (this.opts.persistent) {
        // Loop over all possible characters
        for (var i = 0; i <= this.mLength; i++) {
          if (!this.val.charAt(i)) {
            // Add placeholder at pos
            this.val = utils.addChars(this.val, this.opts.placeholder, i);
            this.hldrs[i] = this.opts.placeholder;
          }
          this._addChar(i);
        }
        // Adjust focus to make sure its not on a formatted char
        while (this.chars[this.focus]) {
          this.focus++;
        }
      } else {
        // Avoid caching val.length, as they may change in _addChar.
        for (var j = 0; j <= this.val.length; j++) {
          // When moving backwards there are some race conditions where we
          // dont want to add the character
          if (this.delta <= 0 && j === this.focus) {
            return true;
          }
          // Place character in current position of the formatted string.
          this._addChar(j);
        }
      }
    };
    //
    // @private
    // Add formattted char at position
    //
    Formatter.prototype._addChar = function (i) {
      // If char exists at position
      var chr = this.chars[i];
      if (!chr) {
        return true;
      }
      // If chars are added in between the old pos and new pos
      // we need to increment pos and delta
      if (utils.isBetween(i, [
          this.sel.begin - 1,
          this.newPos + 1
        ])) {
        this.newPos++;
        this.delta++;
      }
      // If character added before focus, incr
      if (i <= this.focus) {
        this.focus++;
      }
      // Updateholder
      if (this.hldrs[i]) {
        delete this.hldrs[i];
        this.hldrs[i + 1] = this.opts.placeholder;
      }
      // Update value
      this.val = utils.addChars(this.val, chr, i);
    };
    //
    // @private
    // Create a patternSpec for passing into patternMatcher that
    // has exactly one catch all pattern.
    //
    Formatter.prototype._specFromSinglePattern = function (patternStr) {
      return [{ '*': patternStr }];
    };
    // Expose
    return Formatter;
  }(patternMatcher, inptSel, utils);



// A really lightweight plugin wrapper around the constructor,
// preventing against multiple instantiations
var pluginName = 'formatter';

$.fn[pluginName] = function (options) {

  // Initiate plugin if options passed
  if (typeof options == 'object') {
    this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new formatter(this, options));
      }
    });
  }

  // Add resetPattern method to plugin
  this.resetPattern = function (str) {
    this.each(function () {
      var formatted = $.data(this, 'plugin_' + pluginName);
      // resetPattern for instance
      if (formatted) { formatted.resetPattern(str); }
    });
    // Chainable please
    return this;
  };

  // Chainable please
  return this;
};

$.fn[pluginName].addInptType = function (chr, regexp) {
  formatter.addInptType(chr, regexp);
};


}));
/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
// only includes touch
(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,n,r){function T(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function N(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=T(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function C(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function k(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function L(){g=!1}function A(){g=!0}function O(){E=0,v.length=0,m=!1,A()}function M(){L()}function _(){D(),c=setTimeout(function(){c=0,O()},e.vmouse.resetTimerDuration)}function D(){c&&(clearTimeout(c),c=0)}function P(t,n,r){var i;if(r&&r[t]||!r&&k(n.target,t))i=N(n,t),e(n.target).trigger(i);return i}function H(t){var n=e.data(t.target,s),r;!m&&(!E||E!==n)&&(r=P("v"+t.type,t),r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function B(t){var n=T(t).touches,r,i,o;n&&n.length===1&&(r=t.target,i=C(r),i.hasVirtualBinding&&(E=w++,e.data(r,s,E),D(),M(),d=!1,o=T(t).touches[0],h=o.pageX,p=o.pageY,P("vmouseover",t,i),P("vmousedown",t,i)))}function j(e){if(g)return;d||P("vmousecancel",e,C(e.target)),d=!0,_()}function F(t){if(g)return;var n=T(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=C(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&P("vmousecancel",t,s),P("vmousemove",t,s),_()}function I(e){if(g)return;A();var t=C(e.target),n,r;P("vmouseup",e,t),d||(n=P("vclick",e,t),n&&n.isDefaultPrevented()&&(r=T(e).changedTouches[0],v.push({touchID:E,x:r.clientX,y:r.clientY}),m=!0)),P("vmouseout",e,t),d=!1,_()}function q(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function R(){}function U(t){var n=t.substr(1);return{setup:function(){q(this)||e.data(this,i,{});var r=e.data(this,i);r[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,H),e(this).bind(n,R),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",B).bind("touchend",I).bind("touchmove",F).bind("scroll",j))},teardown:function(){--l[t],l[t]||b.unbind(n,H),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",B).unbind("touchmove",F).unbind("touchend",I).unbind("scroll",j));var r=e(this),s=e.data(this,i);s&&(s[t]=!1),r.unbind(n,R),q(this)||r.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S,x;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(x=0;x<o.length;x++)e.event.special[o[x]]=U(o[x]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)})(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,i,s){var o=i.type;i.type=n,s?e.event.trigger(i,r,t):e.event.dispatch.call(t,i),i.type=o}var i=e(n),s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})},teardown:function(){e(this).unbind(o)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),r=!1;n.bind("vmousedown",function(s){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),!r&&o===e.target?l(t,"tap",e):r&&e.preventDefault()}r=!1;if(s.which&&s.which!==1)return!1;var o=s.target,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(r=!0),l(t,"taphold",e.Event("taphold",{target:o}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),i.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,r=t.pageYOffset,i=e.clientX,s=e.clientY;if(e.pageY===0&&Math.floor(s)>Math.floor(e.pageY)||e.pageX===0&&Math.floor(i)>Math.floor(e.pageX))i-=n,s-=r;else if(s<e.pageY-r||i<e.pageX-n)i=e.pageX-n,s=e.pageY-r;return{x:i,y:s}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y]}},handleSwipe:function(t,n,r,i){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return l(r,"swipe",e.Event("swipe",{target:i,swipestart:t,swipestop:n}),!0),l(r,s,e.Event(s,{target:i,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,r=e(n),s={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=s,s.start=function(t){if(e.event.special.swipe.eventInProgress)return;e.event.special.swipe.eventInProgress=!0;var r,o=e.event.special.swipe.start(t),u=t.target,l=!1;s.move=function(t){if(!o||t.isDefaultPrevented())return;r=e.event.special.swipe.stop(t),l||(l=e.event.special.swipe.handleSwipe(o,r,n,u),l&&(e.event.special.swipe.eventInProgress=!1)),Math.abs(o.coords[0]-r.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()},s.stop=function(){l=!0,e.event.special.swipe.eventInProgress=!1,i.off(f,s.move),s.move=null},i.on(f,s.move).one(a,s.stop)},r.on(u,s.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,t.length--,t.length===0&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(u,n.start),n.move&&i.off(f,n.move),n.stop&&i.off(a,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this)});
/*!
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.5
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

;(function ( $, window, document, undefined ) {

  /* Defaults
  ================================================== */
  var pluginName = 'sharrre',
  defaults = {
    className: 'sharrre',
    share: {
      googlePlus: false,
      facebook: false,
      twitter: false,
      digg: false,
      delicious: false,
      stumbleupon: false,
      linkedin: false,
      pinterest: false
    },
    shareTotal: 0,
    template: '',
    title: '',
    url: document.location.href,
    text: document.title,
    // urlCurl: 'sharrre.php',  //PHP script for google plus...
    count: {}, //counter by social network
    total: 0,  //total of sharing
    shorterTotal: true, //show total by k or M when number is to big
    enableHover: true, //disable if you want to personalize hover event with callback
    enableCounter: true, //disable if you just want use buttons
    enableTracking: false, //tracking with google analitycs
    hover: function(){}, //personalize hover event with this callback function
    hide: function(){}, //personalize hide event with this callback function
    click: function(){}, //personalize click event with this callback function
    render: function(){}, //personalize render event with this callback function
    buttons: {  //settings for buttons
      googlePlus : {  //http://www.google.com/webmasters/+1/button/
        url: '',  //if you need to personnalize button url
        urlCount: false,  //if you want to use personnalize button url on global counter
        size: 'medium',
        lang: 'en-US',
        annotation: ''
      },
      facebook: { //http://developers.facebook.com/docs/reference/plugins/like/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        action: 'like',
        layout: 'button_count',
        width: '',
        send: 'false',
        faces: 'false',
        colorscheme: '',
        font: '',
        lang: 'en_US'
      },
      twitter: {  //http://twitter.com/about/resources/tweetbutton
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        count: 'horizontal',
        hashtags: '',
        via: '',
        related: '',
        lang: 'en'
      },
      digg: { //http://about.digg.com/downloads/button/smart
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        type: 'DiggCompact'
      },
      delicious: {
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        size: 'medium' //medium or tall
      },
      stumbleupon: {  //http://www.stumbleupon.com/badges/
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        layout: '1'
      },
      linkedin: {  //http://developer.linkedin.com/plugins/share-button
        url: '',  //if you need to personalize url button
        urlCount: false,  //if you want to use personnalize button url on global counter
        counter: ''
      },
      pinterest: { //http://pinterest.com/about/goodies/
        url: '',  //if you need to personalize url button
        media: '',
        description: '',
        layout: 'horizontal'
      }
    }
  },
  /* Json URL to get count number
  ================================================== */
  urlJson = {
    googlePlus: "",

	//new FQL method by Sire
	facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
    //old method facebook: "http://graph.facebook.com/?id={url}&callback=?",
    //facebook : "http://api.ak.facebook.com/restserver.php?v=1.0&method=links.getStats&urls={url}&format=json"
    // Old twitter count api endpoint.
    //twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
    // Now using http://opensharecount.com/
    twitter: "http://opensharecount.com/count.json?url={url}",
    digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
    delicious: 'http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?',
    //stumbleupon: "http://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}&format=jsonp&callback=?",
    stumbleupon: "",
    linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
    pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"
  },
  /* Load share buttons asynchronously
  ================================================== */
  loadButton = {
    googlePlus : function(self){
      var sett = self.options.buttons.googlePlus;
      //$(self.element).find('.buttons').append('<div class="button googleplus"><g:plusone size="'+self.options.buttons.googlePlus.size+'" href="'+self.options.url+'"></g:plusone></div>');
      $(self.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="'+sett.size+'" data-href="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-annotation="'+sett.annotation+'"></div></div>');
      window.___gcfg = {
        lang: self.options.buttons.googlePlus.lang
      };
      var loading = 0;
      if(typeof gapi === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          po.src = '//apis.google.com/js/plusone.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
      else{
        gapi.plusone.go();
      }
    },
    facebook : function(self){
      var sett = self.options.buttons.facebook;
      $(self.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-send="'+sett.send+'" data-layout="'+sett.layout+'" data-width="'+sett.width+'" data-show-faces="'+sett.faces+'" data-action="'+sett.action+'" data-colorscheme="'+sett.colorscheme+'" data-font="'+sett.font+'" data-via="'+sett.via+'"></div></div>');
      var loading = 0;
      if(typeof FB === 'undefined' && loading == 0){
        loading = 1;
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = '//connect.facebook.net/'+sett.lang+'/all.js#xfbml=1';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
      else{
        FB.XFBML.parse();
      }
    },
    twitter : function(self){
      var sett = self.options.buttons.twitter;
      $(self.element).find('.buttons').append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-count="'+sett.count+'" data-text="'+self.options.text+'" data-via="'+sett.via+'" data-hashtags="'+sett.hashtags+'" data-related="'+sett.related+'" data-lang="'+sett.lang+'">Tweet</a></div>');
      var loading = 0;
      if(typeof twttr === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var twitterScriptTag = document.createElement('script');
          twitterScriptTag.type = 'text/javascript';
          twitterScriptTag.async = true;
          twitterScriptTag.src = '//platform.twitter.com/widgets.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(twitterScriptTag, s);
        })();
      }
      else{
        $.ajax({ url: '//platform.twitter.com/widgets.js', dataType: 'script', cache:true}); //http://stackoverflow.com/q/6536108
      }
    },
    digg : function(self){
      var sett = self.options.buttons.digg;
      $(self.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton '+sett.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((sett.url !== '' ? sett.url : self.options.url))+'"></a></div>');
      var loading = 0;
      if(typeof __DBW === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var s = document.createElement('SCRIPT'), s1 = document.getElementsByTagName('SCRIPT')[0];
          s.type = 'text/javascript';
          s.async = true;
          s.src = '//widgets.digg.com/buttons.js';
          s1.parentNode.insertBefore(s, s1);
        })();
      }
    },
    delicious : function(self){
      if(self.options.buttons.delicious.size == 'tall'){//tall
        var css = 'width:50px;',
        cssCount = 'height:35px;width:50px;font-size:15px;line-height:35px;',
        cssShare = 'height:18px;line-height:18px;margin-top:3px;';
      }
      else{//medium
        var css = 'width:93px;',
        cssCount = 'float:right;padding:0 3px;height:20px;width:26px;line-height:20px;',
        cssShare = 'float:left;height:20px;line-height:20px;';
      }
      var count = self.shorterTotal(self.options.count.delicious);
      if(typeof count === "undefined"){
        count = 0;
      }
      $(self.element).find('.buttons').append(
      '<div class="button delicious"><div style="'+css+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;">'+
      '<div style="'+cssCount+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+count+'</div>'+
      '<div style="'+cssShare+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;">'+
      '<img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');

      $(self.element).find('.delicious').on('click', function(){
        self.openPopup('delicious');
      });
    },
    stumbleupon : function(self){
      var sett = self.options.buttons.stumbleupon;
      $(self.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="'+sett.layout+'" location="'+(sett.url !== '' ? sett.url : self.options.url)+'"></su:badge></div>');
      var loading = 0;
      if(typeof STMBLPN === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
          li.src = '//platform.stumbleupon.com/1/widgets.js';
          var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
        })();
        s = window.setTimeout(function(){
          if(typeof STMBLPN !== 'undefined'){
            STMBLPN.processWidgets();
            clearInterval(s);
          }
        },500);
      }
      else{
        STMBLPN.processWidgets();
      }
    },
    linkedin : function(self){
      var sett = self.options.buttons.linkedin;
      $(self.element).find('.buttons').append('<div class="button linkedin"><script type="in/share" data-url="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-counter="'+sett.counter+'"></script></div>');
      var loading = 0;
      if(typeof window.IN === 'undefined' && loading == 0){
        loading = 1;
        (function() {
          var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
          li.src = '//platform.linkedin.com/in.js';
          var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
        })();
      }
      else{
        window.IN.init();
      }
    },
    pinterest : function(self){
      var sett = self.options.buttons.pinterest;
      $(self.element).find('.buttons').append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(sett.url !== '' ? sett.url : self.options.url)+'&media='+sett.media+'&description='+sett.description+'" class="pin-it-button" count-layout="'+sett.layout+'">Pin It</a></div>');

      (function() {
        var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
        li.src = '//assets.pinterest.com/js/pinit.js';
        var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
      })();
    }
  },
  /* Tracking for Google Analytics
  ================================================== */
  tracking = {
    googlePlus: function(){},
    facebook: function(){
      //console.log('facebook');
      fb = window.setInterval(function(){
        if (typeof FB !== 'undefined') {
          FB.Event.subscribe('edge.create', function(targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
          });
          FB.Event.subscribe('edge.remove', function(targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
          });
          FB.Event.subscribe('message.send', function(targetUrl) {
            _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
          });
          //console.log('ok');
          clearInterval(fb);
        }
      },1000);
    },
    twitter: function(){
      //console.log('twitter');
      tw = window.setInterval(function(){
        if (typeof twttr !== 'undefined') {
          twttr.events.bind('tweet', function(event) {
            if (event) {
              _gaq.push(['_trackSocial', 'twitter', 'tweet']);
            }
          });
          //console.log('ok');
          clearInterval(tw);
        }
      },1000);
    },
    digg: function(){
      //if somenone find a solution, mail me !
      /*$(this.element).find('.digg').on('click', function(){
        _gaq.push(['_trackSocial', 'digg', 'add']);
      });*/
    },
    delicious: function(){},
    stumbleupon: function(){},
    linkedin: function(){
      function LinkedInShare() {
        _gaq.push(['_trackSocial', 'linkedin', 'share']);
      }
    },
    pinterest: function(){
      //if somenone find a solution, mail me !
    }
  },
  /* Popup for each social network
  ================================================== */
  popup = {
    googlePlus: function(opt){
      window.open("https://plus.google.com/share?hl="+opt.buttons.googlePlus.lang+"&url="+encodeURIComponent((opt.buttons.googlePlus.url !== '' ? opt.buttons.googlePlus.url : opt.url)), "", "toolbar=0, status=0, width=900, height=500");
    },
    facebook: function(opt){
      window.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((opt.buttons.facebook.url !== '' ? opt.buttons.facebook.url : opt.url))+"&t="+opt.text+"", "", "toolbar=0, status=0, width=900, height=500");
    },
    twitter: function(opt){
      window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(opt.text)+"&url="+encodeURIComponent((opt.buttons.twitter.url !== '' ? opt.buttons.twitter.url : opt.url))+(opt.buttons.twitter.via !== '' ? '&via='+opt.buttons.twitter.via : ''), "", "toolbar=0, status=0, width=650, height=360");
    },
    digg: function(opt){
      window.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((opt.buttons.digg.url !== '' ? opt.buttons.digg.url : opt.url))+"&title="+opt.text+"&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360");
    },
    delicious: function(opt){
      window.open('http://www.delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent((opt.buttons.delicious.url !== '' ? opt.buttons.delicious.url : opt.url))+'&title='+opt.text, 'delicious', 'toolbar=no,width=550,height=550');
    },
    stumbleupon: function(opt){
      window.open('http://www.stumbleupon.com/badge/?url='+encodeURIComponent((opt.buttons.stumbleupon.url !== '' ? opt.buttons.stumbleupon.url : opt.url)), 'stumbleupon', 'toolbar=no,width=550,height=550');
    },
    linkedin: function(opt){
      window.open('https://www.linkedin.com/cws/share?url='+encodeURIComponent((opt.buttons.linkedin.url !== '' ? opt.buttons.linkedin.url : opt.url))+'&token=&isFramed=true', 'linkedin', 'toolbar=no,width=550,height=550');
    },
    pinterest: function(opt){
      window.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent((opt.buttons.pinterest.url !== '' ? opt.buttons.pinterest.url : opt.url))+'&media='+encodeURIComponent(opt.buttons.pinterest.media)+'&description='+opt.buttons.pinterest.description, 'pinterest', 'toolbar=no,width=700,height=300');
    }
  };

  /* Plugin constructor
  ================================================== */
  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( true, {}, defaults, options);
    this.options.share = options.share; //simple solution to allow order of buttons

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  };

  /* Initialization method
  ================================================== */
  Plugin.prototype.init = function () {
    var self = this;
    if(this.options.urlCurl !== ''){
      urlJson.googlePlus = this.options.urlCurl + '?url={url}&type=googlePlus'; // PHP script for GooglePlus...
      urlJson.stumbleupon = this.options.urlCurl + '?url={url}&type=stumbleupon'; // PHP script for Stumbleupon...
    }
    $(this.element).addClass(this.options.className); //add class

    //HTML5 Custom data
    if(typeof $(this.element).data('title') !== 'undefined'){
      this.options.title = $(this.element).attr('data-title');
    }
    if(typeof $(this.element).data('url') !== 'undefined'){
      this.options.url = $(this.element).data('url');
    }
    if(typeof $(this.element).data('text') !== 'undefined'){
      this.options.text = $(this.element).data('text');
    }

    //how many social website have been selected
    $.each(this.options.share, function(name, val) {
      if(val === true){
        self.options.shareTotal ++;
      }
    });

    if(self.options.enableCounter === true){  //if for some reason you don't need counter
      //get count of social share that have been selected
      $.each(this.options.share, function(name, val) {
        if(val === true){
          //self.getSocialJson(name);
          try {
            self.getSocialJson(name);
          } catch(e){
          }
        }
      });
    }
    else if(self.options.template !== ''){  //for personalized button (with template)
      this.options.render(this, this.options);
    }
    else{ // if you want to use official button like example 3 or 5
      this.loadButtons();
    }

    //add hover event
    $(this.element).hover(function(){
      //load social button if enable and 1 time
      if($(this).find('.buttons').length === 0 && self.options.enableHover === true){
        self.loadButtons();
      }
      self.options.hover(self, self.options);
    }, function(){
      self.options.hide(self, self.options);
    });

    //click event
    $(this.element).click(function(){
      self.options.click(self, self.options);
      return false;
    });
  };

  /* loadButtons methode
  ================================================== */
  Plugin.prototype.loadButtons = function () {
    var self = this;
    $(this.element).append('<div class="buttons"></div>');
    $.each(self.options.share, function(name, val) {
      if(val == true){
        loadButton[name](self);
        if(self.options.enableTracking === true){ //add tracking
          tracking[name]();
        }
      }
    });
  };

  /* getSocialJson methode
  ================================================== */
  Plugin.prototype.getSocialJson = function (name) {
    var self = this,
    count = 0,
    url = urlJson[name].replace('{url}', encodeURIComponent(this.options.url));
    if(this.options.buttons[name].urlCount === true && this.options.buttons[name].url !== ''){
      url = urlJson[name].replace('{url}', this.options.buttons[name].url);
    }
    //console.log('name : ' + name + ' - url : '+url); //debug
    if(url != '' && self.options.urlCurl !== ''){  //urlCurl = '' if you don't want to used PHP script but used social button
      $.getJSON(url, function(json){
        if(typeof json.count !== "undefined"){  //GooglePlus, Stumbleupon, Twitter, Pinterest and Digg
          var temp = json.count + '';
          temp = temp.replace('\u00c2\u00a0', '');  //remove google plus special chars
          count += parseInt(temp, 10);
        }
		//get the FB total count (shares, likes and more)
        else if(json.data && json.data.length > 0 && typeof json.data[0].total_count !== "undefined"){ //Facebook total count
          count += parseInt(json.data[0].total_count, 10);
        }
        else if(typeof json[0] !== "undefined"){  //Delicious
          count += parseInt(json[0].total_posts, 10);
        }
        else if(typeof json[0] !== "undefined"){  //Stumbleupon
        }
        self.options.count[name] = count;
        self.options.total += count;
        self.renderer();
        self.rendererPerso();
        //console.log(json); //debug
      })
      .error(function() {
        self.options.count[name] = 0;
        self.rendererPerso();
       });
    }
    else{
      self.renderer();
      self.options.count[name] = 0;
      self.rendererPerso();
    }
  };

  /* launch render methode
  ================================================== */
  Plugin.prototype.rendererPerso = function () {
    //check if this is the last social website to launch render
    var shareCount = 0;
    for (e in this.options.count) { shareCount++; }
    if(shareCount === this.options.shareTotal){
      this.options.render(this, this.options);
    }
  };

  /* render methode
  ================================================== */
  Plugin.prototype.renderer = function () {
    var total = this.options.total,
    template = this.options.template;
    if(this.options.shorterTotal === true){  //format number like 1.2k or 5M
      total = this.shorterTotal(total);
    }

    if(template !== ''){  //if there is a template
      template = template.replace('{total}', total);
      $(this.element).html(template);
    }
    else{ //template by defaults
      $(this.element).html(
                            '<div class="box"><a class="count" href="#">' + total + '</a>' +
                            (this.options.title !== '' ? '<a class="share" href="#">' + this.options.title + '</a>' : '') +
                            '</div>'
                          );
    }
  };

  /* format total numbers like 1.2k or 5M
  ================================================== */
  Plugin.prototype.shorterTotal = function (num) {
    if (num >= 1e6){
      num = (num / 1e6).toFixed(2) + "M"
    } else if (num >= 1e3){
      num = (num / 1e3).toFixed(1) + "k"
    }
    return num;
  };

  /* Methode for open popup
  ================================================== */
  Plugin.prototype.openPopup = function (site) {
    popup[site](this.options);  //open
    if(this.options.enableTracking === true){ //tracking!
      var tracking = {
        googlePlus: {site: 'Google', action: '+1'},
        facebook: {site: 'facebook', action: 'like'},
        twitter: {site: 'twitter', action: 'tweet'},
        digg: {site: 'digg', action: 'add'},
        delicious: {site: 'delicious', action: 'add'},
        stumbleupon: {site: 'stumbleupon', action: 'add'},
        linkedin: {site: 'linkedin', action: 'share'},
        pinterest: {site: 'pinterest', action: 'pin'}
      };
      _gaq.push(['_trackSocial', tracking[site].site, tracking[site].action]);
    }
  };

  /* Methode for add +1 to a counter
  ================================================== */
  Plugin.prototype.simulateClick = function () {
    var html = $(this.element).html();
    $(this.element).html(html.replace(this.options.total, this.options.total+1));
  };

  /* Methode for add +1 to a counter
  ================================================== */
  Plugin.prototype.update = function (url, text) {
    if(url !== ''){
      this.options.url = url;
    }
    if(text !== ''){
      this.options.text = text;
    }
  };

  /* A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
  ================================================== */
  $.fn[pluginName] = function ( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
      });
    }
  };
})(jQuery, window, document);

/*!
	Zoom 1.7.14
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function($){var defaults={url:false,callback:false,target:false,duration:120,on:"mouseover",touch:true,onZoomIn:false,onZoomOut:false,magnify:1};$.zoom=function(target,source,img,magnify){var targetHeight,targetWidth,sourceHeight,sourceWidth,xRatio,yRatio,offset,$target=$(target),position=$target.css("position"),$source=$(source);$target.css("position",/(absolute|fixed)/.test(position)?position:"relative");$target.css("overflow","hidden");img.style.width=img.style.height="";$(img).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:img.width*magnify,height:img.height*magnify,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(target);return{init:function(){targetWidth=$target.outerWidth();targetHeight=$target.outerHeight();if(source===$target[0]){sourceWidth=targetWidth;sourceHeight=targetHeight}else{sourceWidth=$source.outerWidth();sourceHeight=$source.outerHeight()}xRatio=(img.width-targetWidth)/sourceWidth;yRatio=(img.height-targetHeight)/sourceHeight;offset=$source.offset()},move:function(e){var left=e.pageX-offset.left,top=e.pageY-offset.top;top=Math.max(Math.min(top,sourceHeight),0);left=Math.max(Math.min(left,sourceWidth),0);img.style.left=left*-xRatio+"px";img.style.top=top*-yRatio+"px"}}};$.fn.zoom=function(options){return this.each(function(){var settings=$.extend({},defaults,options||{}),target=settings.target||this,source=this,$source=$(source),$target=$(target),img=document.createElement("img"),$img=$(img),mousemove="mousemove.zoom",clicked=false,touched=false,$urlElement;if(!settings.url){$urlElement=$source.find("img");if($urlElement[0]){settings.url=$urlElement.data("src")||$urlElement.attr("src")}if(!settings.url){return}}(function(){var position=$target.css("position");var overflow=$target.css("overflow");$source.one("zoom.destroy",function(){$source.off(".zoom");$target.css("position",position);$target.css("overflow",overflow);$img.remove()})})();img.onload=function(){var zoom=$.zoom(target,source,img,settings.magnify);function start(e){zoom.init();zoom.move(e);$img.stop().fadeTo($.support.opacity?settings.duration:0,1,$.isFunction(settings.onZoomIn)?settings.onZoomIn.call(img):false)}function stop(){$img.stop().fadeTo(settings.duration,0,$.isFunction(settings.onZoomOut)?settings.onZoomOut.call(img):false)}if(settings.on==="grab"){$source.on("mousedown.zoom",function(e){if(e.which===1){$(document).one("mouseup.zoom",function(){stop();$(document).off(mousemove,zoom.move)});start(e);$(document).on(mousemove,zoom.move);e.preventDefault()}})}else if(settings.on==="click"){$source.on("click.zoom",function(e){if(clicked){return}else{clicked=true;start(e);$(document).on(mousemove,zoom.move);$(document).one("click.zoom",function(){stop();clicked=false;$(document).off(mousemove,zoom.move)});return false}})}else if(settings.on==="toggle"){$source.on("click.zoom",function(e){if(clicked){stop()}else{start(e)}clicked=!clicked})}else if(settings.on==="mouseover"){zoom.init();$source.on("mouseenter.zoom",start).on("mouseleave.zoom",stop).on(mousemove,zoom.move)}if(settings.touch){$source.on("touchstart.zoom",function(e){e.preventDefault();if(touched){touched=false;stop()}else{touched=true;start(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0])}}).on("touchmove.zoom",function(e){e.preventDefault();zoom.move(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0])})}if($.isFunction(settings.callback)){settings.callback.call(img)}};img.src=settings.url})};$.fn.zoom.defaults=defaults})(window.jQuery);
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define("typeahead.js",["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},noop:function(){}}}(),c=function(){"use strict";function a(a){var g,h;return h=b.mixin({},f,a),g={css:e(),classes:h,html:c(h),selectors:d(h)},{css:g.css,html:g.html,classes:g.classes,selectors:g.selectors,mixin:function(a){b.mixin(a,g)}}}function c(a){return{wrapper:'<span class="'+a.wrapper+'"></span>',menu:'<div class="'+a.menu+'"></div>'}}function d(a){var c={};return b.each(a,function(a,b){c[b]="."+a}),c}function e(){var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),a}var f={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return a}(),d=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d,e;return d="typeahead:",e={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},b.mixin(c.prototype,{_trigger:function(b,c){var e;return e=a.Event(d+b),(c=c||[]).unshift(e),this.$el.trigger.apply(this.$el,c),e},before:function(a){var b,c;return b=[].slice.call(arguments,1),c=this._trigger("before"+a,b),c.isDefaultPrevented()},trigger:function(a){var b;this._trigger(a,[].slice.call(arguments,1)),(b=e[a])&&this._trigger(b,[].slice.call(arguments,1))}}),c}(),e=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),f=function(a){"use strict";function c(a,c,d){for(var e,f=[],g=0,h=a.length;h>g;g++)f.push(b.escapeRegExChars(a[g]));return e=d?"\\b("+f.join("|")+")\\b":"("+f.join("|")+")",c?new RegExp(e):new RegExp(e,"i")}var d={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(e){function f(b){var c,d,f;return(c=h.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;e=b.mixin({},d,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],h=c(e.pattern,e.caseSensitive,e.wordsOnly),g(e.node,f))}}(window.document),g=function(){"use strict";function c(c,e){c=c||{},c.input||a.error("input is missing"),e.mixin(this),this.$hint=a(c.hint),this.$input=a(c.input),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=d(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function g(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var h;return h={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return b.toStr(a).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(a){var b=h[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(a,b){var c;switch(a){case"up":case"down":c=!g(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!g(b);break;default:c=!0}return c},_checkLanguageDirection:function(){var a=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==a&&(this.dir=a,this.$hint.attr("dir",a),this.trigger("langDirChanged",a))},_setQuery:function(a,b){var c,d;c=f(a,this.query),d=c?this.query.length!==a.length:!1,this.query=a,b||c?!b&&d&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},bind:function(){var a,c,d,e,f=this;return a=b.bind(this._onBlur,this),c=b.bind(this._onFocus,this),d=b.bind(this._onKeydown,this),e=b.bind(this._onInput,this),this.$input.on("blur.tt",a).on("focus.tt",c).on("keydown.tt",d),!b.isMsie()||b.isMsie()>9?this.$input.on("input.tt",e):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){h[a.which||a.keyCode]||b.defer(b.bind(f._onInput,f,a))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(a,b){this.setInputValue(a),this._setQuery(a,b)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(a){this.$input.val(a),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:document.selection?(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=a("<div>")}}),c}(),h=function(){"use strict";function c(c,e){c=c||{},c.templates=c.templates||{},c.templates.notFound=c.templates.notFound||c.templates.empty,c.source||a.error("missing source"),c.node||a.error("missing node"),c.name&&!h(c.name)&&a.error("invalid dataset name: "+c.name),e.mixin(this),this.highlight=!!c.highlight,this.name=c.name||j(),this.limit=c.limit||5,this.displayFn=d(c.display||c.displayKey),this.templates=g(c.templates,this.displayFn),this.source=c.source.__ttAdapter?c.source.__ttAdapter():c.source,this.async=b.isUndefined(c.async)?this.source.length>2:!!c.async,this._resetLastSuggestion(),this.$el=a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function d(a){function c(b){return b[a]}return a=a||b.stringify,b.isFunction(a)?a:c}function g(c,d){function e(b){return a("<div>").text(d(b))}return{notFound:c.notFound&&b.templatify(c.notFound),pending:c.pending&&b.templatify(c.pending),header:c.header&&b.templatify(c.header),footer:c.footer&&b.templatify(c.footer),suggestion:c.suggestion||e}}function h(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var i,j;return i={val:"tt-selectable-display",obj:"tt-selectable-object"},j=b.getIdGenerator(),c.extractData=function(b){var c=a(b);return c.data(i.obj)?{val:c.data(i.val)||"",obj:c.data(i.obj)||null}:null},b.mixin(c.prototype,e,{_overwrite:function(a,b){b=b||[],b.length?this._renderSuggestions(a,b):this.async&&this.templates.pending?this._renderPending(a):!this.async&&this.templates.notFound?this._renderNotFound(a):this._empty(),this.trigger("rendered",this.name,b,!1)},_append:function(a,b){b=b||[],b.length&&this.$lastSuggestion.length?this._appendSuggestions(a,b):b.length?this._renderSuggestions(a,b):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(a),this.trigger("rendered",this.name,b,!0)},_renderSuggestions:function(a,b){var c;c=this._getSuggestionsFragment(a,b),this.$lastSuggestion=c.children().last(),this.$el.html(c).prepend(this._getHeader(a,b)).append(this._getFooter(a,b))},_appendSuggestions:function(a,b){var c,d;c=this._getSuggestionsFragment(a,b),d=c.children().last(),this.$lastSuggestion.after(c),this.$lastSuggestion=d},_renderPending:function(a){var b=this.templates.pending;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_renderNotFound:function(a){var b=this.templates.notFound;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(c,d){var e,g=this;return e=document.createDocumentFragment(),b.each(d,function(b){var d,f;f=g._injectQuery(c,b),d=a(g.templates.suggestion(f)).data(i.obj,b).data(i.val,g.displayFn(b)).addClass(g.classes.suggestion+" "+g.classes.selectable),e.appendChild(d[0])}),this.highlight&&f({className:this.classes.highlight,node:e,pattern:c}),a(e)},_getFooter:function(a,b){return this.templates.footer?this.templates.footer({query:a,suggestions:b,dataset:this.name}):null},_getHeader:function(a,b){return this.templates.header?this.templates.header({query:a,suggestions:b,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=a()},_injectQuery:function(a,c){return b.isObject(c)?b.mixin({_query:a},c):c},update:function(b){function c(a){g||(g=!0,a=(a||[]).slice(0,e.limit),h=a.length,e._overwrite(b,a),h<e.limit&&e.async&&e.trigger("asyncRequested",b))}function d(c){c=c||[],!f&&h<e.limit&&(e.cancel=a.noop,h+=c.length,e._append(b,c.slice(0,e.limit-h)),e.async&&e.trigger("asyncReceived",b))}var e=this,f=!1,g=!1,h=0;this.cancel(),this.cancel=function(){f=!0,e.cancel=a.noop,e.async&&e.trigger("asyncCanceled",b)},this.source(b,c,d),!g&&c([])},cancel:a.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=a("<div>")}}),c}(),i=function(){"use strict";function c(c,d){function e(b){var c=f.$node.find(b.node).first();return b.node=c.length?c:a("<div>").appendTo(f.$node),new h(b,d)}var f=this;c=c||{},c.node||a.error("node is required"),d.mixin(this),this.$node=a(c.node),this.query=null,this.datasets=b.map(c.datasets,e)}return b.mixin(c.prototype,e,{_onSelectableClick:function(b){this.trigger("selectableClicked",a(b.currentTarget))},_onRendered:function(a,b,c,d){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",b,c,d)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){function a(a){return a.isEmpty()}return b.every(this.datasets,a)},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var a=this.getActiveSelectable();a&&a.removeClass(this.classes.cursor)},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$node.scrollTop(),e=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),0>b?this.$node.scrollTop(d+b):c>e&&this.$node.scrollTop(d+(c-e))},bind:function(){var a,c=this;return a=b.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,a),b.each(this.datasets,function(a){a.onSync("asyncRequested",c._propagate,c).onSync("asyncCanceled",c._propagate,c).onSync("asyncReceived",c._propagate,c).onSync("rendered",c._onRendered,c).onSync("cleared",c._onCleared,c)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.addClass(this.classes.open)},close:function(){this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(a){this.$node.attr("dir",a)},selectableRelativeToCursor:function(a){var b,c,d,e;return c=this.getActiveSelectable(),b=this._getSelectables(),d=c?b.index(c):-1,e=d+a,e=(e+1)%(b.length+1)-1,e=-1>e?b.length-1:e,-1===e?null:b.eq(e)},setCursor:function(a){this._removeCursor(),(a=a&&a.first())&&(a.addClass(this.classes.cursor),this._ensureVisible(a))},getSelectableData:function(a){return a&&a.length?h.extractData(a):null},getActiveSelectable:function(){var a=this._getSelectables().filter(this.selectors.cursor).first();return a.length?a:null},getTopSelectable:function(){var a=this._getSelectables().first();return a.length?a:null},update:function(a){function c(b){b.update(a)}var d=a!==this.query;return d&&(this.query=a,b.each(this.datasets,c)),d},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function c(a){a.destroy()}this.$node.off(".tt"),this.$node=a("<div>"),b.each(this.datasets,c)}}),c}(),j=function(){"use strict";function a(){i.apply(this,[].slice.call(arguments,0))}var c=i.prototype;return b.mixin(a.prototype,i.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),c.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),c.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(a){return this.$node.css("ltr"===a?this.css.ltr:this.css.rtl),c.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),a}(),k=function(){"use strict";function c(c,e){var f,g,h,i,j,k,l,m,n,o,p;c=c||{},c.input||a.error("missing input"),c.menu||a.error("missing menu"),c.eventBus||a.error("missing event bus"),e.mixin(this),this.eventBus=c.eventBus,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.input=c.input,this.menu=c.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),f=d(this,"activate","open","_onFocused"),g=d(this,"deactivate","_onBlurred"),h=d(this,"isActive","isOpen","_onEnterKeyed"),i=d(this,"isActive","isOpen","_onTabKeyed"),j=d(this,"isActive","_onEscKeyed"),k=d(this,"isActive","open","_onUpKeyed"),l=d(this,"isActive","open","_onDownKeyed"),m=d(this,"isActive","isOpen","_onLeftKeyed"),n=d(this,"isActive","isOpen","_onRightKeyed"),o=d(this,"_openIfActive","_onQueryChanged"),p=d(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",f,this).onSync("blurred",g,this).onSync("enterKeyed",h,this).onSync("tabKeyed",i,this).onSync("escKeyed",j,this).onSync("upKeyed",k,this).onSync("downKeyed",l,this).onSync("leftKeyed",m,this).onSync("rightKeyed",n,this).onSync("queryChanged",o,this).onSync("whitespaceChanged",p,this).onSync("langDirChanged",this._onLangDirChanged,this)}function d(a){var c=[].slice.call(arguments,1);return function(){var d=[].slice.call(arguments);b.each(c,function(b){return a[b].apply(a,d)})}}return b.mixin(c.prototype,{_hacks:function(){var c,d;c=this.input.$input||a("<div>"),d=this.menu.$node||a("<div>"),c.on("blur.tt",function(a){var e,f,g;e=document.activeElement,f=d.is(e),g=d.has(e).length>0,b.isMsie()&&(f||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){c.focus()}))}),d.on("mousedown.tt",function(a){a.preventDefault()})},_onSelectableClicked:function(a,b){this.select(b)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(a,b,c,d){this._updateHint(),this.eventBus.trigger("render",c,d,b)},_onAsyncRequested:function(a,b,c){this.eventBus.trigger("asyncrequest",c,b)},_onAsyncCanceled:function(a,b,c){this.eventBus.trigger("asynccancel",c,b)},_onAsyncReceived:function(a,b,c){this.eventBus.trigger("asyncreceive",c,b)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())&&this.select(c)&&b.preventDefault()},_onTabKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())?this.select(c)&&b.preventDefault():(c=this.menu.getTopSelectable())&&this.autocomplete(c)&&b.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onQueryChanged:function(a,b){this._minLengthMet(b)?this.menu.update(b):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(a,b){this.dir!==b&&(this.dir=b,this.menu.setLanguageDirection(b))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(a){return a=b.isString(a)?a:this.input.getQuery()||"",a.length>=this.minLength},_updateHint:function(){var a,c,d,e,f,h,i;a=this.menu.getTopSelectable(),c=this.menu.getSelectableData(a),d=this.input.getInputValue(),!c||b.isBlankString(d)||this.input.hasOverflow()?this.input.clearHint():(e=g.normalizeQuery(d),f=b.escapeRegExChars(e),h=new RegExp("^(?:"+f+")(.+$)","i"),i=h.exec(c.val),i&&this.input.setHint(d+i[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return this.isActive()?!0:!this.isEnabled()||this.eventBus.before("active")?!1:(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return this.isActive()?this.eventBus.before("idle")?!1:(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0):!0},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(a){this.input.setQuery(b.toStr(a))},getVal:function(){return this.input.getQuery()},select:function(a){var b=this.menu.getSelectableData(a);return b&&!this.eventBus.before("select",b.obj)?(this.input.setQuery(b.val,!0),this.eventBus.trigger("select",b.obj),this.close(),!0):!1},autocomplete:function(a){var b,c,d;return b=this.input.getQuery(),c=this.menu.getSelectableData(a),d=c&&b!==c.val,d&&!this.eventBus.before("autocomplete",c.obj)?(this.input.setQuery(c.val),this.eventBus.trigger("autocomplete",c.obj),!0):!1},moveCursor:function(a){var b,c,d,e,f;return b=this.input.getQuery(),c=this.menu.selectableRelativeToCursor(a),d=this.menu.getSelectableData(c),e=d?d.obj:null,f=this._minLengthMet()&&this.menu.update(b),f||this.eventBus.before("cursorchange",e)?!1:(this.menu.setCursor(c),d?this.input.setInputValue(d.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",e),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),c}();!function(){"use strict";function e(b,c){b.each(function(){var b,d=a(this);(b=d.data(p.typeahead))&&c(b,d)})}function f(a,b){return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly",!0).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1})}function h(a,b){a.data(p.attrs,{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass(b.classes.input).attr({autocomplete:"off",spellcheck:!1});try{!a.attr("dir")&&a.attr("dir","auto")}catch(c){}return a}function l(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function m(a){var c,d;c=a.data(p.www),d=a.parent().filter(c.selectors.wrapper),b.each(a.data(p.attrs),function(c,d){b.isUndefined(c)?a.removeAttr(d):a.attr(d,c)}),a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input),d.length&&(a.detach().insertAfter(d),d.remove())}function n(c){var d,e;return d=b.isJQuery(c)||b.isElement(c),e=d?a(c).first():[],e.length?e:null}var o,p,q;o=a.fn.typeahead,p={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},q={initialize:function(e,l){function m(){var c,m,q,r,s,t,u,v,w,x,y;b.each(l,function(a){a.highlight=!!e.highlight}),c=a(this),m=a(o.html.wrapper),q=n(e.hint),r=n(e.menu),s=e.hint!==!1&&!q,t=e.menu!==!1&&!r,s&&(q=f(c,o)),t&&(r=a(o.html.menu).css(o.css.menu)),q&&q.val(""),c=h(c,o),(s||t)&&(m.css(o.css.wrapper),c.css(s?o.css.input:o.css.inputWithNoHint),c.wrap(m).parent().prepend(s?q:null).append(t?r:null)),y=t?j:i,u=new d({el:c}),v=new g({hint:q,input:c},o),w=new y({node:r,datasets:l},o),x=new k({input:v,menu:w,eventBus:u,minLength:e.minLength},o),c.data(p.www,o),c.data(p.typeahead,x)}var o;return l=b.isArray(l)?l:[].slice.call(arguments,1),e=e||{},o=c(e.classNames),this.each(m)},isEnabled:function(){var a;return e(this.first(),function(b){a=b.isEnabled()}),a},enable:function(){return e(this,function(a){a.enable()}),this},disable:function(){return e(this,function(a){a.disable()}),this},isActive:function(){var a;return e(this.first(),function(b){a=b.isActive()}),a},activate:function(){return e(this,function(a){a.activate()}),this},deactivate:function(){return e(this,function(a){a.deactivate()}),this},isOpen:function(){var a;return e(this.first(),function(b){a=b.isOpen()}),a},open:function(){return e(this,function(a){a.open()}),this},close:function(){return e(this,function(a){a.close()}),this},select:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.select(d)}),c},autocomplete:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.autocomplete(d)}),c},moveCursor:function(a){var b=!1;return e(this.first(),function(c){b=c.moveCursor(a)}),b},val:function(a){var b;return arguments.length?(e(this,function(b){b.setVal(a)}),this):(e(this.first(),function(a){b=a.getVal()}),b)},destroy:function(){return e(this,function(a,b){m(b),a.destroy()}),this}},a.fn.typeahead=function(a){return q[a]?q[a].apply(this,[].slice.call(arguments,1)):q.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=o,this}}()});
// autotab phone fields
$('.number').autotab('number');
// modals
// fix scrolling issue when multiple nested modals have been opened
$(document).on('hidden.bs.modal', '.modal', function () {
  $('.modal:visible').length && $(document.body).addClass('modal-open');
});

// trigger popovers
$(function () {
  $('[data-toggle="popover"]').popover();
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// swipe carousel on touch devices
$('.carousel').not('.noswipe').swiperight(function() {  
  $(this).carousel('prev');  
});  
$('.carousel').not('.noswipe').swipeleft(function() {  
  $(this).carousel('next');  
});

// prevent certain dropdowns from closing on click within dropdown
$('#utility .dropdown-menu, #menu .dropdown-menu .form-control, #menu .dropdown-menu button, .filter-list .dropdown-menu').click(function(e) {
  e.stopPropagation();
});

function isTouchEnabled() {
  return ('ontouchstart' in window);
}

$('.swatch').click(function() {
  $(this).addClass('selected');
  $(this).closest('.swatch-wrap').find('.swatch').not(this).removeClass('selected');
  var imgSwap = $(this).find('img').data('imgswap');
  $(this).closest('.product').find('.product-thumb-wrap img.img-swap').attr('src', imgSwap);
});

$(document).on('click', '[data-toggle="c-sp-toggle"]', function (e) {
  var thisParentModule = $(this).parents('.module-sh');
  $('.c-sp-link').closest('.module-sh').not(thisParentModule).removeClass('open');
  $(this).closest('.module-sh').toggleClass('open');
  e.preventDefault();
});
$(document).on('click', '.close-wrap [data-toggle="c-sp-toggle"]', function (e) {
  $(this).closest('.module-sh').removeClass('open');
  e.preventDefault();
});

// signup modal
$('[data-toggle="details-block"]').on('click', function(e) {
  $('.details-block').slideToggle(200);
  e.preventDefault();
});


// bootstrap 3 modal bug. modal-backdrop doesn't get resized when content is dynamically changed in the modal. these resize scripts address that. 
$('.modal .nav-tabs').on('shown.bs.tab', function() {
  $(window).trigger('resize');
});
$('.modal [data-toggle="generic"], .checkout-toggle').click(function() {
  setTimeout(function() {
    $(window).trigger('resize');
  },401);
});
$('.modal-checkout .modal-body').change(function(){
  $(window).trigger('resize');
  console.log('modal resized');
});

// // fix iOS fixed position/keyboard bug
// // https://www.abeautifulsite.net/bootstrap-3-modals-and-the-ios-virtual-keyboard
// // iOS check...ugly but necessary
// if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {
//   $('.modal-checkout').on('show.bs.modal', function() {
//     // Position modal absolute and bump it down to the scrollPosition
//     $(this).css({
//       position: 'absolute',
//       marginTop: $(window).scrollTop() + 'px',
//       bottom: 'auto'
//     });
//     // Position backdrop absolute and make it span the entire page
//     //
//     // Also dirty, but we need to tap into the backdrop after Boostrap 
//     // positions it but before transitions finish.
//     //
//     setTimeout( function() {
//       $('.modal-checkout .modal-backdrop').css({
//         position: 'absolute', 
//         top: 0, 
//         left: 0,
//         width: '100%',
//         height: Math.max(
//           document.body.scrollHeight, document.documentElement.scrollHeight,
//           document.body.offsetHeight, document.documentElement.offsetHeight,
//           document.body.clientHeight, document.documentElement.clientHeight
//         ) + 'px'
//       });
//     }, 0);
//   });
// }






// popups
$('[data-toggle="popup-store"]').on('click', function(e) {
  var storeBrand = $(this).data('brand');
  window.open('/' + storeBrand + '/pages/pdp/locate-in-store.html', "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=50%, width=800, height=635");
  e.preventDefault();
});
$('[data-toggle="popup-invitations"]').on('click', function(e) {
  var invitationBrand = $(this).data('brand');
  window.open('/' + invitationBrand + '/pages/account/wish-list-invitations.html', "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=50%, width=800, height=635");
  e.preventDefault();
});

$('#font-select').on('change', function() {
  var font = $(this).val();
  $('#font-switcher').attr({ href: "/lib_assets/css/fonts/" + font + ".css"});
});

$(window).on('load resize', function() {
  var arrowPos = $('.carousel-lg').width() * 0.5;
  var arrowPosAbout = $('.carousel-about img').height() * 0.5;
  var arrowPosProfile = $('.carousel-profile .profile-img img').height() * 0.5;
  var arrowPosPromo = $('#carousel-footer img').height() * 0.5 + 33;
  var arrowPosAlign = $('[data-carousel="align-arrows"] img').height() * 0.5;
  var arrowPosAlignMobile = $('[data-carousel="align-arrows-mobile"]').width() * 0.5;

  var arrows = $('[data-carousel="align-arrows"] [class*="icon-arrow"]');
  var arrowsMobile = $('[data-carousel="align-arrows-mobile"] [class*="icon-arrow"]');
  if ($(window).width() < 768) {
    $('.carousel-lg [class*="icon-arrow"]').css({'top': arrowPos + 'px'});
    $('.carousel-about [class*="icon-arrow"]').removeAttr('style'); // remove inline css
    $(arrowsMobile).css({'top': arrowPosAlignMobile + 'px'});
    // console.log(arrowPosAlignMobile);
  }
  if ($(window).width() > 767) {
    $('.carousel-lg [class*="icon-arrow"]').removeAttr('style'); // remove inline css
    $('.carousel-about [class*="icon-arrow"]').css({'top': arrowPosAbout + 'px'});
    $(arrowsMobile).removeAttr('style'); // remove inline css
  }
  if ($(window).width() > 1) {
    $('.carousel-profile [class*="icon-arrow"]').css({'top': arrowPosProfile + 'px'});
    $('#carousel-footer [class*="icon-arrow"]').css({'top': arrowPosPromo + 'px'});
  }
  $(arrows).css({'top': arrowPosAlign + 'px'});
});
$('.counter').keyup(function () {
  var max = $(this).data('countmax');
  var len = $(this).val().length;
  var char = max - len;
  $(this).closest('.form-group').next('.char-count').find('span').text(char);
  console.log(char);
});
// scripts for flows only
var flowGift = $('[data-gifting="options"]');
$(flowGift).click(function(e) {
  // $(this).closest('.modal').modal('hide');
  var flowGiftVal = $(this).data('target');
  var flowGiftTarget = $('#' + flowGiftVal);
  $('.checkout-gifting').not(flowGiftTarget).hide();
  $(flowGiftTarget).show().find('.checkout-link').addClass('link-toggled');
  $(flowGiftTarget).show().find('.checkout-gifting-options').show();
  console.log('foo');
  e.preventDefault();
});

var giftProductToggle = $('.gift-product-toggle');
$(giftProductToggle).click(function(e) {
  var giftProductToggleVal = $(this).closest('.checkout-toggle').find('input').attr('id');
  var giftProductToggleTarget = $('#flow-' + giftProductToggleVal);
  $(this).closest('.checkout-toggle').hide();
  $(giftProductToggleTarget).show();
  e.preventDefault();
});

var img1 = $('#flow-wrap-product-1').find('img');
var img2 = $('#flow-wrap-product-2').find('img');
var img3 = $('#wrap-product-1').closest('.media').find('img');
var img4 = $('#wrap-product-2').closest('.media').find('img');
var imgMsg1 = $('#flow-message-product-1').find('img');
var imgMsg2 = $('#flow-message-product-2').find('img');
var imgMsg3 = $('#message-product-1').closest('.media').find('img');
var imgMsg4 = $('#message-product-2').closest('.media').find('img');


var dd1 = $('#wrap-product-1').closest('.media').find('.meta-list').find('dd').eq(1);
var dd2 = $('#wrap-product-2').closest('.media').find('.meta-list').find('dd').eq(1);
var dd3 = $('#message-product-1').closest('.media').find('.meta-list').find('dd').eq(1);
var dd4 = $('#message-product-2').closest('.media').find('.meta-list').find('dd').eq(1);


$(function() {
  $(img1).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(img2).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');
  $(img3).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(img4).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');
  $(dd1).text('Red');
  $(dd2).text('Blue');
  $(dd3).text('Red');
  $(dd4).text('Blue');
  $(imgMsg1).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(imgMsg2).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');
  $(imgMsg3).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(imgMsg4).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');


});


$('[data-swap="address"]').click(function() {
  var altAddress = $(this).data('address');
  $('[data-address="multi"]').html(altAddress);
  console.log(altAddress);
})

// show header summary toggle once user scrolls past sidebar item
$(document).scroll(function() {
  var summaryHeight = $(this).scrollTop();
  if (summaryHeight > 350) {
    $('.summary-toggle').addClass('visible');
  } else {
    $('.summary-toggle').removeClass('visible');
  }
});


$(function() {
  var checkoutField = $('.form-labels .form-control');
  $(checkoutField).focus(function() {
    $(this).closest('.form-group').addClass('focus');
  });
  $(checkoutField).blur(function() {
    // var inputVal = $(checkoutField).val(); // temp
    if ($(this).val().length == 0) {
      $(this).closest('.form-group').removeClass('focus field-invalid field-valid');
    } else {
      if ($(this).attr('data-card')) {
        // var ccType = $(this).data('card');
        if ($(this).val() == '4444444444444444') { // temp
          $(this).closest('.form-group').addClass('field-valid visa').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/visa.svg" alt="Visa">');
        } else if ($(this).val() == '3333333333333333') {
          $(this).closest('.form-group').addClass('field-valid americanexpress').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/americanexpress.svg" alt="American Express">');
        } else if ($(this).val() == '2222222222222222') {
          $(this).closest('.form-group').addClass('field-valid dinersclub').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/dinersclub.svg" alt="Diners Club">');
        } else if ($(this).val() == '5555555555555555') {
          $(this).closest('.form-group').addClass('field-valid mastercard').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/mastercard.svg" alt="Master Card">');
        } else {
          $(this).closest('.form-group').addClass('field-invalid').removeClass('field-valid'); // temp
          $('.alert-checkout').addClass('visible');
          $(this).closest('.form-group').find('.input-icon-cc').html('');
        }
      } else {
        $(this).closest('.form-group').addClass('field-valid').removeClass('field-invalid'); // temp
        $('.alert-checkout').removeClass('visible');
      }
    }
  });

  // since form elements are large, we need to let the selectpicker script know to add the proper class
  $('.selectpicker.input-lg').selectpicker({
    'selectedText': '',style:'btn-lg'
  });

  // add class to selects when an option with value has been selected. the class reveals the label and shifts the content.
  var selectStyled = $('.form-labels .selectpicker');
  $(selectStyled).change(function() {
    if ($('option:selected', $(this)).attr('value')) {
      $(this).closest('.form-group').addClass('focus-select field-valid');
    } else {
      $(this).closest('.form-group').removeClass('focus-select field-valid');
    }
  });

  // add class to inputs when user focuses or adds content. the class reveals the label and shifts the content.
  $('.form-labels .form-control').each(function(index, item){
    if($(item).val() !== '') {
      $(item).closest('.form-group').addClass('focus');   
    }
  });
  $('.form-labels .selectpicker').each(function(index, selectItem){
    if($('option:selected', $(selectItem)).attr('value')) {
      $(selectItem).closest('.form-group').addClass('focus-select');   
    }
  });
});

// telephone formatting (US settings)
$('input[type="tel"]').formatter({
  'pattern': '({{999}}) {{999}}-{{9999}}',
  'persistent': true
});

// test for touch
function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;    
}   
// uncheck creditcard radio and hide content for mobile users
$(function() {
  if ((isTouchDevice()) && ($(window).width() < 768)) {
    $('.checkout-toggle #creditcard').prop('checked', false);
    $('#checkout-creditcard').hide();
    $('[data-btn="paypal"]').hide();
  }
});

// toggle hidden elements when clicking radios
var radioToggle = $('.checkout-toggle').find('input[type="radio"]');
$(radioToggle).change(function() {
  var radioVal = $(this).val();
  var checkoutHidden = $(this).closest('.radio-list').find('.checkout-toggle-content');
  var radioTarget = $(this).closest('.radio-list').find('#checkout-' + radioVal);
  $(radioTarget).slideToggle(400).closest('.checkout-toggle').addClass('active');
  $(checkoutHidden).not(radioTarget).slideUp(400).closest('.radio').removeClass('active');
  if ($('.checkout-toggle #creditcard').prop('checked')) {
    $('[data-btn="creditcard"]').removeClass('hidden');
    $('[data-btn="paypal"]').addClass('hidden');
  } else if ($('.checkout-toggle #paypal').prop('checked')) {
    $('[data-btn="creditcard"]').addClass('hidden');
    $('[data-btn="paypal"]').removeClass('hidden');
  }
});

$('[data-target="radio-cancel"]').click(function(e) {
  $(this).closest('.checkout-toggle').removeClass('active').find('.checkout-toggle-content').slideUp(400);
  $(this).closest('.checkout-toggle').find('input').prop('checked', false);
  e.preventDefault();
});

// toggle hidden elements when clicking checkboxes
var checkToggle = $('.checkout-toggle').find('input[type="checkbox"]');
$(checkToggle).change(function() {
  var checkVal = $(this).val();
  var checkcheckoutHidden = $(this).closest('.radio-list').find('.checkout-toggle-content');
  var checkhiddenTarget = $(this).closest('.radio-list').find('#checkout-' + checkVal);
  $(checkhiddenTarget).slideToggle(400);
  console.log('check toggled');
});
// toggle generic hidden components
var checkoutToggle = $('[data-action="toggle"]');
$(checkoutToggle).click(function(e) {
  var toggleLabel = $(this).data('label');
  var checkoutToggleTarget = $(this).data('target');
  var checkoutToggleBlock = $('#' + checkoutToggleTarget);
  $(checkoutToggleBlock).slideToggle(400);
  $(this).data('label', $(this).html()).html(toggleLabel);
  $(this).toggleClass('link-toggled');
  e.preventDefault();
});
// a more generic toggle item that doesn't need radios, checkboxes, etc.
var toggleSimple = $('[data-toggle="checkout-block"]');
$(toggleSimple).click(function(e) {
  var toggleSimpleVal = $(this).data('target');
  var toggleSimpleLabel = $(this).data('label');
  var toggleSimpleTarget = $('#checkout-' + toggleSimpleVal);
  $(toggleSimpleTarget).slideToggle(400);
  if ($(this).data('hide')) {
    $(this).hide();
  }
  e.preventDefault();
});





// toggle next checkout block on btn click
$('.checkout-block').on('click', '.btn-checkout', function(e) {
  var blockTarget = $(this).data('checkout');
  var hiddenBlock = $('#checkout-' + blockTarget);
  $(hiddenBlock).removeClass('not-started').addClass('editing');
  $(this).closest('.checkout-block').find('[data-toggle="checkout-edit"]').text('Change');
  if ($(this).attr('data-checkout') == 'save-info' && $('#payment-email').val().length == 0) {
    $('#payment-email').closest('.form-group').addClass('field-invalid').removeClass('field-valid'); // temp
    $('.alert-checkout').addClass('visible').find('.media-body').html('<strong>Important message:</strong> Your email address entry is invalid. Please try again.');
  } else {
    if ($(this).attr('data-checkout') == 'save-info') {
      $('[data-btn="place-order"]').removeAttr('disabled');
      $(this).closest('.checkout-block').addClass('complete').removeClass('first editing');
    } else if ($(this).attr('data-saved-info') == 'yes') { // need to hide the "CHANGE" button when she has signed up
      $(this).closest('.checkout-block').addClass('complete info-saved').removeClass('first editing');
    } else if ($(this).attr('data-saved-info') == 'no') {
      $(this).closest('.checkout-block').addClass('complete info-not-saved').removeClass('first editing');
    } else {
      $(this).closest('.checkout-block').addClass('complete').removeClass('first editing');
    }
    var path = $(hiddenBlock).attr('id');
    var anchor = $("#" + path);
    var position = anchor.position().top + $(hiddenBlock).scrollTop() - 36;
    // $('body, html').animate({scrollTop: position + 30}); 
    $('body, html').animate({scrollTop: position}); 
    console.log(position);
  }
  e.preventDefault();
});

// a toggle editable/completed sections
$('.checkout-block').on('click', '[data-toggle="checkout-edit"]', function (e) {
  var checkoutBlock = $(this).closest('.checkout-block');
  var checkoutForm = $(checkoutBlock).find('.checkout-section-form');
  var checkoutComplete = $(checkoutBlock).find('.checkout-section-entry');
  // $(checkoutForm).fadeToggle(400);
  // $(checkoutComplete).fadeToggle(400);
  if ($(checkoutBlock).hasClass('complete')) {
    $(checkoutBlock).removeClass('complete first').addClass('editing');
    console.log('back to editing');
  } else if ($(checkoutBlock).hasClass('editing')) {
    $(checkoutBlock).addClass('complete').removeClass('editing');
    console.log('back to complete');
  }
  // $(this).toggleClass('editing').removeClass('complete'); // fix this!!!!!!
  $(this).text(function(i, v) {
    return v === 'Change' ? 'Cancel' : 'Change'
  });
  e.preventDefault();
});







// increment buttons
$('.btn-increment').click(function(e){
  e.preventDefault();
  
  fieldName = $(this).attr('data-field');
  type    = $(this).attr('data-type');
  var input = $("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if(type == 'minus') {
      if(currentVal > input.attr('min')) {
        input.val(currentVal - 1).change();
      } 
      if(parseInt(input.val()) == input.attr('min')) {
        $(this).attr('disabled', true);
      }
    } else if(type == 'plus') {

      if(currentVal < input.attr('max')) {
        input.val(currentVal + 1).change();
      }
      if(parseInt(input.val()) == input.attr('max')) {
        $(this).attr('disabled', true);
      }

    }
  } else {
    input.val(0);
  }
});
$('.input-increment').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-increment').change(function() {
  
  minValue =  parseInt($(this).attr('min'));
  maxValue =  parseInt($(this).attr('max'));
  valueCurrent = parseInt($(this).val());
  
  name = $(this).attr('name');
  if(valueCurrent >= minValue) {
    $(".btn-increment[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
    alert('Sorry, the minimum value was reached');
    $(this).val($(this).data('oldValue'));
  }
  if(valueCurrent <= maxValue) {
    $(".btn-increment[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
    alert('Sorry, the maximum value was reached');
    $(this).val($(this).data('oldValue'));
  }
  
  
});
$(".input-increment").keydown(function (e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
     // Allow: Ctrl+A
    (e.keyCode == 65 && e.ctrlKey === true) || 
     // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)) {
       // let it happen, don't do anything
       return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});



$('.alert-checkout .close').click(function(e) {
  $(this).closest('.alert-checkout').removeClass('visible');
  e.preventDefault();
});


$('[data-toggle="giftcard-balance"]').click(function(e) {
  $(this).closest('.checkout-gift-card').addClass('checking-balance').removeClass('giftcard-applied');
  e.preventDefault();
});
$('[data-toggle="giftcard-another"]').click(function(e) {
  $(this).closest('.checkout-gift-card').removeClass('checking-balance').removeClass('giftcard-applied');
  e.preventDefault();
});
$('[data-toggle="giftcard-apply"]').click(function(e) {
  $(this).closest('.checkout-gift-card').addClass('giftcard-applied').removeClass('checking-balance');
  // $(this).closest('.checkout-gift-card').find('[data-action="toggle"]').text('Remove').toggleClass('link-toggled');
  e.preventDefault();
});
$('[data-toggle="giftcard-remove"]').click(function(e) {
  var parent = $(this).closest('.checkout-gift-card');
  var parentToggle = $(parent).find('[data-action="toggle"]');
  var parentToggleLabel = $(parentToggle).data('label');
  $(parent).removeClass('giftcard-applied');
  $(parent).find('.checkout-hidden').hide();
  $(parentToggle).data('label', $(parentToggle).html()).html(parentToggleLabel).toggleClass('link-toggled');;
  e.preventDefault();
});
// special collection click label
$(document).scroll(function() {
  if ($('.c-sp-wrap').length > 0) {
    if ($(window).scrollTop() > $('.c-sp-wrap').offset().top) {
      $('.c-sp-click').removeClass('click-hidden');
    } else {
      $('.c-sp-click').addClass('click-hidden');
    }
  }
});

// equalize heights of charity divs
$(window).on('load resize', function() {
  if ($(window).width() > 991) {
    var charityHeight = 0;
    $('.module-charity').each(function(){
       if ($(this).height() > charityHeight) { charityHeight = $(this).height(); }
    });
    $('.module-charity').height(charityHeight);
  }
});

// collection carousel
// first slide to have a shorter interval
var timeout, interval;
$('.carousel-collection').hover(function() {
  var thisCarousel = $(this);
  timeout = setTimeout(function() {
    thisCarousel.carousel('next');
    continueCarousel(thisCarousel);
  }, 500);
}, function () {
  $(this).carousel(0);
  $(this).carousel('pause');
  clearTimeout(timeout);
  clearInterval(interval);
});
function continueCarousel(thisCarousel) {
  interval = setInterval(function () {
    thisCarousel.carousel('next');
  }, 2500);
}

// open filter tools on smaller devices
$('[data-toggle="filter-tools"]').on('click', function(e) {
  $('.filter-list-wrap').toggleClass('open').removeClass('filter-desktop'); // for toggle vs. hover
  $('html, body').toggleClass('filters-open');
  e.preventDefault();
});


// can't find this class anywhere. did the lab add this?
function insert() {
  var name = $("input[name='insertvalue']").val();
  if (name!=''){
    var toinsert = true;
    $("ol.thelist > li").each(function() {
      var item = $(this).html();
      if (name.toUpperCase() < item.toUpperCase()) {
        if (toinsert){
          $(this).before(''+name+'');
          toinsert = false;
        }
      }
    });
    if(toinsert){
      $("ol.thelist").append(''+name+'');
    }
    $("input[name='insertvalue']").val('')
  }
}

function filterSelect(e) {
  var dropdownParent = $(this).closest('.dropdown');
  var filterName = $(this).data('name');
  var filterCat = $(this).data('type');
  if ($(this).data('name') == 'all') {
    $(dropdownParent).find('[data-toggle="filter-selector"]').each(function(e) {
      $(dropdownParent).find('[data-toggle="filter-selector"]').removeClass('selected');
      $(dropdownParent).removeClass('dropdown-selected');
      $('.filter-tags').find('[data-type=\''+filterCat+'\']').remove();
    });
    $(this).addClass('selected');
  } else {
    if ($('.filter-tags').find('.filter-tag[data-name="' + filterName + '"]').length == 0) {
      $('.filter-tags').append('<a href="#" class="filter-tag" data-type="' + filterCat + '" data-name="' + filterName + '">' + filterCat + ': ' + filterName + ' <svg class="icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>');
    } else {
      $('.filter-tag[data-name="' + filterName + '"]').remove();
    }
    $(dropdownParent).find('[data-toggle="filter-selector-all"]').removeClass('selected');
    $(this).toggleClass('selected');
    $(dropdownParent).addClass('dropdown-selected');
    $('.filter-clear').removeClass('hidden');
    if ($(dropdownParent).find('[data-toggle="filter-selector"].selected').length == 0) {
      $(dropdownParent).removeClass('dropdown-selected');
      $(dropdownParent).find('[data-toggle="filter-selector-all"]').addClass('selected');
    }
  }
  if ($('.filter-tag').length == 0) {
    $('.filter-clear').addClass('hidden');
  }
  e.preventDefault();
}
$('.selector-toggle').not('.disabled').click(filterSelect);

// clear all
$('.filter-outer').on('click', '[data-toggle="filter-clear-all"]', function(e) {
  $('.filter-list').find('[data-toggle="filter-selector"]').removeClass('selected');
  $('.filter-list li').removeClass('dropdown-selected');
  $('.filter-tag').remove();
  $('.filter-tags-wrap [data-toggle="filter-clear-all"]').addClass('hidden');
  $('[data-toggle="filter-selector-all"]').addClass('selected');
  e.preventDefault();
});

// remove filters when main selector is changed
$('.filter-outer').on('change', '#filter-cats', function(e) {
  $('.filter-clear').addClass('hidden');
  $('.filter-tag').remove();
  $('.filter-list').find('[data-toggle="filter-selector"]').removeClass('selected');
  $('.filter-list li').removeClass('dropdown-selected');
});

// remove individual filters
function filterRemove(e) {
  var tagNameRemove = $(this).data('name');
  var tagTypeRemove = $(this).data('type');
  $(this).remove();
  $('.filter-list').find('[data-name="' + tagNameRemove + '"]').removeClass('selected');
  if ($('.filter-tag').length == 0) {
    $('.filter-clear').addClass('hidden');
    $('.filter-list').find('[data-toggle="filter-selector-all"]').addClass('selected');
  }
  if ($('.filter-tag[data-type="' + tagTypeRemove + '"]').length == 0) {
    $('.filter-list').find('[data-type="' + tagTypeRemove + '"]').closest('li').removeClass('dropdown-selected');
    $('.filter-list').find('[data-name="all"][data-type="' + tagTypeRemove + '"]').addClass('selected');
  }
  e.preventDefault();
}
$('.filter-outer').on('click', '.filter-tag', filterRemove);

// toggle dropdown-menu using close icon
// no longer needed as the dropdown is initiated on hover
// $('[data-toggle="filter-toggles"]').dropdown();


// filter crumbs
var filterTagObject = [];
function buildTags() {
  $(filterTagObject).each(function(index, value) {
    $(value.actives).each(function(index, activesValue) {
      var newTag = buildTag(value.name, activesValue.filterName, activesValue.matchedElement);
      // Add filter tag to the page
      $('.filter-tags').append(newTag);
      // When a tag is added, clear all needs to become a thing
      $('.filter-clear').removeClass('hidden');    
    });
  });
}
buildTags();

$('.footer-menu-toggle').click(function() {
  $(this).next('ul').toggle();
  $(this).toggleClass('open');
  $('.footer-menu-toggle').not(this).next('ul').hide();
  $('.footer-menu-toggle').not(this).removeClass('open');
});

// toggle footer promo 
var promoFooter = $('#promo-footer');
var promoFooterToggle = $('[data-toggle="promo-footer"]');
var promoSkin = $('#promo-skin');
$(promoFooterToggle).on('click', function(e) {
  $(promoFooter).toggleClass('open');
  $(promoSkin).toggleClass('open');
  $(promoFooterToggle).find('span').text(function(i, v) {
    return v === "Close" ? "Today's Offers" : "Close"
  });
  e.preventDefault();
});
// glossary
$('.glossary-wrap').on('click', '[data-toggle="glossary-term"]', function(e) {
  var glossaryTermToggle = $('[data-toggle="glossary-term"]');
  var glossaryDefActive = $(this).closest('h3').next('.glossary-definition');
  var glossaryTerm = $('.glossary-definition').not(glossaryDefActive);
  if ($(glossaryDefActive).closest('.glossary-term').hasClass('open')) {
    $(glossaryDefActive).attr('aria-expanded', 'false').slideUp(400).closest('.glossary-term').removeClass('open');
  } else {
    $(glossaryDefActive).attr('aria-expanded', 'true').slideDown(400).closest('.glossary-term').addClass('open');   
  }
  if ($(glossaryTerm).is(':visible')) {
    $(glossaryTerm).slideUp(400).closest('.glossary-term').removeClass('open').attr('aria-expanded', 'false');
  }
  e.preventDefault();
});
$(function() {
  $('#header-promo [data-toggle="modal"]').on('click',function(e){
    e.preventDefault();
  });
});

// equalize header promo carousel height
function carouselNormalization() {
  var promoItems = $('#promo-carousel .item'), // grab all slides
  heights = [], // create empty array to store height values
  tallest; // create variable to make note of the tallest slide

  if (promoItems.length) {
    function normalizeHeights() {
      promoItems.each(function() { //add heights to array
        heights.push($(this).height()); 
      });
      tallest = Math.max.apply(null, heights); //cache largest value
      promoItems.each(function() {
        $(this).css('min-height',tallest + 'px');
      });
    };
    normalizeHeights();
    $(window).on('resize orientationchange', function () {
      tallest = 0, heights.length = 0; // reset vars
      promoItems.each(function() {
        $(this).css('min-height','0'); // reset min-height
      }); 
      normalizeHeights(); // run it again 
    });
  }
}

var promoWrap = $('#header-promo-wrap');
var promo = $('#header-promo');
var promoInner = $('#header-promo-inner');
var promoCarousel = $('#promo-carousel');
var promoToggle = $('#promo-carousel');

// show promo on page load for 5 seconds. requires .autopromo body class
var autoPromoWrap = $('.autopromo #header-promo-wrap');
var autoPromo = $('.autopromo #header-promo');
var autoPromoInner = $('.autopromo #header-promo-inner');
var autoPromoCarousel = $('.autopromo #promo-carousel');
var autoPromoToggle = $('.autopromo #promo-carousel');
var promoTimer;


function revealPromo() {
  $(promoWrap).addClass('promo-open');
  $(promo).slideDown(400, function(){
    $(promoInner).animate(
      {opacity: 1},
      {duration: 400}
    );
  });
  $(promoCarousel).carousel('pause');
  $(promoToggle).attr('aria-expanded', 'true');
  carouselNormalization();
  console.log('promo is open');
}
function revealAutoPromo() {
  $(autoPromoWrap).addClass('promo-open');
  $(autoPromo).slideDown(400, function(){
    $(autoPromoInner).animate(
      {opacity: 1},
      {duration: 400}
    );
  });
  $(autoPromoCarousel).carousel('pause');
  $(autoPromoToggle).attr('aria-expanded', 'true');
  carouselNormalization();
  console.log('auto promo is open');
}
function hidePromo() {
  $(promoWrap).removeClass('promo-open');
  $(promo).slideUp(400, function(){
    $(promoInner).animate(
      {opacity: 0},
      {duration: 400}
    );
  });
  $(promoCarousel).carousel('cycle');
  $(promoToggle).attr('aria-expanded', 'false');
  carouselNormalization();
  console.log('promo is closed');
}


// show promo on click
$(function() {
  $('#page-wrap').on('click', '[data-toggle="header-promo"], #promo-carousel .carousel-indicators li', function(e) {
    $('#header-promo-wrap').toggleClass('promo-open');
    if ($('#header-promo').is(":visible")) {
      hidePromo();
    } else {
      revealPromo();
    }   
    e.preventDefault();
  });
});

function stopPromoTimer() {
  clearTimeout(promoTimer);
}
function resumePromoTimer() {
  promoHideTimer = setTimeout(function(){
    hidePromo();
  }, 2000);
}
function startPromoTimer() {
  // open promo carousel
  revealAutoPromo();
  // now close after 5 seconds
  promoTimer = setTimeout(function(){
    hidePromo();
  }, 5000);
}

// prevent close on hover or tap
$(autoPromoWrap).on('mouseenter tap touchstart', stopPromoTimer);
// close on mouseleave
$(autoPromoWrap).on('mouseleave', resumePromoTimer);

$(window).load(function() {
  startPromoTimer();
}); 
// header variables
var menuBag = $('.menu-bag > a');
var bag = $('#persistent-cart');
var timer;
var searchWrap = $('#search-wrap');
var headerWrap = $('#header-wrap');
var searchToggleWrap = $('.search-toggle-wrap');
var searchDataToggle = $('[data-toggle="search"]');
var cartToggle = $('[data-toggle="persistent-cart"]');
var cartClose = $('[data-toggle="close-cart"]');

// header functions
function stopTimer(){
  clearTimeout(timer);
  $(bag).addClass('open');
}
function resumeTimer(){
  $(bag).removeClass('open');
}
function startTimer(){
  $('.modal-pdp').modal('hide');
  $(bag).addClass('open');
  timer = setTimeout(function(){
    $(bag).removeClass('open');
  }, 5000);
}
function unbindHover() {
  $(bag).removeClass('open');
  return false;
}
function searchToggle() {
  $(searchWrap, headerWrap).toggleClass('search-open');
  $(searchToggleWrap).toggleClass('search-toggle-open');
  $(searchWrap).fadeToggle(200);
  if ($('.search-toggle').attr('aria-expanded') == 'false') {
    $(searchDataToggle).attr('aria-expanded', 'true');
  } else {
    $(searchDataToggle).attr('aria-expanded', 'false');
  }
  hideDropdowns();
  return false;
}
function hideSearch() {
  $(searchWrap, headerWrap).removeClass('search-open');
  $(searchToggleWrap).removeClass('search-toggle-open');
  $(searchWrap).fadeOut(200);
  $(searchDataToggle).attr('aria-expanded', 'false');
  return false;
}
function openCart() {
  startTimer();
  hideDropdowns();
}

function hideDropdowns() {
  $('.dropdown').removeClass('open');
  $('.dropdown a').attr('aria-expanded', 'false');
}

$(menuBag).on('mouseenter', function() {
  var width = $(window).width();
  if (width > 1024){
    var cartDelay=500, setTimeoutConst;
    etTimeoutConst = setTimeout($.proxy(function() {
      openCart();
    }, menuBag), cartDelay);
  }
});

$(cartToggle).on('click', openCart);
$(bag).on('mouseenter tap touchstart', stopTimer);
$(bag).on('mouseleave', resumeTimer);
$(cartClose).on('click', unbindHover);
$(headerWrap).on('click', '[data-toggle="search"]', searchToggle);

// remove cart if user clicks outside element
$(document).mouseup(function(e) {
  var container = $('#persistent-cart.open');
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('open');
  }
});

// hide mobile cart modal if larger than 767
$(window).on('resize', function() {
  if ($(window).width() > 767) {
    $('#persistent-mobile').modal('hide')
  }
});

var offCanvasDataToggle = $('[data-toggle="offcanvas"]');
function offCanvasToggle() {
  $('html, body').toggleClass('offcanvas-open');
  $('#menu').toggleClass('offcanvas-menu');
  $('.offcanvas-overlay').toggleClass('open');
  $('body').toggleClass('offcanvas-closed');
  $('#menu-utility .menu-toggle-inner').toggleClass('open'); // menu bars to "x"
  return false;
}
$(offCanvasDataToggle).on('click', offCanvasToggle);


// make header sticky once it reaches window top
$(function () {
  var top = $('#header').offset().top;
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    if (y >= top) {
      $('body').addClass('sticky');
      $('#header-promo').slideUp(400);
      $('#header-promo-wrap').removeClass('promo-open');
    } else {
      $('body').removeClass('sticky');
    }
  });
});


if ($(window).width() > 991) {
  $('#menu .dropdown').on('mouseenter', function() {
    $('.dropdown').not(this).removeClass('open');
  });
}


// toggle classes on window resize so dropdowns and menus work properly on all devices
function resize() {
  if ($(window).width() > 991) {
    $('html, body').removeClass('offcanvas-open');
    $('#menu').removeClass('offcanvas-menu');
    $('body').addClass('offcanvas-closed');
    $('.dropdown, .offcanvas-overlay').removeClass('open');
    $('.menu-toggle-inner').removeClass('open');
    $('.filter-list-wrap').addClass('filter-desktop').removeClass('open'); // toggles between click/hover on filter dropdowns
  }
  //FLXW-780: New nav close button. This hides the close button on non-touch devices.
  if (isTouchEnabled() && $(window).width() >= 1024) {
    $('#menu .btn-close-panel').attr('style','display:inline-block !important;');
  } else {
    $('#menu .btn-close-panel').attr('style','display:none !important;');
  }
}
$(window).resize(resize);
resize();

// prevent first clicks on iPads with the desktop menu view
var iPadPortrait = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
var iPadProPortrait = window.matchMedia('(min-width: 1024px) and (max-width: 1366px)');
if ((iPadPortrait.matches) || (iPadProPortrait.matches)) {
  $('#menu .dropdown a.top-nav-cat').one('click', function(e) {
    e.preventDefault();
  });
}
$('html').on('mouseenter', '.offcanvas-closed #menu .dropdown', function () {
  $(this).addClass('open');
  $('#menu .dropdown').not(this).toggleClass('menu-inactive');
  $('#search-wrap').hide(); // close search anytime a main menu panel is opened
  resumeTimer();
});
$('html').on('mouseleave', '.offcanvas-closed #menu .dropdown', function () {
  $(this).removeClass('open');
  $('#menu .dropdown').not(this).removeClass('menu-inactive');
  resumeTimer();
});
$(window).on('load resize', function() {
  if ($(window).width() > 991) {
    $('#menu .dropdown-menu, .filter-list-wrap .dropdown-menu').removeAttr('style'); // needed to get rid of the inline diplay: none needed on mobile #menu dropdown
    $('html').on('mouseenter', '.filter-list-wrap .dropdown', function () {
      $(this).addClass('open');
    });
    $('html').on('mouseleave', '.filter-list-wrap .dropdown', function () {
      $(this).removeClass('open');
    });
  }
});
// but set a delay on viewing
$(function() {
  var delay=200, setTimeoutConst;
  $('#menu, .filter-wrap').hover(function() {
    setTimeoutConst = setTimeout($.proxy(function() {
      $(this).addClass('hover');
    }, this), delay);
  }, function() {
    clearTimeout(setTimeoutConst);
    $(this).removeClass('hover');
  });
});


// close button in menu and filter panels (we're not removing the .hover class on the parent as this screws everything up on touch devices)
$('[data-close="menu-panel"]').click(function(e) {
  $(this).closest('.dropdown').removeClass('open');
  $('#menu .dropdown').not(this).removeClass('menu-inactive');
  e.preventDefault();
});

$('html').on('click', '.offcanvas-open .offcanvas-menu .dropdown', function(e) {
  var menuActive = $(this);
  var menuInactive = $('.dropdown').not(this);
  var submenuActive = $(this).find('.dropdown-menu');
  var submenuInactive = $('.dropdown').not(this).find('.dropdown-menu');
  $(menuActive).toggleClass('active'); // removed open from mobile toggle as it interferes with the slideToggle
  $(menuInactive).removeClass('active');
  $(submenuInactive).hide();
  $(submenuActive).toggle();
  var path = $(menuActive).attr('id');
  var anchor = $("#" + path);
  var position = anchor.position().top + $('#menu').scrollTop();
  $('#menu').animate({scrollTop: position});
  e.preventDefault();
});

$('.offcanvas-overlay').click(function() {
  $('html, body').toggleClass('offcanvas-open');
  $('#menu').toggleClass('offcanvas-menu');
  $(this).toggleClass('open');
  $('body').toggleClass('offcanvas-closed');
  $('#menu-utility .menu-toggle-inner').toggleClass('open'); // menu bars to "x"
});

// hotspots
// show/hide collections
$('[data-toggle="collection-grid"]').on('click', function(e) {
  $(this).toggleClass('expanded');
  $(this).closest('.collection-group').find('.collection').slideToggle();
  e.preventDefault();
});
$('.style-note').click(function () {
  var hotspotOffset = $(this).offset();
  var hotspotPosition = $(this).position();
  var hotspotWidth = $(this).width();
  var moduleOffset = $(this).parents('section.module').offset();
  var moduleWidth = $(this).parents('section.module').width();
  var tooltipWidth = 320; // $(this).next().width();
  var left = hotspotPosition.left + 50;
  var top = hotspotPosition.top;
  var bottom = 'auto';
  var margin = 'auto';
  var width = '310px';
  if ($(window).width() <= 688) {
    left = 'auto';
    top = 'auto';
    bottom = 0;
    margin = '0 5% 10px';
    width = '90%';
  } else {
    if ((hotspotOffset.left + hotspotWidth + tooltipWidth) > (moduleOffset.left + moduleWidth)) {
      if (hotspotOffset.left > tooltipWidth) {
        left = hotspotPosition.left - tooltipWidth;
      } else {
        // Shouldn't need this anymore now that we have that 688 check, but
        // leaving it in as a catchall
        left = 'auto';
        top = 'auto';
        bottom = 0;
        margin = '0 5% 10px';
        width = '90%';
      }
    }
  }
  $(this).nextAll('.style-note-tooltip').first().css({
    top: top, 
    bottom: bottom, 
    left: left,
    margin: margin,
    width: width
  });
  $('.style-note-tooltip.in').collapse('hide');
  $(this).nextAll('.style-note-tooltip').first().collapse('toggle');
})

$('.style-note-tooltip .dismiss').click(function () {
  $('.style-note-tooltip.in').collapse('hide');
});

$(window).resize(function() {
  $('.style-note-tooltip.in').collapse('hide');
});
// product image gallery modal
if ($(window).height() < 1000) {
  $(window).on('load resize', function(){
    var thumbHeight = $(window).height() * 0.25 -9;
    $('.zoom-main #product-img').css({'max-height':$(window).height()+'px'});
    $('.zoom-thumbs img').css({'max-height': thumbHeight +'px'});

  });
  // $('modal-gallery').find('.product-img-wrap').zoom({touch:true}); //touch: true enables zoom on mobile
}


// open map tab pane with icon map pin click
$('#open-map-pane').click(function() {
  $('#store-locator-tabs a[href="#map-view"]').tab('show');
});

// PDP image/video swap
// This script is not the same script used on prod. It's merely here to to emulate what is happening over there.
var pdpImageWrap = $('.pdp-img-wrap');
var pdpVideoWrap = $('.pdp-video-wrap');
var pdpVideo = $('.pdp-video');

$(pdpVideo).on('ended',function() {
  $(pdpVideoWrap).removeClass('open');
  $(pdpImageWrap).removeClass('closed');
});

$('[data-toggle="pdp-video"]').click(function(e) {
  if ($(pdpVideo).get(0).ended) {
    $(pdpVideoWrap).addClass('open');
    $(pdpVideo).get(0).play();
    $(pdpImageWrap).addClass('closed');
  } else {
    if ($(pdpVideo).get(0).paused) {
      $(pdpVideoWrap).addClass('open');
      $(pdpVideo).get(0).currentTime = 0;
      $(pdpVideo).get(0).play();
      $(pdpImageWrap).addClass('closed');
    } else {
      $(pdpVideoWrap).removeClass('open');
      $(pdpVideo).get(0).pause();
      $(pdpImageWrap).removeClass('closed');
    }
  }
  e.preventDefault();
});

// product description read more/less
// this is only used for prototyping and shouldn't be added to Prod
var toggleProdDescrip = $('[data-toggle="prod-description"]');
var toggleProdLabel = $('.description-more-less');
$(toggleProdDescrip).on('click', function(e) {
  $('.product-description-more-coreyweb-only').slideToggle('400');
  $(toggleProdLabel).html($(toggleProdLabel).text() == 'Read Less...' ? 'Read More...' : 'Read Less...');
  e.preventDefault();
});

// Add "QTY" to quantity select dropdowns
$(function() {
  $('.select-qty option').each(function() {
    $('this option').attr('title');
  });
});
// style switcher
$(".navbar-right li a").click(function() { 
  $('[data-css="brand-css"]').attr("href", $(this).data('brand-css'));
  $('[data-typography="brand-typography"]').attr('href', $(this).data('brand-typography'));

  // $("link").attr("href", $(this).attr('rel'));
  $(this).closest('li').addClass('active');
  $('.navbar-right li a').not(this).closest('li').removeClass('active');
  return false;
});

// show/hide sample code
$('.toggle-code-example').click(function(){
  $(this).parent().parent().parent().find('.example-code').toggle();
  return false;
});

// image modal zoom
$('.modal-gallery .product-img-wrap').zoom({url: 'http://www.chicos.com/Product_Images/570152127_3789_large.jpg?resize=1500px:1850px'});

// show scroll top element
if ($(window).width() > 1024) {
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 800) {
      $('.top-link').fadeIn();
    } else {
      $('.top-link').fadeOut();
    }
  });
}
$(function() {
  $('a[href*=#curated-], a[href=#page-wrap], a[href*=#section-], a[href*=#charity-]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
// sharrre widgets on PDP
$('#share').sharrre( {
  share: {
    facebook: true,
    twitter: true,
    pinterest: true
  },
  enableHover: false,
  template: '<span class="share-widget-facebook"><a class="social-facebook" href="#"><svg class="icon-facebook"><use xlink:href="#icon-facebook-simple"></use></svg><span class="sr-only">Share on Facebook</span></a></span><span class="share-widget-twitter"><a class="social-twitter" href="#"><svg class="icon-twitter"><use xlink:href="#icon-twitter-simple"></use></svg><span class="sr-only">Tweet</span></a></span><span class="share-widget-pinterest"><a class="social-pinterest" href="#"><svg class="icon-pinterest"><use xlink:href="#icon-pinterest-simple"></use></svg><span class="sr-only">Pin</span></a></span>',
  render: function ( api, options ) {
    $( api.element ).on( 'click', '.share-widget-twitter', function () {
      api.simulateClick();
      api.openPopup( 'twitter' );
    } );
    $( api.element ).on( 'click', '.share-widget-facebook', function () {
      api.simulateClick();
      api.openPopup( 'facebook' );
    } );
    $( api.element ).on( 'click', '.share-widget-pinterest', function () {
      api.simulateClick();
      api.openPopup( 'pinterest' );
    } );
    $( api.element ).on( 'click', '.share-widget-google-plus', function () {
      api.simulateClick();
      api.openPopup( 'googlePlus' );
    });
  }
});
// shop by look
$('.select-size').change(function() {
  if ($(this).find('select')[0].value !== '') {
    $(this).closest('.product-wrap').find('.item-selected-checkbox').removeClass('item-deselected initial-hide');
    $(this).closest('.product-wrap').find('.item-selected-checkbox input').prop('checked', true).attr('disabled', false);
    $('.shop-footer-wrap').removeClass('hide-footer');
  } else {
    $(this).closest('.product-wrap').find('.item-selected-checkbox').addClass('item-deselected');
    $(this).closest('.product-wrap').find('.item-selected-checkbox input').prop('checked', false).attr('disabled', true);
  }
});

$('.item-selected-checkbox input').change(function() {
  $(this).closest('.item-selected-checkbox').addClass('item-deselected');
  $(this).attr('disabled', true);
  $(this).closest('.product-wrap').find('.select-size select').val('');
  $(this).closest('.product-wrap').find('.select-size button .filter-option').html('Select Size');
  $(this).closest('.product-wrap').find('.select-size button').prop('title', 'Select Size');
});
// toggle between inches and centimeters (used on chicos. whbm uses a new, single-label toggle)
var toggleItem = $('.table-toggle');
var table = $('.table-size-chart');
$(toggleItem).on('click', function(e) {
  var targetDimension = $(this).data('size');
  $(this).attr('aria-expanded', 'true').closest('li').addClass('active');
  $(toggleItem).not(this).attr('aria-expanded', 'false').closest('li').removeClass('active');
  $(table).not(targetDimension).attr('aria-hidden', 'true').removeClass('active');
  $('.' + targetDimension).attr('aria-hidden', 'false').addClass('active');
  e.preventDefault();
});

// whbm unit toggle
var unitToggle = $('[data-toggle="measure-unit"]');
var unitTable = $('.table-size-chart');
$('.unit-toggle').on('click', unitToggle, function(e) {
  $(unitTable).toggleClass('active');
  $('.table-size-chart.active').attr('aria-hidden', 'false');
  $(unitTable).not('.active').attr('aria-hidden', 'true').removeClass('active');
  $(unitToggle).text(function(i, v) {
    return v === 'View in Centimeters' ? 'View in Inches' : 'View in Centimeters'
  });
  e.preventDefault();
});
// soma footer promo carousel
$(function(){
  $('#carousel-footer .item').each(function(){
    var itemToClone = $(this);
    for (var i=1;i<4;i++) {
      itemToClone = itemToClone.next();
      // wrap around if at end of item collection
      if (!itemToClone.length) {
        itemToClone = $(this).siblings(':first');
      }
      // grab item, clone, add marker class, add to collection
      itemToClone.children(':first-child').clone()
        .addClass("cloneditem-"+(i))
        .appendTo($(this)
      );
    }
  });
});
var footerCarousel = $("#carousel-footer");
footerCarousel.append("<ol class='carousel-indicators'></ol>");
var indicators = $("#carousel-footer .carousel-indicators"); 
footerCarousel.find(".carousel-inner").children(".item").each(function(index) {
  (index === 0) ? 
  indicators.append("<li data-target='#carousel-footer' data-slide-to='"+index+"' class='active'></li>") : 
  indicators.append("<li data-target='#carousel-footer' data-slide-to='"+index+"'></li>");
});
// trigger tabs with select element on mobile devices
$('#select-size-cat').on('change', function(e) {
  $('#tabs-size li a').eq($(this).val()).tab('show');
});
$('#tabs-swap-mobile').on('change', function(e) {
  $('#tabs-swap-desktop li a').eq($(this).val()).tab('show');
});

// a generic toggle element
var toggleLink = $('[data-toggle="generic"]');
var toggleWrap = $('.toggle-wrap');
var toggleItem = $('.toggle-item');
$(toggleLink).on('click', function(e) {
  $(this).closest(toggleWrap).find(toggleItem).slideToggle(400);
  $(this).closest(toggleLink).toggleClass('open');
  $(this).closest(toggleLink).find('span').text(function(i, v) {
    return v === 'View' ? 'Close' : 'View'
  });
  e.preventDefault();
});
// typeahead
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    // an array that will be populated with substring matches
    matches = []; 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i'); 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};
var placeholders = ['Pants', 'Shirts', 'Dresses', 'Collection', 'Zenergy', 'Black Label', 'Jeans', 'Sweaters', 'Knits'];
$('#search .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'placeholders',
  source: substringMatcher(placeholders)
});
// youtube modal: autoplay on open, stop on close
$(function() {
  $('.modal-video').on('shown.bs.modal', function(e) {
    var src = $(this).find('iframe').attr('data-iframe-src');
    $(this).find('iframe').attr('src', src);
  });
  $('.modal-video').on('hidden.bs.modal', function(e) {
    $(this).find('iframe').attr('src', '');
  });
});

// youtube modal: open on page load, requires click to play
$(function() {
  $('.video-overlay').on('click', function(e) {
    var src2 = $('#video-wrapper-pageload').find('iframe').attr('data-iframe-src');
    $('#video-wrapper-pageload').show();
    $('#video-wrapper-pageload').find('iframe').attr('src', src2);
    $(this).hide();
    e.preventDefault();
  });
  $('#modal-video-pageload').on('hidden.bs.modal', function(e) {
    $('#video-wrapper-pageload').hide();
    $('#video-wrapper-pageload').find('iframe').attr('src', '');
    $('.video-overlay').show(1000); // bring back the placeholder just in case the modal can be re-opened
  });
});

// new video module: clicking anchor wrapper will swap out the placeholder for the video player
$('.video-overlay').on('click', function(e) {
  $(this).closest('.modal-inner').find('.video-hidden').show();
  $(this).hide();
  e.preventDefault();
});