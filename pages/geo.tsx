
import React from 'react'
import * as leaflet from 'leaflet';
import type {Map} from 'leaflet';
import { GetStaticProps } from 'next';


// let mapOption : Map = {
//     center : [37.8185, -122.2476],
//     zoom : 10,
// }


import { gql, useQuery } from '@apollo/client';

const AllLinksQuery = gql`
  query {
    links {
      id
      title
      url
      description
      imageUrl
      category
    }
  }
  `


var map = leaflet.map('map').setView([51.505, -0.09], 13);

leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


const getStaticDataProps: GetStaticProps = async () => {

  const geoData = await fetch("http://api.geonames.org/postalCodeLookupJSON?postalcode=6600&country=AT&username=demo") 
  return {
    props : {
      geoData,
    }
  }
}


function GeoDiv({geoData}) {
  const { data, loading, error } = useQuery(AllLinksQuery)
  
    return (
        <div>
            <div className='articles'>
                geoData.map((g)=>{
                
                <>
                <p>{g.username}</p>
                <p>{g.postalcode}</p>
                <p>{g.country}</p>
                </>
              
              })
              {
            loading ?
            (
              <div> Loading ... </div>
          
            ) : 
            (
              <GeoDiv />
            )
      
          }
  </div>

  <div id='map'></div>
</div>
    )
}


export default GeoDiv;