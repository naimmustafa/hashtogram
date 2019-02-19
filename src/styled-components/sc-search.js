import styled from 'styled-components';
import backgroundImage from 'assets/background.jpg';

export const Container = styled.section`
width: 100vw;
height: 100vh;
display: flex;
overflow: auto;
align-items: center;
flex-direction: column;
background-size: cover;
// background-image: url(${backgroundImage});
background-color: ${props => props.active ? 'green' : 'red'};
`;