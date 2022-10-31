import arrData from "./data.js";
$(document).ready(function () {
    let currentArray = arrData;
    let lengthArray = currentArray.length;
    const lengthKeys = Object.keys(arrData[1]).length;
    const arrKeys = [];
    let currentPage = 1;
    let currentValue = $(".table-show").val();
    let pageNum = Math.ceil(lengthArray / currentValue);
    let tableHead = "";
    let tableBody = "";

    {
        let tableHeadContent = "";
        for (let i = 0; i < lengthKeys; i++) {
            tableHeadContent += "<th alt=" + i + ">" + Object.keys(arrData[1])[i] + "</th>";
            arrKeys[i] = Object.keys(arrData[1])[i];
        }
        tableHead = "<tr>" + tableHeadContent + "</tr>";
    }

    const changePage = function () {
        if ($(this).attr("class") === "prev") {
            if (currentPage === 1) {
                $(".table-foot li.prev").prop("disabled");
            } else currentPage -= 1;
        } else if ($(this).attr("class") === "next") {
            if (currentPage === pageNum) {
                $(".table-foot li.next").prop("disabled");
            } else currentPage += 1;
        } else {
            currentPage = $(this).index() + 1;
        }
        let numText = "";
        numText = "<p>Show " + ((currentPage - 1) * currentValue + 1) + " to " + ((currentPage === pageNum) ? (lengthArray) : (currentValue * currentPage)) + " of " + lengthArray + " entries</p>"
        $(".table-foot .foot-show-entries").html(numText);
        createPage(currentArray);
        $(".table-foot .list-button button.active").removeClass("active");
        $(".table-foot .list-button button:eq(" + (currentPage - 1) + ")").addClass("active");
    }

    const addPageButton = () => {
        let btn = "";
        for (let i = 1; i <= pageNum; i++) {
            btn += "<li><button " + (currentPage === i ? "class='active'" : "") + ">" + i + "</button></li>";
        }

        let numText = "";
        numText = "<p>Show " + ((currentPage - 1) * currentValue + 1) + " to " + ((currentPage === pageNum) ? (lengthArray) : (currentValue * currentPage)) + " of " + lengthArray + " entries</p>"
        $(".table-foot .foot-show-entries").html(numText);
        $(".table-foot .list-button").html(btn);
    }
    addPageButton();

    const createPage = (currentArray) => {
        tableBody = "";
        if (currentArray.length === 0) {
            tableBody = "<tr><td class='mid-col' colspan=" + lengthKeys + ">No matching records found</td></tr>";
        } else {
            for (let i = (currentPage - 1) * currentValue; i < currentValue * currentPage; i++) {
                if (i >= lengthArray) break;
                let tableBodyContent = "";
                for (let j = 0; j < arrKeys.length; j++) {
                    tableBodyContent += "<td>" + currentArray[i][arrKeys[j]] + "</td>";
                }
                tableBody += "<tr>" + tableBodyContent + "</tr>";
            }
        }
        let table = tableHead + tableBody + tableHead;
        $("table").html(table);
    }
    createPage(currentArray);

    //change
    $(".table-show").change(() => {
        currentValue = $(".table-show").val();
        currentPage = 1;
        pageNum = Math.ceil(lengthArray / currentValue);
        addPageButton();
        createPage(currentArray);
    })

    //search
    const search = (str) => {
        const searchArr = [];
        for (let i = 0; i < arrData.length; i++) {  //duyet tung phan tu cua arrData
            for (let j = 0; j < lengthKeys; j++) {
                if (arrData[i][arrKeys[j]].toLowerCase().includes(str)) {
                    searchArr.push(arrData[i]);
                    break;
                }
            }
        }
        return searchArr;
    }

    $(".head-search").on("keyup", "input", () => {
        let searchVal = $(".search-input").val().toLowerCase();
        currentArray = search(searchVal);
        lengthArray = currentArray.length;
        pageNum = Math.ceil(lengthArray / currentValue);
        addPageButton();
        createPage(currentArray);
    });

    //sort
    const quicksort = function (L, H, thIndex) {
        if (L >= H) { return }
        let i = L, j = H, pivot = currentArray[0][arrKeys[thIndex]].toLowerCase();
        while (i <= j) {
            while (currentArray[i][arrKeys[thIndex]].toLowerCase() < pivot) { i++; }
            while (currentArray[j][arrKeys[thIndex]].toLowerCase() > pivot) { j--; }
            if (i <= j) {
                if (i < j) {
                    let temp = currentArray[i];
                    currentArray[i] = currentArray[j];
                    currentArray[j] = temp;
                }
                i++; j--;
            }
            quicksort(L, j, thIndex); quicksort(i, H, thIndex);
        }
        return currentArray;
    }

    $(".table-main tr th").click(function () {
        let thIndex = $(this).attr("alt");
        let sortArray = quicksort(0, currentArray.length - 1, thIndex);
        console.log(sortArray);
    })

    let items = [5, 3, 7, 6, 2, 9];
    const swap = (items, leftIndex, rightIndex) => {
        let temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }
    const partition = (items, left, right) => {
        let pivot = items[Math.floor((right + left) / 2)], 
            i = left, 
            j = right; 
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j); 
                i++;
                j--;
            }
        }
        return i;
    }

    const quickSort = (items, left, right) => {
        let index;
        if (items.length > 1) {
            index = partition(items, left, right); 
            if (left < index - 1) { 
                quickSort(items, left, index - 1);
            }
            if (index < right) { 
                quickSort(items, index, right);
            }
        }
        return items;
    }
    let sortedArray = quickSort(items, 0, items.length - 1);
    console.log(sortedArray); //prints [2,3,5,6,7,9]

    $(".table-foot .list-button").on("click", "li", changePage);
    $(".table-foot").on("click", ".next", changePage);
    $(".table-foot").on("click", ".prev", changePage);
})


