var message = {
    addListener: function() {
        chrome.extension.onMessage.addListener(

        function(request, sender, sendResponse) {
            console.log(this);
            console.log(request);
            console.log(sender);
            message.login(request);
        });
    },
    sendMessage: function(message, func) {
        chrome.extension.sendMessage(message, func);
    },
    login: function(account) {
        var emailInput = document.getElementById("email");
        var passwordInput = document.getElementById("password");
        var login = document.getElementById("login");
        emailInput.value = account.email;
        passwordInput.value = account.password;
        login.click();
    },
    init: function() {
        this.addListener();
        this.sendMessage("ok",function(account){
            message.login(account);
        });
    }
};
message.init();