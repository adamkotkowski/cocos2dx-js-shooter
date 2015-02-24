
var HUDLayer = CCSLayer.extend({
	resFile:'res/HUD.json',
	scoreLabel:null,
	ctor:function () {
		this._super();
		this.scoreLabel = this.getChildren()[0].getChildByName("score");
		this.scoreLabel.setString("2");
		this.initListeners();
	},
	initListeners: function(){
		var that = this;
		var _listener1 = cc.EventListener.create({
			event: cc.EventListener.CUSTOM,
			eventName: "game-state-changed",
			callback: function(event){
				console.log("user data: "+JSON.stringify(event.getUserData()));
				that.scoreLabel.setString(event.getUserData().score);
			}
		});    
		cc.eventManager.addListener(_listener1, 1);
	}
});