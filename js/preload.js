function Preload(imgs){
	this.container = $("#container");
	this.imgs = $(imgs);
	this.length = this.imgs.length;
	this.loaded = 0;
	this.html = 
		'<div class="preload-cover">'
		+'	<div class="preload-bar preload-center">'
		+'		<div class="preload-inner"></div>'
		+'		<span>LOADING...</span>'
		+'	</div>'
		+'</div>';
	this.container.append(this.html);
	this.cover = $(".preload-cover");
	this.inner = $(".preload-inner");

	this.run();
}

Preload.prototype = {

	run : function(){
		var self = this;
		self.imgs.on("load",function(e){
            self.loaded++;
           	self.process();
            if(self.loaded == self.length){
                self.done(this);
            }
        }).on("error",function(e){
            self.loaded++;
            self.error(this);
            if(self.loaded == self.length){
                self.done();
            }
        }).each(function(i){
            $(this).attr({ src : $(this).attr("data-src") });
        });
	},

	process : function(){
		var self = this; 
		self.inner.css({
			width : ( self.loaded * 100 / self.length ) + "%"
		});
	},

	error : function(img){
		var self = this;
		console.log("Load pic fail at " + self.loaded);
	},

	done : function(){
		var self = this;
		setTimeout(function(){
			self.cover.hide();
		}, 500);
	}

};