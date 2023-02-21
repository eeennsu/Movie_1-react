import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RootDiv } from '../../styled/StyledComponent';
import { Typography, Table, message, Button, Popover } from 'antd';
import axios from 'axios';
import { IMAGE_BASE_URL, MOVIE } from '../../Config';
import moment from "moment";

const { Title, Text } = Typography;

// <table>
// <thead>
//     <tr>
//         <th>Movie Name</th>
//         <th>Movie Runtime</th>
//         <th>Remove from favorites</th>
//     </tr>
// </thead>
// <tbody>
// 
// </tbody>
// </table>

const FavoriteMoviePage = () => {
   
    const [favorites, setFavorites] = useState([]);
    const popoverContent = useCallback((moviePost) => {
        return (
            moviePost ? <img src={`${IMAGE_BASE_URL}w300${moviePost}`}/> : 'no image'
        )
    }, []);

    const columns = [
        {
            key: '1',
            title: 'Movie Name',
            dataIndex: 'movieName',
            render: (name, movie, i) => {
                return (
                    <Popover key={`movie-name-${i+1}`} title={name} content={popoverContent(movie?.moviePost)}>
                        <a href={`/movie/${movie?.movieId}`}>
                            {name}
                        </a>
                    </Popover>  
                )
            }
        },
        {
            key: '2',
            title: 'Movie Runtime',
            dataIndex: 'movieRuntime',
            sorter: (a, b) => a.movieRuntime - b.movieRuntime,
            render: time => {
                let hour = Math.floor(time / 60);
                let min = Math.floor(time % 60);
                return `${hour}hour ${min}min`;
            }
        },
        {
            key: '3',
            title: 'Released Date',
            dataIndex: 'releaseDate',
            sorter: {
                compare: (a, b) => moment(a.releaseDate).diff(moment(b.releaseDate)),
                multiple: 1
            }
        },  
        {
            key: '4',
            title: 'Country of film production',            
            dataIndex: 'movieProdCountry'
        },       
        {
            key: '5',
            title: 'Remove',
            dataIndex: 'movieId',
            render: (_id, movie, i) => <Button key={`btn_remove_${i}`} onClick={() => removeItem(_id)} type='dashed'>remove</Button>
        },
    ];

    const submitVar = useMemo(() => ({
        userFrom: localStorage.getItem('userId'),      
    }));

    const removeItem = useCallback((movieId) => {

        const removeVar = {
            ...submitVar,
            movieId: movieId        
        };        
       
        try{
            (async () => {
                const response = await axios.post(`${MOVIE}cancelToFavorite`, removeVar);
                const { cancelFavoriteSuccess, result } = response.data;
    
                if(cancelFavoriteSuccess){
                    fetchGetFavorites();
                    message.success('Removed success!');
                } else {
                    message.warning('The favorite movie does not exist');
                }
            })();
        } catch(e){
            console.log(e);
            throw e;
        }
    }, [favorites, submitVar]);  

    useEffect(() => {
        fetchGetFavorites();
    }, []);

    const fetchGetFavorites = useCallback(() => {
        try{
            (async () => {
                const response = await axios.post(`${MOVIE}getFavorites`, submitVar);
                const { getFavoritesSuccess, results } = response.data;
    
                if(getFavoritesSuccess){
                    setFavorites(results);
                    console.log(results);
                } else {
                    message.warning('The favorite movie does not exist');
                }
            })();
        } catch(e){
            console.log(e);
            throw e;
        }
    }, [submitVar]);

    return (
        <section>   
            <RootDiv margin='3rem auto'>
                <Title>
                    Favorite Movies By Me
                </Title>
                <hr />
                <Table columns={columns} dataSource={favorites} rowKey={'_id'} />               
            </RootDiv>
        </section>
    );
};

export default FavoriteMoviePage;