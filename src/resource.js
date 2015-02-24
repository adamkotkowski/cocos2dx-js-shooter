var res = {
	HUD_json : "res/HUD.json",
    bird_json : "res/bird.json",
    game_over_popup_json : "res/game-over-popup.json",
    main_scene_json : "res/main-scene.json",
    cloud1 : "res/images/cloud1.png",
    background : "res/images/background.png",
    font1 : "res/Default/defaultBMFont.fnt"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}