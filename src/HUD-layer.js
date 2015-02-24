var HUDLayer = CCSLayer.extend({
	resFile:res.HUD_json,
	scoreLabel:null,
	ctor:function () {
		this._super();
		this.scoreLabel = this.getChildren()[0].getChildByName("score");
		this.scoreLabel.setString("0");
		this.timeBar = this.getChildren()[0].getChildByName("container").getChildByName("time-bar-container").getChildByName("time-bar");
		this.timeBar.setPercent(0);
		
		this.initListeners();
	},
	initListeners: function(){
		var that = this;
		var _listener1 = cc.EventListener.create({
			event: cc.EventListener.CUSTOM,
			eventName: "game-state-changed",
			callback: function(event){
				that.scoreLabel.setString(event.getUserData().score);
				var percent = ((event.getUserData().timePassed + new Date().getTime() - event.getUserData().timeResumed)/(event.getUserData().totalTime*1000));
				that.timeBar.setPercent(percent * 100);
			}
		});    
		cc.eventManager.addListener(_listener1, 1);
	}
});