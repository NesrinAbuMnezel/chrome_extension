
let input_text = document.getElementById("input_text");
let save_input = document.getElementById("save_input");
let save_tab = document.getElementById("save_tab");
let delete_all = document.getElementById("delete_all");
let ul_tab = document.getElementById("ul_tab");

let myLeads = [];
let data = JSON.parse(localStorage.getItem("myLeads"));

if (data) {
    myLeads = data;
    render(myLeads);
}else{
    myLeads = [];
}

save_tab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
            </li>
        `
    }
    ul_tab.innerHTML = listItems;
}

delete_all.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

save_input.addEventListener("click", function () {
    myLeads.push(input_text.value);
    input_text.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})