function Finger(callback){
	this.container = $("#container");
	this.callback = callback;
	this.html =
	'<div class="finger-mask">'
	+'	<div class="finger-print center">'
	+'		<div class="finger-click" id="finger-click">'
	+'			<div class="finger-scan"></div>'
	+'		</div>'
	+'	</div>'
	+'</div>';
	this.dur = 1500;
	this.timer = null;

	this.run();
}

Finger.prototype = {

	run : function(){
		var self = this;
		self.container.append(self.html);
		this.bind();
	},

	bind : function(){
		var self = this,
			el = document.getElementById("finger-click");
		el.addEventListener("touchstart", function(){
			self.timer = setTimeout(function(){
				self.destroy();
				self.callback.call(self);
			}, self.dur);
		});
		el.addEventListener("touchend", function(){
			clearTimeout(self.timer);
		});
	},

	destroy : function(){
		var self = this;
		$(".finger-mask").remove();
		self.destroy = function(){};
	}

};