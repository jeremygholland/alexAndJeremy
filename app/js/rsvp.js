app.controller('rsvpCtrl', ['$scope', '$state', '$firebase', '$firebaseArray', function($scope, $state, $firebase, $firebaseArray){

$scope.plusOne = false;
$scope.valid= false;

var testList = [
{name: "danny holland", name2:"rina holland", guests: '2'},
{name: "herb holland", name2: "genevieve holland", guests: '2'},
{name: "kyle earnhart", guests: '1'},
{name: "aaron case", name2: "emma pallen", guests: "2"}
]

	$scope.firstName;
	$scope.lastName;
	var objectPush;
	var name;
	var name2;
	$scope.attending = false;
	$scope.firstPerson = true;
	var attending = false;

$scope.coming=function(){
	var attending = true;
	$scope.valid= true;
	if(name2.length >0){
	$('#attending').append('We will be attending')
	}
	else {
	$('#attending').append('I will be attending')

	}
	
	console.log(attending)
}
$scope.notComing=function(){
	var attending = false;
	console.log(attending)
	$scope.valid= true;
		if(name2.length >0){
	$('#attending').append('We can\'t make it')
	}
	else {
	$('#attending').append('I can\'t make it')

	}
}


$scope.test = function(){
	var counter = null; 
	var preName = $scope.firstName + ' '+ $scope.lastName;
	 name = preName.toLowerCase();

	for (i =0; i<testList.length; i++){
		if((name ==testList[i].name) | (name == testList[i].name2)){
			$('#nameOne').append(name)
			if(testList[i].guests == "2"){
				$scope.plusOne = true;
				$scope.firstPerson = false;

			}
			else{
			$scope.firstPerson = false;
			$scope.attending = true;

			}


			console.log(name)
		}
		else {
		counter = counter+1; 
		}
		if (counter == testList.length){
			$scope.firstName = '';
			$scope.lastName = '';
			console.log('nah, '+ name +' wasn\'t invited. sorry, breh. ')
		}
	}
}



$scope.dualNext = function(){
	if (($scope.plusSecond.length > 0) && ($scope.plusFirst.length > 0)){
		var preName2= $scope.plusFirst + ' '+ $scope.plusSecond;
		name2 = preName2.toLowerCase();
		$scope.attending = true;
		$scope.plusOne= false;
		$('#nameTwo').append(name2)
	}
	else {
		alert('Please fill out the first and last name field with your information')
	}
}


$scope.submit = function(){
	  var ref = firebase.database().ref().child("guests");

	console.log('pushed');
	console.log(name);
	console.log(name2);
	console.log(attending);
	$scope.rsvp = $firebaseArray(ref);
	$scope.rsvp.$add({
					personsName: name,
					plusOne: name2,
					personResponse: attending,
				})

	$state.go('home')
}


}])