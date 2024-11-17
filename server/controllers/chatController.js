import OpenAI from 'openai'
import { buildObj, extractPlaces } from './helper.js'

const chat = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  })

  const { message } = req.body

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: message,
    })
    // Log successful response
    console.log('API Response:', response)

    const places = extractPlaces(response.choices[0].message.content)
    console.log(places)

    if (places.length === 0) {
      console.log('No places found in the input string.')
      res.json({
        message: response.choices[0].message.content,
      })
      return
    }

    // const context = places[0]; // Assuming the first location is the context (city)
    // const specificLocations = places.slice(1);

    // const context = places[0]; // Assuming the first location is the context (city)
    // const specificLocations = Array.from(new Set(places))
    const specificLocations = Array.from(new Set(places)).slice(0, 6)

    const locationDetailsPromises = specificLocations.map(async (place) => {
      const obj = await buildObj(place)
      return obj
    })

    const allLocationDetails = await Promise.all(locationDetailsPromises)

    res.json(
      {
        message: response.choices[0].message.content.replace(/#/g, ''),
        location: allLocationDetails,
      },
    )
  } catch (error) {
    // Log error details
    console.error('API Request Error:', error.message)
    if (error.response) {
      console.error('Response Status:', error.response.status)
      console.error('Response Data:', error.response.data)
    }
    // Handle the error as needed
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default chat
