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
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate eligendi voluptatibus reiciendis voluptatum laborum magnam vitae nemo, minus labore maxime soluta ut? Dolor alias ullam, rerum debitis totam laborum deserunt.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iusto accusamus necessitatibus vitae facere quia delectus ad distinctio. Consequuntur rerum vel odit qui fugiat, laboriosam praesentium esse inventore ipsum harum!</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione quia ad sequi dignissimos consequatur voluptatibus nostrum ipsa distinctio error similique mollitia dolorum, est in labore a assumenda enim? Accusamus, cum.</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet ipsam ratione hic repudiandae eveniet itaque, quam tempore officia ut libero voluptatibus nostrum est ex, perferendis ullam alias a. Nesciunt, laborum!</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima tenetur rem unde ipsum sed aspernatur odit distinctio, voluptas quaerat voluptate, labore eos a nobis quae? Quidem minima at maiores placeat!</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae fuga ea iste voluptatum amet. Veritatis voluptatem ad dolore culpa mollitia error, cum similique consequuntur laboriosam, optio fuga quis harum vero?</p>
                </div>
            </div>
            <NewsletterBox/>
        </div>
    )
}

export default About
