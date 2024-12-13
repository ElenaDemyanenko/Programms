<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js"></script>

var button=document.getElementByld('myButton');
var logo=document.getElementByld('headerLogo');
var modal=document.getElementByld('myModal');
var close=document.getElementByld('myClose');

logo.onmouseenter = function(){
    logo.style.fontSize="60px";
}

logo.onmouseleave = function(){
    logo.style.fontSize="40px";
}

logo.onclick = function(){
    modal.style.display="block";
}

close.onclick=function(){
    modal.style.display="none";
}



document.addEventListener('DOMContentLoaded', function() {
    var clipboard = new ClipboardJS('.copy-button');
    
    clipboard.on('success', function(e) {
        alert("Номер телефона успешно скопирован!");
        e.clearSelection();
    });
    
    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
});
