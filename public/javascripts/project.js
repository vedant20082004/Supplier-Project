function showPicture(){
    const [file] = logo.files
    fp.width = 60;
    fp.src = URL.createObjectURL(file)
}
console.error();
$(document).ready(function(){

    $.get('/Main/fillstate',function(response){

        response.data.map((item)=>{

            $('#stateid').append($('<option>').text(item.statename).val(item.stateid))

            
        })
    })

    $('#stateid').change(function(){

        $.get('/Main/fillcity',{stateid:$('#stateid').val()},function(response){

            $('#cityid').empty()
            $('#cityid').append($('<option>').text('CITY NAME'))
            response.data.map((item)=>{
        
                $('#cityid').append($('<option>').text(item.cityname).val(item.cityid))
            })

        })
    })


})