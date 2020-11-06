app.service('uploadService',function($http){
	
	this.uploadFile=function(){
		var formdata=new FormData();
		formdata.append('file',file.files[0]);
		
		return $http({
			url:'../upload.do',
			method:'post',
			data:formdata,
			//不指定Content-type的话，默认是json,如果指定的话，用的是multipartfile类型
			headers:{'Content-type':undefined},
			//对整个表单进行二次序列化
			transformRequest:angular.identy 
		});
	}
})