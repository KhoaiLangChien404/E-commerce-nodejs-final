import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'}/>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Simplicity is almost a necessity, though it seems difficult to achieve nowadays. In our designs, we look for what is essential. Simplicity has another attribute, which is that it is close to timelessness. The “simple” is not subject to changing trends, because it has freed itself from adornments, which allows it to endure. Feeling comfortable.</p>
                    <p>The “twist” in our designs mean the refinement found in every product. We bring elegance and sophistication into it. Make it simple with a creative touch through fabric/form & details.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>In a world that's constantly in motion, the demand on our daily wardrobe also evolves. Today, we find ourselves in an era where form, function and design goes together, because it’s not just about looking good; it’s also about feeling good.</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>When we first arrived in 2024, we were struck by the warmth and kindness of the people in this beautiful country. We are deeply grateful for the trust and support the Cambodian community has shown us from day one. After eight years and 11 stores, Routine Cambodia and Routine Vietnam want to express our heartfelt thanks to the Cambodian people for giving us the opportunity to 'Go together, grow together.' We remain committed to continuously evolving, delivering the best products, and making life easier with Routine</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>Since arriving in Laos in 2024, we've had a dream to offer high-quality, affordable products, giving the people of Laos more choices without the need to travel abroad for their shopping needs. Our goal has always been to provide a one-stop destination where customers can find everything they need for work, leisure, or travel. After seven years and three stores, we are grateful for the trust and positive feedback we've received from the Laotian community regarding our product quality. We recognize there's still much to be done, and we remain committed to improving our services and delivering even greater value to Laos in the future.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Fashion is one of the top polluting industries in the world. As an enterprise that produces and sells fashion products, MANDU recognizes its role and responsibility in changing and minimizing its impact on the environment and society.</p>
                </div>
            </div>
            <NewsletterBox/>
        </div>
    )
}

export default About
