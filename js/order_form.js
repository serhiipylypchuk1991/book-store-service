const country_data = "./data/country.json";

const order_form = {
	id:"order_form_view",
  view:"form",
  scroll:"y", //only vertical scroll
	width:550,
	elementsConfig:{
 		labelWidth:115
  },
  elements:[
		{
			view:"fieldset", label:"Order information", body:{
				rows:[
					{
						cols:[
							{ view:"label", label:"Order", width:110 },
							{ view:"label", name:"order_name" }
						]
					},
					{ view:"counter", name:"order_count", label:"Quantity", value:1, min:1, max:5 },
					{ view:"text", label:"Gift card", name:"gift_card", placeholder:"Enter code", clear:true },
					{
						cols:[
							{ view:"label", label:"Price", width:110 },
							{ view:"label", name:"total_price" }
						]
				 	},
					{ view:"radio", label:" ", name:"delivery", options:[
					    { id:1, value:"Pick-up" },
					    { id:2, value:"Delivery" }
						],
						on:{
							onChange:function(){
								const value = this.getValue();
								const delivery = $$("delivery_section")
								if(value == 1){
									delivery.hide();
									$$("order_form_view").clearValidation();
								}else{
									delivery.show();
								}
							}
						}
					}
				]
			}
		},
		{
			view:"fieldset", id:"delivery_section", label:"Delivery information", hidden:"true", body:{
				rows:[
					{ view:"combo", clear:"replace", label:"Country", name:"country", placeholder:"Select country", options:country_data, required:true },
					{ view:"text", clear:true, label:"Region", name:"region", placeholder:"Enter State/Province/Region ( Alberta )", required:true },
					{ view:"text", clear:true, label:"City", name:"city", placeholder:"Enter city name ( Vancuver )", required:true },
					{ view:"text", clear:true, label:"Street address", name:"street", placeholder:"Enter street address ( 477 Monteray Ave )", required:true },
					{ view:"text", clear:true, label:"Zip Code", name:"zip_code", placeholder:"Enter Zip code ( V7N )", required:true },
					{ view:"datepicker", clear:"replace", name:"ship_date", label:"Ship date", placeholder:"Select desired ship date", format:"%d %M %Y" },
					{ view:"textarea", label:"Instruction", name:"instruction", placeholder:"Enter additional delivery instructions", height:100 },
					{
						cols:[
							{ view:"switch", name:"insurance", label:"Insurance", onLabel:"yes", offLabel:"no" },
							{
								cols:[
									{ view:"label", label:"Package color" },
									{ view:"colorboard", name:"package_color", value:"#FFB955", borderless:true, width:120, height:30, palette:[["#FFB955", "#F34336", "#2196F3", "#FFEA3B"]] }
								]
							}
						]
					}
				]
			}
		},{},
    {
			cols:[
				{ view:"button", width:150, css:"webix_secondary", label:`<span class="webix_icon mdi mdi-arrow-left"></span><span>Back</span>`, click:orderGoBack },
				{ view:"button", width:150, css:"webix_primary", label:`<span>Next</span><span class="webix_icon mdi mdi-arrow-right"></span>`, click:orderGoNext },
				{}
      ]
    }
  ],
	on:{ onChange:priceCounter }
}

function orderGoBack(){
	$$("trade_list").show();
}

function orderGoNext(){
	if($$("order_form_view").validate()){
		$$("user_form_view").show();
	};
}

function priceCounter(){
	const form = $$("order_form_view");
	const vals = form.getValues();
	let price = vals.initial_price * vals.order_count;

	if($$("delivery_section").isVisible()){
		vals.insurance ? price *= 1.2 : price;
	}

	form.setValues( { total_price:"$" + (price).toFixed(2) }, true );
}
