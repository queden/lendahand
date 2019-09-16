//const CosmosClient = require('@azure/cosmos').CosmosClient;


var request = require('request');
var globalOrganizationName;
var globalZipcode;

$(document).ready(function() {
    /**
 * Action to occur when user inputs their organization name and clicks Event List
 */
$("#to-event-list-btn").click(

    function() {

        createOrganization();

    }

);

/**
 * Action to occur when user inputs their organization name and clicks New Event
 */
$("#new-event-btn").click(

    function() {

        createOrganization();
    }

);
/**
 * Action to occur when organization makes new event
 */
// $("#ad-entry-btn").click(
//     function() {

//         var postID = guid();
//         createPost(postID, globalOrganizationName);

//     }
// );

/**
 * Action to occur when volunteer enters zipcode
 */
$("#zipcode-entry-button").click(
    function() {

        globalZipcode = $("#zipcode-input").val();

    }
);

$("#ad-posting-form").on('click', '#ad-entry-btn', createPost(guid(), globalOrganizationName));

async function createOrganization() {

    globalOrganizationName = $("#org-name").val ();

}

async function createPost(postID, organizationName) {

    var event = {
        Event: {
            id: postID,
            orgName: organizationName,
            eventName: $("#event-name").val(),
            eventDescription: $("#event-description").val(),
            eventDate: $("#event-date").val(),
            eventAddress: $("#event-address").val(),
            volunteersNeeded: $("#event-volunteers").val(),
            volunteersHad: 0
        }
        
    }
    request({
        url: "localhost:5000/event/save",
        method: "POST",
        json: true,
        body: event
    }, function (error, response, body){
        console.log(response);
    });
}

function guid() {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

}
});
