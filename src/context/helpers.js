import { marked } from 'marked'
import DOMPurify from 'dompurify'

export const getHTMLdata = (data) => {
	const htmlString = marked(data)
	const sanitizedHTMLString = DOMPurify.sanitize(htmlString)
	return sanitizedHTMLString
}

export const cleanUpAbout = (data) => {
	const { sys, fields } = data
	const { id } = sys
	const aboutTitle = fields.title
	const aboutContent = getHTMLdata(fields.content)
	const aboutImage = fields.image.fields.file.url

	const cleanAbout = { id, aboutTitle, aboutContent, aboutImage }

	return cleanAbout
}

export const cleanUpCarouselSlides = (data) => {
	const cleanSlides = data.map((slide) => {
		const { sys, fields } = slide
		const { id } = sys
		const slideTitle = fields.title
		const slideDescription = fields.description
		const slideBg = fields.image.fields.file.url

		const updatedSlide = { id, slideTitle, slideDescription, slideBg }
		return updatedSlide
	})

	return cleanSlides
}
