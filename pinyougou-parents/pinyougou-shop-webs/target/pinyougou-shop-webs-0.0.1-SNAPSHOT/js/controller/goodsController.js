 //控制层 
app.controller('goodsController' ,function($scope,$controller   ,goodsService,uploadService,itemCatService,typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    

	//保存
	$scope.add=function(){
		//把富文本编辑器中的值赋值给商品介绍
		$scope.entity.goodsDesc.introduction=editor.html();
//------------------------------------------------------------------------------
		goodsService.add($scope.entity).success(
				function(response){
					if(response.success){
						alert('保存成功');
						$scope.entity={};
						//副文本编辑器清空
						editor.html("");
					}else{
						alert(response.message);
					}
				}
					
		)
		
	}
	
	//上传图片 uploadFile()
	$scope.uploadFile=function(){
		
		uploadService.uploadFile().success(
				
				function(response){
					alert(response);
					if(response.success){
						$scope.entity_image.url=response.message;//设置文件地址
					}else{
						
						alert(response.message);
					}
				}).error(function(){
					alert("上传发生错误");
					
				})
	}
	
	
	$scope.entity={goods:{},goodsDesc:{itemImages:[]}}
	//将当前上传的图片实体存入 图片列表 entity.goodsDesc.itemImages
	$scope.add_entity_image=function(){
		
		$scope.entity.goodsDesc.itemImages.push($scope.entity_image);
	}
	//移除图片
	$scope.remove_entity_image=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
		
	}

//-------------------------------------------------------------------------------------	
	//查询一级商品分类列表 selectItemCat1List()
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
				function(response){
						$scope.itemCat1List=response;
					
				}
		)
		
	}
	//查询二级商品分类列表
	$scope.$watch('entity.goods.category1Id',function(newValue){
		
		itemCatService.findByParentId(newValue).success(
				function(response){
						$scope.itemCat2List=response;
					
				}
		)
		
	});
	
	//查询三级商品分类列表
	$scope.$watch('entity.goods.category2Id',function(newValue){
		
		itemCatService.findByParentId(newValue).success(
				function(response){
						$scope.itemCat3List=response;
					
				}
		)
		
	});
	
	//查询模板ID
	$scope.$watch('entity.goods.category3Id',function(newValue){
		
		itemCatService.findOne(newValue).success(
				function(response){
						$scope.entity.goods.typeTemplateId=response.typeId;
					
				}
		)
		
	});
	//读取模板id,获取品牌列表
/*$scope.$watch('entity.goods.typeTemplateId',function(newValue){
	typeTemplateService.findOne(newValue).success(
				function(response){
						$scope.typeTemplate=response;//获取模板对象
						//得到品牌列表
						$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds);//类型转换
						
				}
		)
		
	});*/
	//根据模板类型中的--品牌列表---扩展属性  
	$scope.$watch('entity.goods.typeTemplateId',function(newValue){
		typeTemplateService.findOne(newValue).success(
					function(response){
							$scope.typeTemplate=response;//获取模板对象
							//得到品牌列表
							$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds);//类型转换
							//扩展属性
							$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.typeTemplate.customAttributeItems);
					}
			)
//--------------------------------------------------------------
			//读取规格
			typeTemplateService.findSpecList(newValue).success(
					function(response){
						$scope.specList=response;
						
					}
			
			)	
			
		});
});	
