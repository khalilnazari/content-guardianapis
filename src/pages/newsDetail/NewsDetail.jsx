import React, { useEffect } from 'react'

import {GoSearch} from 'react-icons/go'
import { useLocation, useParams } from 'react-router-dom'


function NewsDetail() {
    const placeHolderImage ="https://www.villagereach.org/wp-content/uploads/2021/05/guardian-logo.png";
    const location = useLocation(); 
    const {data} = location.state; 
    const publishDate = data.webPublicationDate.split('T')[0].split('-'); 
    const year = publishDate[0]
    const month = publishDate[1]
    const date = publishDate[2]

    return (
        <section className="body-font bg-white mx-2">
            <div className="max-w-[900px] my-5 mx-auto">
                <img src={data.img || placeHolderImage} className='w-full mb-5'/>
                <p className='text-2xl font-bold'>{data.webTitle}</p>
                <p className='text-md mt-3'>Published on: {date}/{month}/{year}</p>
                <p>Type: {data.type}</p>
                <p><a href={data.webUrl}>Read on the website</a></p>
            </div>
        </section>
    )
}

export default NewsDetail