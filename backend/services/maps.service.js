const axios = require('axios'); 

module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    

    const response = await axios.get(url); 
   
    const data = response.data; 
   
    if (!data.results || data.results.length === 0) {
      throw new Error('No results found for the provided address.');
    }
    

    const coordinates = data.results[0].geometry.location; 
    // Extract the coordinates (latitude and longitude) from the first result's geometry.

    return coordinates; 
    
  } catch (error) {
    console.error('Error fetching address coordinates:', error.message); 
    

    throw error; 
    
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
        
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
        
        
    
        const response = await axios.get(url); 
     
        const data = response.data; 
     
        if (data.status !== 'OK') {
        throw new Error('No results found for the provided origin and destination.');
        }
        
    
        const distanceTime = data.rows[0].elements[0]; 
        // Extract the distance and duration from the first row's elements.
    
        return distanceTime; 
        
    } catch (error) {
        console.error('Error fetching distance and time:', error.message); 
        
    
        throw error; 
        
    }
    }

    module.exports.getSuggestions = async (input) => {
        try {
            const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
            
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
            
            const response = await axios.get(url); 
           
            const data = response.data; 
           
            if (data.status !== 'OK') {
              throw new Error('No results found for the provided input.');
            }
            
            const suggestions = data.predictions.map(prediction => prediction.description); 
            // Extract the description from each prediction.
            
            return suggestions; 
            
          } catch (error) {
            console.error('Error fetching suggestions:', error.message); 
            
            throw error; 
            
          }
    }