
window.onload = () => {
displayStores();
}




let CustomMapStyles =  [{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "saturation": 36
        },
        {
            "color": "#000000"
        },
        {
            "lightness": 40
        }
    ]
},
{
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#000000"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 20
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        },
        {
            "weight": 1.2
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 20
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 21
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 29
        },
        {
            "weight": 0.2
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 18
        }
    ]
},
{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 19
        }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        }
    ]
}
];









let map;
let markers = [];
let infoWindow;
// let directionDisplay = new google.maps.DirectionsRenderer();
// let directionServise = new google.maps.

function initMap() {
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
        styles: CustomMapStyles,
    });

    
    infoWindow = new google.maps.InfoWindow();

    
    showStoresMarkers();


    
}




////////////////  geolocation //////////









function displayStores(){

   let storesHtml = '';

    // stores.map((function (store, index)))
    for(let [index, store] of stores.entries()){


        let address = store['addressLines'];
        let phone = store['phoneNumber'];


        storesHtml += `
        <a class="portal" href="https://www.google.com/maps/dir/?api=1&destination=${address}" target="_blank">
            <div class="store-container">
                    <div class="store-info-container">
                       <div class="store-address">
                          <span>${address[0]}</span> 
                          <span>${address[1]}</span> 
                       </div>
                    <div class="store-phone-number">${phone}</div>
                
             </div>
                    <div class="store-number-container">
                        <div class="store-number">
                           ${index+1}
                        </div>
                    </div>
                </div>
        `

       document.querySelector('.stores-list').innerHTML = storesHtml;

       
    }
}





// let showWindowBox = getSelection('.store-info-container');
// const showWindow = () =>{
// showWindowBox = showStoresMarkers();
// };
// showWindow.addEventListener('click', showWindow);





function showStoresMarkers(){
    let bounds = new google.maps.LatLngBounds();

    for(let [index, store] of stores.entries()){

        let latlng = new google.maps.LatLng(
            store['coordinates']['latitude'],
            store['coordinates']['longitude']);


        let name = store['name'];
        let phone = store['phoneNumber'];
        

        let address = store['addressLines'][0];
        bounds.extend(latlng);
        
        createMarker(latlng, name, phone, address, index+1)



    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, phone, address, index){

    // let html = "<b>" + name + "</b> <br/>" + address +
    // "<hr>";
    let html = `
    
    <div class="cards-list" >
  
<div class="card 1" style=" width:250px; color:#000;">
  <div class="card_image"> <img style = "width:100%; height:100px; " src="Starbucks.jpg" /> </div>
  <div class="card_title title-white">
    <p style="font-size:20px">${name}</p>
    <hr>
    <span  style="font-size:20px"><img style = "width:15px; height:15px;" src="maps-and-flags.png" />&nbsp;&nbsp;&nbsp;${address}</span><br><br>
    <span style="font-size:20px"><img style = "width:15px; height:15px;" src="phone.png" />&nbsp;&nbsp;&nbsp;${phone}</span>
    
  </div>
</div>
    `
    let marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: index.toString(),
      icon: "Webp.net-resizeimage (2).png"

    });


   


      google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });

    markers.push(marker);


}