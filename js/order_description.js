const order_description = {
	id:"order_description",
	view:"template",
	scroll:"y", //only vertical scroll
	width:552,
	template:
		`
		<img src='#imgSRC#' align='left' width='190' style='padding-right:5px; padding-top:5px;'>
		<b>Book title</b>: "#title#" </br></br>
		<b>Author</b>: "#author#" </br></br>
		<b>Category</b>: #category# </br></br>
		<b>ISBN</b>: #isbn# </br></br>
		<b>Publication date</b>: #publishedDate# </br></br>
		<b>Bindery</b>: #bindery# </br></br>
		<b>Page count</b>: #pageCount# </br>
		<p style = 'line-height: 1.7' ><b>Description</b>: #longDescription#</p>
		`
}
