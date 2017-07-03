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
{name: "aaron case", name2: "emma pallen", guests: "2"},
{name: "jeremy holland", name2: "alexandra keppel", guests: "2"}
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
	$scope.firstPerson = false;
	var attending = false;
	$('#firstPost').hide();;
	$scope.rsvpStart=true;
	$scope.rsvpSecondHalf=false;


$scope.rsvpStart = function(){
		$scope.rsvpSecondHalf=true;
	$scope.firstPerson = true;
	$scope.rsvpStart = false;
}

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


function quickFades(){
	$('#firstPost').show();
	$('#rsvpFirstName').fadeIn(2000);
	$('#rsvpSecondName').fadeIn(2000)
	if(rsvpArr[i].personResponse == true){
	 			$('#thanksYes').delay(500).fadeIn(2000);
	 			$('#responseYes').fadeIn(2000);
	 		}
	 		else{
	 			$('#thanksNo').delay(500).fadeIn(2000);
	 			$('#responseNo').fadeIn(2000)
	 		}

}
function quickCard(){
	 		$scope.firstPerson= false;
	 		$scope.plusOne=false;
	 		$scope.attending=false;
	 		$scope.firstPersonsName = rsvpArr[i].personsName.toProperCase();
	 		if(!!rsvpArr[i].plusOne){
	 		$scope.plusOneName = rsvpArr[i].plusOne.toProperCase();
	 		}

	 		
}

function windowCheck(){
			if(window.matchMedia('(max-width:960px)').matches){
				
				}
				else{
					$('#firstPost').show();;

				}
}

$scope.submitFirst = function(){
	var counter = null; 
	 preName = $scope.firstName + ' '+ $scope.lastName;

	 var email = $scope.email; 
	 name = preName.toLowerCase();
	 rsvpArr.$loaded(
	 	function(data){
	 		if(rsvpArr.length>0){
	 		for (i =0; i<rsvpArr.length; i++){
	 	if((name == rsvpArr[i].personsName) | (name == rsvpArr[i].plusOne)){


	 		Materialize.toast('It looks like ' + preName + ' has already rsvp\'d.', 2000);
		quickCard();
		
    setTimeout(function(){quickFades(); }, 2000);
		break;
	 	}
	 	else{
	 		for (j =0; j<testList.length; j++){
		if((name ==testList[j].name) | (name == testList[j].name2)){

			if ((email.includes('@'))&& (email.includes('.'))){
				console.log(email)
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
			Materialize.toast('Please use a valid email address. We swear, you\'ll only be emailed once or twice!', 3000);
			$scope.email = '';
			$scope.lastName ='';
			$scope.firstName = '';
		}
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
			$scope.email ='';
			Materialize.toast('We\'re sorry, '+ name +' doesn\'t match a name that we invited. Please use the name and spelling that was sent on your invitation.', 3000);

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
	 		Materialize.toast('It looks like ' + name2 + ' has already rsvp\'d.', 2000);
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
		Materialize.toast('Please fill out the first and last name field with your information', 2000);
		$scope.plusFirst ='';
		$scope.plusSecond= '';
		$scope.email2='';
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
			$('#firstPost').show();;
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