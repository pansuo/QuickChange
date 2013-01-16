var bgController = {
	loginAccount : null,
	sendmessage: function(m) {
		chrome.tabs.getSelected(null, function(tab) {
			console.log(m);
			chrome.tabs.sendMessage(tab.id, m, function(response) {
				console.log(response.farewell);
			});
		});
	},
	addListener: function() {
		chrome.extension.onMessage.addListener(

		function(request, sender, sendResponse) {
			if ("ok" == request && null !== bgController.loginAccount) {
				bgController.sendmessage(bgController.loginAccount);
				bgController.loginAccount = null;
			}
		});
	},
	login:function(account){
		this.loginAccount = account;
		this.logout();
	},
	logout:function(){
		chrome.tabs.create({url:"http://www.renren.com/Logout.do"});
	},
	init: function() {
		this.addListener();
	}
};
bgController.init();
