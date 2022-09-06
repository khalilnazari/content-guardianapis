import React, { useEffect, useState} from 'react'
import {GoSearch} from 'react-icons/go'
import NewsCart from '../../components/newsCart/NewsCart'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'

function NewsList() {
    // get search query form URL
    const location = useLocation(); 
    
    // state
    const [ searchText, setSearchText ] = useState(); 
    const [ searchResult, setSearchResult ] = useState(); 
    const [ bookmarkedItems, setBookmarkedItems ] = useState(); 
    const [currentPage, setCurrentPage] = useState(1); 

    // Call API
    const searchNews = async(searchTerm = searchResult) => {
        const API_KEY = "&api-key=test"; 
        let BASE_URL = `https://content.guardianapis.com/search?q=${searchTerm}${API_KEY}&currentPage=${currentPage}`; 

        const response = await fetch(BASE_URL); 
        if(response.ok){
            const result = await response.json(); 
            setSearchResult(result.response.results);
        } else {
            console.warn("HTTP-Error: " + response.status);
        }
    }
    
    // getBookMakred Items
    const loadBookmarkedItem = () => {
        const contentGuardianAPI = localStorage.getItem('contentGuardianAPI')
        const data = JSON.parse(contentGuardianAPI) || []; 
        setBookmarkedItems(data)
    }

    // After page is loaded. 
    useEffect(() => {
        loadBookmarkedItem(); 

        // return; 
        const searchQuery = location.search; 
        const queryTerm = new URLSearchParams(searchQuery).get('q');
        searchNews(queryTerm);  
    }, [])


    // Sync URL with search term
    const syncURL = () => {
        let nextURL = ''
        if(currentPage <= 1){
             nextURL = window.location.origin + `?q=${searchText}`; 
        } else {
            nextURL = window.location.origin + `?q=${searchText}&currentPage=${currentPage}`; 
        }

        window.history.replaceState('', searchText, nextURL);
    }
    
    // Submit form 
    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        // search function
        searchNews(searchText);
        syncURL(); 

        // clear the input 
        setSearchText('')
    } 
    
    const handlePagination = (pageNumber) => {
        // if ( currentPage < 1 ) return; 
        const p = currentPage + pageNumber; 
        setCurrentPage(p)
        searchNews()
        syncURL();
    }

    // jsx
    return (
        <>
            {/* search bar */}
            <section className='bg-gray-200 h-36 py-10'>
                <form onSubmit={handleSubmit} className='px-3'>
                    <div className="container max-w-[800px] mx-auto flex items-center gap-3 bg-white rounded">
                        <input 
                            type="text" 
                            className='px-5 py-3 border-none flex-1 focus:outline-0 rounded' 
                            placeholder='Search news...'  
                            value={searchText}
                            onChange={e=>setSearchText(e.target.value)}
                        />
                        <GoSearch  className='cursor-pointer w-12 h-12 pr-4'/>
                    </div>
                </form>
            </section>

            {/* New List */}
            <section className="body-font bg-white mx-2">
                
                {/* list bookmarked itesm */}
                <div className="max-w-[1300px] my-5 mx-auto border-b border-gray-300">
                    <h3 className='mb-5 text-2xl'>Your bookmarked articles</h3>
                    {searchResult && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {bookmarkedItems?.map((result, index) => <NewsCart news={result} key={result.id} rowId={index} bookmarkted={true}/>)}
                        </div>
                    )}
                </div>
                
                {/* list all news */}
                <div className="max-w-[1300px] my-5 mx-auto">
                    <h3 className='mb-4 text-2xl'>Search result</h3>
                    {searchResult ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {searchResult?.map((result, index) => <NewsCart news={result} rowId={index} key={result.id}/>)}
                        </div>
                    ): (
                        <div className='h-96 flex items-center justify-center gap-4'>
                            <AiOutlineLoading3Quarters />
                            <span>Loading...</span>
                        </div>
                    )}
                </div>
                
                {/* footer */}
                {searchResult && (
                    <div className='max-w-[1300px] mx-auto mb-10'>
                        <div className='flex items-center justify-end gap-4'>
                            <span 
                                className='py-2 px-3 bg-gray-600 text-white rounded cursor-pointer' 
                                onClick={() => handlePagination(-1)}
                            >Previous</span>
                            <span 
                                className='py-2 px-3 bg-gray-600 text-white rounded cursor-pointer' 
                                onClick={() => handlePagination(1)}
                            >Next</span>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default NewsList