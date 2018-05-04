const createQuoteForm = document.getElementById("submit-form");

createQuoteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const values = {};
    for(var i =0; i<createQuoteForm.elements.length; i++){
        var fieldName = createQuoteForm.elements[i].name;
        var fieldValue = createQuoteForm.elements[i].value;

    if(fieldName === "category"){
        const selected = document.querySelectorAll("#idselect option:checked");
        values[fieldName] = [];
        for(let element of selected){ // selected is a Nodelist so we use for of to iterate
            values[fieldName].push(element.value);
        }

    }else if(fieldName && fieldValue){
        values[fieldName] = fieldValue;
        }

    }
    console.log("Form Values:", JSON.stringify(values,null,2));


});