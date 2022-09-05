import React from 'react'
import { Link } from 'react-router-dom'
import {FaBookmark, FaRegBookmark} from 'react-icons/fa'

function NewsCart({news, bookmarkted, rowId}) {

    const publishDate = news.webPublicationDate.split('T')[0].split('-'); 
    const year = publishDate[0]
    const month = publishDate[1]
    const date = publishDate[2]
    const monthShort = month.toLocaleString('default', { month: 'short' }).toLowerCase()
    const newsDate = `${date}/${month}/${year}`;
    const placeHolderImage ="https://www.villagereach.org/wp-content/uploads/2021/05/guardian-logo.png";
    
    // get only a two lines of title 
    const title = news.webTitle.substring(0, 35)
    
    // add bookmarked news
    const addToBookmark = (news) => {
        const contentGuardianAPI = localStorage.getItem('contentGuardianAPI')
        const oldNews = JSON.parse(contentGuardianAPI) || []; 
        localStorage.setItem("contentGuardianAPI", JSON.stringify([...oldNews, news]))
    }

    // rmeove bookmarked news
    const removeFromBookmark = (article) => {
        const contentGuardianAPI = localStorage.getItem('contentGuardianAPI')
        const oldNews = JSON.parse(contentGuardianAPI) || []; 

        const updatedNews = oldNews.filter(news => news.id !== article.id); 
        localStorage.setItem("contentGuardianAPI", JSON.stringify(updatedNews))
    } 

    return (
        <div className="w-full bg-white rounded-md shadow-md mb-3">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center rounded-md" src={news.img || placeHolderImage} alt="blog" />
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}...</h2>
                <p className="leading-relaxed mb-3 text-gray-400">{newsDate}</p>
                
                <div className="flex items-center justify-between">
                    <Link to={'/'+rowId} state={{data:news}} className='px-5 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded'>Read more</Link>
                    
                    {bookmarkted === true ? (
                        <FaBookmark  className='text-2xl cursor-pointer text-gray-600' onClick={() => removeFromBookmark(news)}/>
                    ): (
                        <FaRegBookmark  className='text-2xl cursor-pointer text-gray-400' onClick={() => addToBookmark(news)}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewsCart