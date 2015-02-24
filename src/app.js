var MainScene = cc.Scene.extend({
    onEnter:function () {
    	this._super();
        this.addChild(new BackgroundLayer(),0);
        this.addChild(new HUDLayer(),2);
        this.addChild(new GameLayer(),1);
    }
});

