// API which provides user data
const APIURL = "https://api.github.com/users/";

// we need to target the main division in the html code 
const main = document.querySelector("#main");

// search box is a global variable
const searchBox = document.querySelector("#search")

// async fucntion because we need to use fetch to get username
const getUser = async(username) => {

    // (APIURL + username) was used to concatenate username after the end / in the APIURL
    const response = await fetch(APIURL + username);

    if(response.status === 404){
        main.innerHTML = "ERROR : Profile Not Found"
    }
    else{
    // response should be converted into json format and should be assigned to data variable
    const data = await response.json()
    console.log(data)
    // card code taken from html file
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                  
                </div>
            </div>
        </div>
    `
    main.innerHTML = card;
    getRepos(username)
    }
}


// initial call
getUser("esha-alvi")


const getRepos = async(username) => {
    // all respositries will be added to the repos variable
    const repos = document.querySelector("#repos")

    // we add the repos part to fetch all repositries of the corresponding username
    const response = await fetch(APIURL + username + "/repos")

    // the next line of code will not be executed until this line is completed since we are using await
    const data = await response.json();

    data.forEach(
        (item) => {
            // this element is an anchor tag (link from one page to another)
            const elem = document.createElement("a")
            elem.classList.add("repo")
            // takes the url of every item and adds it to the anchor tag 
            elem.href = item.html_url
            elem.innerText = item.name
            elem.target = "_blank"
            // all repositries will be appended to the element 
            repos.appendChild(elem)
        }
    )
}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        // clear the search box
        searchBox.value = ""
    } 
    return false;
}


searchBox.addEventListener(
        "focusout",
        function() {
            formSubmit()
        }
    )
    /**
     *   <a class="repo" href="#" target="_blank">Repo 1</a>
                        <a class="repo" href="#" target="_blank">Repo 2</a>
                        <a class="repo" href="#" target="_blank">Repo 3</a>
     */