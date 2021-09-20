// add new
function addData() {
    var users = [];
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    var userCurrent = localStorage.getItem('userCurrent') ? JSON.parse(localStorage.getItem('userCurrent')) : [];
    let user = {
        work: document.getElementById('work').value,
        description: document.getElementById('description').value,
        day: document.getElementById('day').value,
        status: document.getElementById('status').value,
        username: userCurrent.username
    }
    users.push(user);

    //check value empty

    if (user.work === "" || user.description === "" || user.status === "", user.day === "") {
        alert("Enter full information, Please!")
        return
    };

    localStorage.setItem('users', JSON.stringify(users));
    this.todo();
    location.reload();
}


function todo() {
    var userCurrent = localStorage.getItem('userCurrent') ? JSON.parse(localStorage.getItem('userCurrent')) : [];
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (users.length === 0) {
        document.getElementById('list-user').style.display = 'none';
        return false;
    }
    document.getElementById('list-user').style.display = 'block';
    var listUserHtml = `<tr>
        <td>#</td>
        <td>Name Project</td>
        <td>Description</td>
        <td>Deadline</td>
        <td>Status</td>
        <td>Actions</td>
        </tr>`;

    users.forEach((user, index) => {
        if (user.username == userCurrent.username) {
            listUserHtml += `<tr>
            <td id = "idUser">${index}</td>
            <td>${user.work}</td>
            <td>${user.description}</td>
            <td>${user.day}</td>
            <td>${user.status}</td>
            <td><button type='submit' class='btn btn-secondary btn-edit' onclick='editData(${index});'>Edit</button><button type='submit' class='btn btn-danger btn-delete' onclick='deleteData();'>Delete</button></td>
            </tr>`;
        }
    })
    document.getElementById('list-user').innerHTML = listUserHtml;

}
var idUser;

function editData(id) {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    users.forEach((users, index) => {
        if (index === id) {
            document.getElementById('work').value = users.work;
            document.getElementById('description').value = users.description;
            document.getElementById('day').value = users.day;
            document.getElementById('status').value = users.status;
            idUser = id;
            document.getElementById('add').style.display = 'none'
            document.getElementById('save').style.display = 'flex'
        }
    })

}

document.getElementById("save").addEventListener("click", function() {
    saveData(idUser);
});

function saveData(id) {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    var work = document.getElementById('work').value
    var description = document.getElementById('description').value
    var day = document.getElementById('day').value
    var status = document.getElementById('status').value
    users.forEach((users, index) => {
        if (index == id) {
            users.work = work;
            users.description = description
            users.day = day
            users.status = status
            alert('Saved!')
        }
    })
    document.getElementById('add').style.display = 'flex'
    document.getElementById('save').style.display = 'none'
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users))
    window.location.reload()
    todo();
}

function deleteData(id) {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    var status = true;
    if (confirm("Are you want to delete?")) {
        const index = users.indexOf(id);
        users.splice(index, 1);
    }
    if (status == false) {
        return status;
    }
    localStorage.removeItem("users")
    localStorage.setItem('users', JSON.stringify(users))
    location.reload();

}

function Logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('mail');
    localStorage.removeItem('userCurrent');
    window.location.href = "http://127.0.0.1:5501/login.html";

}



//pagination
$('#paging').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    pageSize: 5,

})