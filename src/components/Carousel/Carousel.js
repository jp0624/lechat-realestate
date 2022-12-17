import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import CarouselSlide from './CarouselSlide'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Autoplay } from 'swiper'

import Loader from '../Loader/Loader'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Navigation, Autoplay])

const Carousel = () => {
	const { carouselSlides, isCarouselLoading } = useContext(Context)

	if (isCarouselLoading) {
		return <Loader />
	}

	if (!Array.isArray(carouselSlides) || !carouselSlides.length) {
		return null
	}

	return (
		<div className="carousel">
			<Swiper
				loop="true"
				navigation
				autoplay={{ delay: 5000 }}
			>
				{carouselSlides.map((item) => {
					const { id, slideBg, slideTitle, slideDescription } = item
					return (
						<SwiperSlide key={id}>
							<CarouselSlide
								slideBg={slideBg}
								slideTitle={slideTitle}
								slideDescription={slideDescription}
							/>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default Carousel
