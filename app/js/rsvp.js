app.controller('rsvpCtrl', ['$scope', '$state', '$firebase', '$firebaseArray', function($scope, $state, $firebase, $firebaseArray){

$scope.plusOne = false;
$scope.valid= false;
var ref = firebase.database().ref().child("guests");
var rsvpArr = $firebaseArray(ref);
var width = $(window).width(); 

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

	var preName;
	var preName2;
	$scope.firstName;
	$scope.lastName;
	$scope.firstPersonsName;
	$scope.plusOneName;
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
	if(!!name2){
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

function quickCard(){
			$scope.firstPost = true;
	 		$scope.firstPerson= false;
	 		$scope.plusOne=false;
	 		$scope.attending=false;
	 		$scope.firstPersonsName = rsvpArr[i].personsName.toProperCase();
	 		$('#rsvpFirstName').fadeIn(2000);
	 		if(!!rsvpArr[i].plusOne){
	 		$scope.plusOneName = rsvpArr[i].plusOne.toProperCase();
	 		$('#rsvpSecondName').fadeIn(2000)
	 		}

	 		if(rsvpArr[i].personResponse == true){
	 			$('#thanksYes').delay(500).fadeIn(2000);
	 			$('#responseYes').fadeIn(2000);
	 		}
	 		else{
	 			$('#thanksNo').delay(500).fadeIn(2000);
	 			$('#responseNo').fadeIn(2000)
	 		}
}

function windowCheck(){
			if(width > 786){
				$scope.firstPost=true;

				}
}

$scope.submitFirst = function(){
	var counter = null; 
	 preName = $scope.firstName + ' '+ $scope.lastName;

	 email = $scope.email; 
	 name = preName.toLowerCase();
	 rsvpArr.$loaded(
	 	function(data){
	 		if(rsvpArr.length>0){
	 		for (i =0; i<rsvpArr.length; i++){
	 	if((name == rsvpArr[i].personsName) | (name == rsvpArr[i].plusOne)){
	 		alert('It looks like ' + preName +' has already rsvp\'d. We can\'t wait to celebrate with you!');
	 		quickCard();
	 		break;

	 	}
	 	else{
	 		for (j =0; j<testList.length; j++){
		if((name ==testList[j].name) | (name == testList[j].name2)){
			if(testList[j].guests == "2"){
				$scope.firstPersonsName = preName.toProperCase();
				$scope.plusOne = true;
				$scope.firstPerson = false;
				windowCheck();
				$('#rsvpFirstName').fadeIn(2000)

			}
			else{
			$scope.firstPersonsName = preName.toProperCase();
			windowCheck();
			$scope.firstPerson = false;
			$scope.attending = true;
			$('#rsvpFirstName').fadeIn(2000)

			}

		break;
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
}
}
else{
	 		for (j =0; j<testList.length; j++){
		if((name ==testList[j].name) | (name == testList[j].name2)){
			if(testList[j].guests == "2"){
				$scope.firstPersonsName = preName.toProperCase();
				$scope.plusOne = true;
				$scope.firstPerson = false;
		
				windowCheck();
			$('#rsvpFirstName').fadeIn(2000);


			}
			else{
			$scope.firstPerson = false;
			$scope.attending = true;

			}
break;
		}
		else {
		counter = counter+1; 
		}
		if (counter == testList.length){
			$scope.firstName = '';
			$scope.lastName = '';
			console.log('nah, '+ name +' wasn\'t invited. sorry, breh. ');
		}
	}
	 	}
	 	})
	
}

function single(){
			$scope.plusOne = false;
			$scope.firstPerson = false;
			$scope.attending = true;
			$scope.plusOneName=null;
	 		name2=null;

}

$scope.single = function(){
			single();

}


$scope.dualNext = function(){
	if (($scope.plusSecond.length > 0) && ($scope.plusFirst.length > 0)){
		 preName2= $scope.plusFirst + ' '+ $scope.plusSecond;
		name2 = preName2.toLowerCase();
		 email2 = $scope.email2;
		$scope.attending = true;
		$scope.plusOne= false;
		rsvpArr.$loaded(
		function(data){
			if(rsvpArr.length>0){
			for (i =0; i<rsvpArr.length; i++){
	 	if((name2 == rsvpArr[i].personsName) | (name2 == rsvpArr[i].plusOne)){
	 		alert('It looks like ' + name2 + ' has already rsvp\'d.');
	 		single();
	 			 		break;
	 	}
	 	else{
		$scope.plusOneName = name2.toProperCase();
		$('#rsvpSecondName').fadeIn(2000)
	 	}
	 }

	 }
	 else{
		$scope.plusOneName = name2.toProperCase();
		$('#rsvpSecondName').fadeIn(2000)
	 	}
		})
		

	}
	else {
		alert('Please fill out the first and last name field with your information')
	}
}


function pushContent(){


	 		if(name2 == null)  {
	 			$scope.rsvp.$add({
					personsName: name,
					personResponse: attending,
					email: email
				})
	 		}
	 		else{

$scope.rsvp.$add({
					personsName: name,
					plusOne: name2,
					personResponse: attending,
					email: email,
					email2: $scope.email2
				})
}
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
	$scope.rsvp = rsvpArr;
	rsvpArr.$loaded(
		function(data){
			pushContent();
			if (width<=768){
			$scope.firstPost = true;
	 		$scope.firstPerson= false;
	 		$scope.plusOne=false;
	 		$scope.attending=false;
	 		$scope.firstPersonsName = preName.toProperCase();
	 		$('#rsvpFirstName').fadeIn(2000);
	 		if(!!name2){
	 		$scope.plusOneName = name2;
	 		$('#rsvpSecondName').fadeIn(2000);
	 		}

	 		if(attending == true){
	 			$('#thanksYes').delay(500).fadeIn(2000);
	 			$('#responseYes').fadeIn(2000);
	 		}
	 		else{
	 			$('#thanksNo').delay(500).fadeIn(2000);
	 			$('#responseNo').fadeIn(2000)
	 		}
}
		})

}



String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

}])