document.getElementById("openModalButton").addEventListener("click", function() {
    document.getElementById("myModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("myModal").style.display = "none";
});




const submitbtn = document.getElementById("submit");

submitbtn.addEventListener("click", function() {
    event.preventDefault();
    if(!urlCheck()){
        alert("Url invalid");
        return;
    };
    const titleInput = document.getElementById("title");
    const urlInput = document.getElementById("url");
    var categoryInput = document.getElementById("category");
    var categoryInput2 = document.getElementById("categorynew");
    if(categoryInput2.value!=null){
        var categoryval = categoryInput2.value;
    }
    else {
        var categoryval = categoryInput.value;
    }

    const formData = {
        id: new Date().getTime(), // Generate a unique ID using the current timestamp
        title: titleInput.value,
        url: urlInput.value,
        category:categoryval
    };

    let storedData = localStorage.getItem("bookMark");
    let formDataArray = [];

    if (storedData) {
        formDataArray = JSON.parse(storedData);
    }

    formDataArray.push(formData);

    localStorage.setItem("bookMark", JSON.stringify(formDataArray));

    alert("Book Mark data saved!");

    // Clear form inputs
    titleInput.value = "";
    urlInput.value = "";
    categoryInput.value = "";
    document.getElementById("myModal").style.display = "none";
});




// Retrieve form data from local storage
const storedFormData = localStorage.getItem("bookMark");
if (storedFormData) {
    const formDataArray = JSON.parse(storedFormData);

    // Group the form data by category
    const groupedData = groupDataByCategory(formDataArray);

    // Generate HTML to display the grouped data
    const html = generateHTML(groupedData);

    // Display the HTML in the data container
    const dataContainer = document.getElementById("allBookMark");
    dataContainer.innerHTML = html;
}

function groupDataByCategory(data) {
    const groupedData = {};
    for (const item of data) {
        const category = item.category;
        if (groupedData.hasOwnProperty(category)) {
            groupedData[category].push(item);
        } else {
            groupedData[category] = [item];
        }
    }
    return groupedData;
}

function generateHTML(groupedData) {
    let html = "";
    for (const category in groupedData) {
        html += `<h4>${category}</h4>`;
        const items = groupedData[category];
        html += `<div class="border bookmarklist">`;
        for (const item of items) {
            html += `<ul class="item">`;
            html += `<li >${item.title}</li>`;
            html += `<li  ><button onclick="handleDetailsButtonClick('${item.id}')">Details</button></li>`;
            html += "</ul>";
        }
        html += "</div>";
    }
    return html;
}
function handleDetailsButtonClick(id) {

    var bookdetails = document.getElementById('bookmark-details');
    var data = getItemById(id);
    var dtitle = document.getElementById('dtitle');
    var durl = document.getElementById('durl');
    var dcat = document.getElementById('dcat');
    dtitle.innerText= "Title: "+data.title;
    durl.innerText = "URL: "+data.url;
    dcat.innerText ="Category: "+data.category;
    bookdetails.style.display = "block";
}

function getItemById(itemId) {
    // Retrieve form data from local storage
    const storedFormData = localStorage.getItem("bookMark");
    if (storedFormData) {
        const formDataArray = JSON.parse(storedFormData);
        return formDataArray.find(item => item.id == itemId);
    }
    return null;
}


function handleaddfield(){

    const form = document.getElementById("myform");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    var cat = document.getElementById('newcat')
    cat.style.display = "block";
    const selectDropdown = document.getElementById('category');
    selectDropdown.disabled = true;
}



const categorySelect = document.getElementById("category");

// Retrieve bookmark data from local storage
const bookmarkData = JSON.parse(localStorage.getItem("bookMark"));

// Create an array to store unique categories
const categories = [];

// Extract unique categories from bookmark data
bookmarkData.forEach((bookmark) => {
    if (!categories.includes(bookmark.category)) {
        categories.push(bookmark.category);
    }
});

// Populate the categories into the select input
categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
});



//url validation check
function urlCheck(){
    const urlvalue = url.value;
    if (validateURL(urlvalue)) {
        return true;

    } else {
        return false;
    }

    function validateURL(urlvalue) {
        const pattern = /^www\.[a-zA-Z0-9-]+\.com$/;
        return pattern.test(urlvalue);
    }
}
