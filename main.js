const key = "f4bd7773d3ba4e8061d2c1d7590d3492";

//Verificando a se a tecla enter foi clicada
function verificarEnter(event) {
    if (event.key === 'Enter') {
        search();
    }
}

function search() {
    //Capturando o valor do input
    const city = document.getElementById('city').value;
    searchCity(city);

}

async function searchCity(city) {
    //Buscando a cidade segundo a documentação da API
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);
  
  if (!response.ok) {
    alert('Erro ao buscar os dados da cidade');
    return; 
  }

  const dados = await response.json();
  
  if (dados.cod !== 200) {
    alert('Cidade não encontrada ou dados inválidos');
    return;
  }

  searchConfig(dados);
  console.log(dados);
}

function searchConfig(dados) {
    //Pegando e colocando o nome do local
    const name = document.getElementById('nameLocal');
    name.innerHTML = `${dados.name}, ${dados.sys.country}`;
    name.style.display = 'block';

    //Pegando a imagem
    const cloud = document.getElementById('cloud');
    //cloud.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    const clouds = dados.weather[0].icon
    cloud.style.display = 'block';

    //Colocando condição mas imagens

    switch (clouds) {
        case "01d":
            cloud.src = "images/clouds/ceuLimpo.png"
            break;
        case "01n":
            cloud.src = "images/clouds/ceuLimpoNoturno.png"
            break;
        case "02d":
            cloud.src = "images/clouds/poucasChuvas.png"
            break;
        case "02n":
            cloud.src = "images/clouds/poucasChuvasNoturno.png"
            break;
        case "03d":
            cloud.src = "images/clouds/nuvensDispersas.png"
            break;
        case "03n":
            cloud.src = "images/clouds/nuvensDispersasNoturno.png"
            break;
        case "04d":
            cloud.src = "images/clouds/nuvensDispersas.png"
            break;
        case "04n":
            cloud.src = "images/clouds/nuvensDispersasNoturno.png"
            break;
        case "09d":
            cloud.src = "images/clouds/chuvaDeBanho.png"
            break;
        case "09n":
            cloud.src = "images/clouds/ChuvadeBanho.png"
            break;
        case "10d":
            cloud.src = "images/clouds/chuva.png"
            break;
        case "10n":
            cloud.src = "images/clouds/chuvaNoturno.png"
            break;
        case "11d":
            cloud.src = "images/clouds/trovoada.png"
            break;
        case "11n":
            cloud.src = "images/clouds/trovoada.png"
            break;
        case "13d":
            cloud.src = "images/clouds/neve.png"
            break;
        case "13n":
            cloud.src = "images/clouds/neve.png"
            break;
        case "50d":
            cloud.src = "images/clouds/nevoa.png"
            break;
        case "50n":
            cloud.src = "images/clouds/nevoaNoturno.png"
    }

    //Pegando e colocando a Temperatura 
    const temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(dados.main.temp)} °C`;

    //Pegando e colocando a descrição
    const desc = document.getElementById('descri');
    desc.innerHTML = `${dados.weather[0].description}`;


    //Mudando o display da div secundaria
    const containerSecundaria = document.getElementById('containerSecundaria');
    containerSecundaria.style.display = 'block';

    //Capturando a Temperatura mínima e a colocando no site 
    const tempMin = document.getElementById('infoTempMin');
    tempMin.innerHTML = `${Math.round(dados.main.temp_min)} °C`;

    //Capturando a Temperatura máxima e colocando no site
    const temMax = document.getElementById('infoTempMax');
    temMax.innerHTML = `${Math.round(dados.main.temp_max)} °C`;

    //Capturando a Humidade e colocando no site
    const humidity = document.getElementById('infoHumidity');
    humidity.innerHTML = `${dados.main.humidity}%`

    //Caputrando a velocidade do vento e colocando no site
    const vento = document.getElementById('infoVento');
    vento.innerHTML = `${dados.wind.speed} km/h`;


}
