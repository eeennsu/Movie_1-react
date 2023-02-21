import axios from 'axios';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Spin } from 'antd';
import { MOVIE } from '../../../Config';
import { useSelector } from 'react-redux';

const Btn_Favorite = ({ movieId, movie}) => {

    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user); 
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [isLoading, setIsLoading] = useState(null);

    const submitGetVar = useMemo(() => ({
        userFrom: localStorage.getItem('userId'),
        movieId: movieId,
    }), [userData]);

    const submitSetVar = useMemo(() => ({
        ...submitGetVar,
        movieName: movie.title,
        moviePost: movie.poster_path,
        movieRuntime: movie.runtime,
        movieProdCountry: movie.production_countries[0].name,
        releaseDate: movie.release_date
    }), [userData]);
    
    useEffect(() => {
        (async () => {
            try{
                const response = await axios.post(`${MOVIE}getIsFavorite`, submitGetVar);
                const { getIsFavoriteSuccess } = response.data;

                if(getIsFavoriteSuccess){
                    setIsFavorite(true);
                }
            } catch(e) {
                console.log(e);
                throw e;
            }

            try{
                const response = await axios.post(`${MOVIE}getFavoriteCount`, submitGetVar);
                const { getFavoriteCountSuccess, count } = response.data;

                if(getFavoriteCountSuccess && count !== 0){
                    setFavoriteCount(count);
                }
            } catch(e){
                console.log(e);
                throw e;
            }
        })();       
    }, []); 

    const addFavorite = useCallback(() => {
        if(!userData.isAuth){
            alert('Login Please..');
            navigate('/loginPage');
            return; 
        }
   
        try{
            (async () => {
                const response = await axios.post(`${MOVIE}addToFavorite`, submitSetVar); 
                const { addFavoriteSuccess, result } = response.data;

                if(addFavoriteSuccess){
                    setIsFavorite(true);
                    setFavoriteCount(state => state + 1);
                } else {
                    alert('좋아하는 영화 등록에 실패하였습니다');
                }
            })();
        } catch(e){
            console.log(e);   
            throw e;   
        }          
    }, [userData, isFavorite]);

    const cancelFavorite = useCallback(() => {
        if(!userData.isAuth){
            alert('Login Please..');
            return; 
        }

        try{
            (async () => {
                const response = await axios.post(`${MOVIE}cancelToFavorite`, submitGetVar); 
                const { cancelFavoriteSuccess } = response.data;

                if(cancelFavoriteSuccess){
                    setIsFavorite(false);
                    setFavoriteCount(state => state - 1);
                } else {
                    alert('좋아하는 영화 취소에 실패하였습니다');
                }
            })();
        } catch(e){
            console.log(e);    
            throw e;     
        }     
    }, [userData, isFavorite]);

    return (              
        <Tooltip title={`A total of ${favoriteCount} registered`} placement='left' color='cyan'>
            { !isFavorite && <Button onClick={addFavorite} type='primary' style={{ borderRadius: '15px' }}>Add to Favorite</Button> }
            { (userData?.isAuth && isFavorite) && <Button onClick={cancelFavorite} type='danger'>Cancel to Favorite</Button> }
        </Tooltip>     
    );
};


export default Btn_Favorite;