let upload = document.getElementById("upload");
let table = document.getElementById("table");
let removeAll = document.getElementById("removeAll");
let dropArea = document.querySelector(".dropArea");
let removeItem = document.getElementById("removeItem");

upload.nextElementSibling.onclick = function () {
    upload.click();
}
upload.onchange = function (ev) {
    uploadFile(ev.target.files);
}
removeAll.onclick = () => {
    table.lastElementChild.innerHTML = "";
    table.style.visibility = "hidden";
    removeAll.classList.add("d-none");
}

dropArea.ondragover = ev => ev.preventDefault();

dropArea.ondrop = function (ev) {
    ev.preventDefault();
    uploadFile(ev.dataTransfer.files)
}

function uploadFile(files) {
    let count = table.lastElementChild.children.length;
    table.style.visibility = "visible";

    for (let file of files) {

        let reader = new FileReader();
        reader.onloadend = function (ev) {
            let tdImg = document.createElement("td");
            let tdName = document.createElement("td");
            let tdSize = document.createElement("td");
            let tdN = document.createElement("td");
            let tdClear = document.createElement("td");
            let tdRemove = document.createElement("td");

            let img = document.createElement("img");
            img.setAttribute("src", ev.target.result);
            tdImg.append(img);
            tdName.innerText = file.name;
            tdSize.innerText = file.size;
            tdN.innerText = ++count;

            let i = document.createElement("i");
            i.className = "fas fa-times";
            i.onclick = function () {
                this.parentElement.parentElement.remove()
                if (table.lastElementChild.children.length != 0) {
                    for (let j = 0; j < table.lastElementChild.children.length; j++) {
                        table.lastElementChild.children[j].firstElementChild.innerText = ++j;
                    }
                } else {
                    removeAll.classList.add("d-none");
                    table.style.visibility = "hidden";
                }

            }
            tdClear.append(i);

            let tr = document.createElement("tr");
            tr.append(tdN, tdImg, tdName, tdSize, tdClear, tdRemove);
            table.lastElementChild.append(tr);
            tr.onclick = function () {
                this.classList.add("selected");
                removeItem.classList.remove("d-none");
            }


            removeItem.onclick = function () {
                let selecteds = document.querySelectorAll(".selected");

                for (let selected of selecteds) {

                    selected.remove();
                    removeItem.classList.add("d-none");
                    table.style.visibility = "hidden";
                }
            }


        }
        removeAll.classList.remove("d-none");
        reader.readAsDataURL(file);
    }
}