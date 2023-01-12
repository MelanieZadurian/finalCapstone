//This is my javascript file for my website about avian husbandry
//Due to the nature of my webpage, I don't have recipes or articles. But I do have images
//So I have made sure all images have a like button and a save button, as required by the task.

//First create variable savedImageContainer to store the element with the id 'savedImages'.
let savedImageContainer = document.getElementById("savedImages");

//Then create an array (likeButtonsArr) of all the elements with the likeButton class
let likeButtonsArr = document.querySelectorAll(".likeButton");

//Then create an array (saveButtonsArr) of all the elements with the saveButton class
let saveButtonsArr = document.querySelectorAll(".saveButton");

//Create empty array called savedImages. This will store the images that a user saves for later.
let savedImages = []

//This function is called when the homepage loads.
//It calls all of the other functions that I've made (we'll see what these do as we come to them)
function homePageLoaded() {
    savedForLaterLoaded();
    likeButtons();
    saveButtons();
    contactMeButton();
    commentButton();
}

//This function is called when the myBirds page loads. 
//It calls the likeButtons and saveButtons functions, as these are both used on this page.
function myBirdsLoaded() {
    likeButtons();
    saveButtons();
};

//Create function called savedForLaterLoaded. This happens when my save for later page loads.
function savedForLaterLoaded() {
    //First, we check if it's our first time loading the site (i.e if there's nothing in session storage)
    //If it's the first time, then we store a stringified version of the savedImages array in session storage
    //And then call the savedForLaterLoaded function again
    if (sessionStorage.getItem("hasRun") === null) {
        sessionStorage.setItem("images", JSON.stringify(savedImages));
        sessionStorage.setItem("hasRun", true);
        savedForLaterLoaded();
    } else {
        //If it's not our first time loading the page:
        //If there's images stored in session storage, then put them (using JSON parse so they're usable) in savedImages
        console.log("Hello second time")
        if (JSON.parse(sessionStorage.getItem("images")) != null){
            savedImages = JSON.parse(sessionStorage.getItem("images"));
        }

        /* The savedImages array stores the images src for each image. But it's in a format that isn't good,
        so for each item in the array I'm changing the src so that it is relative
        Then, create a new figure, and give it the innerHTML of these new items, such that it'll display an image.
        Then, append these new figures to the savedImageContainer, so that it displays on the webpage. */
        savedImages.forEach(function(item){
            console.log(item)
            if (item == "file:///C:/Users/Mel/Dropbox/MZ22090003663/Web%20Development%20Bootcamp/T42/Images/zeldaPhoto.jpg"){
                item = "../Images/zeldaPhoto.jpg"
            } else if (item == "file:///C:/Users/Mel/Dropbox/MZ22090003663/Web%20Development%20Bootcamp/T42/Images/groupPhoto.jpg"){
                item = "../Images/groupPhoto.jpg"
            } else if (item == "file:///C:/Users/Mel/Dropbox/MZ22090003663/Web%20Development%20Bootcamp/T42/Images/ayatoPhoto.jpg"){
                item = "../Images/ayatoPhoto.jpg"
            } else if (item == "file:///C:/Users/Mel/Dropbox/MZ22090003663/Web%20Development%20Bootcamp/T42/Images/adoraPhoto.jpg"){
                item = "../Images/adoraPhoto.jpg"
            } else if (item == "file:///C:/Users/Mel/Dropbox/MZ22090003663/Web%20Development%20Bootcamp/T42/Images/groupPhoto.jpg"){
                item = "../Images/allanaPhoto.jpg"
            }
            let newFig = document.createElement("figure");
            newFig.innerHTML = `<img src=${item} class="birdPhoto">`
            savedImageContainer.appendChild(newFig)
        })
    }
};


//Create function called likeButtons.
/*For each item in the likeButtonArr (e.g for each of the like buttons on my webpage)
Add an eventlistener such that when clicked, the button's class will change to likedButton
This means it'll change visually to show it's been liked
Our lecturer said that this was all we had to do for the like buttons - we didn't need to keep track of what
had been liked, or store them anywhere, just have the button visually change when clicked.
So I've done what was asked here.*/
function likeButtons() {
    likeButtonsArr.forEach(function(button) {
        button.addEventListener("click", function(e) {
            if (e.isTrusted) {
                button.className = "likedButton";
            }
        })
    })

}

//Create function called saveButtons.
/*For each item in the saveButtonArr (e.g for each of the save for later buttons on my webpage)
Add an eventlistener such that when clicked, the button's class will change to savedButton
and the innerText will change to 'Saved for later' (rather than 'Save for later?')
This means it'll change visually to show it's been saved.
Additionally, we're going to grab the image src of the image that the button is next to, and store this
as imageSrc. Then push imageSrc to savedImages.
Then we will send an alert telling the user how many things they've saved for later
And finally, save the updated savedImages in sessionstorage.*/
function saveButtons() {
    saveButtonsArr.forEach(function(button) {
        button.addEventListener("click", function(e) {
            if (e.isTrusted) {
                button.className = "savedButton";
                button.innerText = "Saved for later"

                if (JSON.parse(sessionStorage.getItem("images")) != null) {
                    savedImages = JSON.parse(sessionStorage.getItem("images"))
                }

                let imageSrc = button.parentElement.previousElementSibling.src;

                savedImages.push(imageSrc)

                alert(`Successfully saved for later! You now have ${savedImages.length} items saved for later!`)

                sessionStorage.setItem("images", JSON.stringify(savedImages));
                
            }
        })
    })

}


//Here we will store some elements as variables. These are all the different elements from my contact me form.
let contactMe = document.getElementById("contactMe");
let inputName = document.getElementById("nameInput");
let inputEmail = document.getElementById("emailInput");
let inputMessage = document.getElementById("messageInput");


//Create function contactMeButton.
/*This adds an eventlistener to the contact me button, such that, so long as a user has inputted something,
they will get an alert thanking them for their submission and the input boxes will return to being blank.
Our lecturer said this was all we had to do for the contact me form (e.g we don't have to make it actually do anything, 
or send information anywhere)*/
function contactMeButton() {

        contactMe.addEventListener("click", function(e) {
            if (e.isTrusted) {
                if ((inputName.value).length == 0 || (inputEmail.value).length == 0) {
                    alert("Please ensure you fill in both name and email address");
                } else {
                    alert("Thank you " + inputName.value + " for your submission! We'll be in touch soon");
                    inputName.value = "";
                    inputEmail.value = "";
                    inputMessage.value = "";
                }
            }
        })
}

//Here we will store some elements as variables. These are all the different elements from my leave a comment form.
let commButton = document.getElementById("commentButton");
let nameInput = document.getElementById("commentNameInput");
let commentInput = document.getElementById("commentInput");

//Create function commentButton.
/*This adds an eventlistener to the button on the leave a comment form, such that, so long as a user has inputted something,
they will get an alert thanking them for their comment and the input boxes will return to being blank.
Our lecturer said this was all we had to do for the comment form (e.g we don't have to make it actually post the comments anywhere
or save them or anything like that)*/
function commentButton() {
    commButton.addEventListener("click", function(e) {
        if (e.isTrusted) {
            if ((nameInput.value).length == 0 || (commentInput.value).length == 0) {
                alert("Please ensure you fill in both name and comment");
            } else {
                alert("Thank you " + nameInput.value + " for your comment! Our moderators will review it before posting");
                nameInput.value = "";
                commentInput.value = "";
            }
        }
    })
}
