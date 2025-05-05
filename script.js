const InputField = document.querySelector(".input-field");
const SearchBtn = document.querySelector(".search-btn");
const Main = document.querySelector(".main");

function GitUserDetails(userName){
    return fetch(`https://api.github.com/users/${userName}`).then(raw => {
        if(!raw.ok) throw new Error("User not Found ");
        return raw.json();
    })
}

function ShowingDataInCard(details){    
    console.log(details)
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

    Main.innerHTML = card;
}

SearchBtn.addEventListener("click", () => {
    if(InputField.value){
        let userName = InputField.value.trim();
        GitUserDetails(userName).then(data => {
            ShowingDataInCard(data);
        })
    }
    else {
        alert("Please Write a Name Madarchood...")
    }
})

function userRepos(){
    return fetch('https://api.github.com/users/BinodRai123/repos').then(raw => raw.json());
}

userRepos().then(data => console.log(data))