let result = document.getElementById("result")
let calcError = false

function takeValue(num) {
    if (calcError == true) {
        clearInput()
        calcError = false
    }
    if (result.value != 20) {
        result.value += num;
    }
}

function calcAction() {
    var regex = /^[-]?\d+(\.\d+)?([+\-*/][-]?\d+(\.\d+)?)*$/;
    if (regex.test(result.value)) {
        result.value = mainCalc(result.value)
    } else {
        result.value = `Please write valid operation`
        calcError = true
        result.style.color = "red"
    }


}


function mainCalc(str) {
    multiDevideCount = str.split("*").length + str.split("/").length - 2

    while (multiDevideCount > 0) {
        let posA = str.indexOf("*") > 0 ? str.indexOf("*") : str.length
        let posB = str.indexOf("/") > 0 ? str.indexOf("/") : str.length
        let operation = posA < posB ? "*" : "/"
        let numbers = seperateAction(str, operation)
        let replaceNum = numbers[0] + operation + numbers[1]
        str = str.replace(replaceNum, numbers[0] < 0 && numbers[1] < 0 && calc(numbers, operation) >= 0 && str.indexOf(replaceNum) > 0 ? "+" + calc(numbers, operation) : calc(numbers, operation))
        multiDevideCount = str.split("*").length + str.split("/").length - 2
        // console.log(str, numbers, operation, calc(numbers, operation), opCount);
    }
    plusMinusCount = str.split("+").length + str.split("-").length - 2
    plusMinusCount -= str[0] == "-" ? 1 : 0
    while (plusMinusCount > 0) {
        let posA = str.indexOf("+") > 0 ? str.indexOf("+") : str.length
        let posB = str.indexOf("-", 1) > 0 ? str.indexOf("-") : str.length
        let operation = posA < posB ? "+" : "-"
        let numbers = seperateAction(str, operation)
        let replaceNum = numbers[0] + operation + numbers[1]
        str = str.replace(replaceNum, calc(numbers, operation))
        str = str.replace("+-", "-")
        plusMinusCount = str.split("+").length + str.split("-").length - 2
        plusMinusCount -= str[0] == "-" ? 1 : 0
    }
    return str
}




function seperateAction(str, operator) {
    strArr = str.split(operator)
    strArr = strArr.filter(String)

    strArr[0] = str[0] == "-" && operator == "-" ? `-${strArr[0]}` : strArr[0];
    let nums = []
    let savedNum = ""
    for (let i = strArr[0].length - 1; i >= 0; i--) {
        if (strArr[0][i] == "." || strArr[0][i] == "-" || strArr[0][i] >= 0 && strArr[0][i] <= 9) {
            savedNum = strArr[0][i] + savedNum
            if (strArr[0][i] == "-") {
                break
            }
        } else {
            break
        }
    }

    nums.push(parseFloat(savedNum))
    savedNum = ""
    for (let i = 0; i < strArr[1].length; i++) {
        if (strArr[1][i] == "." || strArr[1][i] == "-" || strArr[1][i] >= 0 && strArr[1][i] <= 9) {
            savedNum += strArr[1][i]
        } else {
            break
        }

    }

    nums.push(parseFloat(savedNum))
    return nums
}

function calc(nums, operator) {
    if (operator == "*") {
        return nums[0] * nums[1]
    }
    else if (operator == "-") {
        return nums[0] - nums[1]
    }
    else if (operator == "+") {
        return nums[0] + nums[1]
    }
    else if (operator == "/" && nums[1] != 0) {
        return nums[0] / nums[1]
    } else {
        result.value = `Invalid Operation`
        calcError = true
        throw "Invalid Operation"
    }
}

function clearInput() {
    result.value = ""

    result.style.color = "black"
}










