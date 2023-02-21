import React from 'react';
import { Descriptions, Badge, Tooltip } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Item } = Descriptions;

const MovieInfo = ({ movie }) => {
    return movie && (        
        <Descriptions className='info_table' title='Movie Item' bordered layout='horziontal' labelStyle={{ background: 'rgb(211, 197, 197)' }} contentStyle={{ maxWidth: '300px' }}>
            <Item label='Title' contentStyle={{ fontWeight: 'bold' }}>
                {movie.original_title}
                <a href={`${movie.homepage}`}>
                    <Tooltip title={'Go to moive\'s homepage'}>
                        <HomeOutlined style={{ float: 'right', fontSize: '20px' }} />
                    </Tooltip>                       
                </a>                    
            </Item>
            <Item label='Release Date'>
                {movie.release_date}
            </Item>
            <Item label='Revenue'>
                {movie.revenue}
            </Item>                   
            <Item label='Genres'>
                {movie.genres.map((v, i, a) => <span key={v.name}>{v.name} {i !== a.length-1 && '/'} </span>)}
            </Item>
            <Item label='Runtime'>
                {movie.runtime} Min
            </Item>      
            <Item label='Vote Count'>
                {movie.vote_count}
            </Item> 
            <Item label='Status'>
                {movie.status}
            </Item>
            <Item label='Popularity'>
                {movie.popularity}
            </Item>   
            <Item label='Language'>
                {movie.spoken_languages[0].name}
            </Item>             
        </Descriptions>        
    );
};

export default MovieInfo;