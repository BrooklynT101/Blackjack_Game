// props is how we pass data to components
function Card({ value, img }) {

    // this component just returns an <img />
    return (
        <img className='card' src={img} alt={`Card with value ${value}`} />
    );
}
export default Card