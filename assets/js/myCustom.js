let tr = `<li class="nav-item" role="presentation">
		<a class="nav-link rounded-pill me-1 custPill active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-1" role="tab">All</a>
	</li>`

let allCatData = JSON.parse(localStorage.getItem('catInfo'))
let j = 1;

allCatData.map((i,index)=>{
    tr += `<li class="nav-item" role="presentation">
		<a class="nav-link rounded-pill me-1 custPillBg" id="pills-vegetables-tab" data-bs-toggle="pill" data-bs-target="#pills-${++j}" role="tab">${i.name}</a>
	</li>`
})
let htmlData = document.getElementById('pills-tab');
if(htmlData) {
	htmlData.innerHTML = tr;
}


let allPr = JSON.parse(localStorage.getItem('productInfo'))

let pr = '';
let allCatwisePr = '';

allCatwisePr += `<div class="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-all-tab">
	<div class="row g-4">`
		allPr.map((j) => {
			allCatwisePr += `<div class="col-sm-6 col-md-6 col-xl-3">
				<div class="product_layout_1 overflow-hidden position-relative">
					<div class="product_layout_content bg-white position-relative">
						<div class="product_image_wrap">
							<a class="product_image d-flex justify-content-center align-items-center" href="shop-list.html" target="_blank">
								<img class="pic-1" src="${j.image}" alt="image_not_found">
								<img class="pic-2" src="${j.image}" alt="image_not_found">
							</a>
							<ul class="product_action_btns ul_li_block d-flex">
								<li>
									<a class="tooltips" onclick="addToCart(${j.pid})">
										<i class="fas fa-shopping-bag"></i>
									</a>
								</li>
							</ul>
						</div>
						<div class="product_content">
							<h3 class="product_title">
								<a href="shop-list.html" target="_blank">${j.pname}</a>
							</h3>
							<div class="product_price">
								<span class="sale_price pe-1">$${j.price}</span>
								<del>$${j.price}</del>
							</div>
						</div>
					</div>
				</div>
			</div>`
		})
	allCatwisePr += `</div>
</div>`

let k = 2;
allCatData.map((i) => {
	allCatwisePr += `<div class="tab-pane fade" id="pills-${k++}" role="tabpanel" aria-labelledby="pills-vegetables-tab">
		<div class="row g-4">`
			allPr.map((j) => {
				if(j.category == i.id) {
					allCatwisePr += `<div class="col-sm-6 col-md-6 col-xl-3">
						<div class="product_layout_1 overflow-hidden position-relative">
							<div class="product_layout_content bg-white position-relative">
								<div class="product_image_wrap">
									<a class="product_image d-flex justify-content-center align-items-center" href="shop-list.html" target="_blank">
										<img class="pic-1" src="${j.image}" alt="image_not_found">
									</a>
									<ul class="product_action_btns ul_li_block d-flex">
										<li>
											<a class="tooltips" onclick="addToCart(${j.pid})">
												<i class="fas fa-shopping-bag"></i>
											</a>
										</li>
									</ul>
								</div>
								<div class="product_content">
									<h3 class="product_title">
										<a href="shop-list.html" target="_blank">${j.pname}</a>
									</h3>
									<div class="product_price">
										<span class="sale_price pe-1">$${j.price}</span>
										<del>$${j.price}</del>
									</div>
								</div>
							</div>
						</div>
					</div>`
				}
			})
		allCatwisePr +=`</div>
	</div>`
})
let catHtmlData = document.getElementById('pills-tabContent');
if (catHtmlData) {
	catHtmlData.innerHTML = allCatwisePr;
}

