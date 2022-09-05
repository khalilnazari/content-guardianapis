import React, { useEffect, useState} from 'react'
import {GoSearch} from 'react-icons/go'
import NewsCart from '../../components/newsCart/NewsCart'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

function NewsList() {
    const [ searchText, setSearchText ] = useState(); 
    const [ searchResult, setSearchResult ] = useState(); 
    const [ bookmarkedItems, setBookmarkedItems ] = useState(); 

    // Call API
    const searchNews = (searchTerm) => {
        const API_KEY = "&api-key=test"; 
        const BASE_URL = `https://content.guardianapis.com/search?q=${searchTerm}${API_KEY}`; 
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                setSearchResult(data.response.results)
            })
            .catch(erorr => console.log(erorr))
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
        searchNews();  
    }, [])


    // Submit form 
    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        // search function
        searchNews(searchText);
        
        // Sync URL with search term
        const nextURL = window.location.origin + `?q=${searchText}`; 
        window.history.replaceState('', searchText, nextURL);

        // clear the input 
        setSearchText('')
    } 
    
    return (
        <>
            {/* search bar */}
            <section className='bg-gray-200 h-36 py-10'>
                <form onSubmit={handleSubmit}>
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
                <div className="max-w-[1300px] my-5 mx-auto">
                    {searchResult ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {bookmarkedItems?.map((result, index) => <NewsCart news={result} key={result.id} rowId={index} bookmarkted={true}/>)}
                            {searchResult?.map((result, index) => <NewsCart news={result} rowId={index} key={result.id}/>)}
                        </div>
                    ): (
                        <div className='h-96 flex items-center justify-center gap-4'>
                            <AiOutlineLoading3Quarters />
                            <span>Loading...</span>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default NewsList