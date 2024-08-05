let data = JSON.parse(localStorage.getItem('catInfo')) || [];
let editingId = null;

const dispCat = () => {
    let allData = JSON.parse(localStorage.getItem('catInfo'));
    let tr = '';
    if (allData != null) {
        allData.map((i) => {
            tr += `
                <tr>
                    <td>${i.id}</td>
                    <td>${i.name}</td>
                    <td>
                        <button class="btn-warning" onclick="editCat(${i.id})">Edit</button>&nbsp;&nbsp;&nbsp;
                        <button class="btn-danger" onclick="deleteCat(${i.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
    document.getElementById('allcat').innerHTML = tr;
}

const saveData = () => {
    let getData = JSON.parse(localStorage.getItem('catInfo'));
    let cname = document.catfrm.catname.value;
    let errorMsg = document.getElementById('validationMsg')
    if(!cname) {
        errorMsg.style.display = 'block'
        return
    } else {
        errorMsg.style.display = 'none'
    }
    let info = {
        "id": editingId ? editingId : ((getData !== null) ? (getData.length + 1) : 1),
        "name": cname
    };

    data = getData !== null ? getData : []; // Ensure data is in sync with localStorage
    if (editingId) {
        data = data.map(cat => cat.id === editingId ? info : cat);
        editingId = null;
    } else {
        data.push(info);
    }
    localStorage.setItem('catInfo', JSON.stringify(data));
    document.catfrm.catname.value = '';
    dispCat();
}

const deleteCat = (id) => {
    let allData = JSON.parse(localStorage.getItem('catInfo'));
    if (allData != null) {
        allData = allData.filter(cat => cat.id !== id);
        localStorage.setItem('catInfo', JSON.stringify(allData));
        data = allData; // Ensure data is in sync with localStorage
        dispCat();
    }
}

const editCat = (id) => {
    let allData = JSON.parse(localStorage.getItem('catInfo'));
    let cat = allData.find(cat => cat.id === id);
    if (cat) {
        document.catfrm.catname.value = cat.name;
        editingId = id;
    }
}

dispCat();