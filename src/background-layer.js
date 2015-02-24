
var BackgroundLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		var size = cc.winSize;
		var _node = new cc.Sprite("res/images/background.png");
		_node.x = 0;
		_node.y = 0;
		_node.width = size.width;
		_node.height = size.height;
		_node.anchorX = 0;
		_node.anchorY = 0;
		this.addChild(_node);
		this.addCloud();
	},
	addCloud: function(){
		var size = cc.winSize;
		var cloud = new cc.Sprite("res/images/cloud1.png");
		cloud.y = Math.random()*size.height;
		cloud.scaleX = 0.5;
		cloud.scaleY = 0.5;
		cloud.x = -cloud.width * cloud.scaleX/2;
		this.addChild(cloud);
		var animation = cc.MoveBy(20,size.width+cloud.width*cloud.scaleX,0);
		cloud.runAction(animation);
		var that = this;
		setTimeout(function(){
			that.addCloud();
		},Math.random()*10000);
	}
});