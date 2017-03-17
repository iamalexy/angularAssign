

app.controller("loginCtrl", ['$scope', '$location', function($scope , $location){
	
	
var login = {"userEmail":"admin@gmail.com","password":"admin@123"};
localStorage.setItem( 'userLogin', JSON.stringify(login) );
var loginDetail = JSON.parse(localStorage.getItem("userLogin"));
        $scope.login = function(){
            if( !$scope.loginForm.$error.required )  {
                if($scope.userEmail == loginDetail.userEmail && $scope.userPwd === loginDetail.password){
                    $scope.failed = "";
                    $location.path('/userList');
                }
                else {
                    $scope.failed = 'Authendication Failed.'
                }
            }
            else {
                $scope.failed = 'All fields must be filled.';  
            }
            
        }
    }]);	


app.controller('listController', function ($scope, $location, ContactService) {
  	$scope.getList=[];
  	$scope.viewEachRecord = false;
  	$scope.deleteEachRecord = false;
 	$scope.getList = ContactService.list();

 	 	$scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

 	$scope.createUserpage = function () {
 		$location.path('/createUser');
 	};
    $scope.saveContact = function () {
        ContactService.save($scope.editedUser);
        $scope.editedUser = '';
       	$scope.viewEachRecord = false;
  		$scope.deleteEachRecord = false;
    }
	$scope.cancelUpdate = function(){
	 $scope.editedUser = '';
	}
    $scope.delete = function (id) {

        ContactService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }

    $scope.viewUser = function (id, vd) {
    	if (vd === 'view'){
    		$scope.userDetail = angular.copy(ContactService.get(id));
    		$scope.viewEachRecord = true;
    		$scope.TitlePop = 'User Details'
    	} else if (vd === 'delete') {
    		$scope.deleteEachRecord = true;
    		$scope.TitlePop = 'Delete';
    		$scope.deleteId = id;
    	};
        
    }

    $scope.edit = function (id) {
        $scope.editedUser = angular.copy(ContactService.get(id));
    };
// Log out
	$scope.logout = function() {
		$location.path('/');
	}
});


app.service('ContactService', function () {
    //to create unique contact id
    
    //contacts array to hold list of all contacts
     var date = new Date();
  	var contacts = [
  	{'id':1,
	'name':'Mavou',
	 'email':'Mavou@gmail.com',
	 'phone': '9795453523',
	 'age':29,
	 'gender':'M',
	 'address':'Bangalore',
	 'createdDate':date
	},
	{'id':2,
	'name':'Duncan',
	 'email':'Duncan@gmail.com',
	 'phone': '9795453523',
	 'age':29,
	 'gender':'F',
	 'address':'Bangalore',
	 'createdDate':date
	},
	{'id':3,
	'name':'Duncan',
	 'email':'Duncan@gmail.com',
	 'phone': '78878565643',
	 'age':29,
	 'gender':'M',
	 'address':'Bangalore',
	 'createdDate':date
	},
	{'id':4,
	'name':'Andy',
	 'email':'Andy@gmail.com',
	 'phone': '9787876576',
	 'age':29,
	 'gender':'F',
	 'address':'Bangalore',
	 'createdDate':date
	},
	{'id':5,
	'name':'Jon',
	 'email':'Jon@gmail.com',
	 'phone': '9787876576',
	 'age':29,
	 'gender':'F',
	 'address':'Bangalore',
	 'createdDate':date
	}
	]
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = contacts.length + 1;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }

    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }

    //simply returns the contacts list
    this.list = function () {
        return contacts;
    }
});

app.controller("createUserCtrl",function($scope, $location, ContactService){
	$scope.createUser = function(){
		ContactService.save($scope.newUser);
		$location.path('/userList');
	};
	$scope.logout = function() {
		$location.path('/');
	}
	$scope.cancel = function(){
		$location.path('/userList');
	}
});
   