let cartData = []
const addToCart = (id) => {
	console.log(id);
	let getCartData = JSON.parse(localStorage.getItem('cartInfo'))
    let len = getCartData != null ? getCartData.length + 1 : 1;
    let checkData = '';
    if(getCartData != null){
        checkData = getCartData.find((i)=>{
            return i.pid == id
        })
    }

	if(checkData != undefined){
        //qty ++
        let data = getCartData.map((i)=>{
            if(i.pid == id){
                i.qty += 1;
            }   
            return i;
        })
        cartData = data
    } else {
        //push
        let obj = {
            cartid:len,
            pid:id,
            qty:1
        }
        cartData.push(obj)
    }
	// let obj = {
	// 	cartid:1,
	// 	pid:id,
	// 	qty:1
	// }
	// cartData.push(obj)
	localStorage.setItem("cartInfo",JSON.stringify(cartData))
	getCartItemCounter()
}
function getCartItemCounter() {
	let getCartData = JSON.parse(localStorage.getItem('cartInfo'))
    let finalLength = getCartData.length;
    // console.log(finalLength);
	let countHtmlData = document.getElementById("cartCounter");
	if (countHtmlData) {
		countHtmlData.innerHTML = finalLength;
	}
}
getCartItemCounter()

let cartItem = ``;
let value = 0;
let total = 0;
let cartData1 = JSON.parse(localStorage.getItem('cartInfo')) || [];
let allProducts = JSON.parse(localStorage.getItem('productInfo')) || [];
allProducts.map((i) => {
	cartData1.map((j) => {
		if(j.pid == i.pid) {
			cartItem += `<tr>
				<td>
					<div class="cart_product position-relative">
						<div class="item_image">
							<img src="${i.image}" alt="image_not_found">
						</div>
					</div>
				</td>
				<td>
					<div class="item_content">
						<a href="shop-list.html">
							<h4 class="item_title">${i.pname}</h4>
						</a>
					</div>
				</td>
				<td><span class="price_text">$${i.price}</span></td>
				<td>
					<div class="quantity_input">
						<input type="text" class="input_number" value="${j.qty}">
					</div>
				</td>
				<td>
					<span class="total_price">$${(i.price) * (j.qty)}</span>
				</td>
			</tr>`
			value += ((i.price) * (j.qty))
			let subTotal = document.getElementById('subTotal');
			if(subTotal) {
				subTotal.innerText = "$" + value;
				document.getElementById('gt').innerText = "$" + value;
			}
		}
	})
})
let cartDisItem = document.getElementById('cartItems');
if(cartDisItem) {
	cartDisItem.innerHTML = cartItem;
}

let checkOutItem = ``;
let checkOutvalue = 0;
let subtotal = 0;
let checkOutData1 = JSON.parse(localStorage.getItem('cartInfo')) || [];
let allcheckOutProducts = JSON.parse(localStorage.getItem('productInfo')) || [];

allcheckOutProducts.map((i) => {
	checkOutData1.map((j) => {
		if(j.pid == i.pid) {
			let totalPrice = i.price * j.qty;
			subtotal += totalPrice;
			checkOutItem += `<tr>
				<td>
					<div class="cart_product">
						<div class="item_image">
							<img src="${i.image}" alt="image_not_found">
						</div>
						<div class="item_content">
							<h4 class="item_title mb_0">${i.pname}</h4>
						</div>
					</div>
				</td>
				<td>
					<span class="price_text">$${i.price}</span>
				</td>
				<td>
					<span class="quantity_text">${j.qty}</span>
				</td>
				<td><span class="total_price">$${(i.price) * (j.qty)}</span></td>
			</tr>`
		}
	})
})
checkOutItem +=`<tr>
	<td></td>
	<td></td>
	<td>
		<span class="subtotal_text">Subtotal</span>
	</td>
	<td><span class="total_price">$${subtotal}</span></td>
</tr>
<tr>
	<td class="text-left">
		<span class="subtotal_text">TOTAL</span>
	</td>
	<td></td>
	<td></td>
	<td>
		<span class="total_price">$${subtotal}</span>
	</td>
</tr>`
document.getElementById('checkOutItems').innerHTML = checkOutItem;