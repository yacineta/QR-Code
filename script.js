const wrapper = document.querySelector(".wrapper" ),
form = wrapper.querySelector("form" ),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = form.querySelector(".close");
copyBtn = form.querySelector(".copy");



function fetchRequest(formData,file){
    infoText.innerText = "Scanning QR Code...";
    fetch("  ",{
        method:"POST",body: formData
    }).then(res => res.json()).then(result =>{
        result = result[0].symbol[0].data;
        // console.log(result);
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code ";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText ="Couldn't Scan QR Code";
    })
}

fileInp .addEventListener("change", e =>{
    let file = e.target.files;
    if(!file) return;
    let formData = new formData();
    formData.append("file",file);
    fetchRequest(formData,file);
    // console.log(file[0]);

});
copyBtn.addEventListener("click", () =>{
    let text =  wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener("click", () => fileInp.click() );
closeBtn.addEventListener("click", () =>  wrapper.classList.remove("active"));


