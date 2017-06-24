app.controller('rsvpCtrl', ['$scope', '$state', '$firebase', '$firebaseArray', function($scope, $state, $firebase, $firebaseArray){

$scope.plusOne = false;
$scope.valid= false;

var testList = [
{name: "danny holland", name2:"rina holland", guests: '2'},
{name: "herb holland", name2: "genevieve holland", guests: '2'},
{name: "kyle earnhart", guests: '1'},
{name: "aaron case", name2: "emma pallen", guests: "2"}
]
	$('#rsvpFirstName').hide();
	$('#rsvpSecondName').hide();
	$('#response').hide();
	$('#responseYes').hide();
	$('#responseNo').hide();
	$('#thanksYes').hide();
	$("#thanksNo").hide();


	$scope.firstName;
	$scope.lastName;
	$scope.thanks= false;
	var objectPush;
	var name;
	var name2;
	var email;
	var email2;
	$scope.attending = false;
	$scope.firstPerson = true;
	var attending = false;
	$scope.firstPost= false;

$scope.coming=function(){
	 attending = true;
	$scope.valid= true;
	console.log(email);
	if(name2.length >0){
	$('#attending').html('We will be attending')
	}
	else {
	$('#attending').html('I will be attending')

	}
	
	console.log(attending)
}
$scope.notComing=function(){
	 attending = false;
	console.log(attending)
	$scope.valid= true;
		if(name2.length >0){
	$('#attending').html('We can\'t make it')
	}
	else {
	$('#attending').html('I can\'t make it')

	}
}


$scope.submitFirst = function(){
	var counter = null; 
	var preName = $scope.firstName + ' '+ $scope.lastName;
	 email = $scope.email; 
	 name = preName.toLowerCase();

	for (i =0; i<testList.length; i++){
		if((name ==testList[i].name) | (name == testList[i].name2)){
			if(testList[i].guests == "2"){
				$scope.plusOne = true;
				$scope.firstPerson = false;
				$scope.firstPost=true;
				$('#rsvpFirstName').fadeIn(2000)

			}
			else{
			$scope.firstPerson = false;
			$scope.attending = true;

			}

			console.log(email);
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



$scope.single = function(){
			$scope.plusOne = false;
			$scope.firstPerson = false;
			$scope.attending = true;

}


$scope.dualNext = function(){
	if (($scope.plusSecond.length > 0) && ($scope.plusFirst.length > 0)){
		var preName2= $scope.plusFirst + ' '+ $scope.plusSecond;
		name2 = preName2.toLowerCase();
		 email2 = $scope.email2;
		$scope.attending = true;
		$scope.plusOne= false;
		$('#rsvpSecondName').fadeIn(2000)

	}
	else {
		alert('Please fill out the first and last name field with your information')
	}
}


function pushContent(){
$scope.rsvp.$add({
					personsName: name,
					plusOne: name2,
					personResponse: attending,
					email: email,
					email2: $scope.email2
				})
	$scope.attending= false;
	if (attending == true){
		$('#responseYes').fadeIn(2000);
		$('#thanksYes').delay(500).fadeIn(2000);
	}
	else{
		$('#responseNo').fadeIn(2000);
		$('#thanksNo').delay(500).fadeIn(2000);
	}
}

$scope.submit = function(){
	  var ref = firebase.database().ref().child("guests");
	  var rsvpArr = $firebaseArray(ref);
	$scope.rsvp = rsvpArr;
	rsvpArr.$loaded(
		function(data){
				console.log(rsvpArr.length);

				if(rsvpArr.length >0){
	for (b = 0; b< rsvpArr.length; b++){
			if((name == rsvpArr[b].personsName) | (name == rsvpArr[b].plusOne)){
			
			

			alert("bro you already rsvp\'d")
		}
		else{
			pushContent()
			
		}
	}
}
else{
	pushContent();
}
		})

}




}])