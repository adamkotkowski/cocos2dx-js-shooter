
var GameLayer = cc.Layer.extend({
	gameState: new GameState(),
	scoreLabel: null,
	ctor:function () {
		this._super();
		this.crosshair = new cc.Sprite("res/images/crosshair.png",{
			x:0,
			y:0,
			width:256,
			height:256,
			anchorX:0.5,
			anchorY:0.5
		});
		this.crosshair.scaleX = 0.2;
		this.crosshair.scaleY = 0.2;
		this.addChild(this.crosshair);
		//this.crosshair.attr({visible:false});
		var that = this;
		cc.eventManager.addListener({
			event: cc.EventListener.MOUSE,
			onMouseMove: function(event){
//				var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
				that.crosshair.attr({x:event.getLocationX(),y:event.getLocationY()});
			},
			onMouseDown: function(event){
//				var str = "Mouse Down detected, Key: " + event.getButton();
				that.shot(event.getLocationX(), event.getLocationY());
//				console.log(str);
			}
		}, this);
		
		this.addBird();
	},
	targets: [],
	shot: function(_x,_y){
		console.log("shot to "+_x+","+_y);
		this.gameState.shotCount++;
		var size = cc.winSize;
		var ball = new cc.Sprite("res/images/circle.png",{
			x:0,
			y:0,
			width:278,
			height:266,
			anchorX:0.5,
			anchorY:0.5
		});
		ball.x = size.width/2;
		ball.y = 0;
		ball.scaleX = 0.5;
		ball.scaleY = 0.5;
		this.addChild(ball);
		var animationMove = cc.JumpTo(0.2,_x,_y,200,1);
		var animationSize = cc.scaleTo(0.2, 0.02, 0.02)
		var animationRotate = cc.rotateBy(0.2, 360, 340);
		var that = this;
		var callFunc = cc.callFunc(function(){
			that.calculateKills(ball.getBoundingBox());
			ball.removeFromParent(true);
			
		},this)
		var fly = cc.Spawn([animationMove,animationSize,animationRotate]);
		ball.runAction(cc.Sequence([fly,callFunc]));
		
	},
	calculateKills: function(rect){
		console.log("calculate kills: "+JSON.stringify(rect));
		var hit = false;
		for(var i=0; i<this.targets.length; i++){
			var target = this.targets[i];
//			console.log("calculate kills - inside: "+JSON.stringify(target.getBoundingBox()));
			var hitArea = target.node.getChildren()[2];
			var hitBox = hitArea.getBoundingBox();
			var point = target.node.convertToWorldSpace(cc.p(hitBox.x, hitBox.y));
			hitBox.x = point.x;
			hitBox.y = point.y;
			console.log("hit area "+JSON.stringify(hitBox));
			if (cc.rectIntersectsRect(rect, hitBox)) {
				hit = true;
				target.kill();
				this.gameState.score += 100;
				this.gameState.kills++;
				
				this.targets.splice(i,1);
				i--;
				console.log("killed");
			}
		}
		if(hit)
			this.gameState.hitCount++;
		this.updateHUD();
	},
	addBird: function(){
		var bird = new target.Bird();
		this.addChild(bird);
		this.targets.push(bird);
		var that = this;
		setTimeout(function(){
			that.addBird();
		},Math.random()*3000);
	},
	updateHUD: function(){
		var event = new cc.EventCustom("game-state-changed");
		event.setUserData(this.gameState);
		cc.eventManager.dispatchEvent(event);	
	}
});
var target = {};
target.Bird = CCSNode.extend({
	resFile:'res/bird.json',
	ctor:function () {
		this._super();
		var size = cc.winSize;
		this.y = Math.random()*size.height;
		this.x = -this.width*this.scaleX;
		var animation = cc.MoveBy(10,size.width+this.width*this.scaleX,0);
		this.runAction(animation);
		this.width = 100;
		this.height = 100;
		this.runAction(this.action);
		var fly = this.action.getAnimationInfo("fly");
		this.action.gotoFrameAndPlay(fly.startIndex,fly.endIndex,true);
		this.turn();
	},
	kill: function(){
		clearTimeout(this.turnTimeout);
		var fly = this.action.getAnimationInfo("hit");
		this.action.setTimeSpeed(1);
		this.action.gotoFrameAndPlay(fly.startIndex,fly.endIndex,false);
		
	},
	turn: function(){
		var dX = Math.random()*300-150;
		var dY = Math.random()*300-150;
		var speed = Math.random()*2;
		var distance = Math.sqrt(dX*dX+dY*dY);
		var animation = cc.MoveBy(distance/100*speed,dX,dY);
		this.action.setTimeSpeed(speed);
		//this.setSkewY(180);//(dX<0? true:false);
		this.runAction(animation);
		
		var that = this;
		this.turnTimeout = setTimeout(function(){
			that.turn();
		},Math.random()*5000);
	}
});


