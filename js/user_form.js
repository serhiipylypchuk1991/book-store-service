const user_form = {
	id:"user_form_view",
  view:"form",
  scroll:false,
	width:550,
	elementsConfig:{
 		labelWidth:115
  },
  elements:[
		{
			view:"fieldset", label:"User information", body:{
				rows:[
					{ view:"text", clear:true, label:"First Name", name:"first_name", placeholder:"John", required:true, invalidMessage:"First Name can not be empty" },
					{ view:"text", clear:true, label:"Last Name", name:"last_name", placeholder:"Smith", required:true, invalidMessage:"Last Name can not be empty" },
					{ view:"counter", label:"Age", name:"age", min:18, max:100 },
					{ view:"radio", label:"Gender", name:"gender", options:[
							{ id:1, value:"Male" },
							{ id:2, value:"Female" }
						]
					},
					{ view:"text", clear:true, label:"Email", name:"email", placeholder:"johnsmith@gmail.com", required:true, invalidMessage:"Incorrect email address" },
					{ view:"text", clear:true, label:"Phone", name:"phone", placeholder:"+1 (123) 321-3456", required:true, pattern:webix.patterns.phone, bottomLabel:"*The phone number must have 11 characters" }
				]
			}
		},{},
    {
			cols:[
					{ view:"button", width:150, css:"icon_back_btn webix_secondary", label:`<span class="webix_icon mdi mdi-arrow-left"></span><span>Back</span>`, click:userGoBack },
			 		{ view:"button", width:150, css:"icon_back_btn webix_primary", label:`<span>Next</span><span class="webix_icon mdi mdi-arrow-right"></span>`, click:userGoNext },
			 		{}
      ]
    }
  ],
	rules:{
		"email":webix.rules.isEmail, //build-in rule
		"phone":function(value){ return value.length === 11 } //custom rule
	}
}

function userGoBack(){
	$$("user_form_view").clearValidation(); //clear validation
	$$("form_multiview").back(); //show previous module 
}

function userGoNext(){
	if($$("user_form_view").validate()){
		$$("payment_form_view").show();
	};
}
