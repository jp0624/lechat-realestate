import React, { useEffect, useState, useCallback } from 'react'
import { client } from './client'
import { cleanUpAbout, cleanUpCarouselSlides } from './helpers'

export const Context = React.createContext()

export const Provider = (props) => {
	const [about, setAbout] = useState({})
	const [isAboutLoading, setIsAboutLoading] = useState(false)
	const [isCarouselLoading, setIsCarouselLoading] = useState(false)
	const [carouselSlides, setCarouselSlides] = useState([])

	const saveAboutData = useCallback((data) => {
		const cleanAboutData = cleanUpAbout(data)
		setAbout(cleanAboutData)
	}, [])

	const getAbout = useCallback(async () => {
		setIsAboutLoading(true)
		try {
			const response = await client.getEntry('6k3R9fWZN3moXHkwI9oEGK')
			if (response) {
				saveAboutData(response)
			} else {
				setAbout({})
			}
			setIsAboutLoading(false)
		} catch (error) {
			console.log(error)
			setIsAboutLoading(false)
		}
	}, [saveAboutData])

	useEffect(() => {
		getAbout()
	}, [getAbout])

	const saveCarouselData = useCallback((data) => {
		const cleanCarouselData = cleanUpCarouselSlides(data)
		setCarouselSlides(cleanCarouselData)
	}, [])

	const getCarouselSlides = useCallback(async () => {
		setIsCarouselLoading(true)
		try {
			const response = await client.getEntries({
				content_type: 'klcHeroCarousel',
			})
			const responseData = response.items

			if (responseData) {
				saveCarouselData(responseData)
			} else {
				setIsCarouselLoading([])
			}
			setIsCarouselLoading(false)
		} catch (error) {
			console.log(error)
			setIsCarouselLoading(false)
		}
	}, [saveCarouselData])

	useEffect(() => {
		getCarouselSlides()
	}, [getCarouselSlides])

	const contextData = {
		about,
		isAboutLoading,
		carouselSlides,
		isCarouselLoading,
	}

	return (
		<Context.Provider value={contextData}>
			{props.children}
		</Context.Provider>
	)
}
