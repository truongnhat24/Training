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
            tableHeadContent += "<th alt="+i+">" + Object.keys(arrData[1])[i] + "</th>";
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
    const quicksort = (sortArr, k) => {
        if (sortArr.length <= 1) return sortArr;
        else {
            let i = 0, j = sortArr.length-1, pivot = sortArr[0][arrKeys[k]];
            while (i < j) {
                while (sortArr[i][arrKeys[k]] < pivot) { i++; }
                while (sortArr[j][arrKeys[k]] > pivot) { j--; }
                if (i <= j) {
                    if (i < j) {
                        let temp = sortArr[i];
                        sortArr[i] = sortArr[j];
                        sortArr[j] = temp;
                    }
                    i++; j--;
                }
            }
            quicksort(sortArr, 0, j); quicksort(sortArr, i, sortArr.length-1);
        }
        return sortArr;
    }
    $(".table-main tr th").click(function(){
        let k = $(this).attr("alt");
        let sortArray = quicksort(currentArray, k);
        console.log(sortArray);
    })

    $(".table-foot .list-button").on("click", "li", changePage);
    $(".table-foot").on("click", ".next", changePage);
    $(".table-foot").on("click", ".prev", changePage);
})