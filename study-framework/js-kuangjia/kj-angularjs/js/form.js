var myApp =angular.module('myApp',[]);

myApp.controller('UserInfoContr',function($scope){
	$scope.userInfo={
		email:"317036826@qq.com",
		password:"123456",
		autoLogin:true
	};
	$scope.getFormData=function(){
		console.log($scope.userInfo);
	};
	$scope.setFormData=function(){
		$scope.userInfo={
			email:"975703868@qq.com",
			password:"123456789",
			autoLogin:false
		}
	};
	$scope.resetFormData=function(){
		$scope.userInfo={
			email:"317036826@qq.com",
			password:"123456",
			autoLogin:true
		}
	};
});
