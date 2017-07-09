//alert("it happens");



function save(e) {
   var name = document.getElementById("site").value;
   var url = document.getElementById("URL").value;
    if (!name || !url){
        alert("Please fill in the forms");
        return false;
    }
    //regular exprssion
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
    if (!url.match(regex)){
        alert("Please input a valid URL, it's in this form: https://www.somewebsite.com");
    }
    
    var bookmark = {
        "name": name,
        "url": url
    };
//    localStorage.setItem("B",JSON.stringify(bookmark));

    
    if(localStorage.getItem("bookmarks") === null){
       
        var bookmarks = [];
        bookmarks.push(bookmark);
//        alert(bookmark);
//        alert(bookmarks[0].name);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else{
       var bookmarks =  JSON.parse(localStorage.getItem("bookmarks"));
       bookmarks.push(bookmark);
       
         
    }
   
    
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    
    
    //keeps printed results in the console
    e.preventDefault();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var results = document.getElementById("bookmark results");
    results.innerHTML = "";
    for(var i = 0; i< bookmarks.length ; i++) {
       
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
         results.innerHTML+= "<div class = \"well\">"
                           +  "<h3>"+name+"<a class =\"btn btn-default\" target=\"_blank\" href ="+url+">Visit</a>"+
          '<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href = "#">Delete<\a>'
             
             
                            "</h3>"+"</div>";
    }
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i =0; i<bookmarks.length; i++) {
        if(url == bookmarks[i].url) {
            bookmarks.splice(i, 1);
        }
    }
    
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}




$(document).ready(function() {  window.document.getElementById("Sbtn").addEventListener("click", save);
});
fetchBookmarks();


 