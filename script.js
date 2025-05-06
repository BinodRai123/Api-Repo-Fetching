const InputField = document.querySelector(".input-field");
const SearchBtn = document.querySelector(".search-btn");
const Main = document.querySelector(".main");
let errorCard = Main.querySelector("#errorBox");

//Handling Enter Btn in the input field
InputField.addEventListener("keypress", (event) => {
  if(event.key === 'Enter') {
    handleUserSearch();
  }
})

// It handle the User Search and provide result
function handleUserSearch(){
  if(InputField.value){
    let userName = InputField.value.trim();
    fetchUserDetails(userName).then(data => {
        ShowingDataInCard(data);
    })
  }
  else {
    alert("Oops! You forgot to enter a username 😅");
  }
}

// Hanlde and Display Error And Clear the Old card to display other Card
function handleErrorAndClearOldCard(action){
  if(errorCard) {
    errorCard.classList[action]("hidden");
    
  }
  
  const oldCard = Main.querySelector("#userCard");
  if(oldCard) Main.removeChild(oldCard);
}

// It handle user not Found Error and throw an error while stopping all the code right there!!
function handleUserNotFoundAndStop(raw){
  if(!raw.ok) {
    handleErrorAndClearOldCard("remove");

    throw new Error("User Not Found...");
  }
}

// It fetch the User details
function fetchUserDetails(userName){
  return fetch(`https://api.github.com/users/${userName}`).then(raw => {
        handleUserNotFoundAndStop(raw);
        return raw.json();
    })
}

//Displaying userDetails in the DOM
function ShowingDataInCard(details){  
  handleErrorAndClearOldCard("add");
  
    let card = `<div
            id="userCard"
            class="bg-white rounded-2xl shadow-lg p-6 flex gap-6 items-center"
          >
            <!-- Avatar -->
            <img
              id="avatar"
              class="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              src="${details.avatar_url}"
              alt="User Avatar"
            />
      
            <!-- User Details -->
            <div class="space-y-2">
              <h2 id="name" class="text-xl font-semibold text-gray-800">${details.login}</h2>
              <p id="bio" class="text-gray-600 text-sm">${details.bio ? details.bio : 'Sorry no Bio...'}</p>
      
              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                <div><strong>Followers:</strong> <span id="followers">${details.followers}</span></div>
                <div><strong>Following:</strong> <span id="following">${details.following}</span></div>
                <div><strong>Public-Repos:</strong> <span id="repos">${details.public_repos}</span></div>
                <div><strong>Company:</strong> <span id="company">${details.company ? details.company : 'N/A'}</span></div>
                <div><strong>Blog:</strong> <a href="#" id="blog" class="text-blue-500 hover:underline">${details.blog ? details.blog : 'N/A'}</a></div>
                <div><strong>Location:</strong> <span id="location">${details.location}</span></div>
              </div>
            </div>
          </div>`

    Main.insertAdjacentHTML("afterbegin", card);
}

//Handling Search Btn
SearchBtn.addEventListener("click", () => {
  handleUserSearch();
})
