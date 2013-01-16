var bg = chrome.extension.getBackgroundPage();

function $(name) {
	return document.getElementById(name);
}

function $c(name) {
	return document.createElement(name);
}

var RenrenAccountManager = {
	alist: [],
	addAcountBtn: $("addAccount"),
	accountListDiv: $("accountList"),
	// 处理点击添加账户事件
	handleClick: function() {

		var email = $("email");
		var password = $("password");
		var newAccount = {
			"email": email.value,
			"password": password.value,
			"status": "未登录"
		};
		this.addNewAccount(newAccount);
		this.saveList();
		this.updateAccountList();

	},
	// 添加新账户
	addNewAccount: function(newAccount) {
		var i;
		for(i = 0; i < this.alist.length; i++) {
			if(this.alist[i].email == newAccount.email) {
				this.alist[i].password = newAccount.password;
				break;
			}
		}
		if(i == this.alist.length) {
			this.alist.push(newAccount);
		}

	},
	// 移除accountListDiv所有的账户信息
	removeAccountList: function() {
		var children = this.accountListDiv.children;

		while(0 !== children.length) {
			this.accountListDiv.removeChild(children[0]);
		}
	},
	// 更新accountListDiv里的账户信息
	updateAccountList: function() {
		var self = this;
		this.removeAccountList();
		for(var j = 0; j < this.alist.length; j++) {
			var accountDiv = $c("tr");

			var emailDiv = $c("td");
			emailDiv.className = "emailC";
			var statusDiv = $c("td");
			statusDiv.className = "statusC";
			var changeDiv = $c("td");
			changeDiv.className = "operationC";
			var changeBtn = $c("button");
			changeBtn.className = "btn btn-primary";
			var deleteBtn = $c("button");
			deleteBtn.className = "btn btn-danger";
			if("已登录" == this.alist[j].status) {
				changeBtn.setAttribute("disabled", "disabled");
				accountDiv.className = "success";
			} else {
				accountDiv.className = "info";
			}
			emailDiv.textContent = this.alist[j].email;
			accountDiv.appendChild(emailDiv);
			statusDiv.textContent = this.alist[j].status;
			accountDiv.appendChild(statusDiv);
			changeBtn.textContent = "登陆";
			changeBtn.setAttribute("title", j);
			changeBtn.addEventListener("click", function() {
				self.login(this);
			});
			deleteBtn.setAttribute("title", j);
			deleteBtn.textContent = "删除";
			deleteBtn.addEventListener("click",function(){
				self.deleteAccount(this);
			});
			changeDiv.appendChild(changeBtn);
			changeDiv.appendChild(deleteBtn);
			accountDiv.appendChild(changeDiv);
			this.accountListDiv.appendChild(accountDiv);
		}

	},
	login: function(btn) {
		var index = parseInt(btn.title, 10);
		bg.bgController.login(this.alist[index]);
	},
	deleteAccount: function(btn){
		var index = parseInt(btn.title, 10);
		this.alist.splice(index, 1);
		this.updateAccountList();
		this.saveList();
	},
	saveList : function(){
		localStorage.list = JSON.stringify(this.alist);
	},
	init: function() {
		var self = this;

		// localStorage.clear();
		if(undefined !== localStorage.list) {
			this.alist = JSON.parse(localStorage.list);
		}
		this.addAcountBtn.addEventListener("click", function() {
			self.handleClick();
		});
		this.updateAccountList();
	}

};
RenrenAccountManager.init();