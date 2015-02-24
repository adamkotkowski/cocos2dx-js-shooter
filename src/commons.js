var CCSLayer = cc.Layer.extend({
	node:null,
	action:null,
	resFile:'',
	ctor:function () {
		this._super();
		var _size = cc.winSize;
		var _res = ccs.load(this.resFile);
		this.node = _res.node;
		this.action = _res.action;
		this.node.width = _size.width;
		this.node.height = _size.height;
		this.addChild(this.node);
	}
});
var _res = null;
var CCSNode = cc.Node.extend({
	node:null,
	action:null,
	resFile:'',
	ctor:function () {
		this._super();
		_res = ccs.load(this.resFile);
		this.node = _res.node;
		this.action = _res.action;
		this.addChild(this.node);
	}
});
