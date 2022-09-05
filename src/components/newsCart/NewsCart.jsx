import React from 'react'
import { Link } from 'react-router-dom'

function NewsCart({news}) {
    const publishDate = news.webPublicationDate.split('T')[0]; 
    const date = new Date(publishDate); 
    const month = date.getMonth(); 
    const monthShort = date.toLocaleString('default', { month: 'short' }).toLowerCase()
    const day= String(date.getDate()).padStart(2, '0'); 
    const year = date.getFullYear(); 
    const newsDate = `${day}/${month}/${year}`;
    const placeHolderImage ="https://www.villagereach.org/wp-content/uploads/2021/05/guardian-logo.png";
    
    // get only a two lines of title 
    const title = news.webTitle.substring(0, 35)

    const newsID = news.id.split('/'); 
    const titleString = newsID[newsID.length -1]; 
    const newType = news.type === "liveblog" ? 'live' : news.type; 
    const urlID = [news.sectionId, newType, year, monthShort, day, titleString].join('/')  
    

    return (
        <div className="w-full bg-white rounded-md shadow-md mb-3">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center rounded-md" src={news.img || placeHolderImage} alt="blog" />
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}...</h2>
                <p className="leading-relaxed mb-3 text-gray-400">{newsDate}</p>
                
                <div className="flex items-center flex-wrap ">
                    <Link to={'/'+urlID} state={{data:news}} className='px-5 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded'>Read more</Link>
                </div>
            </div>
        </div>
    )
}

export default NewsCart