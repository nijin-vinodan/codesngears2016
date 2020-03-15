var EVENTS = [
    {
        date: '21',
        time: '06 PM',
        name: 'Codes & Gears Kickoff'
    },
    {
        date: '21',
        time: '07 PM',
        name: 'Hackathon Starts'
    },
    {
        date: '23',
        time: '07 AM',
        name: 'Hackathon Ends'
    },
    {
        date: '23',
        time: '08 AM',
        name: 'Judging Starts'
    }
];
var FLASHBACK_EVENTS = [{
        title:'Codes & Gears 2016',
        location:'Chennai India',
        date:{
            day: '', mon: 'Apr' , year: '2016'
        },
        desc:[
        	"It's happening now!",
            "Smarter Healthcare & Commerce Ideas",
            "Ideas on DevOps, Future Technologies"
        ]
    },{
        title:'AllSpark 2015',
        location:'Austin US',
        date:{
            day: '', mon: 'Nov' , year: '2015'
        },
        desc:[
        	'All Spark is for Developers, QA and MASS who want to make the world a better place',
            'Innovative Talks & Ideas'
        ]
    },{
        title:'Codes & Gears 2015',
        location:'Chennai India',
        date:{
            day: '', mon: 'Mar' , year: '2015'
        },
        desc:[
            'Next Generation Shopping experience',
            'Internet of Things in Enterprises',
            'Innovations for eGovernance in India',
            'Smarter SDLC'
        ]
    },{
        title:'Ignite',
        location:'Hyatt Regency, Chennai India',
        date:{
            day: '', mon: 'Oct' , year: '2014'
        },
        desc:[
            'Talks & Sessions on Business',
            'Solution Space on Innovative Ideas & Assets'
        ]
    },{
        title:'Codes & Gears 2014',
        location:'Chennai India',
        date:{
            day: '', mon: 'Feb' , year: '2014'
        },
        desc:[
            'Theme: Technology 2020',
            'Brainstorming the non-existent than settling down with the existent'
        ]
    },{
        title:'Mini Tech Xchange',
        location:'Hyatt Regency, Chennai India',
        date:{
            day: '', mon: 'Sep' , year: '2013'
        },
        desc:[
            'Talks & Sessions on Portal, Commerce, Mobile, QA, MASS',
            'Solution Space on Innovative Ideas & Assets'
        ]
    },{
        title:'UI Hackathon',
        location:'Chennai India',
        date:{
            day: '', mon: 'Aug' , year: '2013'
        },
        desc:[
            'Exploring the world of JQuery, Bootstrap, Backbone, CSS3, HTML5, Responsive Design'
        ]
    }
];


var ACTIONS = [
    {
        id: 'windmill-start',
        name: 'WINDMILL POWERING'
    },
    {
        id: 'car-start',
        name: 'START CAR FORWARD'
    },
    {
        id: 'car-stop-windmill',
        name: 'STOP CAR'
    },
    
    {
        id: 'car-start-back',
        name: 'START CAR BACKWARD'
    },
    {
        id: 'car-stop',
        name: 'STOP CAR'
    },
    {
        id: 'windmill-stop',
        name: 'STOP WINDMILL'
    },
    {
        id: 'thanks',
        name: 'WATCH MORE @ C&G'
    }
];


var THEMES = [
    {
        name:'Smarter Healthcare',
        icon:'heartbeat'
    },
    {
        name:'Smarter Commerce',
        icon:'shopping-bag'
    },
    {
        name:'DevOps & Automation',
        icon:'desktop'
    },{
        name:'Emerging Technologies',
        icon:'lightbulb-o'
    }, 
    {
        name:'Next Gen Mobile Paradigms',
        icon:'mobile'
    }  
];

var GUESTS = [
    {
        name: 'Stephen Morris',
        design: 'Vice President',
        firm : 'Software Solutions & Services',
        img: 'stephen.jpg'
    },
    {
        name: 'Chris Lusk',
        design: 'Vice President',
        firm : 'Software Solutions & Services',
        img: 'chris.jpg'
    }, 
    {
        name: 'Joe Grant Bluechel',
        design: 'Managing Director & G.Manager',
        firm : 'Brightlight Business Analytics',
        img: 'joe.jpg'
    },
    {
        name: 'Cindy Noteboom',
        design: 'Practice Director',
        firm: 'Brightlight Business Analytics',
        img: 'cindy.jpg'
    },
    {
        name: 'Steve Vairetta',
        design: 'Program Manager',
        firm: 'Application Managed Services',
        img: 'steve.jpg'
    }
];

var pageModule = angular.module('pageModule',[])

.controller('pageController',function($scope, $http){
    
    var EVENT_START_TIME = 'April 21 2016 18:59:59 GMT+05:30';
    
    $scope.events = EVENTS;
    $scope.timelines = FLASHBACK_EVENTS;
    $scope.themes = THEMES;
    $scope.guests = GUESTS;
    
    $scope.remTime = {};
    
    $scope.getTimeRemaining = function(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    setInterval(function(){
        $scope.remTime = $scope.getTimeRemaining(EVENT_START_TIME);
        $scope.$apply();
    }, 1000);
    
    
   $scope.contraption = function(){
       $(".rerun").hide();
       var i = 0;
       $scope.display = "WELCOME.."
       var timer = setInterval(function(){
           var currentAction = ACTIONS[i];
           $scope.$apply(function() {
               $scope.display =  currentAction.name;
           });
            if(currentAction.id == 'windmill-start'){
                $("#windmillFan").addClass("slow");
            }else if(currentAction.id == 'windmill-stop'){
                $("#windmillFan").removeClass("slow");
            }else if(currentAction.id == 'car-start'){
                $("#car").addClass("moveF");
                $(".tyre").addClass("moveF");
            }else if(currentAction.id == 'car-start-back'){
                $("#car").addClass("moveB");
                $(".tyre").addClass("moveB");
                $("#car").removeClass("stopAtWindMill")
            }else if(currentAction.id == 'car-stop'){
                $("#car").removeClass("moveF");
                $(".tyre").removeClass("moveF");
                $("#car").removeClass("moveB");
                $(".tyre").removeClass("moveB");
            }else if(currentAction.id == 'car-stop-windmill'){
                $("#car").removeClass("moveF");
                $(".tyre").removeClass("moveF");
                $("#car").removeClass("moveB");
                $(".tyre").removeClass("moveB");
                $("#car").addClass("stopAtWindMill")
            }else{
                $(".rerun").show();
            }
            
           i++;
           if(i > 6){
               clearInterval(timer);
           }
       }, 4000);
   }
   
   $scope.contraption();
});