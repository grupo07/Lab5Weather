angular.module('starter.controller',[])


.controller('myCtrl',function($scope,$http,$cordovaGeolocation){
	 var posOptions = {timeout: 10000, enableHighAccuracy: false};



inicializar();
var ciudad={};
function inicializar(){


  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
    	coord={

	 lat:position.coords.latitude,
      lng:position.coords.longitude
    	};
    	var geocoder = new google.maps.Geocoder;
 	 geocoder.geocode({'location': coord}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
    	//resultado a mostrar o no
    	if(results[1]){
    		console.log(results[1].formatted_address);
    		ciudad=results[0].address_components[3].long_name;
    		
    		console.log(ciudad);
    		$scope.data={};
    		alert("Usted esta en: "+ciudad);
	$http({
		method:'get',
		url:'http://api.openweathermap.org/data/2.5/weather?q='+ciudad+'&units=metric&lang=es&APPID=af0da684c2e271226eb59e18efb4475b'

	}).success(function(result){
		console.log(result);
		$scope.data=result;

	});	
    	}
    }
	}

);
      
    }, function(err) {
      // error
    });


}



$scope.city = [
            {name: 'Bogota'},
            {name: 'London'},
            {name: 'Medellin'},
            {name: 'Cartagena'},
            {name: 'Tokyo'},
            {name: 'Roma'},
            {name: 'Ibague'}
        ];


var nombre='Actualizo';


$scope.query="";


$scope.saludar=function(){

	alert("Hey, "+nombre);
	console.log("Hola "+nombre);
	console.log($scope.data);
	//alert("Lat:"+coord.lat
	//	+"\nlong:"+coord.lng);


	$http({
		method:'get',
		url:'http://api.openweathermap.org/data/2.5/weather?q='+$scope.query+'&units=metric&lang=es&APPID=af0da684c2e271226eb59e18efb4475b'

	}).success(function(result){
		console.log(result);
		$scope.data=result;

	});
};






});