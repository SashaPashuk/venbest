import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./main.scss"


const Main = () => {
    const [ user, setUser ] = useState([])
    
    const [ inputNAME, setName ] = useState("")
    const [ inputLastName, setLastName ] =useState("")
    const [ inputAge, setAge ] = useState("")
    const [ checkedM, setCheckM ] =  useState(false)
    const [ checkedF, setCheckF ] =  useState(false)

    useEffect(() => {
        const fetchData = async () => {            
            try {
                const {data} = await axios.get('https://venbest-test.herokuapp.com/')
                setUser(data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        } 
        fetchData()
    }, [])

    const filterName = user.filter(user => {
        if(inputNAME.length !== 0 ){
            return(user.name.toLowerCase().includes(inputNAME.toLowerCase()))
        }
        if(inputLastName.length !== 0 ){
            return(user.lastname.toLowerCase().includes(inputLastName.toLowerCase()))
        }
        if(inputAge.length !== 0){
            return(user.age.toString().includes(inputAge.toLowerCase()))
        }
        if(checkedM === true){
            return(user.sex.includes("m"))
        }
        if(checkedF === true){
            return(user.sex.includes("f"))
        }
        return user
    })

    return(
        <div className="wrapper">
            
           <div className='wrapper_filter'>
           <input 
                type="text"
                value={inputNAME}
                placeholder="Search for name..."
                onClick={() => {
                    setLastName("")
                    setAge("")
                    setCheckF(false)
                    setCheckM(false)
                }}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <input 
                type="text"
                value={inputLastName}
                placeholder="Search for lastname..."
                onClick={() => {
                    setName("")
                    setAge("")
                    setCheckF(false)
                    setCheckM(false)
                }}
                onChange={(e) => {
                    setLastName(e.target.value)
                }}
            />
            <input 
                type="text"
                value={inputAge}
                placeholder="Search for age..."
                onClick={() => {
                    setName("")
                    setLastName("")
                    setCheckF(false)
                    setCheckM(false)
                }}
                onChange={(e) => {
                    setAge(e.target.value)
                }}
            />
            <label>
                Male: 
            <input 
                onChange={() => {
                    setCheckM(true)
                    setCheckF(false)
                    setName("")
                    setLastName("")
                    setAge("")
                }}
                type="checkbox"
                checked={checkedM}
            />
            </label>
            <label>
                Female: 
            <input
                onChange={() => {
                    setCheckF(true)
                    setCheckM(false)
                    setName("")
                    setLastName("")
                    setAge("")
                }}
                checked={checkedF}
                type="checkbox"
            />
            </label>
           </div>
            {filterName.map((users, index) => {
                return(
                    <ul key={index} className="post_wrapper">        
                        <li className="list_item">??????: {users.name}</li>
                        <li className="list_item">??????????????: {users.lastname}</li>   
                        <li className="list_item">??????????????: {users.age}</li>
                        <li className="list_item">??????: {users.sex === 'f' ? '??????????????' : '??????????????' }</li>                     
                    </ul>
                )
            })}
        </div>
    )
}

export default Main;