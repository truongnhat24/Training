import arrData from "./data.js";

$(document).ready(function(){
    const lengthArray = arrData.length;
    const lengthKeys = Object.keys(arrData[1]).length;
    const arrKeys = [];
    

    // const dynamicSort = ("Engine version") => {
    //     let sortOrder = 1;
    //     if(property[0] === "-") {
    //         sortOrder = -1;
    //         property = property.substr(1);
    //     }
    //     return function (a,b) {
    //         var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    //         return result * sortOrder;
    //     }
    // }
    const tableSort = () => {
            arrData.sort((a, b) => (a["Engine version"] > b["Engine version"]) ? 1 : -1);
    }
    
    tableSort();


    let tableHead = "";
    {
        let tableHeadContent = "";
        for     ( let i = 0; i < lengthKeys; i++) {
            tableHeadContent += "<th>" + Object.keys(arrData[1])[i] + "</th>";
            arrKeys[i] = Object.keys(arrData[1])[i];
        }
        tableHead = "<tr>" + tableHeadContent + "</tr>";
    }

    let tableBody = "";
    {
        for ( let i = 0; i < lengthArray; i++) {
            let tableBodyContent = "";
            for ( let j = 0; j < arrKeys.length; j++){
                tableBodyContent += "<td>" + arrData[i][arrKeys[j]] + "</td>";
            }
            tableBody += "<tr>" + tableBodyContent + "</tr>";
        }
    }
    let table = tableHead + tableBody + tableHead;
    $("table").html(table);
    console.log(table);

})