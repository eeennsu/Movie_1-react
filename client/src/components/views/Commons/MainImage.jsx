import React, { memo } from 'react';
import { Typography } from 'antd';
import { MainMovieExplain, RootMainMovie, Sentence } from '../../styled/StyledComponent';

const { Title } = Typography;


const MainImage = memo(({ image, name, text }) => {

    return (
        <RootMainMovie image={image}>        
            <MainMovieExplain>
                <Title level={2} italic={true}  
                    style={{ padding: '15px', background: 'rgba(228, 183, 183, 0.45)', textAlign: 'center', borderRadius: '2rem' }}>
                    {name}
                </Title>
                <Sentence color='white'>
                    {text}
                </Sentence>
            </MainMovieExplain>          
        </RootMainMovie>        
    );
});

export default MainImage;