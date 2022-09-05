import React from 'react'
import NewsList from './pages/newsList/NewsList'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import NewsDetail from './pages/newsDetail/NewsDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NewsList />}/>
        {/* <Route path='/:sectionId/:year/:month/:day/:title' element={<NewsDetail />}/> */}
        <Route path='/:id' element={<NewsDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App