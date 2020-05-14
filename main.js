document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementsByTagName('h1')[0].innerText = 'TODO APP';

    getPostList();
});

function getPostList() {
    const tableBody = document.getElementById('rows');
    tableBody.innerHTML = '';

    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
        .then(response => response.json())
        .then(postArray => {
            postArray.forEach(post => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = '<td><button title="Modifica" onclick="editPost(' + post.id + ')" class="btn btn-primary">&#9998;</button> <button title="Elimina" onclick="deletePost(' + post.id + ')" class="btn btn-danger">&#128465;</button> ' + post.title + ' </td>';
                tableBody.appendChild(newRow);
            });
        })
}

function getPost(id) {
    const idFormField = document.getElementById('postId');
    const titleFormField = document.getElementById('postTitle');

    fetch('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(response => response.json())
        .then(post => {
            idFormField.value = post.id;
            titleFormField.value = post.title;
        })
}

function createPost(event) {
    event.preventDefault();
    const form = document.forms[0];
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: form
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getPostList();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function editPost(id) {
    const formButtonContainer = document.getElementById('button-container');
    formButtonContainer.innerHTML = '';
    formButtonContainer.innerHTML = '<button class="btn btn-success" id="form-button" onclick="updatePost(event,' + id + ')" type="submit">Invia</button>';

    getPost(id);
}

function updatePost(event, id) {
    event.preventDefault();
    const form = new FormData(document.getElementById('detail-form'));
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
        method: 'PATCH',
        body: form
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getPostList();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function resetForm() {
    const formButtonContainer = document.getElementById('button-container');
    formButtonContainer.innerHTML = '';
    formButtonContainer.innerHTML = '<button class="btn btn-success" id="form-button" onclick="createPost(event)" type="submit">Invia</button>';

    document.forms[0].reset();
}

function deletePost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
        method: 'DELETE'
    })    .then(data => {
        console.log('Success:', data);
        getPostList();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

