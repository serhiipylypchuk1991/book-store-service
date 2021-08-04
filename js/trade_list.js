const book_data = "./data/bookdata.json";

const trade_list = {
	id:"trade_list",
	view:"dataview",
	xCount:2,
	select:true,
	template:
	`
		<img src='#imgSRC#' align='left' width='140' style='padding-right:5px; padding-top:5px;'>
		<b>Book title</b>: "#title#" </br>
		<b>Author</b>: "#author#" </br>
		<b>Category</b>: #category# </br>
		<b>ISBN</b>: #isbn# </br>
		<b>Publication date</b>: #publishedDate# </br>
		<b>Price</b>: $#price# </br>
		<button class='webix_button webix_secondary store_btn'> Buy now </button>
	`,
	url:book_data,
	onClick:{
		store_btn:function(e, id){
			const data = this.getItem(id);

			$$("order_description").parse(data);

			$$("order_form_view").setValues({
				initial_price:data.price, //set initial price into hidden field
				order_name:data.title,
				delivery:1, //pick-up by default
				order_count:1,
				insurance:0,
				total_price:"$" + (data.price).toFixed(2)
			}, true);

			$$("order_section").show(); //show module with order description and forms
		}
	},
	type:{ //block settings
		 width: 550,
		 height: 200
	}
}
