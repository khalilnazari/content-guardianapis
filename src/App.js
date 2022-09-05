import React from 'react'
import NewsList from './pages/newsList/NewsList'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import NewsDetail from './pages/newsDetail/NewsDetail';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<NewsList />}/>
        <Route path='/:id' element={<NewsDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App