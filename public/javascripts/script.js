        function myFun()
        {
            var name=document.getElementById("name").value;
            var paswd=document.getElementById("paswd").value;

            if(name==paswd){
                alert("Password and Username are same!\n\nPlease change it.")
            }
            else{
                alert("Good morning "+name);
            }
        }