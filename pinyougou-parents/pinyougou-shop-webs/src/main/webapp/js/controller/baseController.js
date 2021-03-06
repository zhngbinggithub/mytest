app.controller('baseController',function($scope){

	//分页控件配置currentPage:当前页   totalItems :总记录数  itemsPerPage:每页记录数  perPageOptions :分页选项  onChange:当页码变更后自动触发的方法 
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: 10,
		itemsPerPage: 10,
		perPageOptions: [10, 20, 30, 40, 50],
		onChange: function(){
			$scope.reloadList();
		}
	};
	
	//刷新列表
	$scope.reloadList=function(){
		$scope.search( $scope.paginationConf.currentPage ,  $scope.paginationConf.itemsPerPage );
	}
	
	$scope.selectIds=[];//选中的 ID 集合
	$scope.updateSelection = function($event, id) {
		if($event.target.checked){//如果是被选中,则增加到数组
			$scope.selectIds.push( id);
		}else{
			var idx = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(idx, 1);//删除

		}

	}
	
	//提取 json 字符串数据中某个属性，返回拼接字符串 逗号分隔

	$scope.jsonToString=function(jsonString,key){
		var json=JSON.parse(jsonString);//将 json 字符串转换为 json 对象
		var value="";
		for(var i=0;i<json.length;i++){
			if(i>0){
				value+=","
			}
	//i代表每次 循环的对象：比如：{"id":1,"text":"联想"}
	//因为key是变量，所以不能直接 json[i].id必须是json[i][id],如果key的值不是变量就可以直接“.”了
			value+=json[i][key];
		}
		return value;
	}
	
	
	//在list集合中根据某key的值查询对象
	$scope.searchObjectByKey=function(list,key,keyValue){
		for(var i=0;i<list.length;i++){
			//每一个元素 key是变量，所以不能用“.”
			if(list[i][key]==keyValue){
				return list[i];
			}
			
		}
		return null;
	}
})