import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, message, Popover, Tooltip } from 'antd';
import { CardImage } from '../../styled/StyledComponent';
import { API_KEY, API_URL, MOVIE } from '../../Config';
import axios from 'axios';
import no_image1 from './no_image.jpg';
import no_image2 from './no_image2.png';
import no_image3 from './no_image3.png';
import no_image4 from './no_image4.png';

const GridCard = memo(({ isMovie, componentId, image, name, character }) => {

    // const [movieCard, setMovieCard] = useState(null);
    // const [isFavorite, setIsFavorite] = useState(false);
   
    // const endPointDetailMovie = useMemo(() => `${API_URL}movie/${componentId}?api_key=${API_KEY}`, [componentId]);
    // const submitGetVar = useMemo(() => ({
    //     userFrom: localStorage.getItem('userId'),
    //     movieId: componentId,
    // }), [componentId]);
    // const submitSetVar = useMemo(() => ({
    //     ...submitGetVar,
    //     movieName: movieCard?.title,
    //     moviePost: movieCard?.poster_path,
    //     movieRuntime: movieCard?.runtime,
    //     movieProdCountry: movieCard?.production_countries[0].name,
    //     releaseDate: movieCard?.release_date
    // }), [movieCard]);

    // useEffect(() => {
    //     if(!isAuth) return;

    //     try{
    //         (async () => {
    //             const response = await axios.get(endPointDetailMovie);       
    //             setMovieCard(response.data);          
    //         })();
    //     } catch(e) {
    //         console.log(e);
    //         throw e;
    //     }
    // }, []);

    // useEffect(() => {
    //     if(!isAuth) return;
        
    //     try{
    //         (async () => {
    //             const response = await axios.post(`${MOVIE}getIsFavorite`, submitGetVar);       
    //             const { getIsFavoriteSuccess } = response.data;
    
    //                 if(getIsFavoriteSuccess){
    //                     setIsFavorite(true);
    //                 }     
    //         })();
    //     } catch(e) {
    //         console.log(e);
    //         throw e;
    //     }
    // }, []);
 
    // const quickFavorites = useCallback((e) => {
    
    //     e.preventDefault();
    //     if(!isAuth){
    //         message.info('Login Please...');
    //         return;
    //     }

    //     if(isFavorite){
    //         message.info('Already registered as favorites');
    //         return;
    //     }

    //     (async () => {
    //         try{
    //             const response = await axios.post(`${MOVIE}addToFavorite`, submitSetVar);
    //             const { addFavoriteSuccess, result } = response.data;
    
    //             if(addFavoriteSuccess){
    //                 refresh([result]);
    //                 message.success('Quick bookmark registration was successful');
    //                 setIsFavorite(true);
    //             }
    //         } catch(e) {
    //             console.log(e);
    //             throw e;
    //         }

    //     })();       
    // }, [submitGetVar]);

    const imageErrorHandler = useCallback((e) => {
        e.currentTarget.src = no_image3;
        e.currentTarget.style.padding='30px'
    }, []);

    return (
        <Col lg={4} md={6} sm={12} xs={24}>
            <div style={{ position: 'relative' }}>
                {
                    isMovie ? 
                    (
                        <a href={`/movie/${componentId}`}>
                            <Tooltip title={name}>
                                <CardImage src={image} onError={imageErrorHandler}/> 
                            </Tooltip>
                        </a>
                    ) :
                    (
                        <Tooltip title={`${name} / ${character}`}>
                            <CardImage src={image} onError={imageErrorHandler}/> 
                        </Tooltip>
                    ) 
                }                
            </div>
        </Col>
    );
});

export default GridCard;