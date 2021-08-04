const payment_form = {
	id:"payment_form_view",
  view:"form",
  scroll:false,
	width:550,
	elementsConfig:{
 		labelWidth:119
  },
  elements:[
		{
			view:"fieldset", label:"Payment information", body:{
				rows:[
					{ view:"text", clear:true, label:"Card number", name:"card_number", placeholder:"Enter card number", pattern:webix.patterns.card, required:true, invalidMessage:"Card number is required" },
					{ view:"text", clear:true, label:"Name on card", name:"card_owner", placeholder:"Enter cardholder's name", required:true, invalidMessage:"Cardholder's name is required" },
					{
						cols:[
							{ view:"label", label:"Expiration date <span class = 'red'>*</span>", width:120 },
							{
								cols:[
									{ view:"richselect", clear:"replace", name:"month", width:75, options:[ "01", "02", "03", "04", "05", "06", "07", "07", "09", "10", "11", "12" ], required:true },
									{ view:"richselect", clear:"replace", name:"year", width:90, options:[ "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030" ], required:true },
									{}
								]
							}
						]
					},
					{ view:"text", clear:true, label:"CVV", name:"cvv_code", type:"password", placeholder:"Enter CVV code", required:true, invalidMessage:"CVV code is required", pattern:{ mask:"###", allow:/[0-9]/g } },
					{ view:"checkbox", name:"default_payment", labelRight:"Set as default payment method" },
				]
			}
		},{},
    {
			cols:[
				{ view:"button", width:150, css:"icon_back_btn webix_secondary", label:`<span class="webix_icon mdi mdi-arrow-left"></span><span>Back</span>`, click:paymentGoBack },
				{ view:"button", width:150, css:"icon_back_btn webix_primary", label:"Make order", click:makeOrder },
				{}
      ]
    }
  ]
}

function paymentGoBack(){
	$$("payment_form_view").clearValidation(); //clear validation
	$$("form_multiview").back(); //show previous module 
}

function makeOrder(){
	const payment_form = $$("payment_form_view");
	const user_form = $$("user_form_view");
	const order_form = $$("order_form_view");

	if(payment_form.validate()){

		webix.alert({
		  title:"Order information",
		  ok:"Ok",
		  text:"We will send you detail information about your order on your email"
		}).then(function(){
			//all data for processing
			const order_vals = order_form.getValues();
			const user_vals = user_form.getValues();
			const payment_vals = payment_form.getValues();

			payment_form.setValues({}); //clear payment form

			order_form.show(); //go back to the order form

			$$("trade_list").show(); //go back to the trade list
		});

	}
	/* another logic*/
}
