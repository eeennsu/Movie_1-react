import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Typography, Divider, Button, Row, message } from 'antd';
import { API_KEY, API_URL, IMAGE_BASE_URL, MOVIE } from '../../Config';
import MainImage from '../Commons/MainImage';
import GridCard from '../Commons/GridCard';
import { RootDiv } from '../../styled/StyledComponent';
import { useSelector } from 'react-redux';

const { Text, Title } = Typography;

const LandingPage = () => {

	const { userData } = useSelector(state => state.user);

	const [movies, setMovies] = useState([]);
	const [mainMovie, setMainMovie] = useState(null);
	const [curPage, setCurPage] = useState(1);
	const [favorites, setFavorites] = useState([]);

	const endPointPopularMovies = useCallback((num) => {
		return `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${num}`
		// return `${API_URL}movie/api_key=${API_KEY}&language=en-US&page=${num}` 모르겟음...
	}, []);	
	
	const fetchMovies = useCallback((num) => {
		(async () => {
			try{
				const response = await axios.get(endPointPopularMovies(num));
				const { results } = response.data;
				
			//	console.log(results);	
				setMovies([...movies, ...results]);            			// state에 적용한다. results 속성이 20개의 영화들의 정보를 가지고 있다
				if(!mainMovie){
					setMainMovie(results[0]);							// 가장 유명한 영화는 0번째 인덱스이다
				}				
				setCurPage(state => state + 1);
			} catch(e) {
				alert(`error message - ${e}`);
			}	
		})();
	}, [movies, mainMovie, curPage]);	

	const submitGetVar = useMemo(() => ({
        userFrom: localStorage.getItem('userId'),
    }), []);

	// const refresh = useCallback((data) => {
	// 	setFavorites([...favorites, ...data])
	// }, [favorites]);

	const showMoreMovies = useCallback(() => {
		fetchMovies(curPage);
		message.success('20 movies added');
	}, [curPage]);

	useEffect(() => {
		fetchMovies(curPage);
	}, []);

	// useEffect(() => {
    //     (async () => {
    //         try{
    //             const response = await axios.post(`${MOVIE}getFavorites`, submitGetVar);
    //             const { getFavoritesSuccess, results } = response.data;
    // 
    //             if(getFavoritesSuccess){
    //                 setFavorites(results);
    //             }
    //         } catch(e) {
    //             console.log(e);
    //             throw e;
    //         }
    //     })();   
    // }, []); 
	

    return (
        <div style={{ width: '100%', margin: 0 }}>

			{ mainMovie && <MainImage image={`${IMAGE_BASE_URL}w1280${mainMovie.backdrop_path}`} name={mainMovie.title} text={mainMovie.overview} /> }

			<RootDiv margin='1rem auto'>
				<Title level={2} type={'secondary'}>
					Movies by latest
				</Title>	
				<Divider type='horizontal' orientation='left'>movies...</Divider>	

				{/* Movie Grid Cards */}
				<Row gutter={[30, 30]}>
					{ movies && movies.map((movie, i) => (
						<React.Fragment key={`movie-${i+1}`}>
							<GridCard isMovie={true} movie={movie} componentId={movie.id}
								image={`${IMAGE_BASE_URL}w500${movie.poster_path}` || null} 
								name={movie.original_title} />
						</React.Fragment>
					)) }
				</Row>				
			</RootDiv>		
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button type='primary' onClick={showMoreMovies}>Load More</Button>	
			</div>
        </div>
    );
}

export default LandingPage;