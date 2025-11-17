import React from 'react'
import { useContext } from 'react'
import { userContext } from '../context/ContactContext'
import styles from "./search.module.css"


function SearchBar() {
    const{search,setSearch}=useContext(userContext)
  
  return (
    <div>
        <input type="text"  placeholder='search'  value={search} onChange={(e)=>setSearch(e.target.value)}   className={styles.searchInput}/>
       
    </div>
  )
}

export default SearchBar