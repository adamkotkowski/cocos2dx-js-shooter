var CCSLayer = cc.Layer.extend({
	node:null,
	actions:null,
	resFile:'',
	ctor:function () {
		this._super();
		var _size = cc.winSize;
		var _res = ccs.load(this.resFile);
		this.node = _res.node;
		this.actions = _res.actions;
		this.node.width = _size.width;
		this.node.height = _size.height;
		this.addChild(this.node);
	}
});

var CCSNode = cc.Node.extend({
	node:null,
	action:null,
	resFile:'',
	ctor:function () {
		this._super();
		var _res = ccs.load(this.resFile);
		this.node = _res.node;
		this.action = _res.action;
		this.addChild(this.node);
	}
});
