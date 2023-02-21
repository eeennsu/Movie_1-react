import axios from 'axios';
import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import { Button, Row } from 'antd';
import MainImage from '../Commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../Commons/GridCard';
import Btn_Favorite from './Sections/Btn_Favorite';
import { RootDiv } from '../../styled/StyledComponent';

const DetailMoviePage = memo(() => {

    const params = useParams();
    const endPointCrew = useMemo(() => `${API_URL}movie/${params.movieId}/credits?api_key=${API_KEY}`, [params]);
    const endPointMovie = useMemo(() => `${API_URL}movie/${params.movieId}?api_key=${API_KEY}`, [params]);

    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        (async () => {
            try{
                const response = await axios.get(endPointMovie);
                setMovie(response.data);    
                console.log(response.data);
            } catch (e) {
                console.log(e);
                throw e;
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
			try{
                const response = await axios.get(endPointCrew);
                setActors(response.data.cast);
            } catch(e) {
                console.log(e);
                throw e;
            }       
		})();
    }, []);  

    const movieInfo = useMemo(() => {
        return <MovieInfo movie={movie}/>
    }, [movie]);

    const showActors = useCallback(() => {
        setActorToggle(state => !state);
	}, [actorToggle]);      

    return (
        <section>
            <RootDiv>
                { movie && <MainImage image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} name={movie.title} text={movie.overview} /> }
                <br />
                <div id='btn_favorite_wrapper' >
                    { movie && <Btn_Favorite movieId={params?.movieId} movie={movie}/> }              
                </div>
                <br />
                    { movieInfo }
                <div style={{ display: 'flex', width: '85%', justifyContent: 'center', margin: '1rem auto' }}>
                    <Button onClick={showActors}>Actor View</Button>
                </div>
                {   
                    actorToggle && 
                    <Row gutter={[24, 24]}>
                        {actors && actors.map((actor, i) => (
                            (
                                <React.Fragment key={`actor${i+1}`}>
                                    <GridCard isMovie={false} image={`${IMAGE_BASE_URL}w500${actor.profile_path}` || null} name={actor.name} character={actor.character}/>
                                </React.Fragment>
                            )
                        ))}
                    </Row>  
                }                           
            </RootDiv>
        </section>
    );
});

export default DetailMoviePage;