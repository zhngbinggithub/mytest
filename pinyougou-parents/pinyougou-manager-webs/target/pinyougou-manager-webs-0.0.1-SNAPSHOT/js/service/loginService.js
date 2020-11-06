app.service('loginService',function($http){
	
	this.loginNames=function(){
		
		return $http.get('../login/loginName.do');
	}
	
})

