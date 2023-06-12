const inputButEl = document.getElementById("input-btn")
const tabEl = document.getElementById("tab-btn")
const deleteEl = document.getElementById("delete-btn")

const inputEl = document.getElementById("input")
const shewolf = document.getElementById("ulyana")

let LinkList = []

if (localStorage.getItem("key")) {
  let SavedLinks = JSON.parse(localStorage.getItem("key"))
  LinkList = SavedLinks
  MakeList()
}




 // basically, if the input is not empty, then triggers the same function when clicking input button, but pressing enter.

inputEl.addEventListener("keyup", function(KeyboardEvent) {
  KeyboardEvent.preventDefault();
  if (KeyboardEvent.key === "Enter" && inputEl.value) {
    
      LinkList.push(inputEl.value)
      MakeList()
      localStorage.setItem("key",JSON.stringify(LinkList))
      inputEl.value = ""
    }
  



  }
);






// Here we are making the input button push the link into the Linklist Array and put it into the ul we have. everytime we trigger it we have to clear the current ul to not duplicate stuff, we alspo clear the input bar.
inputButEl.addEventListener("click", function(){
  if (inputEl.value) {
    LinkList.push(inputEl.value)
    MakeList()
    localStorage.setItem("key",JSON.stringify(LinkList))
    inputEl.value = ""
  }


});


// found in stack overflow. Takes the url from the current tab and storage it in the var url. Then I push it to my array and trigger MakeList, putting it into the list <ul>
tabEl.addEventListener("click", function(){
  
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function 
  (tabs) {
    var url = tabs[0].url
    LinkList.push(url)
    MakeList() 
    localStorage.setItem("key",JSON.stringify(LinkList))
  })


});


// Just deleting from the array and cleaning the <ul>
deleteEl.addEventListener("click", function() {
  shewolf.innerHTML = ""
  LinkList = []
  localStorage.clear()
})



// el tag <a> is to show a link, target blank to open in another tab. we use template string to make it simpler and readable. <li> is to make it an element from the <ul>, being part of the list.
function MakeList() {

  shewolf.innerHTML = ""
  for (let i = 0; i < LinkList.length; i++) {
    shewolf.innerHTML += `  <li> <a href="${LinkList[i]}" target="_blank" > ${LinkList[i]} <a/> </li> `
  }
  
}


