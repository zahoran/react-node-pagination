let baseUrl = 'http://localhost:5000';

if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://react-node-pagination.herokuapp.com'
}

export default baseUrl;