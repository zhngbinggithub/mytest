app.controller('indexController',function($scope,loginService){
	
	
	//显示当前用户名
	$scope.showLoginName=function(){
		
		loginService.loginNames().success(
			function(response){
				$scope.loginName=response.loginname;				
			}
		);		
	}
	
	
});