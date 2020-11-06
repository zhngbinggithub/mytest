app.controller('brandController',function($scope,$controller,brandService){
	//伪继承
	$controller('baseController',{$scope:$scope})
	
			$scope.findAll=function(){
				brandService.findAll().success(
					function(response){
						$scope.list=response;
					}		
				)
				
			};
			
			
			//分页 ./brand/findPage.do?page=1&size=10
			$scope.findPage=function(page,size){
				brandService.findPage(page,size).success(
					function(response){
						$scope.list=response.rows;//显示当前页数据 	
						$scope.paginationConf.totalItems=response.total;//更新总记录数 
					}		
				);				
			};
			
			//添加
			$scope.save=function(){
				 var object=null;
				if($scope.entity.id !=null){
					object=brandService.update($scope.entity);
				}else{
					object=brandService.add($scope.entity);

				}
				
				object.success(
					function(response){
						if(response.success){
							$scope.reloadList();
						}else{
							
							alert(response.message);
						}
						
					}	
					
				);
				
			};
			//根据id查询
			$scope.findOne=function(id){
				brandService.findOne(id).success(
					function(response){
						$scope.entity=response;
					}		
				);				
			};
			
			
			
		
			 
			//删除
			$scope.dele=function(){
				brandService.dele($scope.selectIds	).success(
						function(response){
							if(response.success){
								$scope.reloadList();//刷新列表
							}
							
						})
			}
			
			
			
			$scope.searchEntity={};
			//条件查询 
			$scope.search=function(page,size){
				
				brandService.search(page,size,$scope.searchEntity).success(
					function(response){
						$scope.list=response.rows;//显示当前页数据 	
						$scope.paginationConf.totalItems=response.total;//更新总记录数 
					}		
				);	
				
			}
			
		})