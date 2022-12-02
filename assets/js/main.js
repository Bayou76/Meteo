$(function(){
    var apiKey ='a96d2a5bac175a2827f0d2dfcb4ce682';
    var baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lang=fr`;
    console.log(baseUrl);

    $('#weather button').click(function(e){
        e.preventDefault();
        
        var city = $('#city');
        var cityValue = $('#city').val();

        var param = {
            url: baseUrl + '&q=' + cityValue,
            method: 'GET'
        };

        $.ajax(param).done(function(response){
            // console.log(response);

            // Show card
            $('.card').removeClass('d-none');

            // Error
            $('#city').removeClass('is-invalid');
            $('.invalid-feedback').slideUp();
            $('.card').show();

            //Title
            $('.card-title').text(response.name);

            // Description 
            $('.card-title').text(response.weather[0].description);


            //day

            //Temp
            var temp = Math.round(response.main.temp) + '°';
            var tempMax = Math.round(response.main.temp_max) + '°';
            var tempMin = Math.round(response.main.temp_min) + '°';

            $('.temp-weather').text(temp);
            $('.temp-max-weather').text(tempMax);
            $('.temp-min-weather').text(tempMin);

            // Image
            var image = response.weather[0].icon;
            $('.image-weather').attr('src','http://openweathermap.org/img/wn/'+image+'.png');
            $('.image-weather').attr('alt', response.name);

        })
        .fail(function(){
            $('.invalid-feedback').slideDown();
            city.addClass('is-invalid');
            $('.card').hide();
        })
    });

});