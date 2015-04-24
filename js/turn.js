function Turn(){
	this.container = $("#container");
	this.slide = $(".swiper-slide");
	this.max = this.slide.length;
	this.page = 1;
	this.dur = 500;
	this.available = true;
	this.banPrevPage = {};
	this.banNextPage = {};
	this.callback = function(){};

	this._init();
	this._banDefault();
	this._ctrl();
}

Turn.prototype = {

	_init : function(){
		var self = this;
		for(var i = 1; i < self.max; i++){
			$(self.slide[i]).addClass("next");
		}
	},

	_banDefault : function(){
		var self = this;
		document.body.addEventListener("touchmove", function(e){
			e.preventDefault();
			e.stopPropagation();
		});
	},

	_ctrl : function(){
		var self = this,
			el = document.getElementById("container"),
			staY;
		el.addEventListener("touchstart", function(e){
			if(!self.available) return;			
			staY = e.touches[0].clientY;
		});
		el.addEventListener("touchend", function(e){
			var endY = e.changedTouches[0].clientY,
				deltaY = endY - staY;
			if(Math.abs(deltaY) < 50) return;

			if(deltaY < 0){
				if(self.page in self.banNextPage) return;
				self.next();
			}else{
				if(self.page in self.banPrevPage) return;
				self.prev(0);
			}
		});
	},

	turn : function(page){
		var self = this;
		if(page < 1 || page > self.max) return;
		if(page == self.page) return;
		if(!self.available) return;
		self.available = false;

		for(var i = 0; i < (page - 1); i++)
			$(self.slide[i]).addClass("prev").removeClass("next");
		for(var i = page; i < self.max; i++)
			$(self.slide[i]).removeClass("prev").addClass("next");
		$(self.slide[page - 1]).removeClass("prev").removeClass("next");

		self.page = page;
		self.callback.call(self);

		setTimeout(function(){
			self.available = true;			
		}, self.dur);
	},

	prev : function(){
		var self = this;
		if(self.page == 1) return;
		if(!self.available) return;
		self.available = false;		

		var oldpage = $( self.slide[self.page - 1] ),
			newpage = $( self.slide[self.page - 2] );
		oldpage.addClass("next");
		newpage.removeClass("prev");

		self.page--;
		self.callback.call(self);

		setTimeout(function(){
			self.available = true;
		}, self.dur);
	},

	next : function(){
		var self = this;
		if(self.page == self.max) return;
		if(!self.available) return;
		self.available = false;		

		var oldpage = $( self.slide[self.page - 1] ),
			newpage = $( self.slide[self.page] );
		oldpage.addClass("prev");
		newpage.removeClass("next");

		self.page++;
		self.callback.call(self);

		setTimeout(function(){
			self.available = true;
		}, self.dur);
	},

	ban : function(page, action){
		var self = this;
		if(page < 1 || page > self.max) return;
		if(action == "prev") self.banPrevPage[page] = true;
		if(action == "next") self.banNextPage[page] = true;
	},

	free : function(page, action){
		var self = this;
		if(page < 1 || page > self.max) return;
		if(action == "prev") delete self.banPrevPage[page];
		if(action == "next") delete self.banNextPage[page];
	}

};