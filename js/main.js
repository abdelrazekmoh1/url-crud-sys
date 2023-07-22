//all elements
var closeBtn = document.getElementById('closeBtn')
var overly = document.getElementById('overly')
var addBookMarkBtn = document.getElementById('addBookMarkBtn')
var urlInput = document.getElementById('urlInput')
var BookMarkNameInput = document.getElementById('BookMarkNameInput')
overly.style.display = 'none'
var table = document.getElementById('table')


var allBookMarks;
if(localStorage.getItem('allBookMarks')==null)
{
    table.style.visibility = 'hidden'
    allBookMarks = []

}
else
{
    allBookMarks = JSON.parse(localStorage.getItem('allBookMarks'))
    showData()
}

//validation


closeBtn.addEventListener('click',hideOverlay)




addBookMarkBtn.addEventListener('click',function(){
    if(!isEmpty())
    {
        if(isvalide())
        {
            var siteInfo = {
                sitUrl:urlInput.value,
                siteName:BookMarkNameInput.value,
            }
            allBookMarks.push(siteInfo)
            console.log(allBookMarks)
            saveToStoreg()
            showData()
        }
        else
        {
            showOverly()
        }
        clearInputs()
    }
    else
    {
        showOverly()
    }
})


function saveToStoreg()
{
    localStorage.setItem('allBookMarks',JSON.stringify(allBookMarks))
}

function showData()
{
    table.style.visibility = 'visible'
    var html = ''
    for(var i=0; i< allBookMarks.length; i++)
    {
        html += `
        <tr>
        <td>${i}</td>
        <td>${allBookMarks[i].siteName}</td>
        <td class="w-25 text-center">
            <a class="w-25 btn btn-outline-info btn-sm" href="${allBookMarks[i].sitUrl}" target="_blank">Visit</a>
            <button onclick="deleteUrl(${i})" class="w-25 btn btn-outline-danger btn-sm">Delete</button>
        </td>
    </tr>
        `
    }
    document.getElementById('tableContent').innerHTML = html
}

function clearInputs()
{
    urlInput.value = ''
    BookMarkNameInput.value = ''
}

function isEmpty()
{
    return (urlInput.value =='' || BookMarkNameInput.value == '')
}

function showOverly()
{
    overly.style.display = 'flex'
}

function hideOverlay()
{
    overly.style.display = 'none'
}



function isvalide()
{
    var regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    var regexName = /^[a-z ,.'-]+$/i;
    return (regexName.test(BookMarkNameInput.value)&&regexUrl.test(urlInput.value))
}

function deleteUrl(index)
{
    
    allBookMarks.splice(index,1)
    saveToStoreg()
    showData()
}

