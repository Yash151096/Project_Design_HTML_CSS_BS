let data = [];
let editingId = null

const dispCat = ()=>{
    let allData = JSON.parse(localStorage.getItem('catInfo'))
    
    let tr = '<option>--Select Category--</option>';
    if(allData != null){
        allData.map((i)=>{
            tr += `
                <option value="${i.id}">${i.name}</option>
            `
        })
    }  
    document.getElementById('catname').innerHTML = tr
}
const dispData = ()=>{
    let data = JSON.parse(localStorage.getItem('productInfo')) || [];
    let catdata = JSON.parse(localStorage.getItem('catInfo')) || [];
    let tr = '';
    if(data !== null){
        data.map((i)=>{
            catdata.map((j)=>{
                if(j.id == i.category){
                    i.category = j.name 
                }
            })
            tr += `
            <tr>
                <td>${i.pid}</td>
                <td><img src=${i.image} height="50px" width="50px"/></td>
                <td>${i.pname}</td>
                <td>${i.category}</td>
                <td>${i.price}</td>
                <td>
                    <button class="btn-warning" onclick="editProd(${i.pid})">Edit</button>&nbsp;&nbsp;&nbsp;
                    <button class="btn-danger" onclick="deleteProd(${i.pid})">Delete</button>
                </td>
            </tr>
        `;
        })
    }
    document.getElementById('allpr').innerHTML = tr;
}

dispCat();
dispData();

const getImageUrl = (e)=>{
    let img = e.files[0];
    console.log(img);
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("load", function(e) {
        var image = e.target.result;
        localStorage.setItem('productimage',image)
        $("#imgthumbnail").attr('src', image);
    });
}

const saveData = ()=>{
    let pid = document.prfrm.pid.value;
    let pname = document.prfrm.prname.value;
    let price = document.prfrm.price.value;
    let catname = document.prfrm.catname.value;
    let desc = document.prfrm.desc.value;
    let image = localStorage.getItem('productimage');
    let prod_data = JSON.parse(localStorage.getItem('productInfo')) || [];
    let len = prod_data ? prod_data.length + 1 : 1;

    if(pid != '') {
        //Update
        let data1 = prod_data.map((i) => {
            if(i.pid == pid) {
                i.pname = pname;
                i.price = price;
                i.category = catname;
                i.desc = desc;
                i.image = (image != '') ? image : i.image;
            }
            return i;
        });
        data = data1;
    } else {
        //Insert
        data.push({
            pid:len,
            pname:pname,
            price:price,
            category:catname,
            desc:desc,
            image:image
        })
    }
    localStorage.setItem("productInfo",JSON.stringify(data))
    localStorage.removeItem('productimage')
    document.prfrm.reset()
    $('#imgthumbnail').attr('src', '')
    dispData();
}

const deleteProd = (pid) => {
    let prod_data = JSON.parse(localStorage.getItem('productInfo')) || [];
    prod_data = prod_data.filter(product => product.pid !== pid);
    localStorage.setItem("productInfo", JSON.stringify(prod_data));
    dispData();
};

const editProd = (pid) => {
    let data = JSON.parse(localStorage.getItem('productInfo'));
    let data1 = data.find((i) => {
        return i.pid == pid
    });
    document.prfrm.prname.value = data1.pname;
    document.prfrm.price.value = data1.price;
    document.prfrm.catname.value = data1.category;
    document.prfrm.desc.value = data1.desc;
    document.getElementById('imgthumbnail').src = data1.image;
    document.getElementById('pid').value = pid;
}