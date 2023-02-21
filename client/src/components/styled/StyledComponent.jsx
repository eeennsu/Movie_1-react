import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 84vh;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    border: 2px solid blue;
    padding: 30px;
`;

export const RootParent = styled.div`
    min-height: calc(100vh - 80px);
    padding-top: 69px;
`;

export const RootMainMovie = styled.div`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0) 46%, rgba(0, 0, 0, 0.75) 100%), 
                url(${props => props.image}), #1c1c1c;
    background-repeat: no-repeat;
    background-size: auto;
    padding: auto 0;
    background-position: center center;
    height: 55vh;
    width: 100%;
    position: relative;

    /* @media screen and (max-width: 500px) {
        height: 25vh;
        width: 100%;
    } */
`;

export const MainMovieExplain = styled.div`
    position: absolute;
    bottom: 35px;
    left: 35px;
    max-width: 500px;

    @media screen and (max-width: 500px) {
        bottom: 0;
        left: auto;
        padding: 50px;
        text-align: center;
    }
`;

export const Sentence = styled.p`
    color: ${props => props.color || 'black'};
    font-size: 1rem;
    margin: 0;
    font-family: 'NanumSquareNeo-Variable';
`;

export const CardImage = styled.img`
    display: flex;
    width: 100%;
    max-width: 300px;
    height: 374px;
    border-radius: 1rem;
    margin: 0 auto;

    transition: 0.2s ease;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    } 
`;

export const RootDiv = styled.div`
    width: 85%;
    margin: ${props => props.margin || '2rem auto'};
`;