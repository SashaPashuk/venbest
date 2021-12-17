import React, {useState} from "react";
import axios from "axios";
import "./mainBar.scss";

const MainBar = () => {
    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
        const fetchData = async () => {            
            try {
                const {data} = await axios.get('https://venbest-test.herokuapp.com/')
            setPosts(data)
            }
            catch (error) {
                console.log(error)
            }
        } 
        fetchData()
    }, [])

    return (
        <div className={'wrapper'}>
           {posts.map (post => ( 
               <ul className={'list_data'} >
                   <li className={'list_item'}>{post.name} {post.lastname}</li>
                   <li className={'list_item'}>Возраст: {post.age}</li>
                   <li className={'list_item'}>Пол: {post.sex === 'f' ? 'Женский' : 'Мужской' }</li>
               </ul>
           ))} 
        </div>
    );
}

export default MainBar;